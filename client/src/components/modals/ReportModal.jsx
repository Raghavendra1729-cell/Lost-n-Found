import React, { useState, useEffect } from 'react'
import ImageUpload from '../common/ImageUpload'

const ReportModal = ({ 
  isOpen, 
  onClose, 
  reportType, 
  onSubmit 
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [imageData, setImageData] = useState(null)
  const [errors, setErrors] = useState({})

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('')
      setDescription('')
      setLocation('')
      setDate('')
      setImageData(null)
      setErrors({})
    }
  }, [isOpen])

  // Remove live matches checking during form filling
  // Matches will be shown after form submission in SmartMatchesModal

  const validateForm = () => {
    const newErrors = {}
    
    if (!name.trim()) {
      newErrors.name = 'Item name is required'
    }
    
    if (!location.trim()) {
      newErrors.location = 'Location is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      location: location.trim(),
      date,
      imageData,
      type: reportType
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-4xl border border-gray-700 professional-bg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white professional-text professional-text-shadow">
              Report {reportType === 'lost' ? 'Lost' : 'Found'} Item
            </h2>
            <p className="text-gray-400 mt-2">Fill in the details and we'll find potential matches after submission</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors duration-300"
          >
            ×
          </button>
        </div>

        {/* Matches will be shown after form submission */}
        
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-600/50 rounded-xl">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-400 font-medium">Please fill in all required fields</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Item Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., iPhone 13, Black Wallet, Red Backpack"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) {
                  setErrors(prev => ({ ...prev, name: null }))
                }
              }}
              className={`w-full px-6 py-4 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 professional-border ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Description <span className="text-gray-500 text-sm ml-2">(Optional)</span>
            </label>
            <textarea
              placeholder="Describe the item in detail - color, brand, unique features..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-300 cyber-border"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Where did you lose/find it?"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value)
                  if (errors.location) {
                    setErrors(prev => ({ ...prev, location: null }))
                  }
                }}
                className={`w-full px-6 py-4 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 professional-border ${
                  errors.location ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.location && (
                <p className="text-red-400 text-sm mt-1">{errors.location}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Date <span className="text-gray-500 text-sm ml-2">(Optional)</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300 cyber-border"
              />
            </div>
          </div>

          <ImageUpload
            onImageSelect={setImageData}
            onImageRemove={() => setImageData(null)}
            initialImage={imageData}
          />
          
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Contact Information <span className="text-gray-500 text-sm ml-2">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Your phone number or email for contact"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 professional-border"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 animate-professional-pulse card-hover ${
                reportType === 'lost' 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/25' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:shadow-green-500/25'
              }`}
            >
              🚀 Report {reportType === 'lost' ? 'Lost' : 'Found'} Item
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700/50 text-white py-4 rounded-xl font-bold hover:bg-gray-600/50 transition-all duration-300 border border-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportModal
