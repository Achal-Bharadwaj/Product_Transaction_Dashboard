import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function TransactionsBarChart({ barChartData }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Price Range Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "45%",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    color: "#333",
  },
};

export default TransactionsBarChart;
