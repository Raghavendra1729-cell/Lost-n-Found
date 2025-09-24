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
    <div className="text-center max-w-6xl mx-auto">
      {/* Main Hero Section */}
      <div className="mb-16">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="inline-block professional-text animate-text-reveal">
            LOST
          </span>
          <br />
          <span className="inline-block professional-text animate-text-reveal animation-delay-1000">
            & FOUND
          </span>
        </h1>
        <div className="mb-8">
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed professional-text-shadow">
            Advanced Item Recovery System
          </p>
        </div>
      </div>

      {/* Enhanced Search Interface */}
      <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 professional-bg mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 professional-text-shadow">
          Search Engine
        </h2>
        
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="What are you looking for? (e.g., iPhone, keys, wallet)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Location (e.g., Library, Cafeteria)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border"
            >
              <option value="all">All Items</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>

            <button
              type="submit"
              disabled={isSearching}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed animate-professional-pulse card-hover"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Quick Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleQuickMatch('lost')}
            disabled={!searchQuery.trim() || !searchLocation.trim() || isSearching}
            className="px-6 py-3 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg font-semibold hover:bg-red-500/30 hover:border-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔍 Find Lost Item Matches
          </button>
          <button
            onClick={() => handleQuickMatch('found')}
            disabled={!searchQuery.trim() || !searchLocation.trim() || isSearching}
            className="px-6 py-3 bg-green-500/20 border border-green-400/50 text-green-300 rounded-lg font-semibold hover:bg-green-500/30 hover:border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎯 Find Found Item Matches
          </button>
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 professional-bg mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 professional-text professional-text-shadow">
            Search Results ({searchResults.length} items found)
          </h3>
          {searchResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.slice(0, 6).map((item, index) => (
                <div key={item._id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/50 hover:border-blue-400/50 transition-all duration-300 card-hover">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'lost' 
                        ? 'bg-red-500/20 text-red-300 border border-red-400/50' 
                        : 'bg-green-500/20 text-green-300 border border-green-400/50'
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                    {item.similarityScore && (
                      <span className="text-blue-400 text-sm font-bold">
                        {item.similarityScore}% match
                      </span>
                    )}
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.name}</h4>
                  {item.description && (
                    <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                  )}
                  <p className="text-cyan-400 text-sm">📍 {item.location}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Posted by: {item.userId?.name || 'Anonymous'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No items found matching your criteria.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or location.</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center">
        <Link 
          to="/register" 
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 animate-professional-pulse card-hover"
        >
          <span className="relative z-10">🚀 Get Started</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </Link>
      </div>

    </div>
  )
}

export default LandingPage
