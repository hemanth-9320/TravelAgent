import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      <style jsx>{`
        @keyframes palmSway {
          0%, 100% { transform: rotate(-5deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.05); }
        }
        @keyframes oceanWave {
          0% { transform: translateX(-150px) scaleY(1); }
          50% { transform: translateX(0px) scaleY(1.2); }
          100% { transform: translateX(150px) scaleY(1); }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(-120px) translateY(0px); }
          50% { transform: translateX(50vw) translateY(-10px); }
          100% { transform: translateX(calc(100vw + 120px)) translateY(0px); }
        }
        @keyframes helicopterFly {
          0% { transform: translateX(-80px) translateY(10px) rotate(0deg); }
          25% { transform: translateX(25vw) translateY(-5px) rotate(2deg); }
          50% { transform: translateX(50vw) translateY(-15px) rotate(-1deg); }
          75% { transform: translateX(75vw) translateY(0px) rotate(1deg); }
          100% { transform: translateX(calc(100vw + 80px)) translateY(5px) rotate(0deg); }
        }
        @keyframes moonGlow {
          0% { transform: rotate(0deg) scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { transform: rotate(180deg) scale(1.1); box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
          100% { transform: rotate(360deg) scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
        }
        @keyframes seagullFly {
          0% { transform: translateX(-70px) translateY(0px) rotate(0deg); }
          30% { transform: translateX(30vw) translateY(-20px) rotate(5deg); }
          60% { transform: translateX(60vw) translateY(10px) rotate(-3deg); }
          100% { transform: translateX(calc(100vw + 70px)) translateY(-5px) rotate(0deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(10deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        @keyframes lighthouse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .palm-sway {
          animation: palmSway 5s ease-in-out infinite;
        }
        .ocean-wave {
          animation: oceanWave 4s ease-in-out infinite;
        }
        .cloud-drift {
          animation: cloudDrift 30s linear infinite;
        }
        .helicopter {
          animation: helicopterFly 25s ease-in-out infinite;
        }
        .moon-glow {
          animation: moonGlow 15s ease-in-out infinite;
        }
        .seagull {
          animation: seagullFly 20s ease-in-out infinite;
        }
        .bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        .pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
        .lighthouse-beam {
          animation: lighthouse 8s linear infinite;
        }
      `}</style>

      <div 
        className="min-h-screen font-['Poppins'] bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 relative overflow-hidden flex flex-col items-center justify-center"
        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
      >
        {/* Unique Animated Travel Background Elements */}
        
        {/* Moon with glow effect */}
        <div className="absolute top-8 left-8 w-16 h-16 z-0">
          <div className="moon-glow absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full opacity-90"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-white to-gray-200 rounded-full opacity-95"></div>
          <div className="absolute inset-4 bg-white rounded-full"></div>
        </div>

        {/* Drifting clouds with different sizes */}
        <div className="cloud-drift absolute top-12 left-0 w-20 h-12 bg-gradient-to-r from-white to-gray-100 rounded-full opacity-70 z-0" style={{ animationDelay: '0s' }}></div>
        <div className="cloud-drift absolute top-20 left-0 w-16 h-10 bg-gradient-to-r from-white to-gray-100 rounded-full opacity-60 z-0" style={{ animationDelay: '10s' }}></div>
        <div className="cloud-drift absolute top-28 left-0 w-24 h-14 bg-gradient-to-r from-white to-gray-100 rounded-full opacity-50 z-0" style={{ animationDelay: '20s' }}></div>

        {/* Flying helicopter */}
        <div className="helicopter absolute top-16 left-0 text-3xl z-0" style={{ animationDelay: '7s' }}>🚁</div>

        {/* Flying seagulls */}
        <div className="seagull absolute top-24 left-0 text-lg z-0" style={{ animationDelay: '3s' }}>🕊️</div>
        <div className="seagull absolute top-32 left-0 text-xl z-0" style={{ animationDelay: '15s' }}>🦅</div>

        {/* Coastal cliffs silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-48" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path d="M0,300 L0,180 L100,120 L300,140 L500,80 L700,100 L900,60 L1100,90 L1200,70 L1200,300 Z" 
                  fill="url(#cliffGradient)" opacity="0.4"/>
            <path d="M0,300 L0,220 L200,160 L400,180 L600,140 L800,160 L1000,120 L1200,140 L1200,300 Z" 
                  fill="url(#cliffGradient2)" opacity="0.3"/>
            <defs>
              <linearGradient id="cliffGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="cliffGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Lighthouse */}
        <div className="absolute bottom-40 right-16 z-0">
          <div className="text-4xl bounce">🏠</div>
          <div className="lighthouse-beam absolute -top-8 -left-2 w-1 h-20 bg-gradient-to-t from-yellow-400 to-transparent opacity-60"></div>
        </div>

        {/* Coastal palm trees */}
        <div className="palm-sway absolute bottom-32 left-16 text-7xl z-0" style={{ animationDelay: '0s' }}>🌴</div>
        <div className="palm-sway absolute bottom-28 left-40 text-5xl z-0" style={{ animationDelay: '2s' }}>🌴</div>
        <div className="palm-sway absolute bottom-36 right-40 text-6xl z-0" style={{ animationDelay: '4s' }}>🌴</div>

        {/* Beach resort elements */}
        <div className="absolute bottom-44 left-28 text-3xl z-0 bounce" style={{ animationDelay: '1s' }}>🏖️</div>
        <div className="absolute bottom-40 left-52 text-2xl z-0 wiggle" style={{ animationDelay: '2s' }}>🏄‍♀️</div>
        <div className="absolute bottom-36 right-52 text-2xl z-0 bounce" style={{ animationDelay: '3s' }}>🛶</div>

        {/* Ocean waves */}
        <div className="absolute bottom-20 left-0 right-0 z-0">
          <div className="ocean-wave w-full h-10 bg-gradient-to-r from-blue-400 to-teal-400 opacity-50 rounded-full"></div>
          <div className="ocean-wave w-full h-8 bg-gradient-to-r from-blue-500 to-teal-500 opacity-40 rounded-full mt-2" style={{ animationDelay: '2s' }}></div>
          <div className="ocean-wave w-full h-6 bg-gradient-to-r from-blue-600 to-teal-600 opacity-30 rounded-full mt-1" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Tropical forest elements */}
        <div className="absolute bottom-60 left-1/5 text-4xl z-0 pulse" style={{ animationDelay: '1s' }}>🌺</div>
        <div className="absolute bottom-56 left-1/4 text-3xl z-0 pulse" style={{ animationDelay: '3s' }}>🌸</div>
        <div className="absolute bottom-64 right-1/5 text-4xl z-0 pulse" style={{ animationDelay: '2s' }}>🌺</div>
        <div className="absolute bottom-52 right-1/4 text-3xl z-0 pulse" style={{ animationDelay: '4s' }}>🌸</div>

        {/* Floating adventure icons */}
        <div className="absolute top-1/5 left-1/5 w-18 h-18 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-40 bounce flex items-center justify-center">
          <span className="text-3xl">🎯</span>
        </div>
        <div className="absolute top-1/4 right-1/5 w-22 h-22 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-35 pulse flex items-center justify-center" style={{ animationDelay: '1s' }}>
          <span className="text-3xl">🗺️</span>
        </div>
        <div className="absolute top-2/5 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-45 wiggle flex items-center justify-center" style={{ animationDelay: '2s' }}>
          <span className="text-2xl">🎒</span>
        </div>

        {/* Adventure elements */}
        <div className="absolute top-1/6 left-8 text-2xl z-0 bounce" style={{ animationDelay: '2s' }}>🏔️</div>
        <div className="absolute top-1/4 right-12 text-xl z-0 pulse" style={{ animationDelay: '3s' }}>🌋</div>
        <div className="absolute top-2/5 left-12 text-lg z-0 wiggle" style={{ animationDelay: '4s' }}>⛵</div>
        <div className="absolute top-3/5 right-8 text-2xl z-0 bounce" style={{ animationDelay: '5s' }}>🏕️</div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-6 py-16 gap-16">
          
          {/* Hero Content Container */}
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-white/60 p-10 md:p-16 text-center relative overflow-hidden">
            
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 text-2xl wiggle">🌟</div>
            <div className="absolute top-4 right-4 text-2xl bounce">✈️</div>
            <div className="absolute bottom-4 left-4 text-2xl pulse">🗺️</div>
            <div className="absolute bottom-4 right-4 text-2xl wiggle">🎒</div>

            {/* Main Heading */}
            <h1 className="font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-10">
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 bg-clip-text text-transparent block mb-6 relative">
                Discover Your Next Adventure with AI
                <div className="absolute -top-2 -right-2 text-2xl animate-spin">🌟</div>
              </span>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Personalized Itineraries at Your Fingertips
              </span>
            </h1>

            {/* Animated subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 font-semibold leading-relaxed mb-12 max-w-4xl mx-auto relative">
              <span className="absolute -left-8 top-0 text-2xl bounce">🎯</span>
              Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
              <span className="absolute -right-8 top-0 text-2xl pulse">✨</span>
            </p>

            {/* Unique feature showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4 bounce">🤖</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">AI-Powered</h3>
                <p className="text-gray-600 text-sm">Smart recommendations</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4 pulse">⚡</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Instant results</p>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 shadow-lg border-2 border-pink-200 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4 wiggle">🎨</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Customized</h3>
                <p className="text-gray-600 text-sm">Just for you</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl p-6 shadow-lg border-2 border-purple-200 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4 bounce">🌍</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Global</h3>
                <p className="text-gray-600 text-sm">Worldwide coverage</p>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="relative mb-8">
              <Link to={'/create-trip'}>
                <Button className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 hover:from-orange-700 hover:via-pink-700 hover:to-purple-800 text-white font-black py-6 px-16 rounded-3xl text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 min-w-[350px] relative overflow-hidden">
                  <span className="relative z-10">🚀 Start Your Journey ✨</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              
              {/* Floating indicators */}
              <div className="absolute -top-4 -right-4 text-yellow-400 text-2xl bounce">👆</div>
              <div className="absolute -bottom-4 -left-4 text-green-400 text-lg pulse">FREE!</div>
            </div>

            {/* Enhanced trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                <span className="text-green-600 text-xl">✅</span>
                <span className="text-sm font-semibold">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-blue-600 text-xl">🔒</span>
                <span className="text-sm font-semibold">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                <span className="text-purple-600 text-xl">⚡</span>
                <span className="text-sm font-semibold">Instant Access</span>
              </div>
            </div>
          </div>

          {/* Bottom adventure showcase */}
          <div className="flex justify-center gap-12 text-5xl opacity-70">
            <span className="bounce" style={{ animationDelay: '0s' }}>🏝️</span>
            <span className="pulse" style={{ animationDelay: '0.5s' }}>🏔️</span>
            <span className="wiggle" style={{ animationDelay: '1s' }}>🌊</span>
            <span className="bounce" style={{ animationDelay: '1.5s' }}>🏕️</span>
            <span className="pulse" style={{ animationDelay: '2s' }}>🗺️</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
