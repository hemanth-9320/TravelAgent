import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';

// Components
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import TripPlace from '../components/TripPlace';
import Footer from '../components/Footer';

function ViewTrip() {
  const { tripId } = useParams(); // get ID from route param
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AiTrips', tripId); // reference document
      const docSnap = await getDoc(docRef);       // fetch it

      if (docSnap.exists()) {
        const tripData = docSnap.data();
        console.log('Document data:', tripData);
        setTrip(tripData);
      } else {
        toast.error('Trip not found!');
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
      toast.error('Failed to load trip data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) GetTripData();
  }, [tripId]);

  if (loading) {
    return (
      <>
        <style jsx>{`
          @keyframes roadTrip {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(calc(100vw + 100px)); }
          }
          @keyframes mountainPeak {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes carDrive {
            0% { transform: translateX(-80px) rotate(0deg); }
            25% { transform: translateX(25vw) rotate(1deg); }
            50% { transform: translateX(50vw) rotate(-1deg); }
            75% { transform: translateX(75vw) rotate(0.5deg); }
            100% { transform: translateX(calc(100vw + 80px)) rotate(0deg); }
          }
          @keyframes sunsetGlow {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
          @keyframes compassSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes loadingPulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          .car-drive { animation: carDrive 20s ease-in-out infinite; }
          .mountain-peak { animation: mountainPeak 4s ease-in-out infinite; }
          .road-trip { animation: roadTrip 15s linear infinite; }
          .sunset-glow { animation: sunsetGlow 3s ease-in-out infinite; }
          .compass-spin { animation: compassSpin 8s linear infinite; }
          .loading-pulse { animation: loadingPulse 2s ease-in-out infinite; }
        `}</style>
        
        <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-200 to-purple-200 relative overflow-hidden flex items-center justify-center">
          {/* Sunset background */}
          <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full sunset-glow opacity-80"></div>
          
          {/* Mountain silhouettes */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-32" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <path d="M0,200 L0,100 L200,60 L400,80 L600,40 L800,60 L1000,50 L1200,70 L1200,200 Z" 
                    fill="url(#sunsetGradient)" opacity="0.6"/>
              <defs>
                <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Driving car */}
          <div className="car-drive absolute bottom-24 left-0 text-3xl">🚗</div>
          
          {/* Road elements */}
          <div className="absolute bottom-16 left-0 right-0 h-2 bg-gray-800 opacity-30"></div>
          <div className="road-trip absolute bottom-16 left-0 w-20 h-1 bg-yellow-400 opacity-60"></div>
          
          {/* Loading content */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 text-center relative z-10">
            <div className="compass-spin text-6xl mb-6">🧭</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Planning Your Journey</h2>
            <p className="text-xl text-gray-600 mb-8">Loading trip data...</p>
            <div className="flex justify-center items-center gap-4">
              <div className="loading-pulse w-4 h-4 bg-orange-500 rounded-full"></div>
              <div className="loading-pulse w-4 h-4 bg-red-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
              <div className="loading-pulse w-4 h-4 bg-purple-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          {/* Floating travel elements */}
          <div className="absolute top-1/4 left-1/4 text-2xl mountain-peak">🏔️</div>
          <div className="absolute top-1/3 right-1/4 text-2xl mountain-peak" style={{ animationDelay: '1s' }}>🗻</div>
          <div className="absolute top-1/2 left-1/5 text-lg sunset-glow">🌅</div>
        </div>
      </>
    );
  }

  if (!trip) {
    return (
      <>
        <style jsx>{`
          @keyframes brokenPath {
            0% { transform: translateX(0px) rotate(0deg); }
            25% { transform: translateX(10px) rotate(2deg); }
            50% { transform: translateX(-5px) rotate(-1deg); }
            75% { transform: translateX(8px) rotate(1deg); }
            100% { transform: translateX(0px) rotate(0deg); }
          }
          @keyframes sadFace {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .broken-path { animation: brokenPath 2s ease-in-out infinite; }
          .sad-face { animation: sadFace 3s ease-in-out infinite; }
        `}</style>
        
        <div className="min-h-screen bg-gradient-to-br from-gray-200 via-slate-200 to-gray-300 relative overflow-hidden flex items-center justify-center">
          {/* Cloudy sky */}
          <div className="absolute top-10 left-10 w-16 h-10 bg-gray-400 rounded-full opacity-50"></div>
          <div className="absolute top-16 left-20 w-12 h-8 bg-gray-400 rounded-full opacity-40"></div>
          <div className="absolute top-12 right-20 w-20 h-12 bg-gray-400 rounded-full opacity-45"></div>
          
          {/* Error content */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 text-center relative z-10">
            <div className="sad-face text-6xl mb-6">😔</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Trip Not Found</h2>
            <p className="text-xl text-gray-600 mb-8">We couldn't find your travel plans.</p>
            <div className="broken-path text-4xl">🗺️</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes journeyPath {
          0% { transform: translateX(-120px) translateY(0px); }
          25% { transform: translateX(25vw) translateY(-15px); }
          50% { transform: translateX(50vw) translateY(10px); }
          75% { transform: translateX(75vw) translateY(-5px); }
          100% { transform: translateX(calc(100vw + 120px)) translateY(0px); }
        }
        @keyframes trainMove {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        @keyframes hotAirBalloon {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(5px) rotate(-1deg); }
          75% { transform: translateY(-5px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes desertWind {
          0% { transform: translateX(-80px) scaleX(1); }
          50% { transform: translateX(50vw) scaleX(1.2); }
          100% { transform: translateX(calc(100vw + 80px)) scaleX(1); }
        }
        @keyframes camelWalk {
          0% { transform: translateX(-70px) rotate(0deg); }
          33% { transform: translateX(33vw) rotate(1deg); }
          66% { transform: translateX(66vw) rotate(-1deg); }
          100% { transform: translateX(calc(100vw + 70px)) rotate(0deg); }
        }
        @keyframes oasisShimmer {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes scrollFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes compassNeedle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(180deg); }
          75% { transform: rotate(270deg); }
          100% { transform: rotate(360deg); }
        }
        
        .journey-path { animation: journeyPath 28s ease-in-out infinite; }
        .train-move { animation: trainMove 22s linear infinite; }
        .hot-air-balloon { animation: hotAirBalloon 6s ease-in-out infinite; }
        .desert-wind { animation: desertWind 12s ease-in-out infinite; }
        .camel-walk { animation: camelWalk 25s ease-in-out infinite; }
        .oasis-shimmer { animation: oasisShimmer 4s ease-in-out infinite; }
        .scroll-float { animation: scrollFloat 3s ease-in-out infinite; }
        .compass-needle { animation: compassNeedle 12s linear infinite; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 relative overflow-hidden">
        {/* Desert/Journey themed background */}
        
        {/* Desert sun */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full oasis-shimmer"></div>
        
        {/* Sand dunes */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-40" viewBox="0 0 1200 250" preserveAspectReparseAspectRatio="none">
            <path d="M0,250 L0,150 L150,120 L300,140 L450,100 L600,130 L750,110 L900,140 L1050,120 L1200,150 L1200,250 Z" 
                  fill="url(#desertGradient)" opacity="0.4"/>
            <path d="M0,250 L0,180 L200,160 L400,170 L600,150 L800,165 L1000,155 L1200,170 L1200,250 Z" 
                  fill="url(#desertGradient2)" opacity="0.3"/>
            <defs>
              <linearGradient id="desertGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="desertGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Moving elements */}
        <div className="train-move absolute bottom-28 left-0 text-3xl" style={{ animationDelay: '3s' }}>🚂</div>
        <div className="camel-walk absolute bottom-32 left-0 text-2xl" style={{ animationDelay: '8s' }}>🐪</div>
        <div className="journey-path absolute top-20 left-0 text-2xl" style={{ animationDelay: '5s' }}>🎈</div>
        
        {/* Hot air balloon */}
        <div className="hot-air-balloon absolute top-16 right-1/4 text-4xl">🎈</div>
        
        {/* Desert elements */}
        <div className="absolute bottom-40 left-1/4 text-2xl oasis-shimmer">🌵</div>
        <div className="absolute bottom-36 left-1/3 text-xl oasis-shimmer" style={{ animationDelay: '1s' }}>🌵</div>
        <div className="absolute bottom-44 right-1/4 text-2xl oasis-shimmer" style={{ animationDelay: '2s' }}>🌵</div>
        
        {/* Oasis */}
        <div className="absolute bottom-48 right-1/3 text-3xl oasis-shimmer">🏝️</div>
        
        {/* Floating journey elements */}
        <div className="absolute top-1/4 left-1/5 w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-40 scroll-float flex items-center justify-center">
          <span className="text-2xl">📜</span>
        </div>
        <div className="absolute top-1/3 right-1/5 w-18 h-18 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full opacity-35 hot-air-balloon flex items-center justify-center">
          <span className="text-2xl">🧭</span>
        </div>
        <div className="absolute top-2/5 left-1/3 w-14 h-14 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-45 scroll-float flex items-center justify-center" style={{ animationDelay: '1s' }}>
          <span className="text-xl">⚱️</span>
        </div>
        
        {/* Desert wind effect */}
        <div className="desert-wind absolute top-1/2 left-0 text-lg opacity-30">💨</div>
        <div className="desert-wind absolute top-3/5 left-0 text-lg opacity-25" style={{ animationDelay: '4s' }}>💨</div>
        
        {/* Adventure elements */}
        <div className="absolute top-1/5 left-8 text-xl scroll-float">🏛️</div>
        <div className="absolute top-1/4 right-12 text-lg oasis-shimmer">🕌</div>
        <div className="absolute top-2/5 left-12 text-xl scroll-float" style={{ animationDelay: '2s' }}>🏺</div>
        <div className="absolute top-3/5 right-8 text-lg oasis-shimmer" style={{ animationDelay: '3s' }}>🎪</div>
        
        {/* Main Content */}
        <div className="relative z-10 p-6 md:px-20 lg:px-36 xl:px-48">
          {/* Content overlay with subtle background */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 compass-needle text-2xl opacity-60">🧭</div>
            <div className="absolute bottom-4 left-4 scroll-float text-xl opacity-40">📍</div>
            
            <InfoSection trip={trip} />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 oasis-shimmer text-2xl opacity-60">🏨</div>
            <Hotels trip={trip} />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 scroll-float text-2xl opacity-60">🗺️</div>
            <TripPlace trip={trip} />
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ViewTrip;
