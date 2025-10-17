import React from 'react'
import { getImageUrl } from '../../utils/imageUtils'

const LostList = ({ items, onMatches, onArchive, onDelete, matches }) => {
  return (
    <div className="space-y-4">
      {items.map((it) => (
        <div key={it._id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 professional-bg">
          <div className="flex gap-4">
            <img src={getImageUrl(it.image)} alt={it.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <div className="font-semibold text-white text-lg">{it.name}</div>
              <div className="text-gray-400 text-sm">{it.location} — {new Date(it.date).toLocaleDateString()}</div>
              <div className="text-gray-500 text-sm mt-1">{it.description}</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button 
              onClick={() => onMatches(it._id)} 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 card-hover"
            >
              Check Matches
            </button>
            {it.status === 'active' && (
              <button 
                onClick={() => onArchive(it._id)} 
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 card-hover"
              >
                Archive
              </button>
            )}
            <button 
              onClick={() => onDelete(it._id)} 
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 card-hover"
            >
              Delete
            </button>
          </div>
          {matches[it._id] && (
            <div className="mt-4 border-t border-gray-600/50 pt-4">
              <div className="text-sm font-medium text-gray-300 mb-3 professional-text-shadow">Matches ({matches[it._id].length}):</div>
              <div className="space-y-3">
                {matches[it._id].map((m) => (
                  <div key={m._id} className="flex gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
                    <img src={getImageUrl(m.image)} alt={m.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-white">{m.name}</div>
                      <div className="text-xs text-gray-400">{m.location} — {new Date(m.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500 mt-1">{m.description}</div>
                    </div>
                    <button className="px-3 py-1 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                      Contact
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">No lost items found</div>
          <div className="text-gray-600 text-sm mt-2">Report a lost item to get started</div>
        </div>
      )}
    </div>
  )
}

export default LostList


