import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Services() {
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

  const services = [
    {
      title: "Fast Delivery",
      desc: "Receive your order in minutes with our optimized delivery system.",
      icon: "⚡",
    },
    {
      title: "Fresh Ingredients",
      desc: "We use high-quality and fresh products in every dish we prepare.",
      icon: "🥗",
    },
    {
      title: "24/7 Support",
      desc: "Our team is here anytime to help you with your orders and questions.",
      icon: "📞",
    },
    {
      title: "Secure Payments",
      desc: "Pay safely online using trusted and encrypted payment methods.",
      icon: "💳",
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
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center p-4">
            Our Services
          </h1>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gray-100 p-10 flex justify-center">
        <div className="max-w-5xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl mb-4">{s.icon}</div>
                <h2 className="text-2xl font-semibold mb-2">{s.title}</h2>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
