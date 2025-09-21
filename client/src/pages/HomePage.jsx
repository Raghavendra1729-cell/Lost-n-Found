import React, { useState, useEffect } from 'react'
import { getUserProfile, logoutUser, handleGoogleCallback } from '../api/auth_api'
import AnimatedBackground from '../components/AnimatedBackground'
import Navigation from '../components/Navigation'
import Dashboard from '../components/Dashboard'
import LandingPage from '../components/LandingPage'
import SearchModal from '../components/SearchModal'
import ReportModal from '../components/ReportModal'
import '../components/Animations.css'

const HomePage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('items') // 'items' or 'places'
  const [searchDate, setSearchDate] = useState('')
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportType, setReportType] = useState('lost') // 'lost' or 'found'

  useEffect(() => {
    // Handle Google OAuth callback first
    handleGoogleCallback()
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

  const handleReportSubmit = (e) => {
    e.preventDefault()
    console.log('Reporting', reportType, 'item')
    // TODO: Implement report functionality
    setShowReportModal(false)
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

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 border-t border-gray-800">
        <p>&copy; 2024 SST Lost & Found. Helping communities reunite with their belongings.</p>
      </footer>
    </div>
  )
}

export default HomePage
