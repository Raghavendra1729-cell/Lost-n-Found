import React, { useState, useEffect } from 'react'
import { getOrCreateGlobalChat } from '../../api/chat_api'
import ChatSidebar from './ChatSidebar'
import ChatMainArea from './ChatMainArea'

const EnhancedChat = ({ currentUser, onClose, initialUser = null, initialMessage = null }) => {
  const [currentChat, setCurrentChat] = useState(null)
  const [currentOtherUser, setCurrentOtherUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [activeTab, setActiveTab] = useState('chats')

  // Handle initial user and message from matches
  useEffect(() => {
    if (initialUser && initialMessage) {
      handleStartChatWithMessage(initialUser, initialMessage)
    }
  }, [initialUser, initialMessage])

  const handleStartChat = async (user) => {
    try {
      const response = await getOrCreateGlobalChat(user._id)
      const newChat = response.chat
      setCurrentChat(newChat)
      setCurrentOtherUser(user)
      setActiveTab('chats')
      setSearchTerm('')
      setSearchResults([])
    } catch (error) {
      console.error('Failed to start chat:', error)
    }
  }

  const handleStartChatWithMessage = async (user, greetingMessage) => {
    try {
      const response = await getOrCreateGlobalChat(user._id)
      const newChat = response.chat
      setCurrentChat(newChat)
      setCurrentOtherUser(user)
      setActiveTab('chats')
      setSearchTerm('')
      setSearchResults([])
      
      // Send the greeting message
      const { sendMessage } = await import('../../api/chat_api')
      await sendMessage(user._id, greetingMessage)
    } catch (error) {
      console.error('Failed to start chat with message:', error)
    }
  }

  const handleSelectChat = (chat, otherUser) => {
    setCurrentChat(chat)
    setCurrentOtherUser(otherUser)
    setActiveTab('chats')
  }

  return (
    <div className="flex h-full bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Chat Sidebar */}
      <ChatSidebar
        currentUser={currentUser}
        onSelectChat={handleSelectChat}
        currentChat={currentChat}
        onStartNewChat={handleStartChat}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onClose}
      />

      {/* Chat Main Area */}
      <ChatMainArea
        currentChat={currentChat}
        currentOtherUser={currentOtherUser}
        currentUser={currentUser}
        onClose={onClose}
      />
    </div>
  )
}

export default EnhancedChat