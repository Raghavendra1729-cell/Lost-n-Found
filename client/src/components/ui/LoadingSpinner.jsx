import React from 'react'

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizeClasses[size]}`}></div>
        {text && <p className="text-gray-400 text-sm">{text}</p>}
      </div>
    </div>
  )
}

export default LoadingSpinner
