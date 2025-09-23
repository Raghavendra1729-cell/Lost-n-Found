import React, { useState } from 'react'

const PhoneModal = ({ isOpen, onClose, onSubmit }) => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return
    setLoading(true)
    try {
      await onSubmit(phone)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md text-gray-100">
        <h2 className="text-xl font-semibold mb-4">Add your mobile number</h2>
        <p className="text-sm text-gray-400 mb-4">We need your mobile number to complete your registration.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700">Cancel</button>
            <button type="submit" disabled={loading || !phone.trim()} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PhoneModal


