import React, { useState, useEffect, useRef } from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { getChatMessages } from '../../api/chat_api'

const ChatModal = ({ isOpen, onClose, chat, currentUser }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const { socket } = useSocket()

  // Get other user from chat participants
  const otherUser = chat?.participants?.find(p => p._id !== currentUser._id)

  useEffect(() => {
    if (isOpen && chat) {
      loadMessages()
      joinChat()
    }

    return () => {
      if (chat) {
        leaveChat()
      }
    }
  }, [isOpen, chat])

  useEffect(() => {
    if (socket) {
      socket.on('new-message', handleNewMessage)
      socket.on('message-error', handleMessageError)
    }

    return () => {
      if (socket) {
        socket.off('new-message', handleNewMessage)
        socket.off('message-error', handleMessageError)
      }
    }
  }, [socket])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const response = await getChatMessages(chat._id)
      setMessages(response.messages || [])
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const joinChat = () => {
    if (socket && chat) {
      socket.emit('join-chat', chat._id)
    }
  }

  const leaveChat = () => {
    if (socket && chat) {
      socket.emit('leave-chat', chat._id)
    }
  }

  const handleNewMessage = (data) => {
    if (data.chatId === chat._id) {
      setMessages(prev => [...prev, data.message])
    }
  }

  const handleMessageError = (error) => {
    console.error('Message error:', error)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !socket || !chat) return

    socket.emit('send-message', {
      chatId: chat._id,
      senderId: currentUser._id,
      content: newMessage.trim()
    })

    setNewMessage('')
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 max-w-md w-full h-[500px] overflow-hidden professional-bg">
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white">
              Chat with {otherUser?.name || 'User'}
            </h2>
            <p className="text-sm text-gray-400">
              {chat?.itemId?.name && `About: ${chat.itemId.name}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300 p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.senderId === currentUser._id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.senderId === currentUser._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === currentUser._id ? 'text-blue-200' : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700/50">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              disabled={!socket}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || !socket}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatModal
