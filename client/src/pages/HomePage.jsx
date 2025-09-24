import React, { useState, useEffect } from 'react'
import { getUserProfile, logoutUser, handleGoogleCallback, updatePhone } from '../api/auth_api'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import Navigation from '../components/layout/Navigation'
import Dashboard from '../components/dashboard/Dashboard'
import LandingPage from '../components/common/LandingPage'
import ReportModal from '../components/modals/ReportModal'
import { createObject } from '../api/object_api'
import { PhoneModal, SmartMatchesModal } from '../components/modals'
import '../components/ui/Animations.css'

const HomePage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportType, setReportType] = useState('lost') // 'lost' or 'found'
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [showSmartMatches, setShowSmartMatches] = useState(false)
  const [submittedItem, setSubmittedItem] = useState(null)

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

  // Check if user needs phone number after authentication
  useEffect(() => {
    if (user && (!user.phone || user.phone.trim().length === 0)) {
      setShowPhoneModal(true)
    } else if (user && user.phone && user.phone.trim().length > 0) {
      setShowPhoneModal(false)
    }
  }, [user])

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
      // Logged out successfully
    } catch (error) {
      console.error('❌ Logout failed:', error)
      // Logout failed
    }
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
      setSubmittedItem(payload)
      setShowSmartMatches(true)
      setRefreshKey((k) => k + 1)
    } catch (error) {
      console.error('Failed to create object:', error.response?.data?.message || error.message)
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
            key={refreshKey}
          />
        ) : (
          <LandingPage />
        )}
      </div>

      {/* Modals */}
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
            await checkUserAuth() // Refresh user data to get updated phone
          } catch (error) {
            // Re-throw error so PhoneModal can handle it
            throw error
          }
        }}
      />

      <SmartMatchesModal
        isOpen={showSmartMatches}
        onClose={() => setShowSmartMatches(false)}
        itemData={submittedItem}
      />

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 border-t border-gray-800">
        <p>&copy; 2024 SST Lost & Found. Helping communities reunite with their belongings.</p>
      </footer>
    </div>
  )
}

export default HomePage
