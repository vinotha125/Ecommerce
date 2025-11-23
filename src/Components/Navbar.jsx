import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import { setSearchTerm } from '../redux/productSlice';
import { auth } from './firebase.jsx';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.cart?.products || []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
  };

  // 🔥 SAME LOGIC YOU USED IN HOME
  const handleProtectedClick = (e, path) => {
    if (!auth.currentUser) {
      e.preventDefault();
      setIsLogin(true);
      setIsModalOpen(true);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ShopEase
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex justify-center space-x-6 font-semibold text-lg">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>

          <button
            onClick={(e) => handleProtectedClick(e, "/shop")}
            className="hover:text-red-600 transition"
          >
            Shop
          </button>

          <button
            onClick={(e) => handleProtectedClick(e, "/about")}
            className="hover:text-red-600 transition"
          >
            About
          </button>

          <button
            onClick={(e) => handleProtectedClick(e, "/contact")}
            className="hover:text-red-600 transition"
          >
            Contact
          </button>

          <Link to="/admin/dashboard" className="hover:text-red-600 transition">
            Dashboard
          </Link>
        </div>

        {/* Cart + Search + Login */}
        <div className="flex items-center gap-4">

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
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              className="border py-2 px-4 rounded focus:outline-none text-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute top-2 right-2 text-red-500" />
          </form>

          {/* Login Button */}
          {!auth.currentUser ? (
            <button
              className="text-lg font-medium hover:text-red-600 transition"
              onClick={() => { setIsLogin(true); setIsModalOpen(true); }}
            >
              Login | Register
            </button>
          ) : (
            <span className="text-green-600 font-semibold">
              {auth.currentUser.email}
            </span>
          )}
        </div>
      </div>

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
