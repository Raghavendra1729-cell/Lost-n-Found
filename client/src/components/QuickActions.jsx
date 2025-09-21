import React from 'react'

const QuickActions = ({ onReportItem, onSearch }) => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={() => onReportItem('lost')}
          className="w-full bg-red-500/20 text-red-300 px-4 py-3 rounded-lg font-medium hover:bg-red-500/30 transition-colors duration-200 text-left"
        >
          🔍 Report Lost Item
        </button>
        <button 
          onClick={() => onReportItem('found')}
          className="w-full bg-green-500/20 text-green-300 px-4 py-3 rounded-lg font-medium hover:bg-green-500/30 transition-colors duration-200 text-left"
        >
          📢 Report Found Item
        </button>
        <button 
          onClick={onSearch}
          className="w-full bg-blue-500/20 text-blue-300 px-4 py-3 rounded-lg font-medium hover:bg-blue-500/30 transition-colors duration-200 text-left"
        >
          🔎 Search Items
        </button>
      </div>
    </div>
  )
}

export default QuickActions
