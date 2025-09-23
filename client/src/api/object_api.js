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

export default {
  createObject,
  getMyObjects,
  getMyArchive,
  getObjectMatches,
  updateObject,
  updateObjectStatus,
  deleteObject
}


