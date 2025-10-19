import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="relative z-10 bg-black/20 backdrop-blur-md border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-white text-lg sm:text-xl font-semibold truncate">
            SST Lost and Found
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2 lg:space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 px-2 lg:px-4 py-2 text-sm lg:text-base truncate max-w-32 lg:max-w-none">
                  Welcome, {user.name}!
                </span>
                <Link 
                  to="/profile" 
                  className="text-gray-300 px-3 lg:px-4 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200 text-sm lg:text-base"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 px-3 lg:px-4 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200 text-sm lg:text-base"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-300 px-3 lg:px-4 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200 text-sm lg:text-base"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-black px-3 lg:px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium text-sm lg:text-base"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-800/50 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700/30 bg-black/30 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <div className="text-gray-300 px-3 py-2 text-sm border-b border-gray-700/30">
                    Welcome, {user.name}!
                  </div>
                  <Link 
                    to="/profile" 
                    className="block text-gray-300 px-3 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left text-gray-300 px-3 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block text-gray-300 px-3 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block bg-white text-black px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
