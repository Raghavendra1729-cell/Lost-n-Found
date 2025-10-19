import React, { useState, useEffect } from 'react'
import { searchUsers } from '../../api/user_api'
import { getUserChats } from '../../api/chat_api'

const ChatSidebar = ({ 
  currentUser, 
  onSelectChat, 
  currentChat, 
  onStartNewChat,
  searchTerm,
  setSearchTerm,
  searchResults,
  setSearchResults,
  activeTab,
  setActiveTab 
}) => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(false)

  // Load chats on mount
  useEffect(() => {
    loadChats()
  }, [])

  // Search users when search term changes
  useEffect(() => {
    if (searchTerm.length > 2) {
      searchUsersDebounced(searchTerm)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const loadChats = async () => {
    try {
      setLoading(true)
      const response = await getUserChats()
      setChats(response.chats || [])
    } catch (error) {
      console.error('Failed to load chats:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchUsersDebounced = async (term) => {
    try {
      const response = await searchUsers(term)
      setSearchResults(response.users || [])
    } catch (error) {
      console.error('Failed to search users:', error)
      setSearchResults([])
    }
  }

  const handleStartChat = (user) => {
    onStartNewChat(user)
    setSearchTerm('')
    setSearchResults([])
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  const getOtherUser = (chat) => {
    return chat.participants.find(p => p._id !== currentUser._id)
  }

  const getLastMessage = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return null
    return chat.messages[chat.messages.length - 1]
  }

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          <button
            onClick={() => setActiveTab('search')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search users or messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Search Results</h3>
          <div className="space-y-2">
            {searchResults.map((user) => (
              <div
                key={user._id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors border border-blue-200 bg-white shadow-sm"
                onClick={() => handleStartChat(user)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                  Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading chats...</p>
          </div>
        ) : chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>No conversations yet</p>
            <p className="text-sm">Start a chat with someone!</p>
          </div>
        ) : (
          <div className="p-2">
            {chats.map((chat) => {
              const otherUser = getOtherUser(chat)
              const lastMessage = getLastMessage(chat)
              const isSelected = currentChat?._id === chat._id
              
              return (
                <div
                  key={chat._id}
                  onClick={() => onSelectChat(chat, otherUser)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                    isSelected 
                      ? 'bg-blue-100 border border-blue-200' 
                      : 'hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {otherUser?.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {otherUser?.name || 'Unknown User'}
                        </h3>
                        {lastMessage && (
                          <span className="text-xs text-gray-500">
                            {formatTime(lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {lastMessage ? lastMessage.content : 'No messages yet'}
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

export default ChatSidebar
