// Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import emailjs from "@emailjs/browser";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const cart = location.state?.cart || [];
  const total = location.state?.total || 0;

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    address: "",
    note: "",
    payment: "Cash on Delivery",
  });
  const SERVICE_ID = "service_4he2lwd";
  const TEMPLATE_ID = "template_ii9vdis";
  const PUBLIC_KEY = "Uhk2tV_iOwFev25Qa";

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.find((u) => u.email === localStorage.getItem("auth"));

    if (!currentUser) {
      alert("Cannot find your registered email!");
      return;
    }

    const templateParams = {
      name: form.fullname,
      email: currentUser.email,
      order_items: cart
        .map((item) => `${item.qty} × ${item.name} - $${(item.price * item.qty).toFixed(2)}`)
        .join("<br>"),
      total: total.toFixed(2),
      address: form.address,
      payment: form.payment,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        alert("Order placed successfully! Confirmation email sent.");
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        alert("Order placed but email failed to send.");
        navigate("/home");
      });
  };

  if (!isAuthChecked) return <Navbar />;

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
        <div className="w-full max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white/90 shadow-lg p-6 rounded-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label className="font-medium">Payment Method</label>
                <select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                >
                  <option>Cash on Delivery</option>
                  <option>Credit/Debit Card</option>
                  <option>Online Payment</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg mt-4"
              >
                Place Order
              </button>
            </form>
          </div>
          <div className="bg-white/90 shadow-lg p-6 rounded-xl h-fit sticky top-10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Your Order</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-3">
                  <p className="font-medium">{item.qty} × {item.name}</p>
                  <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))
            )}
            <div className="border-t my-3"></div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
