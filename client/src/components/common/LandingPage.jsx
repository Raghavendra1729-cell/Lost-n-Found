import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { searchObjects, getSmartMatches } from '../../api/object_api'

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [searchType, setSearchType] = useState('all')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim() && !searchLocation.trim()) return

    setIsSearching(true)
    try {
      const params = {}
      if (searchQuery.trim()) params.query = searchQuery
      if (searchLocation.trim()) params.location = searchLocation
      if (searchType !== 'all') params.type = searchType

      const response = await searchObjects(params)
      setSearchResults(response.results || [])
      setShowResults(true)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleQuickMatch = async (itemType) => {
    if (!searchQuery.trim() || !searchLocation.trim()) return

    setIsSearching(true)
    try {
      const params = {
        name: searchQuery,
        location: searchLocation,
        type: itemType
      }

      const response = await getSmartMatches(params)
      setSearchResults(response.matches || [])
      setShowResults(true)
    } catch (error) {
      console.error('Smart match failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="text-center max-w-6xl mx-auto px-2 sm:px-4">
      {/* Main Hero Section */}
      <div className="mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
          <span className="inline-block professional-text animate-text-reveal">
            LOST
          </span>
          <br />
          <span className="inline-block professional-text animate-text-reveal animation-delay-1000">
            & FOUND
          </span>
        </h1>
        <div className="mb-6 sm:mb-8">
          <p className="text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed professional-text-shadow px-4">
            Advanced Item Recovery System
          </p>
        </div>
      </div>

      {/* Enhanced Search Interface */}
      <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 professional-bg mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 professional-text-shadow">
          Search Engine
        </h2>
        
        <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="What are you looking for? (e.g., iPhone, keys, wallet)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border text-sm sm:text-base"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Location (e.g., Library, Cafeteria)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border text-sm sm:text-base"
            >
              <option value="all">All Items</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>

            <button
              type="submit"
              disabled={isSearching}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed animate-professional-pulse card-hover text-sm sm:text-base"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Quick Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => handleQuickMatch('lost')}
            disabled={!searchQuery.trim() || !searchLocation.trim() || isSearching}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg font-semibold hover:bg-red-500/30 hover:border-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            🔍 Find Lost Item Matches
          </button>
          <button
            onClick={() => handleQuickMatch('found')}
            disabled={!searchQuery.trim() || !searchLocation.trim() || isSearching}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500/20 border border-green-400/50 text-green-300 rounded-lg font-semibold hover:bg-green-500/30 hover:border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            🎯 Find Found Item Matches
          </button>
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-700/50 professional-bg mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white professional-text professional-text-shadow">
              Search Results ({searchResults.length} items found)
            </h3>
            <button
              onClick={() => setShowResults(false)}
              className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-gray-700/50 rounded-lg self-end sm:self-auto"
              title="Close results"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {searchResults.slice(0, 6).map((item, index) => (
                <div key={item._id} className="bg-gray-900/50 rounded-xl p-3 sm:p-4 border border-gray-600/50 hover:border-blue-400/50 transition-all duration-300 card-hover">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'lost' 
                        ? 'bg-red-500/20 text-red-300 border border-red-400/50' 
                        : 'bg-green-500/20 text-green-300 border border-green-400/50'
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                    {item.similarityScore && (
                      <span className="text-blue-400 text-xs sm:text-sm font-bold">
                        {item.similarityScore}% match
                      </span>
                    )}
                  </div>
                  <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">{item.name}</h4>
                  {item.description && (
                    <p className="text-gray-300 text-xs sm:text-sm mb-2 line-clamp-2">{item.description}</p>
                  )}
                  <p className="text-cyan-400 text-xs sm:text-sm">📍 {item.location}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Posted by: {item.userId?.name || 'Anonymous'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <p className="text-gray-400 text-base sm:text-lg">No items found matching your criteria.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or location.</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center px-4">
        <Link 
          to="/register" 
          className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 animate-professional-pulse card-hover w-full sm:w-auto text-center"
        >
          <span className="relative z-10">🚀 Get Started</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </Link>
      </div>

    </div>
  )
}

export default LandingPage
