import React, { useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'
import { useNotification } from '../contexts/NotificationContext'

const GlobalChatListener = () => {
  const { socket } = useSocket()
  const { addNotification } = useNotification()

  useEffect(() => {
    if (!socket) return

    const handleGlobalMessage = (data) => {
      console.log('Global message received:', data)
      
      // Show notification for any new message
      if (data.message && data.message.senderId) {
        addNotification({
          type: 'info',
          title: 'New Chat Message',
          message: data.message.content,
          sender: data.message.senderName || 'Unknown',
          chatId: data.chatId
        })
      }
    }

    // Listen for all new messages globally
    socket.on('new-message', handleGlobalMessage)

    return () => {
      socket.off('new-message', handleGlobalMessage)
    }
  }, [socket, addNotification])

  return null // This component doesn't render anything
}

export default GlobalChatListener
