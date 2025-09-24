import React, { useEffect, useState } from 'react'
import { getMyObjects, getMyArchive, getObjectMatches, updateObjectStatus, deleteObject } from '../../api/object_api'
import LostList from '../objects/LostList'
import FoundList from '../objects/FoundList'
import ArchiveList from '../objects/ArchiveList'
import SearchBar from '../objects/SearchBar'
import SearchResults from '../objects/SearchResults'

const Dashboard = ({ user, onReportItem }) => {
  const [items, setItems] = useState([])
  const [archive, setArchive] = useState([])
  const [matches, setMatches] = useState({})
  const [query, setQuery] = useState({ text: '', location: '', type: 'all' })
  const [activeTab, setActiveTab] = useState('lost') // 'lost', 'found', 'archive'
  const [showSearchResults, setShowSearchResults] = useState(false)

  const refresh = async () => {
    const { results } = await getMyObjects()
    setItems(results)
    const { results: archived } = await getMyArchive()
    setArchive(archived)
  }

  useEffect(() => { refresh() }, [])

  const handleMatches = async (id) => {
    const { matches: m } = await getObjectMatches(id)
    setMatches((prev) => ({ ...prev, [id]: m }))
  }

  const handleArchive = async (id) => {
    await updateObjectStatus(id, 'resolved')
    await refresh()
  }

  const handleDelete = async (id) => {
    await deleteObject(id)
    await refresh()
  }

  const filtered = items.filter((it) => {
    if (query.type !== 'all' && query.type !== 'resolved' && it.type !== query.type) return false
    if (query.type === 'resolved' && it.status !== 'resolved') return false
    if (query.location && !new RegExp(query.location, 'i').test(it.location)) return false
    if (query.text) {
      const re = new RegExp(query.text, 'i')
      if (!re.test(it.name || '') && !re.test(it.description || '')) return false
    }
    return true
  })

  const lostItems = filtered.filter(item => item.type === 'lost' && item.status === 'active')
  const foundItems = filtered.filter(item => item.type === 'found' && item.status === 'active')

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          <span className="professional-text">Welcome back,</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed professional-text-shadow">
          <span className="text-blue-300 font-semibold">{user.name}</span>! 
          Manage your lost and found items efficiently.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Search Section */}
        <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 professional-bg">
          <h2 className="text-2xl font-bold text-white mb-6 professional-text-shadow">Search All Items</h2>
          <SearchBar 
            query={query} 
            onChange={setQuery} 
            onSearch={() => setShowSearchResults(true)} 
          />
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 professional-bg">
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'lost'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              Lost Items ({lostItems.length})
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'found'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              Found Items ({foundItems.length})
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'archive'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              Archive ({archive.length})
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => onReportItem('lost')}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 card-hover"
            >
              Report Lost Item
            </button>
            <button
              onClick={() => onReportItem('found')}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 card-hover"
            >
              Report Found Item
            </button>
            <button
              onClick={() => setShowSearchResults(true)}
              className="px-6 py-3 border-2 border-blue-400 text-blue-300 font-semibold rounded-xl hover:bg-blue-400/10 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 card-hover"
            >
              Browse All Items
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'lost' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4 professional-text-shadow">Lost Items</h3>
                <LostList items={lostItems} onMatches={handleMatches} onArchive={handleArchive} onDelete={handleDelete} matches={matches} />
              </div>
            )}
            {activeTab === 'found' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4 professional-text-shadow">Found Items</h3>
                <FoundList items={foundItems} onMatches={handleMatches} onArchive={handleArchive} onDelete={handleDelete} matches={matches} />
              </div>
            )}
            {activeTab === 'archive' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4 professional-text-shadow">Archived Items</h3>
                <ArchiveList items={archive} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results Modal */}
      {showSearchResults && (
        <SearchResults 
          query={query} 
          onClose={() => setShowSearchResults(false)} 
        />
      )}
    </div>
  )
}

export default Dashboard
