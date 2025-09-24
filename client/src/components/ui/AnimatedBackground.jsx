import React from 'react'

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 opacity-10 animate-cyber-grid">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 58, 138, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 58, 138, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px, 120px 120px, 60px 60px, 60px 60px'
          }}
        />
      </div>

      {/* Professional Horizontal Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent animate-glow-horizontal" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-glow-horizontal animation-delay-4000" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-700/35 to-transparent animate-glow-horizontal animation-delay-8000" />
      </div>

      {/* Professional Rain Effects */}
      <div className="absolute top-0 left-1/6 w-px h-16 bg-gradient-to-b from-blue-500/80 via-blue-400/60 to-transparent animate-subtle-rain" />
      <div className="absolute top-0 left-1/3 w-px h-12 bg-gradient-to-b from-blue-600/70 via-blue-500/50 to-transparent animate-subtle-rain animation-delay-3000" />
      <div className="absolute top-0 left-1/2 w-px h-20 bg-gradient-to-b from-blue-500/75 via-blue-400/55 to-transparent animate-subtle-rain animation-delay-6000" />
      <div className="absolute top-0 left-2/3 w-px h-14 bg-gradient-to-b from-blue-600/65 via-blue-500/45 to-transparent animate-subtle-rain animation-delay-9000" />
      <div className="absolute top-0 right-1/4 w-px h-18 bg-gradient-to-b from-blue-500/70 via-blue-400/50 to-transparent animate-subtle-rain animation-delay-12000" />
      <div className="absolute top-0 right-1/3 w-px h-10 bg-gradient-to-b from-blue-600/60 via-blue-500/40 to-transparent animate-subtle-rain animation-delay-15000" />
      
      {/* Additional Rain Droplets */}
      <div className="absolute top-0 left-1/12 w-px h-8 bg-gradient-to-b from-blue-500/65 via-blue-400/45 to-transparent animate-subtle-rain animation-delay-18000" />
      <div className="absolute top-0 left-1/4 w-px h-22 bg-gradient-to-b from-blue-600/60 via-blue-500/40 to-transparent animate-subtle-rain animation-delay-21000" />
      <div className="absolute top-0 right-1/6 w-px h-6 bg-gradient-to-b from-blue-500/70 via-blue-400/50 to-transparent animate-subtle-rain animation-delay-24000" />
      <div className="absolute top-0 right-1/5 w-px h-15 bg-gradient-to-b from-blue-600/55 via-blue-500/35 to-transparent animate-subtle-rain animation-delay-27000" />

      {/* Professional Flow Lines */}
      <div className="absolute top-1/4 left-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-600/40 to-transparent animate-circuit-flow" />
      <div className="absolute top-1/2 left-0 w-40 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-circuit-flow animation-delay-5000" />
      <div className="absolute top-3/4 left-0 w-28 h-0.5 bg-gradient-to-r from-transparent via-blue-700/35 to-transparent animate-circuit-flow animation-delay-10000" />

      {/* Professional Energy Orbs */}
      <div className="absolute top-1/8 left-1/8 w-32 h-32 bg-blue-600/8 rounded-full blur-lg animate-pulse-orb subtle-glow" />
      <div className="absolute bottom-1/8 right-1/8 w-30 h-30 bg-blue-700/6 rounded-full blur-lg animate-pulse-orb-slow subtle-glow" />
      <div className="absolute top-1/2 right-1/6 w-24 h-24 bg-blue-500/5 rounded-full blur-lg animate-professional-pulse" />

      {/* Professional Floating Particles */}
      <div className="absolute top-1/6 left-1/4 w-1 h-1 bg-blue-600/60 rounded-full animate-quantum-float subtle-glow" />
      <div className="absolute top-1/3 right-1/5 w-0.5 h-0.5 bg-blue-500/50 rounded-full animate-quantum-float animation-delay-2000" />
      <div className="absolute bottom-1/3 left-1/6 w-0.5 h-0.5 bg-white/40 rounded-full animate-quantum-float animation-delay-4000" />
      <div className="absolute top-2/3 left-1/2 w-0.5 h-0.5 bg-blue-700/45 rounded-full animate-quantum-float animation-delay-6000" />
      <div className="absolute bottom-1/5 right-1/3 w-0.5 h-0.5 bg-blue-600/40 rounded-full animate-quantum-float animation-delay-8000" />
      <div className="absolute top-1/4 right-1/2 w-0.5 h-0.5 bg-white/35 rounded-full animate-quantum-float animation-delay-10000" />
      <div className="absolute bottom-2/3 right-1/6 w-0.5 h-0.5 bg-blue-500/50 rounded-full animate-quantum-float animation-delay-12000" />
      <div className="absolute top-3/4 left-1/3 w-0.5 h-0.5 bg-blue-700/40 rounded-full animate-quantum-float animation-delay-14000" />
      <div className="absolute bottom-1/6 left-2/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-quantum-float animation-delay-16000" />
      <div className="absolute top-1/2 right-2/3 w-0.5 h-0.5 bg-blue-600/45 rounded-full animate-quantum-float animation-delay-18000" />
      <div className="absolute bottom-1/2 left-1/5 w-0.5 h-0.5 bg-blue-500/40 rounded-full animate-quantum-float animation-delay-20000" />
      <div className="absolute top-4/5 right-1/4 w-0.5 h-0.5 bg-white/35 rounded-full animate-quantum-float animation-delay-22000" />
      <div className="absolute bottom-3/4 left-4/5 w-0.5 h-0.5 bg-blue-700/40 rounded-full animate-quantum-float animation-delay-24000" />
      
      <div className="absolute top-1/5 left-1/5 w-0.5 h-0.5 bg-blue-600/45 rounded-full animate-quantum-float animation-delay-1000" />
      <div className="absolute top-2/5 right-1/4 w-0.5 h-0.5 bg-blue-500/40 rounded-full animate-quantum-float animation-delay-3000" />
      <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white/30 rounded-full animate-quantum-float animation-delay-5000" />
      <div className="absolute top-3/5 left-2/3 w-0.5 h-0.5 bg-blue-700/35 rounded-full animate-quantum-float animation-delay-7000" />
      <div className="absolute bottom-2/5 right-1/2 w-0.5 h-0.5 bg-blue-600/40 rounded-full animate-quantum-float animation-delay-9000" />
      <div className="absolute top-1/8 right-1/3 w-0.5 h-0.5 bg-white/35 rounded-full animate-quantum-float animation-delay-11000" />
      <div className="absolute bottom-1/8 left-1/2 w-0.5 h-0.5 bg-blue-500/45 rounded-full animate-quantum-float animation-delay-13000" />
      <div className="absolute top-4/5 left-1/4 w-0.5 h-0.5 bg-blue-700/30 rounded-full animate-quantum-float animation-delay-15000" />
      <div className="absolute bottom-1/3 right-2/3 w-0.5 h-0.5 bg-white/40 rounded-full animate-quantum-float animation-delay-17000" />
      <div className="absolute top-2/5 left-1/6 w-0.5 h-0.5 bg-blue-600/40 rounded-full animate-quantum-float animation-delay-19000" />
      <div className="absolute bottom-3/5 right-1/5 w-0.5 h-0.5 bg-blue-500/35 rounded-full animate-quantum-float animation-delay-21000" />
      <div className="absolute top-1/3 left-3/4 w-0.5 h-0.5 bg-white/30 rounded-full animate-quantum-float animation-delay-23000" />
      <div className="absolute bottom-4/5 left-1/8 w-0.5 h-0.5 bg-blue-700/40 rounded-full animate-quantum-float animation-delay-25000" />

      {/* Professional Network Nodes */}
      <div className="absolute top-1/5 left-1/4 w-2 h-2 bg-blue-600/40 rounded-full animate-neural-network subtle-glow" />
      <div className="absolute top-2/5 right-1/3 w-1.5 h-1.5 bg-blue-500/35 rounded-full animate-neural-network animation-delay-2000 subtle-glow" />
      <div className="absolute bottom-1/3 left-1/5 w-2.5 h-2.5 bg-blue-700/30 rounded-full animate-neural-network animation-delay-4000 subtle-glow" />
      <div className="absolute top-3/5 right-1/5 w-1 h-1 bg-white/40 rounded-full animate-neural-network animation-delay-6000 subtle-glow" />
      <div className="absolute bottom-2/5 left-2/3 w-2 h-2 bg-blue-600/35 rounded-full animate-neural-network animation-delay-8000 subtle-glow" />
      <div className="absolute top-4/5 right-1/2 w-1.5 h-1.5 bg-blue-500/30 rounded-full animate-neural-network animation-delay-10000 subtle-glow" />

      {/* Professional Grid Pulse Effects */}
      <div className="absolute inset-0 opacity-15 animate-grid-pulse">
        <div 
          className="h-full w-full" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(30, 58, 138, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '150px 150px, 100px 100px, 200px 200px'
          }}
        />
      </div>
    </div>
  )
}

export default AnimatedBackground
