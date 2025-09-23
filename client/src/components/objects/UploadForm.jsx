import React, { useState } from 'react'

const initialState = { name: '', description: '', image: '', type: 'lost', location: '', date: '' }

const UploadForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit(form)
    setForm(initialState)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
      </div>
      <textarea className="px-3 py-2 rounded bg-gray-800 border border-gray-700" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 w-max">{loading ? 'Saving...' : 'Create'}</button>
    </form>
  )
}

export default UploadForm


