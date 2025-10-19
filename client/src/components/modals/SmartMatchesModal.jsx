import React, { useState, useEffect } from 'react'
import { getSmartMatches } from '../../api/object_api'
import { getImageUrl } from '../../utils/imageUtils'
import { getOrCreateChat } from '../../api/chat_api'

const SmartMatchesModal = ({ isOpen, onClose, itemData, currentUser, onOpenChat }) => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && itemData) {
      fetchMatches()
    }
  }, [isOpen, itemData])

  const fetchMatches = async () => {
    setLoading(true)
    try {
      const response = await getSmartMatches({
        name: itemData.name,
        description: itemData.description,
        location: itemData.location,
        type: itemData.type
      })
      setMatches(response.matches || [])
    } catch (error) {
      console.error('Failed to fetch matches:', error)
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  const handleContact = (match) => {
    // Copy contact info to clipboard
    const contactInfo = `${match.userId?.name || 'Unknown User'}: ${match.userId?.email || 'No email provided'}`
    navigator.clipboard.writeText(contactInfo).then(() => {
      console.log('Contact info copied to clipboard:', contactInfo)
    }).catch(() => {
      console.log('Contact info:', contactInfo)
    })
  }

  const handleStartChat = async (match) => {
    try {
      // Close the modal first
      onClose()
      
      // Open the enhanced chat interface
      if (onOpenChat) {
        onOpenChat(match.userId, `Hi ${match.userId.name}! I found a potential match for your ${match.type} item "${match.name}". Let's connect!`)
      }
    } catch (error) {
      console.error('Error starting chat:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 max-w-4xl w-full max-h-[80vh] overflow-hidden professional-bg">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white professional-text-shadow">
                🎯 Smart Matches Found
              </h2>
              <p className="text-gray-400 mt-1">
                Potential matches for your {itemData?.type} item: <span className="text-blue-300 font-medium">{itemData?.name}</span>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-400">Finding matches...</span>
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No matches found</div>
              <div className="text-gray-600 text-sm">
                We'll keep looking for potential matches and notify you when we find any.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-400 mb-4">
                Found {matches.length} potential match{matches.length !== 1 ? 'es' : ''} with similarity scores
              </div>
              {matches.map((match) => (
                <div key={match._id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 professional-bg">
                  <div className="flex gap-4">
                    <img 
                      src={getImageUrl(match.image)} 
                      alt={match.name} 
                      className="w-20 h-20 object-cover rounded-lg" 
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-white text-lg">{match.name}</div>
                          <div className="text-gray-400 text-sm">
                            {match.location} — {new Date(match.date).toLocaleDateString()}
                          </div>
                          <div className="text-gray-500 text-sm mt-1">{match.description}</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              match.type === 'lost' 
                                ? 'bg-red-600/20 text-red-400 border border-red-600/30' 
                                : 'bg-green-600/20 text-green-400 border border-green-600/30'
                            }`}>
                              {match.type.toUpperCase()}
                            </span>
                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 text-yellow-400 border border-yellow-600/30 text-xs font-bold rounded-full">
                              {match.similarityScore}% Match
                            </span>
                          </div>
                          <span className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded">
                            By: {match.userId?.name || 'Unknown User'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleContact(match)}
                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 card-hover"
                        >
                          Contact Owner
                        </button>
                        <button
                          onClick={() => handleStartChat(match)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 card-hover"
                        >
                          💬 Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700/50 bg-gray-800/30">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              We'll continue searching for more matches in the background
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 card-hover"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartMatchesModal
