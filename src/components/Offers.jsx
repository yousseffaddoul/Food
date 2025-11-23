import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Offers() {
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

  const offers = [
    {
      title: "🔥 20% OFF on all Appetizers",
      desc: "Limited-time offer! Enjoy delicious appetizers at a discounted price.",
    },
    {
      title: "🥤 Free Drink with Every Pizza",
      desc: "Order any pizza and receive a free cold beverage.",
    },
    {
      title: "🍽️ Buy 2 Main Dishes, Get 1 FREE",
      desc: "Perfect for family meals! Save more when you buy in combos.",
    },
    {
      title: "🚚 Free Delivery on Orders Over $30",
      desc: "No delivery fee for orders above the minimum!",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">

      {/* Navbar */}
      <div className="w-full flex justify-end items-center gap-6 p-4 shadow bg-gray-50">
        <Link to="/home" className="text-gray-700 hover:text-orange-500 font-medium">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium">Contact</Link>
        <Link to="/services" className="text-gray-700 hover:text-orange-500 font-medium">Services</Link>
        <Link to="/offers" className="text-gray-700 hover:text-orange-500 font-medium">Offers</Link>
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

      {/* Hero Banner with Background Image */}
      <div
        className="w-full h-64 md:h-96 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center p-4">
            Exclusive Offers
          </h1>
        </div>
      </div>

      {/* Offers List */}
      <div className="bg-gray-100 p-10 flex justify-center">
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
            Special Offers
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-6 rounded-xl border-l-4 border-orange-500"
              >
                <h3 className="text-2xl font-semibold text-orange-600 mb-1">
                  {offer.title}
                </h3>
                <p className="text-gray-600">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
