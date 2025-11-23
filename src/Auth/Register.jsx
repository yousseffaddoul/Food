import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const SERVICE_ID = "service_4he2lwd";
  const TEMPLATE_ID = "template_mzh67af";
  const PUBLIC_KEY = "Uhk2tV_iOwFev25Qa";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === form.email)) {
      alert("Email already registered!");
      return;
    }
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    const templateParams = {
      name: form.name,
      email: form.email,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        alert("Registered successfully! Welcome email sent.");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("Registered successfully! But email failed to send.");
        navigate("/login");
      });
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Create Account 📝
        </h2>
        <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
          Join us and start ordering delicious meals
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="text-gray-700 font-medium text-sm sm:text-base">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 sm:p-4 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 sm:p-4 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 sm:p-4 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base"
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          <Link className="text-yellow-600 font-medium" to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
