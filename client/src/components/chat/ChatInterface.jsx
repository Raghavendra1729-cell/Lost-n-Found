import React, { useState, useEffect, useRef } from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { sendMessage } from '../../api/chat_api'

const ChatInterface = ({ chat, otherUser, currentUser, onClose }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const { socket, isConnected } = useSocket()

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load messages when chat changes
  useEffect(() => {
    if (chat && chat.messages) {
      setMessages(chat.messages)
    }
  }, [chat])

  // Socket event listeners
  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (message) => {
      console.log('📨 New message received:', message)
      setMessages(prev => [...prev, message])
    }

    const handleMessageDelivered = (messageId) => {
      console.log('✅ Message delivered:', messageId)
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, status: 'delivered' } : msg
      ))
    }

    const handleMessageRead = (messageId) => {
      console.log('👁️ Message read:', messageId)
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, status: 'read' } : msg
      ))
    }

    const handleTyping = () => {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 2000)
    }

    // Join chat room
    if (chat && chat._id) {
      socket.emit('join-chat', chat._id)
    }

    socket.on('new_message', handleNewMessage)
    socket.on('message_delivered', handleMessageDelivered)
    socket.on('message_read', handleMessageRead)
    socket.on('typing', handleTyping)

    return () => {
      socket.off('new_message', handleNewMessage)
      socket.off('message_delivered', handleMessageDelivered)
      socket.off('message_read', handleMessageRead)
      socket.off('typing', handleTyping)
    }
  }, [socket, chat])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !otherUser) return

    const messageContent = newMessage.trim()
    const tempMessage = {
      _id: Date.now(),
      content: messageContent,
      senderId: currentUser._id,
      senderName: currentUser.name,
      receiverId: otherUser._id,
      timestamp: new Date(),
      status: 'pending'
    }

    // Add message optimistically
    setMessages(prev => [...prev, tempMessage])
    setNewMessage('')
    setLoading(true)

    try {
      // Send message via API
      const response = await sendMessage(otherUser._id, messageContent)
      console.log('📤 Message sent:', response)

      // Replace temp message with real message
      setMessages(prev => prev.map(msg => 
        msg._id === tempMessage._id ? response.message : msg
      ))

      // Emit socket event for real-time delivery
      if (socket && isConnected) {
        socket.emit('send_message', {
          chatId: chat._id,
          message: response.message
        })
      }
    } catch (error) {
      console.error('❌ Send message error:', error)
      // Remove failed message
      setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id))
      setNewMessage(messageContent) // Restore message content
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!chat || !otherUser) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-700 mb-2">No chat selected</p>
          <p className="text-gray-500">Select a conversation to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Enhanced Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                {otherUser.name.charAt(0).toUpperCase()}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
                isConnected ? 'bg-green-400' : 'bg-gray-400'
              }`}></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-base sm:text-lg truncate">{otherUser.name}</h3>
              <p className="text-blue-100 text-xs sm:text-sm truncate">
                {isConnected ? 'Online' : 'Offline'}
                {isTyping && ' • Typing...'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors p-1 sm:p-2 rounded-full hover:bg-white hover:bg-opacity-10 flex-shrink-0"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-2 sm:p-4 space-y-3 sm:space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-xl font-medium text-gray-700 mb-2">Start the conversation!</p>
              <p className="text-gray-500">Send your first message to begin chatting</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwnMessage = message.senderId === currentUser._id
            return (
              <div
                key={message._id || `message-${index}`}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm ${
                    isOwnMessage
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  {!isOwnMessage && (
                    <div className="text-xs font-semibold mb-1 opacity-70 text-gray-600">
                      {message.senderName}
                    </div>
                  )}
                  <div className="text-xs sm:text-sm leading-relaxed">{message.content}</div>
                  <div className={`text-xs mt-1 sm:mt-2 flex items-center justify-end ${
                    isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {isOwnMessage && (
                      <span className="ml-2">
                        {message.status === 'pending' && <span className="animate-pulse">⏳</span>}
                        {message.status === 'delivered' && '✓'}
                        {message.status === 'read' && '✓✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Message Input */}
      <div className="bg-white border-t border-gray-200 p-2 sm:p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2 sm:space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="w-full p-2 sm:p-3 pr-10 sm:pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 resize-none text-sm sm:text-base"
            />
            <button
              type="button"
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface
