import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Login from './Login';
import { auth } from './firebase.jsx';

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (auth.currentUser) {
      // User is logged in → add to cart
      dispatch(addToCart(product));
      alert('Product Added Successfully!');
    } else {
      // User not logged in → show login modal
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Link to={`/product/${product.id}`}>
        <div className="bg-white p-4 shadow rounded relative border border-gray-200 
          transform transition-transform duration-300 hover:scale-105">

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain mb-4"
          />

          {/* Title */}
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>

          {/* Price + Stars */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-700 font-medium">₹{product.price}</p>
            <div className="flex items-center">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-gray-300" /> {/* empty star */}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => handleAddCart(e, product)}
            className="w-full bg-red-600 text-white text-sm font-semibold py-2 rounded-full 
              hover:bg-red-700 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Login Modal */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Login closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ProductCart;
