import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import { setSearchTerm } from '../redux/productSlice';
import { auth } from './firebase.jsx';
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // 🌟 MOBILE MENU

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.cart?.products || []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
  };

  const handleProtectedClick = (e, path) => {
    if (!auth.currentUser) {
      e.preventDefault();
      setIsLogin(true);
      setIsModalOpen(true);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ShopEase
        </Link>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center space-x-6 font-semibold text-lg">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>

          <button onClick={(e) => handleProtectedClick(e, "/shop")}
            className="hover:text-red-600 transition">Shop</button>

          <button onClick={(e) => handleProtectedClick(e, "/about")}
            className="hover:text-red-600 transition">About</button>

          <button onClick={(e) => handleProtectedClick(e, "/contact")}
            className="hover:text-red-600 transition">Contact</button>

          <Link to="/admin/dashboard" className="hover:text-red-600 transition">
            Dashboard
          </Link>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-lg" />
            {products.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {products.length}
              </span>
            )}
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="border py-2 px-4 rounded focus:outline-none text-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute top-2 right-2 text-red-500" />
          </form>

          {/* Login / Logout */}
          {!auth.currentUser ? (
            <button
              className="text-lg font-medium hover:text-red-600 transition"
              onClick={() => { setIsLogin(true); setIsModalOpen(true); }}
            >
              Login | Register
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">
                {auth.currentUser.email}
              </span>

              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🌟 MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-md">

          <Link to="/" className="block font-semibold text-lg hover:text-red-600"
            onClick={() => setMenuOpen(false)}>Home</Link>

          <button
            onClick={(e) => { handleProtectedClick(e, "/shop"); setMenuOpen(false); }}
            className="block font-semibold text-lg hover:text-red-600"
          >
            Shop
          </button>

          <button
            onClick={(e) => { handleProtectedClick(e, "/about"); setMenuOpen(false); }}
            className="block font-semibold text-lg hover:text-red-600"
          >
            About
          </button>

          <button
            onClick={(e) => { handleProtectedClick(e, "/contact"); setMenuOpen(false); }}
            className="block font-semibold text-lg hover:text-red-600"
          >
            Contact
          </button>

          <Link to="/admin/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block font-semibold text-lg hover:text-red-600">
            Dashboard
          </Link>

          {/* Mobile Cart */}
          <Link to="/cart" className="relative flex items-center gap-2">
            <FaShoppingCart />
            <span>Cart</span>
            {products.length > 0 && (
              <span className="absolute top-0 left-16 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {products.length}
              </span>
            )}
          </Link>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border py-2 px-3 rounded w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>
              <FaSearch className="text-red-500 mt-2" />
            </button>
          </form>

          {/* Mobile Login/Logout */}
          {!auth.currentUser ? (
            <button
              className="text-lg font-medium hover:text-red-600"
              onClick={() => { setIsLogin(true); setIsModalOpen(true); setMenuOpen(false); }}
            >
              Login | Register
            </button>
          ) : (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          )}

        </div>
      )}

      {/* Modal */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {isLogin ? (
          <Login
            switchToRegister={() => setIsLogin(false)}
            closeModal={() => setIsModalOpen(false)}
          />
        ) : (
          <Register
            switchToLogin={() => setIsLogin(true)}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
