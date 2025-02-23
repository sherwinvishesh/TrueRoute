// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightSearch from "./pages/FlightSearch";
import FlightList from "./pages/FlightList";
import FlightAnalysis from "./pages/FlightAnalysis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<FlightSearch />} />
        <Route path="/flights" element={<FlightList />} />
        <Route path="/flightanalysis" element={<FlightAnalysis />} />
      
      </Routes>
    </Router>
  );
}

export default App;
