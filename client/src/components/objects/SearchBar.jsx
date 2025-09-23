import React from 'react'

const SearchBar = ({ query, onChange, onSearch }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
      <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" placeholder="Search by item" value={query.text} onChange={(e) => onChange({ ...query, text: e.target.value })} />
      <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" placeholder="Location" value={query.location} onChange={(e) => onChange({ ...query, location: e.target.value })} />
      <select className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={query.type} onChange={(e) => onChange({ ...query, type: e.target.value })}>
        <option value="all">All</option>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
        <option value="resolved">Resolved</option>
      </select>
      <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600" type="submit">Search</button>
    </form>
  )
}

export default SearchBar


