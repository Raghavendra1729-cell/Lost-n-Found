import React, { useState, useEffect, useRef } from 'react'
import { sendMessage } from '../../api/chat_api'
import { useSocket } from '../../contexts/SocketContext'

const ChatMainArea = ({ 
  currentChat, 
  currentOtherUser, 
  currentUser, 
  onClose 
}) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const { socket, isConnected } = useSocket()

  // Load messages when chat changes
  useEffect(() => {
    if (currentChat && currentChat.messages) {
      setMessages(currentChat.messages)
    }
  }, [currentChat])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Socket event listeners
  useEffect(() => {
    if (socket && currentChat) {
      const handleNewMessage = (message) => {
        if (message.chatId === currentChat._id) {
          setMessages(prev => [...prev, message])
        }
      }

      socket.on('new_message', handleNewMessage)
      socket.on('message_received', handleNewMessage)

      return () => {
        socket.off('new_message', handleNewMessage)
        socket.off('message_received', handleNewMessage)
      }
    }
  }, [socket, currentChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !currentOtherUser || loading) return

    const messageContent = newMessage.trim()
    setNewMessage('')
    setLoading(true)

    try {
      // Add message optimistically
      const tempMessage = {
        _id: `temp-${Date.now()}`,
        senderId: currentUser._id,
        senderName: currentUser.name,
        content: messageContent,
        timestamp: new Date(),
        status: 'sending'
      }
      setMessages(prev => [...prev, tempMessage])

      // Send message via API
      const response = await sendMessage(currentOtherUser._id, messageContent)
      
      if (response.success) {
        // Update the temp message with the real one
        setMessages(prev => 
          prev.map(msg => 
            msg._id === tempMessage._id ? response.message : msg
          )
        )

        // Emit socket event for real-time updates
        if (socket && isConnected) {
          socket.emit('send_message', {
            chatId: currentChat._id,
            message: response.message,
            receiverId: currentOtherUser._id
          })
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      // Remove the temp message on error
      setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id))
      setNewMessage(messageContent) // Restore the message
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getMessageStatus = (message) => {
    if (message.status === 'sending') return 'Sending...'
    if (message.status === 'sent') return 'Sent'
    if (message.status === 'delivered') return 'Delivered'
    if (message.status === 'read') return 'Read'
    return 'Sent'
  }

  if (!currentChat || !currentOtherUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {currentOtherUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{currentOtherUser.name}</h2>
            <p className="text-sm text-gray-500">{currentOtherUser.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-500">{isConnected ? 'Online' : 'Offline'}</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwnMessage = message.senderId === currentUser._id
            return (
              <div
                key={message._id || `message-${index}`}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  isOwnMessage 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex flex-col">
                    {!isOwnMessage && (
                      <span className="text-xs font-semibold text-gray-600 mb-1">
                        {message.senderName || 'Unknown User'}
                      </span>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${
                        isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </span>
                      {isOwnMessage && (
                        <span className={`text-xs ml-2 ${
                          isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {getMessageStatus(message)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatMainArea
