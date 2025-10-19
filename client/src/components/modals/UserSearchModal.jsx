import React, { useState, useEffect } from 'react'
import { searchUsers } from '../../api/user_api'
import { getOrCreateGlobalChat } from '../../api/chat_api'

const UserSearchModal = ({ isOpen, onClose, onChatStart }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (searchTerm.length >= 2) {
      setLoading(true)
      searchUsers(searchTerm)
        .then(response => {
          setUsers(response.users || [])
          setError('')
        })
        .catch(err => {
          setError('Failed to search users')
          setUsers([])
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setUsers([])
      setError('')
    }
  }, [searchTerm])

  const handleStartChat = async (user) => {
    try {
      setLoading(true)
      const response = await getOrCreateGlobalChat(user._id)
      onChatStart(response.chat, user)
      onClose()
    } catch (error) {
      setError('Failed to start chat')
      console.error('Start chat error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Search Users</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Users List */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Searching users...</p>
            </div>
          )}

          {!loading && users.length > 0 && (
            <div className="space-y-3">
              {users.map(user => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                  <button
                    onClick={() => handleStartChat(user)}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    Chat
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && searchTerm.length >= 2 && users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No users found matching "{searchTerm}"</p>
            </div>
          )}

          {!loading && searchTerm.length < 2 && (
            <div className="text-center py-8 text-gray-500">
              <p>Type at least 2 characters to search for users</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserSearchModal
