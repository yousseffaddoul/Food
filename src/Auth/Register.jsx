import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // ✅ Correct API route
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
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
