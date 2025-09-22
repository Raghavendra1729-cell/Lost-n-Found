import React, { useState, useEffect } from 'react'
import { getUserProfile } from '../../api/auth_api'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      console.log('🔄 Fetching user profile...')
      const userData = await getUserProfile()
      console.log('✅ User profile data:', userData)
      setUser(userData.user)
      setError(null)
    } catch (err) {
      console.error('❌ Error fetching user profile:', err)
      console.error('❌ Error response:', err.response?.data)
      console.error('❌ Error status:', err.response?.status)
      setError(`Failed to load user profile: ${err.response?.data?.message || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      // Import logout function dynamically to avoid circular imports
      const { logoutUser } = await import('../../api/auth_api')
      await logoutUser()
      setUser(null)
      window.location.href = '/'
    } catch (err) {
      console.error('Logout error:', err)
      alert('Logout failed. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchUserProfile}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">No user data found</p>
          <a href="/login" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Futuristic Background Animation */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full animate-grid-pulse" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px'
          }}></div>
        </div>

        {/* Grid Intersection Lights */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-blink-fast"></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-blink-fast animation-delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-blink-fast animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-blink-fast animation-delay-1500"></div>
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-cyan-300 rounded-full animate-blink-fast animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-indigo-300 rounded-full animate-blink-fast animation-delay-2500"></div>

        {/* Animated Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-500/15 rounded-full blur-xl animate-pulse-fast"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse-fast animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-indigo-500/25 rounded-full blur-lg animate-pulse-fast animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">Welcome to Lost & Found!</h1>
            <p className="text-gray-400">Your profile has been successfully loaded</p>
          </div>

          {/* Success Message */}
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="text-green-400 text-2xl mr-3">✅</div>
              <div>
                <h3 className="text-green-400 font-semibold">Authentication Successful!</h3>
                <p className="text-green-300 text-sm">You are now logged in to your account.</p>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-600">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
              <span className="text-blue-400 mr-2">👤</span>
              User Profile
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-sm font-medium">Full Name</label>
                <div className="bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
                  <p className="text-white font-medium">{user.name || 'Not provided'}</p>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-sm font-medium">Email Address</label>
                <div className="bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
                  <p className="text-white font-medium">{user.email || 'Not provided'}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-sm font-medium">Phone Number</label>
                <div className="bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
                  <p className="text-white font-medium">{user.phone || 'Not provided'}</p>
                </div>
              </div>

              {/* Auth Type */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-sm font-medium">Authentication Method</label>
                <div className="bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
                  <p className="text-white font-medium flex items-center">
                    {user.isGoogleAuth ? (
                      <>
                        <span className="text-blue-400 mr-2">🔗</span>
                        Google OAuth
                      </>
                    ) : (
                      <>
                        <span className="text-green-400 mr-2">🔐</span>
                        Email & Password
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* User ID */}
            <div className="mt-6 space-y-2">
              <label className="block text-gray-400 text-sm font-medium">User ID</label>
              <div className="bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
                <p className="text-gray-300 text-sm font-mono break-all">{user._id}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>🚪</span>
              Logout
            </button>
            
            <a
              href="/"
              className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>🏠</span>
              Go to Home
            </a>
          </div>

          {/* Refresh Button */}
          <div className="text-center mt-6">
            <button
              onClick={fetchUserProfile}
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 mx-auto"
            >
              <span>🔄</span>
              Refresh Profile Data
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes pulse-fast {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes blink-fast {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        @keyframes grid-pulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.2;
          }
        }
        
        .animate-pulse-fast {
          animation: pulse-fast 3s ease-in-out infinite;
        }
        
        .animate-blink-fast {
          animation: blink-fast 1.5s ease-in-out infinite;
        }
        
        .animate-grid-pulse {
          animation: grid-pulse 4s ease-in-out infinite;
        }
        
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
      `}</style>
    </div>
  )
}

export default UserProfile
