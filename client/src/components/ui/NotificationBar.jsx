import React from 'react'
import { useNotification } from '../../contexts/NotificationContext'

const NotificationBar = () => {
  const { notifications, removeNotification } = useNotification()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-green-900/90 border-green-600/50 text-green-100'
              : notification.type === 'error'
              ? 'bg-red-900/90 border-red-600/50 text-red-100'
              : notification.type === 'warning'
              ? 'bg-yellow-900/90 border-yellow-600/50 text-yellow-100'
              : 'bg-blue-900/90 border-blue-600/50 text-blue-100'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {notification.title && (
                <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
              )}
              <p className="text-sm">{notification.message}</p>
              {notification.sender && (
                <p className="text-xs mt-1 opacity-75">From: {notification.sender}</p>
              )}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationBar
