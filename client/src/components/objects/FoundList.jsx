import React from 'react'

const FoundList = ({ items, onMatches, onArchive, onDelete, matches }) => {
  const found = items.filter((it) => it.type === 'found' && it.status !== 'resolved')
  return (
    <div className="space-y-3">
      {found.map((it) => (
        <div key={it._id} className="border border-gray-800 rounded p-3">
          <div className="flex gap-3">
            <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-semibold">{it.name}</div>
              <div className="text-gray-400">{it.location} — {new Date(it.date).toLocaleDateString()}</div>
              <div className="text-gray-500">{it.description}</div>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <button onClick={() => onMatches(it._id)} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">Check owner matches</button>
            {it.status === 'active' && <button onClick={() => onArchive(it._id)} className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500">Archive</button>}
            <button onClick={() => onDelete(it._id)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500">Delete</button>
          </div>
          {matches[it._id] && (
            <div className="mt-2 border-t border-gray-800 pt-2">
              <div className="text-sm text-gray-400">Potential owners ({matches[it._id].length}):</div>
              <div className="divide-y divide-gray-800">
                {matches[it._id].map((m) => (
                  <div key={m._id} className="py-2">
                    <div className="font-medium">{m.name}</div>
                    <div className="text-gray-400">{m.location} — {new Date(m.date).toLocaleDateString()}</div>
                    <div className="text-gray-500">{m.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FoundList


