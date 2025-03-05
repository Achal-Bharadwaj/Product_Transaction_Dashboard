import { useEffect, useState } from "react";
import { fetchStatistics } from "../services/api";

function StatisticsSection({ month }) {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStatistics = async () => {
      setLoading(true);
      try {
        const data = await fetchStatistics(month);
        console.log("Statistics Data:", data);
        if (data) {
          setStatistics(data);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
      setLoading(false);
    };

    getStatistics();
  }, [month]);

  return (
    <div style={styles.container}>
      <h2>Statistics</h2>
      {loading ? (
        <p>Loading statistics...</p>
      ) : statistics ? (
        <div>
          <p><strong>Total Sales:</strong> ${statistics.totalSales.toFixed(2)}</p>
          <p><strong>Sold Items:</strong> {statistics.totalSoldItems}</p>
          <p><strong>Unsold Items:</strong> {statistics.totalUnsoldItems}</p>
        </div>
      ) : (
        <p style={styles.error}>Failed to load statistics</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    marginBottom: "20px",
    textAlign: "center",
  },
  error: {
    color: "#FF6B6B",
    fontWeight: "bold",
  },
};

export default StatisticsSection;
