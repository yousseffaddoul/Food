import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import emailjs from "@emailjs/browser";

function Contact() {
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

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!isAuthChecked) return <Navbar />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const SERVICE_ID = "service_4he2lwd";
  const TEMPLATE_ID = "template_mzh67af";
  const PUBLIC_KEY = "Uhk2tV_iOwFev25Qa";

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
  name: form.name,
  email: form.email,
  to_email: "yousseffaddoul52@gmail.com",
  message: form.message,
};


    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send message. Please try again.");
      });
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        <div className="w-full flex justify-end items-center gap-6 p-4 shadow bg-white/80">
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

        <div className="min-h-screen flex justify-center items-center p-6">
          <div className="bg-white/90 shadow-lg p-8 rounded-xl w-full max-w-lg backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  rows="5"
                  placeholder="Type your message..."
                  required
                ></textarea>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
