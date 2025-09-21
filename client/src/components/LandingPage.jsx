import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = ({ onSearch }) => {
  return (
    <div className="text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
        <span className="inline-block hover:text-blue-300 transition-colors duration-300">Lost</span> Something?
        <br />
        <span className="inline-block hover:text-cyan-300 transition-colors duration-300">Found</span> Something?
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
        Connect with your community to recover lost items or help others find what they've lost.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/register" 
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
        >
          Get Started
        </Link>
        <button 
          onClick={onSearch}
          className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
        >
          Browse Items
        </button>
      </div>
    </div>
  )
}

export default LandingPage
