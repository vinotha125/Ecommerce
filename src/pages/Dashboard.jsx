// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { FaStar, FaStarHalfAlt, FaRegStar, FaTachometerAlt, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import MonthlyRevenuePieChart from "../Components/MonthlyRevenueBarChart";
import CategorySalesPieChart from "../Components/CategorySalesPieChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products || []);
  const orders = useSelector((state) => state.order?.orders || []);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "", rating: 0 });

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const numRating = Number(rating);
    for (let i = 1; i <= 5; i++) {
      if (numRating >= i) stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      else if (numRating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 inline" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
    }
    return stars;
  };

  // Add new product
  const handleAddProduct = () => {
    const { name, price, image, rating } = newProduct;
    if (!name || !price || !image || rating < 0 || rating > 5) {
      return alert("Please fill all fields correctly! Rating must be 0-5");
    }

    const productData = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      image,
      rating: parseFloat(rating),
    };

    dispatch(addProduct(productData));
    setNewProduct({ name: "", price: "", image: "", rating: 0 });
    alert("Product added!");
  };

  // Per-order revenue chart data
  const barChartData = orders.map((order, idx) => ({
    name: `Order ${order.orderNumber || idx + 1}`,
    total: order.totalPrice,
  }));

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
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Top Cards */}
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

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <MonthlyRevenuePieChart />
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Revenue per Order</h2>
                <CategorySalesPieChart />
              </div>
            </div>
          </>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Products</h1>

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
                  min={0}
                  max={5}
                  step={0.5}
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
                        <td className="p-2 border">{renderStars(Number(product.rating))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Orders Tab */}
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
