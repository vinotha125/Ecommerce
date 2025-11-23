// src/Components/CategorySalesPieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"];

const categorySalesData = [
  { category: "Electronics", sales: 12000 },
  { category: "Fashion", sales: 9000 },
  { category: "Home", sales: 7000 },
  { category: "Beauty", sales: 5000 },
  { category: "Sports", sales: 4000 },
];

const CategorySalesPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categorySalesData}
          dataKey="sales"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {categorySalesData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategorySalesPieChart;
