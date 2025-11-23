// src/Components/MonthlyRevenueBarChart.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#FF9800", "#9C27B0"];

const monthlyRevenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 7000 },
];

const MonthlyRevenueBarChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={monthlyRevenueData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip formatter={(value) => `₹${value}`} />
      <Legend verticalAlign="top" height={36} />
      <Bar dataKey="revenue">
        {monthlyRevenueData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default MonthlyRevenueBarChart;
