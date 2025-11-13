import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
      <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
        Have questions or need help with your order? We’re here to assist you!
        Reach out to us using the details below or send us a message directly.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="flex flex-col items-center">
          <FaPhoneAlt className="text-red-600 text-2xl mb-2" />
          <p className="text-gray-800 font-medium">+91 98765 43210</p>
        </div>

        <div className="flex flex-col items-center">
          <FaEnvelope className="text-red-600 text-2xl mb-2" />
          <p className="text-gray-800 font-medium">support@shopease.com</p>
        </div>

        <div className="flex flex-col items-center">
          <FaMapMarkerAlt className="text-red-600 text-2xl mb-2" />
          <p className="text-gray-800 font-medium">Chennai, India</p>
        </div>
      </div>

      <form className="max-w-lg mx-auto mt-10 bg-gray-100 p-6 rounded-2xl shadow-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
