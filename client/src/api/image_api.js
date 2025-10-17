import api from './auth_api.js'

// Upload image to Cloudinary
export const uploadImage = async (file) => {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    console.error('Image upload error:', error)
    throw error
  }
}

// Delete image from Cloudinary
export const deleteImage = async (publicId) => {
  try {
    const response = await api.delete(`/images/delete/${publicId}`)
    return response.data
  } catch (error) {
    console.error('Image deletion error:', error)
    throw error
  }
}

// Get transformed image URL
export const getImageUrl = async (publicId, transformations = {}) => {
  try {
    const params = new URLSearchParams()
    Object.entries(transformations).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })

    const response = await api.get(`/images/url/${publicId}?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error('Get image URL error:', error)
    throw error
  }
}

export default {
  uploadImage,
  deleteImage,
  getImageUrl
}
