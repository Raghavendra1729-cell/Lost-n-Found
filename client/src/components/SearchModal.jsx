import React from 'react'

const SearchModal = ({ 
  isOpen, 
  onClose, 
  searchQuery, 
  setSearchQuery, 
  searchType, 
  setSearchType, 
  searchDate, 
  setSearchDate, 
  onSearch 
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Search Items</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={onSearch} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Search Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="items"
                  checked={searchType === 'items'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-white">Items</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="places"
                  checked={searchType === 'places'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-white">Places</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 font-medium mb-2">Search Query</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter keywords, item name, or description..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 font-medium mb-2">Date Filter (Optional)</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              Search
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchModal
