import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<div className="text-center text-2xl p-10">Flight Search Page (Coming Soon!)</div>} />
      </Routes>
    </Router>
  );
}

export default App;