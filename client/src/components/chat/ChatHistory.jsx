import React, { useState, useEffect } from 'react'
import { getUserChats } from '../../api/chat_api'

const ChatHistory = ({ onSelectChat, currentChat, currentUser, onClose }) => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChats()
  }, [])

  const loadChats = async () => {
    try {
      setLoading(true)
      const response = await getUserChats()
      setChats(response.chats || [])
    } catch (error) {
      console.error('Failed to load chats:', error)
      setChats([])
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getOtherUser = (chat) => {
    return chat.participants.find(p => p._id !== currentUser._id)
  }

  const getLastMessage = (chat) => {
    if (!chat.messages || chat.messages.length === 0) {
      return { content: 'No messages yet', timestamp: chat.createdAt }
    }
    return chat.messages[chat.messages.length - 1]
  }

  const getUnreadCount = (chat) => {
    const userUnread = chat.unreadCounts?.find(u => u.userId === currentUser._id)
    return userUnread?.count || 0
  }

  if (loading) {
    return (
      <div className="w-80 bg-gray-50 border-r border-gray-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <p className="text-blue-100 text-sm">{chats.length} conversations</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
          title="Close chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">No conversations yet</p>
            <p className="text-sm">Start a new chat to see your messages here</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {chats.map((chat) => {
              const otherUser = getOtherUser(chat)
              const lastMessage = getLastMessage(chat)
              const unreadCount = getUnreadCount(chat)
              const isActive = currentChat && currentChat._id === chat._id

              return (
                <div
                  key={chat._id}
                  onClick={() => onSelectChat(chat, otherUser)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    isActive ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {otherUser?.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      {unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </div>
                      )}
                    </div>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold truncate ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                          {otherUser?.name || 'Unknown User'}
                        </h3>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatTime(lastMessage.timestamp)}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                        {lastMessage.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatHistory
