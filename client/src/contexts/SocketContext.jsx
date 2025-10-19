import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // Initialize socket connection
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    const socketHost = apiBase.replace(/\/$/, '').replace(/\/api$/, '')
    const newSocket = io(socketHost, {
      withCredentials: true,
      transports: ['websocket']
    })

    newSocket.on('connect', () => {
      console.log('✅ Connected to chat server')
      setConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from chat server')
      setConnected(false)
    })

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
      setConnected(false)
    })

    setSocket(newSocket)

    // Cleanup on unmount
    return () => {
      newSocket.close()
    }
  }, [])

  const value = {
    socket,
    connected
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
