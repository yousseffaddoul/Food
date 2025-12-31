import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); // parse once

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
console.log("Login response:", data);
    navigate("/home"); // ✅ Now it works
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error. Check console for details.");
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
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
          Login to continue ordering your favorite meals
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-gray-700 font-medium text-sm sm:text-base">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full mt-1 p-3 sm:p-4 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-700 font-medium text-sm sm:text-base">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full mt-1 p-3 sm:p-4 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-sm sm:text-base"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer font-medium" onClick={() => navigate("/register")}>
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
