import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addOrder } from "../redux/orderSlice";


const Checkout = ({setOrder}) => {
  const [billingToggle, setBillingToggle] = useState(true);
  const [shippingToggle, setShippingToggle] = useState(true);
  const [paymentToggle, setPaymentToggle] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingInfo, setShippingInfo]=useState({
    address:"",
    city:"",
    pin:""
  } )


  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

 const handleOrder = () => {       // ✅ replace this function
    const newOrder = {
      id: Date.now(),
      products: cart.products,
      orderNumber: "1234",
      shippingInformation: shippingInfo,
      totalPrice: cart.totalPrice,
      date: new Date().toLocaleString(),
    };

    dispatch(addOrder(newOrder));  // save order
    setOrder(newOrder);
    navigate('/order-confirmation');
  };
  return (
    <div>
      <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
        <h2 className="text-2xl font-semibold mb-4">CHECKOUT</h2>

        <div className="flex flex-col md:flex-row justify-between gap-10 mt-8">

          {/* Left Section */}
          <div className="md:w-2/3">

            {/* Billing Info */}
            <div className="border p-2 mb-6">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setBillingToggle(!billingToggle)}
              >
                <h3 className="text-lg font-medium">Billing Information</h3>
                {billingToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>

              <div className={`space-y-4 ${billingToggle ? "" : "hidden"}`}>
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="w-full px-3 py-2 border"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name='email'
                    placeholder="Enter Email"
                    className="w-full px-3 py-2 border"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter Phone"
                    className="w-full px-3 py-2 border"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border p-2 mb-6">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setShippingToggle(!shippingToggle)}
              >
                <h3 className="text-lg font-medium">Shipping Information</h3>
                {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>

              <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    className="w-full px-3 py-2 border"
                    onChange={(e)=>setShippingInfo({...shippingInfo,address:e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    className="w-full px-3 py-2 border"
                    onChange={(e)=>setShippingInfo({...shippingInfo, city: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Pin Code</label>
                  <input
                    type="number"
                    name="pincode"
                    placeholder="Enter Pincode"
                    className="w-full px-3 py-2 border"
                    onChange={(e)=>setShippingInfo({...shippingInfo, pin: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="border p-2 mb-6">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setPaymentToggle(!paymentToggle)}
              >
                <h3 className="text-lg font-medium">Payment Information</h3>
                {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>

              <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <label className="block text-gray-700 ml-2">Cash on Delivery</label>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "dc"}
                    onChange={() => setPaymentMethod("dc")}
                  />
                  <label className="block text-gray-700 ml-2">Debit Card</label>
                </div>
              </div>

              {paymentMethod === "dc" && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-4">Debit Card Information</h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      className="border p-2 w-full rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Card Holder Name"
                      className="border p-2 w-full rounded"
                    />
                  </div>

                  <div className="flex justify-between mb-4">
                    <div className="w-1/2 mr-2">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="border p-2 w-full rounded"
                        required
                      />
                    </div>

                    <div className="w-1/2 ml-2">
                      <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="CVV"
                        className="border p-2 w-full rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div>
              {cart.products.map((product, index) => (
                <div key={index} className="flex items-center mb-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 mr-3 object-cover" />
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p>${product.price} × {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-semibold mt-4">
              <span>Total Price:</span>
              <span>&#8377;{cart.totalPrice.toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={handleOrder}>
              Place Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
