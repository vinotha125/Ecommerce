import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import Login from './Login'
import Register from './Register'
import { setSearchTerm } from '../redux/productSlice'

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setSearchTerm(search))
    navigate('/filter-data')
  }

  const openSignUp = () => {
    setIsLogin(false)
    setIsModalOpen(true)
  }

  const openLogin = () => {
    setIsLogin(true)
    setIsModalOpen(true)
  }

  const products = useSelector((state) => state.cart.products)

  return (
    <nav className='bg-white shadow-md'>
      <div className='container mx-auto px-4 md:px-16 lg:px-24 py-4 flex items-center justify-between'>

       
        <div className='flex item-center'>
          <div className="w-1/4 m">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            ShopEase
          </Link>
        </div>

          
        </div>

        {/* CENTER: Nav Links */}
        <div className='flex justify-center w-1/3 space-x-6 font-semibold text-lg'>
          <Link to="/" className='hover:text-red-600 transition'>Home</Link>
          <Link to="/shop" className='hover:text-red-600 transition'>Shop</Link>
          <Link to="/about" className='hover:text-red-600 transition'>About</Link>
          <Link to="/contact" className='hover:text-red-600 transition'>Contact</Link>
        </div>

        {/* RIGHT: Cart + Login */}
        <div className='flex items-center justify-end gap-4 w-1/3'>
          <Link to="/cart" className='relative'>
            <FaShoppingCart className='text-lg' />
            {products.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {products.length}
              </span>
            )}
          </Link>

          <form onSubmit={handleSearch} className='relative flex-1 hidden md:block'>
            <input
              type="text"
              placeholder="Search products..."
              className='w-full border py-2 px-4 rounded focus:outline-none text-sm'
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className='absolute top-3 right-3 text-red-500' />
          </form>

          <button className='hidden md:block text-lg font-medium' onClick={openLogin}>
            Login | Register
          </button>

          <button className='block md:hidden'>
            <FaUser />
          </button>
        </div>
      </div>

    
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {isLogin ? <Login openSignUp={openSignUp} /> : <Register openLogin={openLogin} />}
      </Modal>
    </nav>
  )
}

export default Navbar
