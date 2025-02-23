import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightSearch from "./pages/FlightSearch";
import FlightAnalysis from "./pages/FlightAnalysis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<FlightSearch />} />
        <Route path="/flightanalysis" element={<FlightAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
