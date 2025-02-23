import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const AVIATION_API_KEY = import.meta.env.VITE_AVIATION_API_KEY;

const FlightAnimation = ({ fromAirport, toAirport }) => {
    return (
      <div className="w-full h-48 relative">
        <div className="absolute inset-0 flex items-center justify-between px-12">
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-400">{fromAirport.name}</div>
            <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-semibold">
              {fromAirport.code}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-400">{toAirport.name}</div>
            <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-semibold">
              {toAirport.code}
            </div>
          </div>
        </div>
        <svg className="w-full h-full" viewBox="0 0 400 100">
          <path
            d="M 50 50 Q 200 10 350 50"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeDasharray="10"
            className="opacity-60"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <circle r="4" fill="#60A5FA" className="animate-pulse">
            <animateMotion
              path="M 50 50 Q 200 10 350 50"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    );
  };
  
  const FlightAnalysis = () => {
    const [searchParams] = useSearchParams();
    const flightNumber = searchParams.get('flight');
    const [flightData, setFlightData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchFlightData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://api.aviationstack.com/v1/flights?access_key=${AVIATION_API_KEY}&flight_iata=${flightNumber}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch flight data');
          }
  
          const data = await response.json();
          
          if (data.data && data.data.length > 0) {
            const flight = data.data[0];
            setFlightData({
              aircraft: {
                registration: flight.aircraft?.registration || 'N/A'
              },
              departure: {
                name: flight.departure?.airport || 'N/A',
                code: flight.departure?.iata || 'N/A',
                terminal: flight.departure?.terminal || 'N/A',
                gate: flight.departure?.gate || 'N/A'
              },
              arrival: {
                name: flight.arrival?.airport || 'N/A',
                code: flight.arrival?.iata || 'N/A',
                terminal: flight.arrival?.terminal || 'N/A',
                gate: flight.arrival?.gate || 'N/A'
              },
              flight: {
                number: flightNumber,
                airline: flight.airline?.name || 'N/A'
              }
            });
          } else {
            throw new Error('No flight data found');
          }
          
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      if (flightNumber) {
        fetchFlightData();
      }
    }, [flightNumber]);
  
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  
    if (error || !flightData) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-red-900/50 rounded-lg p-6">
              <h2 className="text-xl font-bold">Error loading flight data</h2>
              <p className="mt-2">Please check the flight number and try again.</p>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Flight Header */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 mb-6">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Flight {flightData.flight.number}
              </h1>
              <p className="text-gray-400 mt-2">{flightData.flight.airline}</p>
            </div>
  
            {/* Flight Animation */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 mb-6">
              <FlightAnimation 
                fromAirport={flightData.departure}
                toAirport={flightData.arrival}
              />
            </div>
  
            {/* Flight Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Departure Info */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Departure</h2>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Airport:</span> {flightData.departure.name}</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-semibold">
                    {flightData.departure.code}
                  </p>
                  <p><span className="text-gray-400">Terminal:</span> {flightData.departure.terminal}</p>
                  <p><span className="text-gray-400">Predicting Gate:</span> {flightData.departure.gate}</p>
                </div>
              </div>
  
              {/* Arrival Info */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Arrival</h2>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Airport:</span> {flightData.arrival.name}</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-semibold">
                    {flightData.arrival.code}
                  </p>
                  <p><span className="text-gray-400">Terminal:</span> {flightData.arrival.terminal}</p>
                  <p><span className="text-gray-400">Predicting Gate:</span> {flightData.arrival.gate}</p>
                </div>
              </div>
  
              {/* Aircraft Details */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Aircraft</h2>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Registration:</span> {flightData.aircraft.registration}</p>
                </div>
              </div>
  
              {/* Flight Info */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Flight Details</h2>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Airline:</span> {flightData.flight.airline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FlightAnalysis;