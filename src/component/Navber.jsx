import React, { useEffect, useState } from "react";
import { db } from "./firbase.cofig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BiArch } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";



const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const id = localStorage.getItem("uid");

  useEffect(() => {
    if (id) {
      const q = query(collection(db, "users"), where("uid", "==", id));
      return onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => setUserData(doc.data()));
      });
    }
  }, [id]);

  return (
    <nav className="bg-[#143d59] p-4 text-white">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h2 className="text-xl font-semibold">E-<span className="text-[#f4b41a]">commerce</span></h2>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-[#f4b41a] font-semibold">
          Home
          </Link>
          <Link to="/" className="hover:text-[#f4b41a] font-semibold">Product</Link>
          <Link to="/add" className="hover:text-[#f4b41a] font-semibold">Add to Cart</Link>
          <Link to="/" className="hover:text-[#f4b41a] font-semibold">contact us</Link>

        </div>
        <Link to="/profile" className="hidden md:flex hover:text-[#f4b41a] font-semibold">
          {userData ? `${userData.firstName} ${userData.lastName}` : "Loading..."}
        </Link>
        <button className="md:hidden text-2xl" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </button>
      </div>
      {/* side */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">E-commerce</h2>
          <button className="text-2xl" onClick={() => setIsSidebarOpen(false)}><FaTimes /></button>
        </div>
        <ul className="space-y-4 p-4">

          <Link to="/" className="gap-2 flex text-[#f4b41a] " onClick={() => setIsSidebarOpen(false)}><FaHome className="text-[23px] text-white " />Home</Link>
          <Link to="/" className="gap-2 flex text-[#f4b41a] " onClick={() => setIsSidebarOpen(false)}> <BiArch className="text-[23px] text-white " />
            Products</Link>
          <Link to="/add" className="gap-2 flex text-[#f4b41a] " onClick={() => setIsSidebarOpen(false)} > <FaCartPlus className="text-[23px] text-white " />
            Add to Cart</Link>
          <Link to="/profile" className="gap-2 flex text-[#f4b41a] " onClick={() => setIsSidebarOpen(false)}>
            <CgProfile className="text-[23px] text-white "/>

            {userData ? `${userData.firstName} ${userData.lastName}` : "Loading..."}
            </Link>
        </ul>
      </div>
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
