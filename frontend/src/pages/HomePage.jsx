import FlightMap from './../components/ui/USFlightAnimation';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();
    const handleNavigation = () => {
      navigate('/search'); // Navigate to search page instead of /flights
    };

    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
                TrueRoute
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Your smarter way to find flights! Unlike traditional flight search engines that rank results purely on cost,
                TrueRoute introduces a <span className="text-blue-400">prediction-based ranking system</span> that evaluates 
                past reviews, historical delays, weather impact, and pricing trends.
              </p>
            </div>
  
            {/* Content Sections */}
            <div className="space-y-8">
              {/* Problem Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">The Problem</h2>
                <p className="text-gray-300">
                  Finding the best flight isn't just about the price. Flights may get delayed, 
                  canceled due to weather, or have poor service ratings. Traditional booking 
                  platforms don't give you the full picture.
                </p>
              </div>


              <FlightMap />
             
  
              {/* Solution Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">The Solution</h2>
                <p className="text-gray-300">
                  TrueRoute scores flights based on reliability, customer feedback, weather conditions, 
                  and overall value to recommend the best option. Our AI-powered system helps you make 
                  informed decisions beyond just the ticket price.
                </p>
              </div>
  
              {/* Features Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Key Features</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Data-driven flight ranking based on multiple factors
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Weather analysis and historical delay insights
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Real user reviews for informed decision making
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Cost comparison with reliability scoring
                  </li>
                </ul>
              </div>
  
              {/* Technologies Section */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Technologies Used</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    React + Vite for frontend
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Tailwind CSS for UI styling
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    FastAPI / Node.js for backend
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Machine Learning models
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Flight and weather APIs
                  </div>
                </div>
              </div>
            </div>
  
            {/* CTA Button */}
            <div className="text-center mt-12">
              <button
                onClick={handleNavigation}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold
                         hover:bg-blue-700 transform hover:scale-105 transition-all duration-300
                         shadow-lg shadow-blue-500/20"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;
