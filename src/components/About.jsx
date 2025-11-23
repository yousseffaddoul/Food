import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function About() {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [navigate]);

  if (!isAuthChecked) return <Navbar />;

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full flex justify-end items-center gap-6 p-4 shadow bg-gray-50/80">
        <Link to="/home" className="text-gray-700 hover:text-orange-500 font-medium">
          Home
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">
          About
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium">
          Contact
        </Link>
        <Link to="/services" className="text-gray-700 hover:text-orange-500 font-medium">
          Services
        </Link>
        <Link to="/offers" className="text-gray-700 hover:text-orange-500 font-medium">
          Offers
        </Link>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            localStorage.removeItem("auth");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      <div className="relative z-10 flex justify-center items-start min-h-[calc(100vh-64px)] p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl w-full text-center">
          <div className="mb-6 md:mb-8">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Cozy Bistro Restaurant Interior"
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-cover rounded-xl shadow-md"
              loading="lazy"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            About Us
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6">
            Welcome to <span className="font-semibold text-orange-500">Bistro</span> — your favorite place for delicious food, fast delivery, and a wonderful dining experience.
            We focus on quality ingredients, modern recipes, and an easy-to-use ordering system.
          </p>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8">
            Our mission is to serve you the best dishes with exceptional service.
            Whether you're ordering appetizers, soups, pizza, or main dishes, we guarantee freshness, taste, and satisfaction!
          </p>

          <p className="font-semibold text-orange-500 text-base sm:text-lg md:text-xl lg:text-2xl">
            Thank you for choosing us! 🍽️
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
