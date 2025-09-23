import React from 'react'

const ArchiveList = ({ items }) => {
  const archived = items.filter((it) => it.status === 'resolved')
  return (
    <div className="space-y-3">
      {archived.map((it) => (
        <div key={it._id} className="border border-gray-800 rounded p-3">
          <div className="flex gap-3">
            <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-semibold">{it.name}</div>
              <div className="text-gray-400">{it.type} — {it.location} — {new Date(it.date).toLocaleDateString()}</div>
              <div className="text-gray-500">{it.description}</div>
            </div>
          </div>
        </div>
      ))}
      {archived.length === 0 && <div className="text-gray-500">No archived items</div>}
    </div>
  )
}

export default ArchiveList


