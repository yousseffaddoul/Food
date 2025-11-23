import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

const categories = ["Appetizers", "Soups", "Main courses", "Pizza", "More"];

const products = {
  Appetizers: [
    { id: 1, name: "Appetizer 1 (450g)", price: 29, tags: ["Spicy"], img: "/images/spicy.jpg" },
    { id: 2, name: "Appetizer 2 (450g)", price: 22, tags: ["Gluten"], img: "/images/glutten.jpg" },
    { id: 3, name: "Appetizer 3 (450g)", price: 21, tags: ["wedges"], img: "/images/potato-wedges.jpg" },
  ],
  Soups: [
    { id: 4, name: "Tomato Soup", price: 15, tags: ["Vegan"], img: "/images/tomato-soup-recipe.jpg" },
    { id: 5, name: "Chicken Soup", price: 18, tags: ["Gluten"], img: "/images/Chicken-Soup.webp" },
  ],
  "Main courses": [
    { id: 6, name: "Grilled Chicken", price: 35, tags: ["Spicy"], img: "/images/chicken.jpg" },
    { id: 7, name: "Beef Steak", price: 45, tags: ["Bestseller"], img: "/images/steak.jpg" },
  ],
  Pizza: [
    { id: 8, name: "Margherita Pizza", price: 20, tags: ["Vegetarian"], img: "/images/marguerittapizza.jpg" },
    { id: 9, name: "Pepperoni Pizza", price: 25, tags: ["Spicy"], img: "/images/peperoniepizza.jpg" },
  ],
  More: [
    { id: 10, name: "Fries", price: 10, tags: ["Vegan"], img: "/images/fries.jpg" },
    { id: 11, name: "Ice Cream", price: 12, tags: ["Bestseller"], img: "/images/icecream.jpg" },
  ],
};

function HomePage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [navigate]);

  const addToCart = (item) => {
    const exists = cart.find((p) => p.id === item.id);
    if (exists) {
      setCart(cart.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };
  const removeFromCart = (id) => setCart(cart.filter((p) => p.id !== id));
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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
      <div className="relative z-10 w-full min-h-screen">
        <div className="w-full flex justify-end items-center gap-6 p-4 shadow bg-gray-50/80">
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

        <div className="p-4 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex gap-3 mb-6 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full border ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <h2 className="text-3xl font-semibold mb-4 text-white">{selectedCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products[selectedCategory].map((item) => (
                <div key={item.id} className="shadow rounded-xl p-3 bg-white/90 backdrop-blur-sm">
                  <img src={item.img} alt={item.name} className="rounded-lg w-full h-40 object-cover" />
                  <h3 className="font-semibold mt-3">{item.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    {item.tags.map((t, index) => (
                      <span key={index} className="flex items-center gap-1">
                        {t === "Spicy" && "🌶️"}
                        {t === "Gluten" && "🍞"}
                        {t === "Bestseller" && "⭐"}
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="font-semibold mt-3">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-3"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-80 bg-gray-50/90 shadow-xl p-6 rounded-2xl h-fit sticky top-4">
            <h3 className="text-2xl font-bold mb-4">Your order</h3>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <p>
                    {item.qty} × {item.name}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p>${(item.price * item.qty).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ))
            )}

            <div className="border-t my-3"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() =>
                navigate("/checkout", {
                  state: { cart: cart, total: total },
                })
              }
              disabled={cart.length === 0}
              className={`w-full mt-4 py-3 rounded-lg text-lg ${
                cart.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              Go to checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
