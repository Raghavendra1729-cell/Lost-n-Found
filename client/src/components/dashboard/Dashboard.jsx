import React, { useEffect, useState } from 'react'
import { getMyObjects, getMyArchive, getObjectMatches, updateObjectStatus, deleteObject } from '../../api/object_api'
import LostList from '../objects/LostList'
import FoundList from '../objects/FoundList'
import ArchiveList from '../objects/ArchiveList'
import SearchBar from '../objects/SearchBar'
import QuickStats from './QuickStats'
import QuickActions from './QuickActions'
import FeaturedItems from './FeaturedItems'

const Dashboard = ({ user, onReportItem, onSearch }) => {
  const [items, setItems] = useState([])
  const [archive, setArchive] = useState([])
  const [matches, setMatches] = useState({})
  const [query, setQuery] = useState({ text: '', location: '', type: 'all' })

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

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          SST Lost and Found
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Welcome back, <span className="text-blue-300 font-semibold">{user.name}</span>! 
          Manage your lost and found items.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Left Column - Lists and Search */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Search</h2>
            <SearchBar query={query} onChange={setQuery} onSearch={() => { /* filtering is live */ }} />
          </div>
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Lost Items</h2>
            <LostList items={filtered} onMatches={handleMatches} onArchive={handleArchive} onDelete={handleDelete} matches={matches} />
          </div>
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-4">Found Items</h2>
            <FoundList items={filtered} onMatches={handleMatches} onArchive={handleArchive} onDelete={handleDelete} matches={matches} />
          </div>
        </div>

        {/* Right Column - Quick Stats and Actions */}
        <div className="space-y-6">
          <QuickStats />
          <QuickActions onReportItem={onReportItem} onSearch={onSearch} />
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Archive</h3>
            <ArchiveList items={archive} />
          </div>
        </div>
      </div>

      {/* Featured Items Section */}
      <FeaturedItems />
    </div>
  )
}

export default Dashboard
