import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import HomePage from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Offers from './components/Offers';
import Services from './components/Services';
import Checkout from './components/Checkout';

function App() {
    const [cart, setCart] = useState([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <Router>
      {/* Fixed Navbar at the top */}
      

      {/* Page content with top padding so it's not hidden behind Navbar */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage cart={cart} setCart={setCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/offers" element={<Offers />} />
         <Route
  path="/checkout"
  element={<Checkout cart={cart} total={total} />}
/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
