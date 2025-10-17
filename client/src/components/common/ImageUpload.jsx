import React, { useState, useRef } from 'react'
import { uploadImage } from '../../api/image_api'

const ImageUpload = ({ onImageSelect, onImageRemove, initialImage = null, disabled = false }) => {
  const [image, setImage] = useState(initialImage)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.match(/image\/(jpeg|jpg)/)) {
      setError('Only JPEG/JPG images are allowed')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setError('')
    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)

      // Upload to Cloudinary
      const response = await uploadImage(file)
      
      const imageData = {
        url: response.imageUrl,
        publicId: response.publicId,
        width: response.imageData.width,
        height: response.imageData.height,
        format: response.imageData.format,
        size: response.imageData.size
      }

      setImage(imageData)
      onImageSelect && onImageSelect(imageData)
    } catch (error) {
      console.error('Upload error:', error)
      setError(error.response?.data?.message || 'Failed to upload image')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setImage(null)
    setPreview(null)
    setError('')
    onImageRemove && onImageRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const fakeEvent = { target: { files: [file] } }
      handleFileSelect(fakeEvent)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  return (
    <div className="w-full">
      <label className="block text-gray-300 font-medium mb-2">
        Item Image <span className="text-gray-500">(Optional)</span>
      </label>
      
      {error && (
        <div className="mb-3 p-3 bg-red-900/30 border border-red-600/50 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        </div>
      )}

      {!image && !preview ? (
        <div
          className={`border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/5 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => !disabled && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-300 font-medium mb-1">Upload Item Image</p>
              <p className="text-gray-500 text-sm">Drag & drop or click to select</p>
              <p className="text-gray-600 text-xs mt-1">JPEG/JPG only, max 5MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative group">
            <img
              src={preview || image?.url}
              alt="Item preview"
              className="w-full h-48 object-cover rounded-xl border border-gray-600"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white text-sm">Uploading...</span>
                </div>
              </div>
            )}
            {!disabled && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {image && (
            <div className="mt-2 p-2 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{image.format?.toUpperCase()}</span>
                <span>•</span>
                <span>{image.width}×{image.height}</span>
                <span>•</span>
                <span>{(image.size / 1024).toFixed(1)}KB</span>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}

export default ImageUpload
