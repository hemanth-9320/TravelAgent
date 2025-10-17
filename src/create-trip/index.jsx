import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { getLocationCoords } from "../api/getLocation";
import { getPlaceImage } from "../api/getPlaceImage";
import { getWikipediaImage } from "../api/getWikipediaImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [formData, setFromData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const extractValidJSON = (text) => {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      try {
        return JSON.parse(text.substring(start, end + 1));
      } catch (e) {
        console.error("JSON parsing failed:", e);
        return null;
      }
    }
    return null;
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const handleInputChange = (name, value) => {
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      formData?.totalDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details!");
      return;
    }

    toast("Generating your trip...");
    setLoading(true);

    try {
      const coords = await getLocationCoords(formData?.location);
      const image = await getPlaceImage(formData?.location);

      const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", formData?.location)
        .replace("{totalDays}", formData?.totalDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();
      console.log("AI Response:", responseText);

      const parsed = extractValidJSON(responseText);
      if (!parsed || (!parsed.travelPlan && !parsed.HotelOptions)) {
        toast.error("Failed to parse AI response. Try again.");
        setLoading(false);
        return;
      }

      if (parsed?.HotelOptions) {
        for (let hotel of parsed.HotelOptions) {
          let img = await getPlaceImage(hotel.HotelName + " hotel");
          if (!img || img.includes("No+Image+Found") || img.includes("Error+Fetching+Image")) {
            img = await getWikipediaImage(hotel.HotelName);
          }
          hotel.HotelImageUrl = img;
        }
      }

      if (parsed?.Itinerary) {
        for (let day of parsed.Itinerary) {
          for (let place of day.Plan) {
            let img = await getPlaceImage(place.PlaceName + " tourist attraction");
            if (!img || img.includes("No+Image+Found") || img.includes("Error+Fetching+Image")) {
              img = await getWikipediaImage(place.PlaceName);
            }
            place.PlaceImageUrl = img;
          }
        }
      }

      const finalTripData = {
        userSelection: formData,
        tripData: {
          ...parsed.travelPlan || parsed || {},
          coords,
          image,
        },
      };

      setLoading(false);
      navigate("/view-trip", { state: finalTripData });
    } catch (error) {
      console.error("Trip generation failed:", error);
      toast("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const loadLocationOptions = async (inputValue) => {
    if (!inputValue || inputValue.length < 3) return [];

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          inputValue
        )}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}&limit=5`
      );

      const data = await response.json();
      return (
        data?.results?.map((place) => ({
          label: place.formatted,
          value: place.formatted,
        })) || []
      );
    } catch (error) {
      console.error("OpenCage fetch failed:", error);
      return [];
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      background: 'rgba(255, 255, 255, 0.9)',
      border: state.isFocused ? '3px solid #a78bfa' : '2px solid #e5e7eb',
      borderRadius: '16px',
      boxShadow: state.isFocused 
        ? '0 0 0 3px rgba(167, 139, 250, 0.1)' 
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      minHeight: '56px',
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      transition: 'all 0.3s ease',
      ':hover': {
        borderColor: '#a78bfa',
        transform: 'translateY(-1px)',
      }
    }),
    menu: (provided) => ({
      ...provided,
      background: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      fontFamily: 'Inter, sans-serif',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#a78bfa' 
        : state.isFocused 
        ? 'rgba(167, 139, 250, 0.1)' 
        : 'transparent',
      color: state.isSelected ? 'white' : '#374151',
      padding: '12px 16px',
      fontSize: '15px',
      fontWeight: '500',
      borderRadius: '8px',
      margin: '4px 8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: '16px',
      fontWeight: '400',
    }),
  };

  return (
    <>
      <style jsx>{`
        @keyframes palmSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes waveAnimation {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(100px); }
        }
        @keyframes cloudMove {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        @keyframes airplaneFly {
          0% { transform: translateX(-100px) translateY(0px); }
          50% { transform: translateX(50vw) translateY(-20px); }
          100% { transform: translateX(calc(100vw + 100px)) translateY(0px); }
        }
        @keyframes sunRays {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes birdFly {
          0% { transform: translateX(-50px) translateY(0px); }
          25% { transform: translateX(25vw) translateY(-10px); }
          50% { transform: translateX(50vw) translateY(-5px); }
          75% { transform: translateX(75vw) translateY(-15px); }
          100% { transform: translateX(calc(100vw + 50px)) translateY(0px); }
        }
        @keyframes umbrellaRotate {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .palm-tree {
          animation: palmSway 4s ease-in-out infinite;
        }
        .wave {
          animation: waveAnimation 3s ease-in-out infinite;
        }
        .cloud {
          animation: cloudMove 20s linear infinite;
        }
        .airplane {
          animation: airplaneFly 30s linear infinite;
        }
        .sun-rays {
          animation: sunRays 20s linear infinite;
        }
        .bird {
          animation: birdFly 15s ease-in-out infinite;
        }
        .umbrella {
          animation: umbrellaRotate 3s ease-in-out infinite;
        }
      `}</style>

      <div 
        className="min-h-screen font-['Inter'] bg-gradient-to-br from-sky-200 via-blue-100 to-purple-100 relative overflow-hidden"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {/* Animated Travel Background Elements */}
        
        {/* Sun with rays */}
        <div className="absolute top-10 right-10 w-20 h-20 z-0">
          <div className="sun-rays absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-30"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80"></div>
          <div className="absolute inset-4 bg-yellow-300 rounded-full"></div>
        </div>

        {/* Moving clouds */}
        <div className="cloud absolute top-16 left-0 w-16 h-10 bg-white rounded-full opacity-60 z-0" style={{ animationDelay: '0s' }}></div>
        <div className="cloud absolute top-24 left-0 w-12 h-8 bg-white rounded-full opacity-50 z-0" style={{ animationDelay: '8s' }}></div>
        <div className="cloud absolute top-32 left-0 w-20 h-12 bg-white rounded-full opacity-40 z-0" style={{ animationDelay: '15s' }}></div>

        {/* Flying airplane */}
        <div className="airplane absolute top-20 left-0 text-2xl z-0" style={{ animationDelay: '5s' }}>✈️</div>

        {/* Flying birds */}
        <div className="bird absolute top-28 left-0 text-lg z-0" style={{ animationDelay: '2s' }}>🦅</div>
        <div className="bird absolute top-36 left-0 text-sm z-0" style={{ animationDelay: '10s' }}>🐦</div>

        {/* Mountain silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-32" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,200 L0,100 L200,50 L400,80 L600,30 L800,60 L1000,40 L1200,70 L1200,200 Z" 
                  fill="url(#mountainGradient)" opacity="0.3"/>
            <path d="M0,200 L0,140 L150,90 L350,110 L550,70 L750,90 L950,80 L1200,100 L1200,200 Z" 
                  fill="url(#mountainGradient2)" opacity="0.2"/>
            <defs>
              <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Palm trees */}
        <div className="palm-tree absolute bottom-20 left-10 text-6xl z-0" style={{ animationDelay: '0s' }}>🌴</div>
        <div className="palm-tree absolute bottom-16 left-32 text-4xl z-0" style={{ animationDelay: '1s' }}>🌴</div>
        <div className="palm-tree absolute bottom-24 right-20 text-5xl z-0" style={{ animationDelay: '2s' }}>🌴</div>

        {/* Beach elements */}
        <div className="umbrella absolute bottom-32 left-24 text-3xl z-0">🏖️</div>
        <div className="absolute bottom-28 left-44 text-2xl z-0">🏄‍♂️</div>
        <div className="absolute bottom-20 right-32 text-2xl z-0">🐚</div>

        {/* Ocean waves */}
        <div className="absolute bottom-8 left-0 right-0 z-0">
          <div className="wave w-full h-8 bg-gradient-to-r from-blue-300 to-cyan-400 opacity-40 rounded-full"></div>
          <div className="wave w-full h-6 bg-gradient-to-r from-blue-400 to-cyan-500 opacity-30 rounded-full mt-2" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Additional travel elements */}
        <div className="absolute top-1/4 left-5 text-2xl z-0 animate-bounce" style={{ animationDelay: '3s' }}>🗻</div>
        <div className="absolute top-1/3 right-10 text-xl z-0 animate-pulse" style={{ animationDelay: '4s' }}>🏔️</div>
        <div className="absolute top-1/2 left-20 text-lg z-0 animate-bounce" style={{ animationDelay: '6s' }}>🌊</div>
        <div className="absolute top-3/4 right-5 text-2xl z-0 animate-pulse" style={{ animationDelay: '7s' }}>🏝️</div>

        {/* Trees on mountains */}
        <div className="absolute bottom-40 left-1/4 text-3xl z-0 animate-pulse" style={{ animationDelay: '2s' }}>🌲</div>
        <div className="absolute bottom-36 left-1/3 text-2xl z-0 animate-pulse" style={{ animationDelay: '4s' }}>🌲</div>
        <div className="absolute bottom-44 right-1/4 text-3xl z-0 animate-pulse" style={{ animationDelay: '5s' }}>🌲</div>
        <div className="absolute bottom-38 right-1/3 text-2xl z-0 animate-pulse" style={{ animationDelay: '1s' }}>🌲</div>

        {/* Floating travel icons */}
        <div className="absolute top-1/5 left-1/4 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse flex items-center justify-center">
          <span className="text-2xl">🎒</span>
        </div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-25 animate-bounce flex items-center justify-center">
          <span className="text-2xl">🧳</span>
        </div>
        <div className="absolute top-2/3 left-1/3 w-14 h-14 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 animate-pulse flex items-center justify-center">
          <span className="text-xl">📸</span>
        </div>

        <div className="relative z-10 px-6 py-12 sm:px-10 md:px-16 lg:px-24 xl:px-32">
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-6 leading-tight">
              🌟 Plan Your Dream Gateaway
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
              Just tell us a few details and let our AI do the magic ✨
            </p>
          </div>

          {/* Main Form Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
              
              {/* Destination Section */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Where would you like to go?</h3>
                    <p className="text-gray-600 font-medium">Choose your dream destination</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-inner">
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadLocationOptions}
                    placeholder="🔍 Search for cities, countries, or landmarks..."
                    onChange={(option) => handleInputChange("location", option.label)}
                    styles={customSelectStyles}
                    className="mb-3"
                  />
                  <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                    <span>💡</span>
                    Try "Paris", "Tokyo", "Bali", or "New York"
                  </p>
                </div>
              </div>

              {/* Duration Section */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">How many days?</h3>
                    <p className="text-gray-600 font-medium">Perfect for 1-5 day adventures</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 shadow-inner">
                  <Input
                    placeholder="Enter number of days (1-5)"
                    type="number"
                    min="1"
                    max="5"
                    onChange={(e) => handleInputChange("totalDays", e.target.value)}
                    className="h-14 text-lg font-medium border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/90"
                  />
                </div>
              </div>

              {/* Budget Section */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">What's your budget?</h3>
                    <p className="text-gray-600 font-medium">Choose your comfort level</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SelectBudgetOptions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleInputChange("budget", item.title)}
                      className={`group relative p-6 rounded-2xl border-3 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg ${
                        formData?.budget === item.title
                          ? "border-green-400 bg-gradient-to-br from-green-50 to-blue-50 shadow-xl shadow-green-200/50"
                          : "border-gray-200 bg-white/90 hover:border-green-300 hover:shadow-xl"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                      {formData?.budget === item.title && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Companions Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Who's joining you?</h3>
                    <p className="text-gray-600 font-medium">Tell us about your travel companions</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SelectTravelList.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleInputChange("traveler", item.people)}
                      className={`group relative p-6 rounded-2xl border-3 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg ${
                        formData?.traveler === item.people
                          ? "border-pink-400 bg-gradient-to-br from-pink-50 to-purple-50 shadow-xl shadow-pink-200/50"
                          : "border-gray-200 bg-white/90 hover:border-pink-300 hover:shadow-xl"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                      {formData?.traveler === item.people && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Trip Button */}
              <div className="text-center">
                <Button
                  onClick={OnGenerateTrip}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[280px]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                      <span>Creating your magic trip...</span>
                    </div>
                  ) : (
                    <span>Generate My Trip ✨</span>
                  )}
                </Button>
                <p className="text-gray-600 mt-4 font-medium">
                  🎯 Get your personalized itinerary in seconds!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Sign-in Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-md mx-auto">
          <DialogHeader>
            <DialogDescription className="text-center space-y-6 p-2">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
                  <img src="/logo.svg" className="w-12 h-12" alt="Logo" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="font-bold text-2xl text-gray-800">
                  🔐 Welcome to Your Journey
                </h2>
                <p className="text-gray-600 text-lg font-medium">
                  Sign in to unlock your personalized travel experience
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={login}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FcGoogle className="h-8 w-8" />
                  <span className="text-lg">Continue with Google</span>
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                  <span>🛡️</span>
                  <span>Secure & trusted by thousands of travelers</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateTrip;
