import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6 md:px-16 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold mb-3">ShopEase</h3>
          <p className="text-gray-300">
            Your one-stop shop for all your needs. Shop with us and enjoy the best online shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/shop" className="hover:underline">Shop</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Social + Subscribe */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-2xl mb-5">
            <a href="#" className="hover:text-gray-400"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400"><FaGithub /></a>
            <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
          </div>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg border border-gray-600 hover:bg-yellow-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
