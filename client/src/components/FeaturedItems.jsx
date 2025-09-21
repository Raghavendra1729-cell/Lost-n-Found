import React from 'react'

const FeaturedItems = () => {
  const featuredItems = [
    {
      id: 1,
      emoji: '📱',
      name: 'iPhone 13 Pro',
      location: 'Found in Central Park',
      status: 'Found',
      statusColor: 'bg-green-500/20 text-green-300'
    },
    {
      id: 2,
      emoji: '👛',
      name: 'Black Wallet',
      location: 'Lost at Mall',
      status: 'Lost',
      statusColor: 'bg-red-500/20 text-red-300'
    },
    {
      id: 3,
      emoji: '🎒',
      name: 'Red Backpack',
      location: 'Found at Library',
      status: 'Found',
      statusColor: 'bg-green-500/20 text-green-300'
    }
  ]

  return (
    <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="text-indigo-400 mr-3">⭐</span>
        Featured Items
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredItems.map((item) => (
          <div key={item.id} className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/30 text-center">
            <div className="text-4xl mb-4">{item.emoji}</div>
            <h3 className="text-white font-medium mb-2">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-3">{item.location}</p>
            <span className={`${item.statusColor} px-3 py-1 rounded-full text-xs`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedItems
