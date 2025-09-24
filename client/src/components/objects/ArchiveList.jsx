import React from 'react'

const ArchiveList = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((it) => (
        <div key={it._id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 professional-bg">
          <div className="flex gap-4">
            <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <div className="font-semibold text-white text-lg">{it.name}</div>
              <div className="text-gray-400 text-sm capitalize">{it.type} — {it.location} — {new Date(it.date).toLocaleDateString()}</div>
              <div className="text-gray-500 text-sm mt-1">{it.description}</div>
              <div className="mt-2">
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-medium rounded-full">
                  Resolved
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">No archived items</div>
          <div className="text-gray-600 text-sm mt-2">Resolved items will appear here</div>
        </div>
      )}
    </div>
  )
}

export default ArchiveList


