import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const airports = [
    { code: "ATL", name: "Hartsfield–Jackson Atlanta International Airport, Atlanta, GA" },
    { code: "LAX", name: "Los Angeles International Airport, Los Angeles, CA" },
    { code: "ORD", name: "O'Hare International Airport, Chicago, IL" },
    { code: "DFW", name: "Dallas/Fort Worth International Airport, Dallas, TX" },
    { code: "DEN", name: "Denver International Airport, Denver, CO" },
    { code: "JFK", name: "John F. Kennedy International Airport, New York, NY" },
    { code: "SFO", name: "San Francisco International Airport, San Francisco, CA" },
    { code: "SEA", name: "Seattle–Tacoma International Airport, Seattle, WA" },
    { code: "LAS", name: "Harry Reid International Airport, Las Vegas, NV" },
    { code: "MCO", name: "Orlando International Airport, Orlando, FL" },
    { code: "MIA", name: "Miami International Airport, Miami, FL" },
    { code: "PHX", name: "Phoenix Sky Harbor International Airport, Phoenix, AZ" },
    { code: "IAH", name: "George Bush Intercontinental Airport, Houston, TX" },
    { code: "BOS", name: "Logan International Airport, Boston, MA" },
    { code: "MSP", name: "Minneapolis–Saint Paul International Airport, Minneapolis, MN" },
    { code: "DTW", name: "Detroit Metropolitan Airport, Detroit, MI" },
    { code: "PHL", name: "Philadelphia International Airport, Philadelphia, PA" },
    { code: "CLT", name: "Charlotte Douglas International Airport, Charlotte, NC" },
    { code: "LGA", name: "LaGuardia Airport, New York, NY" },
    { code: "FLL", name: "Fort Lauderdale–Hollywood International Airport, Fort Lauderdale, FL" },
    { code: "BWI", name: "Baltimore/Washington International Thurgood Marshall Airport, Baltimore, MD" },
    { code: "SLC", name: "Salt Lake City International Airport, Salt Lake City, UT" },
    { code: "SAN", name: "San Diego International Airport, San Diego, CA" },
    { code: "DCA", name: "Ronald Reagan Washington National Airport, Washington, DC" },
    { code: "MDW", name: "Chicago Midway International Airport, Chicago, IL" },
    { code: "TPA", name: "Tampa International Airport, Tampa, FL" },
    { code: "PDX", name: "Portland International Airport, Portland, OR" },
    { code: "HNL", name: "Daniel K. Inouye International Airport, Honolulu, HI" },
    { code: "STL", name: "St. Louis Lambert International Airport, St. Louis, MO" },
    { code: "BNA", name: "Nashville International Airport, Nashville, TN" },
    { code: "AUS", name: "Austin–Bergstrom International Airport, Austin, TX" },
    { code: "MCI", name: "Kansas City International Airport, Kansas City, MO" },
    { code: "RDU", name: "Raleigh–Durham International Airport, Raleigh, NC" },
    { code: "CLE", name: "Cleveland Hopkins International Airport, Cleveland, OH" },
    { code: "SMF", name: "Sacramento International Airport, Sacramento, CA" },
    { code: "SJC", name: "San Jose International Airport, San Jose, CA" },
    { code: "IND", name: "Indianapolis International Airport, Indianapolis, IN" },
    { code: "PIT", name: "Pittsburgh International Airport, Pittsburgh, PA" },
    { code: "CMH", name: "John Glenn Columbus International Airport, Columbus, OH" },
    { code: "MKE", name: "Milwaukee Mitchell International Airport, Milwaukee, WI" },
    { code: "JAX", name: "Jacksonville International Airport, Jacksonville, FL" },
    { code: "OMA", name: "Eppley Airfield, Omaha, NE" },
    { code: "OKC", name: "Will Rogers World Airport, Oklahoma City, OK" },
    { code: "RIC", name: "Richmond International Airport, Richmond, VA" },
    { code: "SAT", name: "San Antonio International Airport, San Antonio, TX" },
    { code: "SNA", name: "John Wayne Airport, Santa Ana, CA" },
    { code: "ONT", name: "Ontario International Airport, Ontario, CA" },
    { code: "PBI", name: "Palm Beach International Airport, West Palm Beach, FL" },
    { code: "BUF", name: "Buffalo Niagara International Airport, Buffalo, NY" },
    { code: "ABQ", name: "Albuquerque International Sunport, Albuquerque, NM" },
    { code: "BDL", name: "Bradley International Airport, Windsor Locks, CT" },
    { code: "BOI", name: "Boise Airport, Boise, ID" },
    { code: "BUR", name: "Hollywood Burbank Airport, Burbank, CA" },
    { code: "CHS", name: "Charleston International Airport, Charleston, SC" },
    { code: "CVG", name: "Cincinnati/Northern Kentucky International Airport, Cincinnati, OH" },
    { code: "ELP", name: "El Paso International Airport, El Paso, TX" },
    { code: "GEG", name: "Spokane International Airport, Spokane, WA" },
    { code: "GRR", name: "Gerald R. Ford International Airport, Grand Rapids, MI" },
    { code: "GSP", name: "Greenville–Spartanburg International Airport, Greenville, SC" },
    { code: "HRL", name: "Valley International Airport, Harlingen, TX" },
    { code: "HSV", name: "Huntsville International Airport, Huntsville, AL" },
    { code: "ICT", name: "Wichita Dwight D. Eisenhower National Airport, Wichita, KS" },
    { code: "LIT", name: "Clinton National Airport, Little Rock, AR" },
    { code: "LBB", name: "Lubbock Preston Smith International Airport, Lubbock, TX" },
    { code: "MSY", name: "Louis Armstrong New Orleans International Airport, New Orleans, LA" },
    { code: "MEM", name: "Memphis International Airport, Memphis, TN" },
    { code: "MHT", name: "Manchester–Boston Regional Airport, Manchester, NH" },
    { code: "MYR", name: "Myrtle Beach International Airport, Myrtle Beach, SC" },
    { code: "OAK", name: "Oakland International Airport, Oakland, CA" },
    { code: "ORF", name: "Norfolk International Airport, Norfolk, VA" },
    { code: "PVD", name: "T. F. Green Airport, Providence, RI" },
    { code: "RNO", name: "Reno–Tahoe International Airport, Reno, NV" },
    { code: "SAV", name: "Savannah/Hilton Head International Airport, Savannah, GA" },
    { code: "SDF", name: "Louisville International Airport, Louisville, KY" },
    { code: "SFB", name: "Orlando Sanford International Airport, Sanford, FL" },
    { code: "SJU", name: "Luis Muñoz Marín International Airport, San Juan, PR" },
    { code: "TUL", name: "Tulsa International Airport, Tulsa, OK" },
    { code: "TUS", name: "Tucson International Airport, Tucson, AZ" },
    { code: "TYS", name: "McGhee Tyson Airport, Knoxville, TN" },
    { code: "XNA", name: "Northwest Arkansas National Airport, Bentonville, AR" }
  ];
  

  const airlines = [
    { code: "AA", name: "American Airlines" },
    { code: "AS", name: "Alaska Airlines" },
    { code: "B6", name: "JetBlue Airways" },
    { code: "DL", name: "Delta Air Lines" },
    { code: "F9", name: "Frontier Airlines" },
    { code: "G4", name: "Allegiant Air" },
    { code: "HA", name: "Hawaiian Airlines" },
    { code: "NK", name: "Spirit Airlines" },
    { code: "SY", name: "Sun Country Airlines" },
    { code: "UA", name: "United Airlines" },
    { code: "WN", name: "Southwest Airlines" },
    { code: "XP", name: "Avelo Airlines" },
    { code: "MX", name: "Breeze Airways" }
  ];
  
  const SearchableSelect = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const filteredOptions = options.filter(option =>
      `${option.name} ${option.code}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const displayValue = value ? 
      options.find(option => option.code === value)?.name : '';
  
    return (
      <div className="relative" ref={wrapperRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
        />
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-gray-700 rounded-lg shadow-lg">
            {filteredOptions.map(option => (
              <div
                key={option.code}
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
                onClick={() => {
                  onChange(option.code);
                  setSearchTerm(option.name);
                  setIsOpen(false);
                }}
              >
                {option.name} ({option.code})
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-gray-400">No results found</div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  const FlightSearch = () => {
    const [knowsFlightDetails, setKnowsFlightDetails] = useState(null);
    const [fromAirport, setFromAirport] = useState('');
    const [toAirport, setToAirport] = useState('');
    const [date, setDate] = useState('');
    const [airline, setAirline] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!knowsFlightDetails) {
          // If user selected "No" (searching by route)
          navigate(`/flights?from=${fromAirport}&to=${toAirport}&date=${date}`);
        } else {
          // If user selected "Yes" (searching by flight number)
          console.log("Flight Details Search:", {
            airline,
            flightNumber,
            date
          });
          navigate(`/flightanalysis?flight=${airline}${flightNumber}&date=${date}`);
        }
      };
    
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Search Your Flight</h2>
            
            {/* Initial Question */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 mb-6">
              <p className="text-center text-xl text-gray-300 mb-6">Do you know your flight details?</p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setKnowsFlightDetails(true)}
                  className={`px-12 py-3 rounded-lg font-medium transition-all duration-200 ${
                    knowsFlightDetails === true 
                      ? 'bg-blue-600 text-white scale-105' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setKnowsFlightDetails(false)}
                  className={`px-12 py-3 rounded-lg font-medium transition-all duration-200 ${
                    knowsFlightDetails === false 
                      ? 'bg-blue-600 text-white scale-105' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
  
            {/* Conditional Forms */}
            {knowsFlightDetails !== null && (
              <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <div className="space-y-6">
                  {knowsFlightDetails ? (
                    // Flight Details Form
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Airline</label>
                        <SearchableSelect
                          options={airlines}
                          value={airline}
                          onChange={setAirline}
                          placeholder="Search airline..."
                        />
                      </div>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Flight Number</label>
                        <input
                          type="text"
                          value={flightNumber}
                          onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                          placeholder="Enter flight number"
                          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                          maxLength="4"
                          required
                        />
                      </div>
                    </>
                  ) : (
                    // Destination Search Form
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
                        <SearchableSelect
                          options={airports}
                          value={fromAirport}
                          onChange={setFromAirport}
                          placeholder="Search departure airport..."
                        />
                      </div>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
                        <SearchableSelect
                          options={airports}
                          value={toAirport}
                          onChange={setToAirport}
                          placeholder="Search arrival airport..."
                        />
                      </div>
                    </>
                  )}
  
                  {/* Date field for both forms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date of Travel</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold
                             hover:bg-blue-700 transform hover:scale-105 transition-all duration-300
                             shadow-lg shadow-blue-500/20 mt-6"
                  >
                    {knowsFlightDetails ? 'Analyse' : 'Analyse'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default FlightSearch;