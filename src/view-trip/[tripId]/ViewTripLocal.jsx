import React from "react";
import { useLocation } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import TripPlace from "../components/TripPlace";
import Footer from "../components/Footer";

function ViewTripLocal() {
  const { state } = useLocation(); // AI-generated data passed from navigate()

  if (!state || !state.tripData) {
    return (
      <>
        <style jsx>{`
          @keyframes bottleDrift {
            0% { transform: translateX(-50px) rotate(0deg); }
            25% { transform: translateX(25vw) rotate(5deg); }
            50% { transform: translateX(50vw) rotate(-3deg); }
            75% { transform: translateX(75vw) rotate(2deg); }
            100% { transform: translateX(calc(100vw + 50px)) rotate(0deg); }
          }
          @keyframes stormClouds {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-5px) scale(1.1); }
          }
          @keyframes shipwreck {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-2deg); }
          }
          .bottle-drift { animation: bottleDrift 18s ease-in-out infinite; }
          .storm-clouds { animation: stormClouds 4s ease-in-out infinite; }
          .shipwreck { animation: shipwreck 3s ease-in-out infinite; }
        `}</style>
        
        <div className="min-h-screen bg-gradient-to-br from-slate-300 via-gray-300 to-blue-300 relative overflow-hidden flex items-center justify-center">
          {/* Storm clouds */}
          <div className="absolute top-8 left-8 w-20 h-12 bg-gray-500 rounded-full opacity-60 storm-clouds"></div>
          <div className="absolute top-12 left-20 w-16 h-10 bg-gray-600 rounded-full opacity-50 storm-clouds" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-10 right-16 w-24 h-14 bg-gray-400 rounded-full opacity-55 storm-clouds" style={{ animationDelay: '2s' }}></div>
          
          {/* Rough ocean */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-32" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <path d="M0,200 L0,120 L100,140 L200,100 L300,130 L400,110 L500,140 L600,120 L700,150 L800,130 L900,160 L1000,140 L1100,170 L1200,150 L1200,200 Z" 
                    fill="url(#stormyOcean)" opacity="0.7"/>
              <defs>
                <linearGradient id="stormyOcean" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Message in bottle */}
          <div className="bottle-drift absolute bottom-28 left-0 text-3xl">🍾</div>
          
          {/* Shipwreck */}
          <div className="shipwreck absolute bottom-20 right-1/4 text-4xl">🚢</div>
          
          {/* Error content */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 text-center relative z-10">
            <div className="text-6xl mb-6">📨</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Message Not Found</h2>
            <p className="text-xl text-gray-600 mb-8">No trip data provided in the bottle.</p>
            <div className="text-4xl">🏝️</div>
          </div>
        </div>
      </>
    );
  }

  const trip = state; // already in correct format

  return (
    <>
      <style jsx>{`
        @keyframes sailBoat {
          0% { transform: translateX(-90px) rotate(0deg); }
          25% { transform: translateX(25vw) rotate(2deg); }
          50% { transform: translateX(50vw) rotate(-1deg); }
          75% { transform: translateX(75vw) rotate(1deg); }
          100% { transform: translateX(calc(100vw + 90px)) rotate(0deg); }
        }
        @keyframes dolphinJump {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(10deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes tropicalWave {
          0% { transform: translateX(-100px) scaleY(1); }
          50% { transform: translateX(50px) scaleY(1.3); }
          100% { transform: translateX(200px) scaleY(1); }
        }
        @keyframes seagullSoar {
          0% { transform: translateX(-60px) translateY(0px) rotate(0deg); }
          30% { transform: translateX(30vw) translateY(-25px) rotate(3deg); }
          60% { transform: translateX(60vw) translateY(15px) rotate(-2deg); }
          100% { transform: translateX(calc(100vw + 60px)) translateY(-10px) rotate(0deg); }
        }
        @keyframes palmDance {
          0%, 100% { transform: rotate(-4deg) scale(1); }
          50% { transform: rotate(4deg) scale(1.02); }
        }
        @keyframes sunGlow {
          0% { transform: scale(1); box-shadow: 0 0 30px rgba(251, 191, 36, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(251, 191, 36, 0.6); }
          100% { transform: scale(1); box-shadow: 0 0 30px rgba(251, 191, 36, 0.4); }
        }
        @keyframes coconutFall {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(180deg); }
        }
        @keyframes surfboardFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
        @keyframes fishSwim {
          0% { transform: translateX(-40px) scaleX(1); }
          50% { transform: translateX(50vw) scaleX(-1); }
          100% { transform: translateX(calc(100vw + 40px)) scaleX(1); }
        }
        @keyframes umbrellaShade {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-3deg) scale(1.05); }
        }
        @keyframes islandFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes coralGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        .sail-boat { animation: sailBoat 30s ease-in-out infinite; }
        .dolphin-jump { animation: dolphinJump 5s ease-in-out infinite; }
        .tropical-wave { animation: tropicalWave 6s ease-in-out infinite; }
        .seagull-soar { animation: seagullSoar 22s ease-in-out infinite; }
        .palm-dance { animation: palmDance 7s ease-in-out infinite; }
        .sun-glow { animation: sunGlow 4s ease-in-out infinite; }
        .coconut-fall { animation: coconutFall 3s ease-in-out infinite; }
        .surfboard-float { animation: surfboardFloat 4s ease-in-out infinite; }
        .fish-swim { animation: fishSwim 16s ease-in-out infinite; }
        .umbrella-shade { animation: umbrellaShade 5s ease-in-out infinite; }
        .island-float { animation: islandFloat 6s ease-in-out infinite; }
        .coral-glow { animation: coralGlow 3s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-teal-200 relative overflow-hidden">
        {/* Tropical Paradise Background */}
        
        {/* Tropical sun */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full sun-glow"></div>
        
        {/* Tropical islands silhouette */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-44" viewBox="0 0 1200 280" preserveAspectRatio="none">
            <path d="M0,280 L0,180 L120,160 L240,140 L360,170 L480,150 L600,160 L720,140 L840,155 L960,145 L1080,160 L1200,150 L1200,280 Z" 
                  fill="url(#islandGradient)" opacity="0.5"/>
            <path d="M0,280 L0,220 L180,200 L360,210 L540,190 L720,205 L900,195 L1080,210 L1200,200 L1200,280 Z" 
                  fill="url(#islandGradient2)" opacity="0.4"/>
            <defs>
              <linearGradient id="islandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="islandGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Moving elements */}
        <div className="sail-boat absolute bottom-32 left-0 text-4xl" style={{ animationDelay: '2s' }}>⛵</div>
        <div className="fish-swim absolute bottom-28 left-0 text-2xl" style={{ animationDelay: '6s' }}>🐠</div>
        <div className="seagull-soar absolute top-24 left-0 text-xl" style={{ animationDelay: '4s' }}>🦅</div>
        <div className="seagull-soar absolute top-32 left-0 text-lg" style={{ animationDelay: '12s' }}>🕊️</div>
        
        {/* Dolphins jumping */}
        <div className="dolphin-jump absolute bottom-40 left-1/4 text-3xl" style={{ animationDelay: '1s' }}>🐬</div>
        <div className="dolphin-jump absolute bottom-36 right-1/3 text-3xl" style={{ animationDelay: '3s' }}>🐬</div>
        
        {/* Tropical palms */}
        <div className="palm-dance absolute bottom-44 left-12 text-8xl" style={{ animationDelay: '0s' }}>🌴</div>
        <div className="palm-dance absolute bottom-40 left-36 text-6xl" style={{ animationDelay: '2s' }}>🌴</div>
        <div className="palm-dance absolute bottom-48 right-16 text-7xl" style={{ animationDelay: '4s' }}>🌴</div>
        <div className="palm-dance absolute bottom-42 right-40 text-5xl" style={{ animationDelay: '6s' }}>🌴</div>
        
        {/* Beach elements */}
        <div className="absolute bottom-52 left-20 text-3xl umbrella-shade">🏖️</div>
        <div className="absolute bottom-48 left-48 text-2xl surfboard-float">🏄‍♂️</div>
        <div className="absolute bottom-50 right-24 text-3xl umbrella-shade" style={{ animationDelay: '1s' }}>☂️</div>
        <div className="absolute bottom-46 right-48 text-2xl surfboard-float" style={{ animationDelay: '2s' }}>🏄‍♀️</div>
        
        {/* Tropical ocean waves */}
        <div className="absolute bottom-24 left-0 right-0">
          <div className="tropical-wave w-full h-8 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-60 rounded-full"></div>
          <div className="tropical-wave w-full h-6 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 rounded-full mt-2" style={{ animationDelay: '2s' }}></div>
          <div className="tropical-wave w-full h-4 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-40 rounded-full mt-1" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Tropical fruits and flowers */}
        <div className="absolute bottom-60 left-1/5 text-3xl coconut-fall">🥥</div>
        <div className="absolute bottom-56 left-1/4 text-2xl coral-glow">🌺</div>
        <div className="absolute bottom-64 right-1/5 text-3xl coconut-fall" style={{ animationDelay: '1s' }}>🥥</div>
        <div className="absolute bottom-58 right-1/4 text-2xl coral-glow" style={{ animationDelay: '2s' }}>🌸</div>
        
        {/* Floating paradise elements */}
        <div className="absolute top-1/4 left-1/6 w-20 h-20 bg-gradient-to-br from-pink-200 to-coral-200 rounded-full opacity-40 island-float flex items-center justify-center">
          <span className="text-3xl">🏝️</span>
        </div>
        <div className="absolute top-1/3 right-1/6 w-18 h-18 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full opacity-35 dolphin-jump flex items-center justify-center" style={{ animationDelay: '1s' }}>
          <span className="text-2xl">🐚</span>
        </div>
        <div className="absolute top-2/5 left-1/3 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-45 surfboard-float flex items-center justify-center" style={{ animationDelay: '2s' }}>
          <span className="text-xl">🍹</span>
        </div>
        
        {/* Coral reef elements */}
        <div className="absolute bottom-36 left-1/3 text-2xl coral-glow">🐠</div>
        <div className="absolute bottom-32 left-2/5 text-lg coral-glow" style={{ animationDelay: '1s' }}>🐡</div>
        <div className="absolute bottom-38 right-1/3 text-2xl coral-glow" style={{ animationDelay: '2s' }}>🦑</div>
        
        {/* Underwater elements */}
        <div className="fish-swim absolute bottom-30 left-0 text-lg" style={{ animationDelay: '8s' }}>🐟</div>
        <div className="fish-swim absolute bottom-26 left-0 text-xl" style={{ animationDelay: '14s' }}>🦈</div>
        
        {/* Paradise adventure elements */}
        <div className="absolute top-1/5 left-8 text-2xl island-float">🏛️</div>
        <div className="absolute top-1/4 right-12 text-xl coral-glow">🗿</div>
        <div className="absolute top-2/5 left-12 text-2xl surfboard-float" style={{ animationDelay: '1s' }}>⛵</div>
        <div className="absolute top-3/5 right-8 text-xl umbrella-shade" style={{ animationDelay: '2s' }}>🎣</div>
        
        {/* Main Content */}
        <div className="relative z-10 p-6 md:px-20 lg:px-36 xl:px-48">
          {/* Content sections with tropical overlays */}
          <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 coral-glow text-2xl opacity-60">🌺</div>
            <div className="absolute bottom-4 left-4 island-float text-xl opacity-40">🏝️</div>
            
            <InfoSection trip={trip} />
          </div>
          
          <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 umbrella-shade text-2xl opacity-60">🏨</div>
            <div className="absolute bottom-4 left-4 surfboard-float text-xl opacity-40">🏖️</div>
            <Hotels trip={trip} />
          </div>
          
          <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 dolphin-jump text-2xl opacity-60">🗺️</div>
            <div className="absolute bottom-4 left-4 coral-glow text-xl opacity-40">🧭</div>
            <TripPlace trip={trip} />
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ViewTripLocal;
