import api from './auth_api'

export const createObject = async (data) => {
  const res = await api.post('/objects', data)
  return res.data
}

export const getMyObjects = async (params = {}) => {
  const res = await api.get('/objects/me', { params })
  return res.data
}

export const getMyArchive = async () => {
  const res = await api.get('/objects/me/archive')
  return res.data
}

export const getObjectMatches = async (id) => {
  const res = await api.get(`/objects/${id}/matches`)
  return res.data
}

export const updateObject = async (id, data) => {
  const res = await api.patch(`/objects/${id}`, data)
  return res.data
}

export const updateObjectStatus = async (id, status) => {
  const res = await api.patch(`/objects/${id}/status`, { status })
  return res.data
}

export const deleteObject = async (id) => {
  await api.delete(`/objects/${id}`)
}

export const searchObjects = async (params = {}) => {
  const res = await api.get('/objects/search', { params })
  return res.data
}

export const getSmartMatches = async (params = {}) => {
  const res = await api.get('/objects/smart-matches', { params })
  return res.data
}

export const getAllObjects = async () => {
  try {
    const response = await api.get('/objects/all')
    return response.data
  } catch (error) {
    console.error('Failed to fetch all objects:', error)
    throw error
  }
}

export default {
  createObject,
  getMyObjects,
  getAllObjects,
  getMyArchive,
  getObjectMatches,
  updateObject,
  updateObjectStatus,
  deleteObject,
  searchObjects,
  getSmartMatches
}


