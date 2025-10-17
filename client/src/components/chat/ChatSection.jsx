import React, { useState, useEffect } from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { getAllObjects } from '../../api/object_api'
import { getItemMessages } from '../../api/item_chat_api'
import { getImageUrl } from '../../utils/imageUtils'

const ChatSection = ({ isOpen, onClose, currentUser }) => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { socket, connected } = useSocket()
  const messagesEndRef = React.useRef(null)

  useEffect(() => {
    if (isOpen) {
      fetchItems()
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedItem && socket && socket.emit) {
      console.log('Joining item chat room:', selectedItem._id)
      // Join the item's chat room
      socket.emit('join-item-chat', selectedItem._id)
      
      // Listen for messages in this item's chat
      socket.on('item-chat-message', (data) => {
        console.log('Received message:', data)
        if (data.itemId === selectedItem._id) {
          setMessages(prev => [...prev, data])
        }
      })

      // Load existing messages for this item
      loadMessages(selectedItem._id)

      return () => {
        console.log('Leaving item chat room:', selectedItem._id)
        if (socket.emit) {
          socket.emit('leave-item-chat', selectedItem._id)
        }
        socket.off('item-chat-message')
      }
    }
  }, [selectedItem, socket])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await getAllObjects()
      // Show all items so anyone can chat about any item
      const allItems = response.objects || []
      setItems(allItems)
    } catch (error) {
      console.error('Failed to fetch items:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (itemId) => {
    try {
      console.log('Loading messages for item:', itemId)
      const response = await getItemMessages(itemId)
      setMessages(response.messages || [])
      console.log('Loaded messages:', response.messages)
    } catch (error) {
      console.error('Failed to load messages:', error)
      setMessages([])
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    console.log('Attempting to send message:', {
      newMessage: newMessage.trim(),
      socket: !!socket,
      connected,
      selectedItem: !!selectedItem,
      currentUser: !!currentUser
    })
    
    if (newMessage.trim() && socket && socket.emit && selectedItem && currentUser) {
      const messageData = {
        itemId: selectedItem._id,
        senderId: currentUser._id,
        senderName: currentUser.name,
        content: newMessage.trim(),
        timestamp: new Date()
      }
      
      console.log('Sending message data:', messageData)
      socket.emit('send-item-message', messageData)
      
      // Don't add to local state immediately - let the socket event handle it
      // This prevents duplicate messages
      setNewMessage('')
    } else {
      console.log('Cannot send message - missing requirements')
    }
  }

  const handleItemSelect = (item) => {
    setSelectedItem(item)
    setMessages([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 max-w-6xl w-full max-h-[90vh] overflow-hidden professional-bg">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white professional-text-shadow">
                💬 Item Discussions
              </h2>
              <p className="text-gray-400 mt-1">
                Chat about any lost and found items
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex h-[70vh]">
          {/* Items List */}
          <div className="w-1/3 border-r border-gray-700/50 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">All Items</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-400">Loading...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleItemSelect(item)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedItem?._id === item._id
                        ? 'bg-blue-600/20 border border-blue-500/50'
                        : 'bg-gray-800/30 hover:bg-gray-700/50 border border-gray-600/30'
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white text-sm truncate">
                          {item.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {item.location}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                          item.type === 'lost'
                            ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                            : 'bg-green-600/20 text-green-400 border border-green-600/30'
                        }`}>
                          {item.type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedItem ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-700/50 bg-gray-800/30">
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageUrl(selectedItem.image)}
                      alt={selectedItem.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{selectedItem.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {selectedItem.location} • Posted by {selectedItem.userId?.name || 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500 mb-2">No messages yet</div>
                      <div className="text-gray-600 text-sm">
                        Be the first to start a discussion about this item!
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.senderId === currentUser._id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.senderId === currentUser._id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-white'
                          }`}
                        >
                          <div className="text-xs text-gray-300 mb-1">
                            {message.senderName}
                          </div>
                          <div>{message.content}</div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-700/50">
                  {!connected ? (
                    <div className="text-center py-4">
                      <div className="text-gray-500 text-sm">Connecting to chat server...</div>
                    </div>
                  ) : (
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                      >
                        Send
                      </button>
                    </form>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-500 text-lg mb-2">Select an item to start chatting</div>
                  <div className="text-gray-600 text-sm">
                    Choose an item from the list to join its discussion
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSection
