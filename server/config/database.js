import mongoose from 'mongoose'
import logger from '../utils/logger.js'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lost-found-app')
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`)
    
    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err)
    })
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected')
    })
    
    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected')
    })
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      logger.info('MongoDB connection closed through app termination')
      process.exit(0)
    })
    
    return conn
  } catch (error) {
    logger.error('Database connection failed:', error)
    process.exit(1)
  }
}

export default connectDB
