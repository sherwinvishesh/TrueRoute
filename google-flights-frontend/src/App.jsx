import { useState, useEffect } from 'react';

const extractCarrierAndNumber = (flightNumber) => {
  if (!flightNumber) {
    return { carrier: '', number: 0 };
  }

  // Allow for alphanumeric carrier codes and optional space before flight number
  const match = flightNumber.match(/^([A-Za-z0-9]+)[\s-]*(\d+)$/);
  
  if (!match) {
    console.error('Invalid flight number format:', flightNumber);
    return { carrier: '', number: 0 };
  }

  return {
    carrier: match[1].toUpperCase(),
    number: parseInt(match[2], 10) || 0
  };
};

function App() {
  // Form fields for the SerpAPI parameters
  const [departureId, setDepartureId] = useState("");
  const [arrivalId, setArrivalId] = useState("");
  const [outboundDate, setOutboundDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  
  const [bestFlights, setBestFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace with your actual SerpAPI API key.
  const apiKey = "edea06ac3d598880cd0378a8c8c54329f467667bcc4d6c1d4db972590b8518ae";

  // Debug: log bestFlights whenever they update.
  useEffect(() => {
    console.log("bestFlights state updated:", bestFlights);
    if (bestFlights.length > 0) {
      console.log("Example best flight object:", bestFlights[0]);
    }
  }, [bestFlights]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Build URL using the proxy route.
    // Vite proxy rewrites /serpapi to https://serpapi.com.
    const url = `/serpapi/search.json?engine=google_flights` +
                `&departure_id=${encodeURIComponent(departureId)}` +
                `&arrival_id=${encodeURIComponent(arrivalId)}` +
                `&outbound_date=${outboundDate}` +
                `&return_date=${returnDate}` +
                `&currency=USD&hl=en&api_key=${apiKey}`;
                
    console.log("Fetching URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from API:", errorText);
        throw new Error("Failed to fetch flights");
      }
      const data = await response.json();
      console.log("Full API Response:", data);

      // Extract best flights from the response.
      // Based on the sample, best flights are under the "best_flights" key.
      const flightResults = data.best_flights || [];
      const processedOptions = await Promise.all(
        flightResults.map(async (option) => {
          const flightsWithScores = await Promise.all(
            option.flights.map(async (flight) => {
              const { carrier, number } = extractCarrierAndNumber(flight.flight_number);
              const origin = flight.departure_airport?.id || '';
              const destination = flight.arrival_airport?.id || '';
              const departureDatetime = flight.departure_airport?.time;
              const arrivalDatetime = flight.arrival_airport?.time;

              if (!carrier || !number || !origin || !destination || !departureDatetime || !arrivalDatetime) {
                console.error('Missing required flight data:', flight);
                return { ...flight, true_route_score: 5.0 };
              }

              try {
                const backendResponse = await fetch('http://localhost:5000/compute_route_score', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    flight_number: number,  // Send as integer
                    operator: carrier,       // Carrier code
                    departure_datetime: departureDatetime,
                    arrival_datetime: arrivalDatetime,
                    origin: origin,
                    destination: destination,
                  }),
                });

                if (!backendResponse.ok) throw new Error('Score fetch failed');
                const scoreData = await backendResponse.json();
                return { ...flight, true_route_score: scoreData.true_route_score };
              } catch (err) {
                console.error('Error computing score:', err);
                return { ...flight, true_route_score: 5.0 };
              }
            })
          );

          // Calculate average score for the option
          const totalScore = flightsWithScores.reduce((sum, flight) => sum + flight.true_route_score, 0);
          const averageScore = flightsWithScores.length ? (totalScore / flightsWithScores.length).toFixed(1) : 0;
          return { ...option, flights: flightsWithScores, true_route_score: averageScore };
        })
      );

      // Sort options by score in descending order
      processedOptions.sort((a, b) => b.true_route_score - a.true_route_score);
      setBestFlights(processedOptions);

    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Flight Search</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Departure ID:
            <input
              type="text"
              value={departureId}
              onChange={(e) => setDepartureId(e.target.value)}
              placeholder="e.g., SFO"
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Arrival ID:
            <input
              type="text"
              value={arrivalId}
              onChange={(e) => setArrivalId(e.target.value)}
              placeholder="e.g., PHX"
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Outbound Date:
            <input
              type="date"
              value={outboundDate}
              onChange={(e) => setOutboundDate(e.target.value)}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Return Date:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Search Flights</button>
      </form>

      {loading && <p>Loading flights...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div>
        <h2>Best Flight Options</h2>
        {bestFlights.length === 0 && !loading ? (
          <p>No flights found.</p>
        ) : (
          bestFlights.map((option, index) => (
            <div key={index} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
              <h3>Option #{index + 1}</h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {option.flights.map((flight, idx) => (
                  <li key={idx} style={{ marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
                    <p>
                      <strong>Flight Number:</strong> {flight.flight_number || "N/A"}
                    </p>
                    <p>
                      <strong>Airline:</strong> {flight.airline || "N/A"}
                    </p>
                    <p>
                      <strong>Departure:</strong> {flight.departure_airport?.name} ({flight.departure_airport?.id}) at {flight.departure_airport?.time}
                    </p>
                    <p>
                      <strong>Arrival:</strong> {flight.arrival_airport?.name} ({flight.arrival_airport?.id}) at {flight.arrival_airport?.time}
                    </p>
                    <p>
                      <strong>Duration:</strong> {flight.duration} minutes
                    </p>
                    {flight.airline_logo && (
                      <img src={flight.airline_logo} alt={`${flight.airline} logo`} style={{ width: '70px' }}/>
                    )}
                    <p><strong>TrueRoute Score:</strong> {flight.true_route_score.toFixed(1)}</p>
                  </li>
                ))}
              </ul>
              <p><strong>Total Duration:</strong> {option.total_duration} minutes</p>
              <p><strong>Price:</strong> ${option.price}</p>
              {option.carbon_emissions && (
                <p>
                  <strong>Carbon Emissions Difference:</strong> {option.carbon_emissions.difference_percent}%
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
