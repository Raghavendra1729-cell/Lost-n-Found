import React, { useState } from 'react'
import { getImageUrl } from '../../utils/imageUtils'
import { ContactModal } from '../modals'

const LostList = ({ items, onMatches, onArchive, onDelete, matches, currentUser, onResolve, onOpenEnhancedChat }) => {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleContactClick = (item) => {
    setSelectedItem(item)
    setContactModalOpen(true)
  }

  const handleResolve = (itemId) => {
    if (onResolve) {
      onResolve(itemId)
    }
  }

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {items.map((it) => (
          <div key={it._id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700/50 professional-bg">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <img src={getImageUrl(it.image)} alt={it.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg self-center sm:self-start" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-base sm:text-lg truncate">{it.name}</div>
                <div className="text-gray-400 text-xs sm:text-sm">{it.location} — {new Date(it.date).toLocaleDateString()}</div>
                <div className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{it.description}</div>
                <div className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                  it.status === 'resolved' 
                    ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                    : 'bg-red-600/20 text-red-400 border border-red-600/30'
                }`}>
                  {it.status === 'resolved' ? 'RESOLVED' : 'ACTIVE'}
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button 
                onClick={() => onMatches(it._id)} 
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 card-hover"
              >
                Check Matches
              </button>
              {it.status === 'active' && (
                <button 
                  onClick={() => onArchive(it._id)} 
                  className="px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 card-hover"
                >
                  Archive
                </button>
              )}
              <button 
                onClick={() => onDelete(it._id)} 
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 card-hover"
              >
                Delete
              </button>
            </div>
            {matches[it._id] && (
              <div className="mt-3 sm:mt-4 border-t border-gray-600/50 pt-3 sm:pt-4">
                <div className="text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3 professional-text-shadow">Matches ({matches[it._id].length}):</div>
                <div className="space-y-2 sm:space-y-3">
                  {matches[it._id].map((m) => (
                    <div key={m._id} className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
                      <img src={getImageUrl(m.image)} alt={m.name} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg self-center sm:self-start" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs sm:text-sm text-white truncate">{m.name}</div>
                        <div className="text-xs text-gray-400">{m.location} — {new Date(m.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">{m.description}</div>
                        <div className="text-xs text-gray-400 mt-1">Found by: {m.userId?.name || 'Unknown'}</div>
                      </div>
                      <button 
                        onClick={() => handleContactClick(m)}
                        className="px-2 sm:px-3 py-1 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 self-center sm:self-start"
                      >
                        Contact Finder
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <div className="text-gray-500 text-base sm:text-lg">No lost items found</div>
            <div className="text-gray-600 text-sm mt-2">Report a lost item to get started</div>
          </div>
        )}
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        item={selectedItem}
        currentUser={currentUser}
        onResolve={handleResolve}
        onOpenEnhancedChat={onOpenEnhancedChat}
      />
    </>
  )
}

export default LostList


