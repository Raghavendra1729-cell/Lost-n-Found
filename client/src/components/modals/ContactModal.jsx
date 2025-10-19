import React, { useState, useEffect } from 'react'
import { useNotification } from '../../contexts/NotificationContext'

const ContactModal = ({ isOpen, onClose, item, currentUser, onResolve, onOpenEnhancedChat }) => {
  const [showContactDetails, setShowContactDetails] = useState(false)
  const { addNotification } = useNotification()

  // Get the other user (item owner)
  const otherUser = item?.userId

  if (!isOpen) return null

  if (!otherUser) {
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

  const handleStartChat = () => {
    if (onOpenEnhancedChat) {
      onClose()
      onOpenEnhancedChat(otherUser, `Hi ${otherUser?.name || 'there'}! I'm interested in your ${item?.type} item "${item?.name}". Can we discuss the details?`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* EXIT BUTTON */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-60 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        EXIT
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

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ready to Chat?</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Connect with <span className="text-blue-400 font-semibold">{otherUser?.name || 'the owner'}</span> about this <span className="text-green-400 font-semibold">{item?.type} item</span> "<span className="text-yellow-400 font-semibold">{item?.name}</span>". 
              Start a conversation to discuss details and arrange pickup.
            </p>
            
            <button
              onClick={handleStartChat}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Start Chat with {otherUser?.name || 'Owner'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                const contactInfo = `${otherUser?.name}: ${otherUser?.email || 'No email provided'}`
                navigator.clipboard.writeText(contactInfo).then(() => {
                  addNotification('Contact info copied to clipboard!', 'success')
                }).catch(() => {
                  addNotification('Contact info: ' + contactInfo, 'info')
                })
              }}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Copy Contact Info
            </button>
            
            {onResolve && (
              <button
                onClick={() => {
                  onResolve(item._id)
                  onClose()
                }}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
              >
                Mark as Resolved
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal