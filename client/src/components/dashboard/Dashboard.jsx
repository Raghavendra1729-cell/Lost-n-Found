import React from 'react'
import RecentActivity from './RecentActivity'
import QuickStats from './QuickStats'
import QuickActions from './QuickActions'
import FeaturedItems from './FeaturedItems'

const Dashboard = ({ user, onReportItem, onSearch }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          SST Lost and Found
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Welcome back, <span className="text-blue-300 font-semibold">{user.name}</span>! 
          Manage your lost and found items.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Left Column - Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Right Column - Quick Stats and Actions */}
        <div className="space-y-6">
          <QuickStats />
          <QuickActions onReportItem={onReportItem} onSearch={onSearch} />
        </div>
      </div>

      {/* Featured Items Section */}
      <FeaturedItems />
    </div>
  )
}

export default Dashboard
