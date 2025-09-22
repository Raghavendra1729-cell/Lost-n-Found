import React from 'react'

const RecentActivity = () => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="text-cyan-400 mr-3">📊</span>
        Recent Activity
      </h2>
      <div className="space-y-4">
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">No recent activity</p>
              <p className="text-gray-400 text-sm">Start by reporting a lost or found item</p>
            </div>
            <div className="text-gray-500">—</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentActivity
