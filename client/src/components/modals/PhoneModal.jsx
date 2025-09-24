import React, { useState, useEffect } from 'react'

const PhoneModal = ({ isOpen, onClose, onSubmit }) => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setPhone('')
      setError('')
      setLoading(false)
    }
  }, [isOpen])

  const validatePhone = (phoneNumber) => {
    if (!phoneNumber.trim()) {
      return 'Phone number is required'
    }
    if (!/^\d+$/.test(phoneNumber)) {
      return 'Phone number must contain only digits'
    }
    if (phoneNumber.length !== 10) {
      return 'Phone number must be exactly 10 digits'
    }
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const validationError = validatePhone(phone)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      await onSubmit(phone)
      // Modal will be closed by parent component on success
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save phone number'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md text-gray-100 professional-bg">
        <h2 className="text-2xl font-bold mb-2 professional-text-shadow">Add Mobile Number</h2>
        <p className="text-sm text-gray-400 mb-6">We need your mobile number to complete your registration.</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-600/50 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">
              Mobile Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 professional-border ${
                error ? 'border-red-500' : 'border-gray-600'
              }`}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (error) setError('') // Clear error when user starts typing
              }}
              maxLength="10"
            />
            <p className="text-xs text-gray-500 mt-1">Enter your 10-digit mobile number (digits only)</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 border border-gray-600"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || !phone.trim()} 
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PhoneModal


