import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
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
