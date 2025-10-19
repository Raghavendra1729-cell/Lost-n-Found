import React from 'react'

const SearchBar = ({ query, onChange, onSearch }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <input 
        className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border text-sm sm:text-base" 
        placeholder="Search by item name" 
        value={query.text} 
        onChange={(e) => onChange({ ...query, text: e.target.value })} 
      />
      <input 
        className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border text-sm sm:text-base" 
        placeholder="Location" 
        value={query.location} 
        onChange={(e) => onChange({ ...query, location: e.target.value })} 
      />
      <select 
        className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gray-800/50 border border-gray-600 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 professional-border text-sm sm:text-base" 
        value={query.type} 
        onChange={(e) => onChange({ ...query, type: e.target.value })}
      >
        <option value="all">All Types</option>
        <option value="lost">Lost Items</option>
        <option value="found">Found Items</option>
        <option value="resolved">Resolved</option>
      </select>
      <button 
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 card-hover text-sm sm:text-base" 
        type="submit"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar


