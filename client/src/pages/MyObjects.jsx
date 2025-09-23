import React, { useEffect, useState } from 'react'
import { getMyObjects, createObject, getObjectMatches, updateObjectStatus, deleteObject } from '../api/object_api'
import { UploadForm, SearchBar, LostList, FoundList, ArchiveList } from '../components/objects'

const MyObjects = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [matches, setMatches] = useState({})
  const [query, setQuery] = useState({ text: '', location: '', type: 'all' })

  const load = async () => {
    const { results } = await getMyObjects()
    setItems(results)
  }

  useEffect(() => { load() }, [])

  const onSubmit = async (form) => {
    setLoading(true)
    try {
      const { object, matches } = await createObject(form)
      await load()
      setMatches((m) => ({ ...m, [object._id]: matches }))
      alert(`Created. Found ${matches.length} possible matches.`)
    } catch (e) {
      alert(e.response?.data?.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  const onShowMatches = async (id) => {
    const { matches } = await getObjectMatches(id)
    setMatches((m) => ({ ...m, [id]: matches }))
  }

  const onResolve = async (id) => {
    await updateObjectStatus(id, 'resolved')
    await load()
  }

  const onDelete = async (id) => {
    await deleteObject(id)
    await load()
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">My Lost & Found</h2>

      <UploadForm onSubmit={onSubmit} loading={loading} />
      <SearchBar query={query} onChange={setQuery} onSearch={load} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Lost Items</h3>
          <LostList items={items} matches={matches} onMatches={onShowMatches} onArchive={onResolve} onDelete={onDelete} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Found Items</h3>
          <FoundList items={items} matches={matches} onMatches={onShowMatches} onArchive={onResolve} onDelete={onDelete} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-200">Archive</h3>
        <ArchiveList items={items} />
      </div>
    </div>
  )
}

export default MyObjects


