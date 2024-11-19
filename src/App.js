import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CargoForm from "./components/CargoForm";
import GridPage from "./components/GridPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CargoForm />} />
        <Route path="/grid" element={<GridPage />} />
      </Routes>
    </Router>
  );
}

export default App;
