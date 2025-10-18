import React, { useState, useEffect, useRef } from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { useNotification } from '../../contexts/NotificationContext'
import { getOrCreateChat, getChatMessages, resolveChat } from '../../api/chat_api'

const ContactModal = ({ isOpen, onClose, item, currentUser, onResolve }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [chat, setChat] = useState(null)
  const [showContactDetails, setShowContactDetails] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const { socket } = useSocket()
  const { addNotification } = useNotification()

  // Get the other user (item owner)
  const otherUser = item?.userId

  // Initialize chat when modal opens
  useEffect(() => {
    if (isOpen && item && currentUser) {
      initializeChat()
    }
  }, [isOpen, item, currentUser])

  // Socket event listeners
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

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeChat = async () => {
    try {
      setLoading(true)
      
      if (!otherUser || !otherUser._id) {
        throw new Error('User information not available for this item')
      }
      
      // Create or get existing chat
      const response = await getOrCreateChat(otherUser._id, item._id)
      setChat(response.chat)
      
      // Load existing messages
      const messagesResponse = await getChatMessages(response.chat._id)
      setMessages(messagesResponse.messages || [])
      
      // Join chat room
      if (socket) {
        socket.emit('join-chat', response.chat._id)
      }
      
    } catch (error) {
      console.error('Error initializing chat:', error)
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  const handleNewMessage = (data) => {
    if (!data.message) return
    
    // Add message immediately
    setMessages(prev => {
      // Check for duplicates using message ID
      const isDuplicate = prev.some(msg => msg._id === data.message._id)
      if (isDuplicate) return prev
      
      return [...prev, data.message]
    })
    
    // Show notification
    addNotification({
      type: 'success',
      title: 'New Message',
      message: data.message.content,
      sender: data.message.senderName || 'Unknown'
    })
  }

  const handleMessageError = (error) => {
    console.error('Message error:', error)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    
    if ((!newMessage.trim() && !selectedImage) || !socket || !chat) {
      return
    }

    setSendingMessage(true)
    
    try {
      let messageContent = newMessage.trim()
      
      // Handle image upload if present
      if (selectedImage) {
        const formData = new FormData()
        formData.append('image', selectedImage)
        
        const response = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        })
        
        if (response.ok) {
          const imageData = await response.json()
          messageContent = messageContent ? `${messageContent}\n[Image: ${imageData.image.url}]` : `[Image: ${imageData.image.url}]`
        } else {
          setSendingMessage(false)
          return
        }
      }

      const messageData = {
        chatId: chat._id,
        senderId: currentUser._id,
        content: messageContent
      }
      
      // Add message to local state immediately
      const localMessage = {
        senderId: currentUser._id,
        content: messageContent,
        timestamp: new Date(),
        read: false
      }
      setMessages(prev => [...prev, localMessage])
      
      // Send via socket
      socket.emit('send-message', messageData)
      
      // Show notification
      addNotification({
        type: 'success',
        title: 'Message Sent',
        message: 'Your message has been sent successfully'
      })
      
      // Clear form
      setNewMessage('')
      setSelectedImage(null)
      setImagePreview(null)
      
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSendingMessage(false)
    }
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

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size must be less than 5MB')
        return
      }
      
      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const renderMessageContent = (content) => {
    // Check if message contains an image
    const imageMatch = content.match(/\[Image: (.*?)\]/)
    if (imageMatch) {
      const imageUrl = imageMatch[1]
      const textContent = content.replace(/\[Image: .*?\]/, '').trim()
      
      return (
        <div>
          {textContent && <p className="text-sm mb-2">{textContent}</p>}
          <img 
            src={imageUrl} 
            alt="Shared image" 
            className="max-w-full max-h-64 rounded-lg object-cover"
            onClick={() => window.open(imageUrl, '_blank')}
          />
        </div>
      )
    }
    
    return <p className="text-sm">{content}</p>
  }

  const handleResolve = async () => {
    try {
      if (chat) {
        await resolveChat(chat._id)
      }
      if (onResolve) {
        onResolve(item._id)
      }
      onClose()
    } catch (error) {
      console.error('Error resolving chat:', error)
    }
  }

  if (!isOpen) return null

  if (!otherUser || !otherUser._id) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 max-w-md w-full p-6 text-center">
          <h2 className="text-lg font-bold text-white mb-4">Contact Information Unavailable</h2>
          <p className="text-gray-400 mb-4">
            User information is not available for this item. Please try again later.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* EXIT BUTTON - ALWAYS VISIBLE */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-60 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        EXIT CHAT
      </button>
      
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 max-w-2xl w-full h-[600px] overflow-hidden professional-bg relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={item?.image?.url || '/placeholder-item.jpg'}
                alt={item?.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-lg font-bold text-white">
                  Contact about: {item?.name}
                </h2>
                <p className="text-sm text-gray-400">
                  {item?.type === 'lost' ? 'Lost Item Owner' : 'Found Item Owner'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowContactDetails(!showContactDetails)}
                className="px-3 py-1 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                {showContactDetails ? 'Hide Contact' : 'Show Contact'}
              </button>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        {showContactDetails && (
          <div className="p-4 bg-gray-800/30 border-b border-gray-700/50">
            <h3 className="text-sm font-semibold text-white mb-2">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="text-white ml-2">{otherUser?.name || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="text-white ml-2">{otherUser?.email || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-gray-400">Item Location:</span>
                <span className="text-white ml-2">{item?.location}</span>
              </div>
              <div>
                <span className="text-gray-400">Date:</span>
                <span className="text-white ml-2">{new Date(item?.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-400">Loading chat...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-lg mb-2">Start the conversation!</div>
              <div className="text-sm">Send a message to discuss this {item?.type} item.</div>
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
                  {renderMessageContent(message.content)}
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
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-3 relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-32 max-h-32 rounded-lg object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
          
          <form onSubmit={sendMessage} className="flex gap-2">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                disabled={!socket || sendingMessage}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={!socket || sendingMessage}
                className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Attach image"
              >
                📷
              </button>
            </div>
            <button
              type="submit"
              disabled={(!newMessage.trim() && !selectedImage) || !socket || sendingMessage}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {sendingMessage ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-700/50 flex justify-between items-center">
          <button
            onClick={handleResolve}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
          >
            Mark as Resolved
          </button>
          <div className="text-xs text-gray-500">
            Item will be marked as resolved and archived
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal