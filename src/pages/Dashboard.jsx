import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaStar, FaStarHalfAlt, FaRegStar, FaTachometerAlt, FaBoxOpen, FaShoppingCart } from "react-icons/fa";

const Dashboard = () => {
  const products = useSelector((state) => state.product.products);
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    rating: 0,
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  const chartData = orders.map((order) => ({
    name: `Order #${order.orderNumber}`,
    revenue: order.totalPrice,
  }));

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      else if (rating >= i - 0.5)
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 inline" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
    }
    return stars;
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || newProduct.rating <= 0) {
      return alert("Please fill all fields correctly!");
    }

    const productData = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      rating: parseFloat(newProduct.rating),
    };

    dispatch(addProduct(productData));
    setNewProduct({ name: "", price: "", image: "", rating: 0 });
    alert("Product added!");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-700 ${
              activeTab === "dashboard" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaTachometerAlt /> Dashboard
          </button>
          <button
            className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-700 ${
              activeTab === "products" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            <FaBoxOpen /> Products
          </button>
          <button
            className={`flex items-center gap-2 w-full p-2 rounded hover:bg-gray-700 ${
              activeTab === "orders" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <FaShoppingCart /> Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <div className="bg-green-500 text-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Total Orders</h2>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
              <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Total Revenue</h2>
                <p className="text-3xl font-bold">₹{totalRevenue.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Revenue per Order</h2>
              {orders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </>
        )}

        {activeTab === "products" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            {/* Add New Product */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="border p-2 rounded"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border p-2 rounded"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="border p-2 rounded"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Rating (0-5)"
                  className="border p-2 rounded"
                  value={newProduct.rating}
                  onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                />
              </div>
              <button
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Products List</h2>
              {products.length === 0 ? (
                <p>No products yet.</p>
              ) : (
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Price</th>
                      <th className="p-2 border">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="p-2 border">{product.name}</td>
                        <td className="p-2 border">₹{product.price}</td>
                        <td className="p-2 border">{renderStars(product.rating)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Order No</th>
                    <th className="p-2 border">Items</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="p-2 border">{order.orderNumber}</td>
                      <td className="p-2 border">{order.products.length} items</td>
                      <td className="p-2 border">₹{order.totalPrice}</td>
                      <td className="p-2 border">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
