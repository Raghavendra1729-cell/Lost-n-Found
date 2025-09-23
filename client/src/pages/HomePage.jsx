import React, { useState, useEffect } from 'react'
import { getUserProfile, logoutUser, handleGoogleCallback, updatePhone } from '../api/auth_api'
import { AnimatedBackground, Navigation, Dashboard, LandingPage, SearchModal, ReportModal } from '../components'
import { createObject } from '../api/object_api'
import { PhoneModal } from '../components/modals'
import '../components/ui/Animations.css'

const HomePage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('items') // 'items' or 'places'
  const [searchDate, setSearchDate] = useState('')
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportType, setReportType] = useState('lost') // 'lost' or 'found'
  const [showPhoneModal, setShowPhoneModal] = useState(false)

  useEffect(() => {
    // Handle Google OAuth callback first
    const result = handleGoogleCallback()
    if (result?.auth === 'success' && result?.needsPhone) {
      setShowPhoneModal(true)
      // don't cleanup history yet to preserve behavior, caller can close modal
    }
    // Then check user authentication
    checkUserAuth()
  }, [])

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (user) {
      // User is logged in, redirect to dashboard or main app area
      // For now, we'll keep them on home but show different content
      console.log('✅ User is logged in:', user.name)
    }
  }, [user])

  const checkUserAuth = async () => {
    try {
      // 🔗 CONNECTING TO BACKEND: Get user profile
      console.log('🔄 Checking user authentication...')
      const data = await getUserProfile()
      setUser(data.user)
    } catch (error) {
      console.log('❌ User not authenticated:', error.response?.status)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      // 🔗 CONNECTING TO BACKEND: Logout API
      console.log('🔄 Logging out user...')
      await logoutUser()
      setUser(null)
      alert('Logged out successfully!')
    } catch (error) {
      console.error('❌ Logout failed:', error)
      alert('Logout failed. Please try again.')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', { searchQuery, searchType, searchDate })
    // TODO: Implement search functionality
    setShowSearchModal(false)
  }

  const handleReportItem = (type) => {
    setReportType(type)
    setShowReportModal(true)
  }

  const [refreshKey, setRefreshKey] = useState(0)

  const handleReportSubmit = async (payload) => {
    try {
      const data = {
        ...payload,
        date: payload.date ? new Date(payload.date).toISOString() : new Date().toISOString()
      }
      await createObject(data)
      setShowReportModal(false)
      setRefreshKey((k) => k + 1)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create object')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navigation user={user} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="relative z-10 py-20 px-4">
        {user ? (
          <Dashboard 
            user={user} 
            onReportItem={handleReportItem} 
            onSearch={() => setShowSearchModal(true)} 
            key={refreshKey}
          />
        ) : (
          <LandingPage onSearch={() => setShowSearchModal(true)} />
        )}
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
        onSearch={handleSearch}
      />

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        reportType={reportType}
        onSubmit={handleReportSubmit}
      />

      <PhoneModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSubmit={async (phone) => {
          try {
            await updatePhone(phone)
            setShowPhoneModal(false)
            await checkUserAuth()
          } catch (e) {
            alert('Failed to save phone. Please try again.')
          }
        }}
      />

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 border-t border-gray-800">
        <p>&copy; 2024 SST Lost & Found. Helping communities reunite with their belongings.</p>
      </footer>
    </div>
  )
}

export default HomePage
