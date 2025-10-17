import React, { useState, useEffect } from 'react'
import { searchObjects } from '../../api/object_api'
import { getImageUrl } from '../../utils/imageUtils'

const SearchResults = ({ query, onClose }) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (query.text || query.location || query.type !== 'all') {
      performSearch()
    }
  }, [query])

  const performSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await searchObjects(query)
      setResults(response.results || [])
    } catch (error) {
      setError('Failed to search items')
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContact = (item) => {
    // Copy contact info to clipboard
    const contactInfo = `${item.userId?.name || 'Unknown User'}: ${item.userId?.email || 'No email provided'}`
    navigator.clipboard.writeText(contactInfo).then(() => {
      console.log('Contact info copied to clipboard:', contactInfo)
    }).catch(() => {
      console.log('Contact info:', contactInfo)
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 max-w-4xl w-full max-h-[80vh] overflow-hidden professional-bg">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white professional-text-shadow">
              Search Results
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            {query.text && `Searching for: "${query.text}"`}
            {query.location && ` in ${query.location}`}
            {query.type !== 'all' && ` (${query.type} items)`}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-400">Searching...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-lg mb-2">Error</div>
              <div className="text-gray-500">{error}</div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No items found</div>
              <div className="text-gray-600 text-sm">Try adjusting your search criteria</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-400 mb-4">
                Found {results.length} matching item{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((item) => (
                <div key={item._id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 professional-bg">
                  <div className="flex gap-4">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg" 
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-white text-lg">{item.name}</div>
                          <div className="text-gray-400 text-sm">
                            {item.location} — {new Date(item.date).toLocaleDateString()}
                          </div>
                          <div className="text-gray-500 text-sm mt-1">{item.description}</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            item.type === 'lost' 
                              ? 'bg-red-600/20 text-red-400 border border-red-600/30' 
                              : 'bg-green-600/20 text-green-400 border border-green-600/30'
                          }`}>
                            {item.type.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded">
                            By: {item.userId?.name || 'Unknown User'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleContact(item)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 card-hover"
                        >
                          Contact Owner
                        </button>
                        <button
                          className="px-4 py-2 border border-gray-600 text-gray-300 text-sm font-medium rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
