import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser, googleAuth } from '../api/auth_api'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // 🔗 CONNECTING TO BACKEND: Login API
      console.log('🔄 Calling loginUser API...')
      const data = await loginUser(formData)
      
      console.log('✅ Login successful:', data)
      // Redirect to home page
      window.location.href = '/'
      
    } catch (error) {
      console.error('❌ Login failed:', error)
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.'
      console.error('Login error:', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // 🔗 CONNECTING TO BACKEND: Google OAuth API
    console.log('🔄 Redirecting to Google OAuth...')
    googleAuth()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Futuristic Background Animation */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full animate-grid-pulse" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px'
          }}></div>
        </div>

        {/* Grid Intersection Lights */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-blink-fast"></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-blink-fast animation-delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-blink-fast animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-blink-fast animation-delay-1500"></div>
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-cyan-300 rounded-full animate-blink-fast animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-indigo-300 rounded-full animate-blink-fast animation-delay-2500"></div>

        {/* Grid Line Animations */}
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-grid-line"></div>
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-grid-line animation-delay-2000"></div>
        <div className="absolute top-0 left-1/3 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent animate-grid-line animation-delay-1000"></div>
        <div className="absolute top-0 right-1/3 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent animate-grid-line animation-delay-3000"></div>

        {/* Animated Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-500/15 rounded-full blur-xl animate-pulse-fast"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse-fast animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-indigo-500/25 rounded-full blur-lg animate-pulse-fast animation-delay-2000"></div>

        {/* Floating Light Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-float-light"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-float-light animation-delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-indigo-400 rounded-full animate-float-light animation-delay-2000"></div>

        {/* Light Beams */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/15 to-transparent animate-light-beam"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent animate-light-beam animation-delay-3000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-2 sm:p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <Link to="/" className="text-white text-xl sm:text-2xl font-semibold">
              Lost & Found
            </Link>
            <p className="text-gray-400 mt-2 sm:mt-3 text-sm sm:text-base">Welcome back! Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-300 font-medium text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400 text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-gray-900 text-gray-400">or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gray-800 border border-gray-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <span>Continue with Google</span>
          </button>

          {/* Register Link */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-gray-400 text-sm sm:text-base">
              Don't have an account?{' '}
              <Link to="/register" className="text-white font-medium hover:underline transition-colors">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4 sm:mt-6">
            <Link to="/" className="text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
              <span>←</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes pulse-fast {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes float-light {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(8px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-8px) translateX(-4px);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-20px) translateX(12px);
            opacity: 0.8;
          }
        }
        
        @keyframes light-beam {
          0%, 100% {
            opacity: 0;
            transform: scaleY(0);
          }
          50% {
            opacity: 0.8;
            transform: scaleY(1);
          }
        }
        
        @keyframes grid-pulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.2;
          }
        }
        
        @keyframes blink-fast {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        @keyframes grid-line {
          0%, 100% {
            opacity: 0;
            transform: scaleX(0);
          }
          50% {
            opacity: 0.6;
            transform: scaleX(1);
          }
        }
        
        .animate-pulse-fast {
          animation: pulse-fast 3s ease-in-out infinite;
        }
        
        .animate-float-light {
          animation: float-light 5s ease-in-out infinite;
        }
        
        .animate-light-beam {
          animation: light-beam 4s ease-in-out infinite;
        }
        
        .animate-grid-pulse {
          animation: grid-pulse 4s ease-in-out infinite;
        }
        
        .animate-blink-fast {
          animation: blink-fast 1.5s ease-in-out infinite;
        }
        
        .animate-grid-line {
          animation: grid-line 5s ease-in-out infinite;
        }
        
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animation-delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  )
}

export default LoginPage

