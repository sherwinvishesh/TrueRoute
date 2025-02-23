import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SERP_API_KEY = import.meta.env.VITE_SERP_API_KEY;

const extractCarrierAndNumber = (flightNumber) => {
  if (!flightNumber) return { carrier: '', number: 0 };
  const match = flightNumber.match(/^([A-Za-z0-9]+)[\s-]*(\d+)$/);
  if (!match) {
    console.error('Invalid flight number format:', flightNumber);
    return { carrier: '', number: 0 };
  }
  return {
    carrier: match[1].toUpperCase(),
    number: parseInt(match[2], 10) || 0,
  };
};

const computeFlightScore = async (flight) => {
  const { carrier, number } = extractCarrierAndNumber(flight.flightNumber);
  const departureDatetime = flight.departureTime;
  const arrivalDatetime = flight.arrivalTime;
  const origin = flight.from;
  const destination = flight.to;

  if (!carrier || !number || !origin || !destination || !departureDatetime || !arrivalDatetime) {
    console.error('Missing required flight data for score computation:', flight);
    return 5.0;
  }

  try {
    const backendResponse = await fetch('http://localhost:5000/compute_route_score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flight_number: number,
        operator: carrier,
        departure_datetime: departureDatetime,
        arrival_datetime: arrivalDatetime,
        origin: origin,
        destination: destination,
      }),
    });
    if (!backendResponse.ok) throw new Error('Score fetch failed');
    const scoreData = await backendResponse.json();
    return scoreData.true_route_score;
  } catch (err) {
    console.error('Error computing score for flight:', flight, err);
    return 5.0;
  }
};

const FlightList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (from && to && date) {
      const fetchFlights = async () => {
        try {
          setLoading(true);
          setError(null);
          const url = `/serpapi/search.json?engine=google_flights&departure_id=${from}&arrival_id=${to}&outbound_date=${date}&type=2&api_key=${SERP_API_KEY}`;
          console.log("Fetching flights from:", url);
          const response = await fetch(url);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
          }
          const data = await response.json();
          console.log("Full API Response:", data);
          if (!data || data.error) {
            throw new Error(data.error || "Invalid response from API");
          }

          // Process flights: assume direct flights (first segment)
          const processFlights = (flightsArray) =>
            flightsArray.map((option, index) => {
              const segment = option.flights[0];
              return {
                id: index,
                airline: segment.airline || "Unknown Airline",
                flightNumber: segment.flight_number || "N/A",
                aircraft: segment.airplane || "Standard Aircraft",
                airlineLogo: segment.airline_logo || "",
                price: option.price || "N/A",
                from: segment.departure_airport?.id || from,
                to: segment.arrival_airport?.id || to,
                departureTime: segment.departure_airport?.time || "N/A",
                arrivalTime: segment.arrival_airport?.time || "N/A",
                duration: option.total_duration
                  ? `${Math.floor(option.total_duration / 60)}h ${option.total_duration % 60}m`
                  : "N/A",
                bookingUrl: "https://www.google.com/flights",
              };
            });

          let flightOptions = [];
          if (data.best_flights && data.best_flights.length > 0) {
            flightOptions = flightOptions.concat(processFlights(data.best_flights));
          }
          if (data.other_flights && data.other_flights.length > 0) {
            flightOptions = flightOptions.concat(processFlights(data.other_flights));
          }

          // Compute score for each flight option
          const scoredOptions = await Promise.all(
            flightOptions.map(async (flight) => {
              const score = await computeFlightScore(flight);
              return { ...flight, true_route_score: score };
            })
          );
          setFlights(scoredOptions);
        } catch (err) {
          console.error("Error fetching flights:", err);
          setError(err.message || "Failed to load flights.");
        } finally {
          setLoading(false);
        }
      };

      fetchFlights();
    } else {
      setError("Missing required query parameters (from, to, or date).");
      setLoading(false);
    }
  }, [from, to, date]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 mb-6">
            <h1 className="text-2xl font-bold text-blue-400">
              {from} → {to}
            </h1>
            <p className="text-gray-400 mt-2">
              {new Date(date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {flights.length > 0 ? `Found ${flights.length} flights` : "No flights found"}
            </p>
          </div>

          {/* Flight List */}
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                onClick={() =>
                  navigate(
                    `/flightanalysis?flight=${flight.flightNumber.replace(/\s+/g, '')}&date=${date}`
                  )
                }
                className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 hover:border-blue-500 cursor-pointer transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    {flight.airlineLogo && (
                      <img
                        src={flight.airlineLogo}
                        alt={flight.airline}
                        className="w-12 h-12 mr-4 rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400">
                        {flight.airline} {flight.flightNumber}
                      </h3>
                      <p className="text-gray-400">{flight.aircraft}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">${flight.price}</p>
                    <p className="text-sm text-gray-400">one-way</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">
                      {new Date(flight.departureTime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-blue-400">{flight.from}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">
                      {new Date(flight.arrivalTime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-blue-400">{flight.to}</p>
                  </div>
                </div>
                <p className="text-center text-gray-400 mt-4">{flight.duration}</p>
                {flight.true_route_score !== undefined && (
                  <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-blue-400">
                      Route Score: {flight.true_route_score.toFixed(1)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightList;
