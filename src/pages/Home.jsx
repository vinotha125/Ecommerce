import React, { useEffect, useState } from 'react';
import { mockData } from '../assets/mockData';
import hero from '../assets/images/hero.jpg';
import InfoSection from '../Components/InfoSection';
import CategorySection from '../Components/CategorySection';
import { setProducts } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCart from '../Components/ProductCart';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import Login from '../Components/Login';
import { auth } from '../Components/firebase.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(setProducts(mockData));
  }, [dispatch]);

  const handleShopNow = () => {
    if (auth.currentUser) {
      navigate('/shop');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      {/* ✅ Hero Section */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
        <img src={hero} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute top-1/3 left-8 md:left-16 text-white pl-16">
          <p className="text-lg md:text-2xl font-medium mb-2 drop-shadow-lg">
            Trendify | ShopEase
          </p>
          <h2 className="text-xl md:text-4xl font-bold drop-shadow-lg">
            Welcome to SHOPEASE
          </h2>
          <p className="text-xl md:text-2xl mt-3 font-semibold drop-shadow-lg">
            Millions + Products
          </p>
          <button
            onClick={handleShopNow}
            className="bg-red-600 px-8 py-2 mt-4 text-white rounded-md hover:bg-red-700 transform transition-transform duration-300 hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* ✅ Info + Category + Products */}
      <div className="bg-white px-4 md:px-16 lg:px-24">
        <InfoSection />
        <CategorySection />

        <div className="container mx-auto py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Top Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 cursor-pointer">
            {products.products.slice(0, 5).map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Login closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Home;
