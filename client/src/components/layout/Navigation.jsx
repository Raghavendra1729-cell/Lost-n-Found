import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout, onChatClick }) => {
  return (
    <nav className="relative z-10 bg-black/20 backdrop-blur-md border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-xl font-semibold">
            SST Lost and Found
          </Link>
          <div className="flex space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 px-4 py-2">
                  Welcome, {user.name}!
                </span>
                <button
                  onClick={onChatClick}
                  className="text-gray-300 px-4 py-2 rounded-md hover:text-white hover:bg-gray-800/50 transition-colors duration-200 flex items-center gap-2"
                  title="Open Chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                </button>
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
  )
}

export default Navigation
