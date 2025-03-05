import { useState, useEffect } from "react";
import TransactionsTable from "./components/TransactionsTable";
import StatisticsSection from "./components/StatisticsSection";
import TransactionsBarChart from "./components/BarChart";
import TransactionsPieChart from "./components/PieChart";
import { fetchCombinedData } from "./services/api";

function App() {
  const [month, setMonth] = useState("March");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      console.log("Fetching data for month:", month);
      setLoading(true);
      try {
        const response = await fetchCombinedData(month);
        console.log("API Response:", response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    getData();
  }, [month]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Transactions Dashboard</h1>

      {/* Month Selection Dropdown */}
      <div style={styles.dropdownContainer}>
        <label style={styles.label}>Select Month: </label>
        <select value={month} onChange={(e) => setMonth(e.target.value)} style={styles.select}>
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : data ? (
        <>
          <StatisticsSection month={month} statistics={data.statistics} />

          {/* Charts Section */}
          <div style={styles.chartsContainer}>
            <TransactionsBarChart barChartData={data.barChart} />
            <TransactionsPieChart pieChartData={data.pieChart} />
          </div>

          {/* Transactions Table */}
          <TransactionsTable month={month} />
        </>
      ) : (
        <p style={styles.error}>Failed to load data</p>
      )}
    </div>
  );
}

// CSS Styling
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#121212", // Dark background
    color: "#ffffff", // Light text
    minHeight: "100vh",
  },
  header: {
    color: "#ffffff",
    fontSize: "28px",
    marginBottom: "20px",
  },
  dropdownContainer: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "18px",
    marginRight: "10px",
    color: "#ffffff",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "1px solid #444",
    borderRadius: "5px",
  },
  chartsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
    marginTop: "20px",
  },
  error: {
    color: "#ff6b6b",
    fontWeight: "bold",
  },
};

export default App;
