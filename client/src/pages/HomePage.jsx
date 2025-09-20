import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserProfile, logoutUser, handleGoogleCallback } from '../api/auth_api'

const HomePage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Futuristic Background Animation */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="h-full w-full animate-grid-pulse" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px'
          }}></div>
        </div>

        {/* Grid Intersection Lights */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-blink-fast"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-blink-fast animation-delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-blink-fast animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-blink-fast animation-delay-1500"></div>
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-cyan-300 rounded-full animate-blink-fast animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-indigo-300 rounded-full animate-blink-fast animation-delay-2500"></div>
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-blue-500 rounded-full animate-blink-fast animation-delay-3000"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-cyan-500 rounded-full animate-blink-fast animation-delay-3500"></div>

        {/* Grid Line Animations */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-grid-line"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-grid-line animation-delay-2000"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent animate-grid-line animation-delay-4000"></div>
        <div className="absolute top-0 left-1/4 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/40 to-transparent animate-grid-line animation-delay-1000"></div>
        <div className="absolute top-0 left-1/2 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-grid-line animation-delay-3000"></div>
        <div className="absolute top-0 right-1/4 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/35 to-transparent animate-grid-line animation-delay-5000"></div>

        {/* Animated Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse-fast"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-cyan-400/30 rounded-full blur-lg animate-pulse-fast animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-indigo-500/15 rounded-full blur-2xl animate-pulse-fast animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-300/40 rounded-full blur-md animate-pulse-fast animation-delay-3000"></div>

        {/* Floating Light Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float-light"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-float-light animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-indigo-400 rounded-full animate-float-light animation-delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-blue-300 rounded-full animate-float-light animation-delay-3000"></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-cyan-400 rounded-full animate-float-light animation-delay-4000"></div>

        {/* Light Beams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-light-beam"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-light-beam animation-delay-2000"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent animate-light-beam animation-delay-4000"></div>

        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-scan-line"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scan-line animation-delay-3000"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent animate-scan-line animation-delay-6000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-black/20 backdrop-blur-md border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-white text-xl font-semibold">
              Lost & Found
            </Link>
            <div className="flex space-x-4">
              {user ? (
                <>
                  <span className="text-gray-300 px-4 py-2">
                    Welcome, {user.name}!
                  </span>
                  <Link 
                    to="/profile" 
                    className="text-gray-300 px-4 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 px-4 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-300 px-4 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-24 px-4">
        {user ? (
          // Logged in user content
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Welcome back, <span className="text-blue-300">{user.name}</span>!
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Ready to help your community find lost items or report something you found?
            </p>
            <div className="animate-fade-in-up animation-delay-500 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                Report Lost Item
              </button>
              <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                Report Found Item
              </button>
              <Link 
                to="/profile" 
                className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                View Profile
              </Link>
            </div>
          </div>
        ) : (
          // Not logged in user content
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="inline-block hover:text-blue-300 transition-colors duration-300">Lost</span> Something?
              <br />
              <span className="inline-block hover:text-cyan-300 transition-colors duration-300">Found</span> Something?
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with your community to recover lost items or help others find what they've lost.
            </p>
            <div className="animate-fade-in-up animation-delay-1000 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </Link>
              <button className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                Browse Items
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-black/20 backdrop-blur-md py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              How It <span className="text-cyan-300">Works</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up animation-delay-500 bg-gray-800/50 backdrop-blur-md p-8 rounded-lg text-center border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">📱</div>
              <h3 className="text-white text-xl font-semibold mb-4 group-hover:text-blue-300 transition-colors duration-300">Report Lost Item</h3>
              <p className="text-gray-300 leading-relaxed">Create a detailed report with photos and location to help others identify your item.</p>
            </div>
            
            <div className="animate-fade-in-up animation-delay-1000 bg-gray-800/50 backdrop-blur-md p-8 rounded-lg text-center border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🔍</div>
              <h3 className="text-white text-xl font-semibold mb-4 group-hover:text-cyan-300 transition-colors duration-300">Search & Match</h3>
              <p className="text-gray-300 leading-relaxed">Browse found items or use our smart matching system to find potential matches.</p>
            </div>
            
            <div className="animate-fade-in-up animation-delay-1500 bg-gray-800/50 backdrop-blur-md p-8 rounded-lg text-center border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🤝</div>
              <h3 className="text-white text-xl font-semibold mb-4 group-hover:text-indigo-300 transition-colors duration-300">Connect & Reunite</h3>
              <p className="text-gray-300 leading-relaxed">Contact directly through our secure messaging system to arrange pickup.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Items Found" },
              { number: "5K+", label: "Happy Users" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 border-t border-gray-800">
        <p>&copy; 2024 Lost & Found. Helping communities reunite with their belongings.</p>
      </footer>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-fast {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        @keyframes float-light {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.9;
          }
        }
        
        @keyframes light-beam {
          0%, 100% {
            opacity: 0;
            transform: scaleY(0);
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        
        @keyframes scan-line {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes grid-pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
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
        
        @keyframes grid-line {
          0%, 100% {
            opacity: 0;
            transform: scaleX(0);
          }
          50% {
            opacity: 0.8;
            transform: scaleX(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-fast {
          animation: pulse-fast 2s ease-in-out infinite;
        }
        
        .animate-float-light {
          animation: float-light 4s ease-in-out infinite;
        }
        
        .animate-light-beam {
          animation: light-beam 3s ease-in-out infinite;
        }
        
        .animate-scan-line {
          animation: scan-line 6s linear infinite;
        }
        
        .animate-grid-pulse {
          animation: grid-pulse 3s ease-in-out infinite;
        }
        
        .animate-blink-fast {
          animation: blink-fast 1.5s ease-in-out infinite;
        }
        
        .animate-grid-line {
          animation: grid-line 4s ease-in-out infinite;
        }
        
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-3500 { animation-delay: 3.5s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-5000 { animation-delay: 5s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  )
}

export default HomePage
