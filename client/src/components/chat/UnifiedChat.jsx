import React, { useState } from 'react'
import { ChatHistory, ChatInterface } from './index'

const UnifiedChat = ({ currentUser, onClose }) => {
  const [currentChat, setCurrentChat] = useState(null)
  const [currentOtherUser, setCurrentOtherUser] = useState(null)

  const handleSelectChat = (chat, otherUser) => {
    setCurrentChat(chat)
    setCurrentOtherUser(otherUser)
  }

  const handleCloseChat = () => {
    setCurrentChat(null)
    setCurrentOtherUser(null)
  }

  return (
    <div className="flex h-full bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Chat History Sidebar */}
      <ChatHistory
        onSelectChat={handleSelectChat}
        currentChat={currentChat}
        currentUser={currentUser}
        onClose={onClose}
      />

      {/* Chat Interface */}
      <div className="flex-1">
        <ChatInterface
          chat={currentChat}
          otherUser={currentOtherUser}
          currentUser={currentUser}
          onClose={onClose}
        />
      </div>
    </div>
  )
}

export default UnifiedChat
