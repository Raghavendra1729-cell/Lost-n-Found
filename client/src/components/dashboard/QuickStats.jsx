import React from 'react'

const QuickStats = () => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Items Reported</span>
          <span className="text-blue-400 font-bold">0</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Items Found</span>
          <span className="text-green-400 font-bold">0</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Success Rate</span>
          <span className="text-cyan-400 font-bold">—</span>
        </div>
      </div>
    </div>
  )
}

export default QuickStats
