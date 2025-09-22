import React from 'react'

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px'
          }}
        />
      </div>

      {/* Glowing Grid Lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent animate-glow-horizontal" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent animate-glow-horizontal animation-delay-4000" />
      <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent animate-glow-horizontal animation-delay-8000" />
      
      <div className="absolute top-0 left-1/4 bottom-0 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent animate-glow-vertical" />
      <div className="absolute top-0 left-1/2 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent animate-glow-vertical animation-delay-3000" />
      <div className="absolute top-0 right-1/4 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent animate-glow-vertical animation-delay-6000" />

      {/* Pulsating Orbs */}
      <div className="absolute top-1/8 left-1/8 w-32 h-32 bg-blue-400/14 rounded-full blur-lg animate-pulse-orb" />
      <div className="absolute bottom-1/8 right-1/8 w-30 h-30 bg-yellow-500/14 rounded-full blur-lg animate-pulse-orb-slow" />

      {/* Floating Particles */}
      <div className="absolute top-1/6 left-1/4 w-0.5 h-0.5 bg-blue-400 rounded-full animate-particle-float" />
      <div className="absolute top-1/3 right-1/5 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-particle-float animation-delay-2000" />
      <div className="absolute bottom-1/3 left-1/6 w-0.5 h-0.5 bg-white rounded-full animate-particle-float animation-delay-4000" />
      <div className="absolute top-2/3 left-1/2 w-0.5 h-0.5 bg-blue-500 rounded-full animate-particle-float animation-delay-6000" />
      <div className="absolute bottom-1/5 right-1/3 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-particle-float animation-delay-8000" />
      <div className="absolute top-1/4 right-1/2 w-0.5 h-0.5 bg-white rounded-full animate-particle-float animation-delay-10000" />
      <div className="absolute bottom-2/3 right-1/6 w-0.5 h-0.5 bg-blue-300 rounded-full animate-particle-float animation-delay-12000" />
      <div className="absolute top-3/4 left-1/3 w-0.5 h-0.5 bg-cyan-500 rounded-full animate-particle-float animation-delay-14000" />
      <div className="absolute bottom-1/6 left-2/3 w-0.5 h-0.5 bg-white rounded-full animate-particle-float animation-delay-16000" />
      <div className="absolute top-1/2 right-2/3 w-0.5 h-0.5 bg-blue-400 rounded-full animate-particle-float animation-delay-18000" />
      <div className="absolute bottom-1/2 left-1/5 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-particle-float animation-delay-20000" />
      <div className="absolute top-4/5 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-particle-float animation-delay-22000" />
      <div className="absolute bottom-3/4 left-4/5 w-0.5 h-0.5 bg-blue-500 rounded-full animate-particle-float animation-delay-24000" />
      
      <div className="absolute top-1/5 left-1/5 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-particle-float animation-delay-1000" />
      <div className="absolute top-2/5 right-1/4 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-particle-float animation-delay-3000" />
      <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-blue-200 rounded-full animate-particle-float animation-delay-5000" />
      <div className="absolute top-3/5 left-2/3 w-0.5 h-0.5 bg-white rounded-full animate-particle-float animation-delay-7000" />
      <div className="absolute bottom-2/5 right-1/2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-particle-float animation-delay-9000" />
      <div className="absolute top-1/8 right-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-particle-float animation-delay-11000" />
      <div className="absolute bottom-1/8 left-1/2 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-particle-float animation-delay-13000" />
      <div className="absolute top-4/5 left-1/4 w-0.5 h-0.5 bg-white rounded-full animate-particle-float animation-delay-15000" />
      <div className="absolute bottom-1/3 right-2/3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-particle-float animation-delay-17000" />
      <div className="absolute top-2/5 left-1/6 w-0.5 h-0.5 bg-blue-400 rounded-full animate-particle-float animation-delay-19000" />
      <div className="absolute bottom-3/5 right-1/5 w-0.5 h-0.5 bg-yellow-500 rounded-full animate-particle-float animation-delay-21000" />
      <div className="absolute top-1/3 left-3/4 w-0.5 h-0.5 bg-white rounded-full animate-particle-float animation-delay-23000" />
      <div className="absolute bottom-4/5 left-1/8 w-0.5 h-0.5 bg-cyan-500 rounded-full animate-particle-float animation-delay-25000" />
    </div>
  )
}

export default AnimatedBackground
