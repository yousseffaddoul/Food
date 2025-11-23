import React from "react";
import { Link,useNavigate } from "react-router-dom";
function Navbar(){
    const navigate = useNavigate();
    return(
         <div className="w-full min-h-screen bg-white">
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
      </div>
    )
}
export default Navbar;