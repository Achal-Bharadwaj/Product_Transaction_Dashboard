import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/transactions";

export const fetchTransactions = async (month, page = 1, perPage = 10, search = "") => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { month, page, perPage, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return null;
  }
};

export const fetchStatistics = async (month) => {
  try {
    if (!month) {
      console.error("❌ Month parameter is missing in API call!");
      return null;
    }

    console.log("✅ Fetching statistics for month:", month); // Debugging log
    const response = await axios.get("http://localhost:5000/api/transactions/statistics", {
      params: { month },
    });

    console.log("✅ API Response:", response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching statistics:", error.response?.data || error.message);
    return null;
  }
};


export const fetchBarChart = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bar-chart`, { params: { month } });
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    return null;
  }
};

export const fetchPieChart = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pie-chart`, { params: { month } });
    return response.data;
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    return null;
  }
};

export const fetchCombinedData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/combined`, { params: { month } });
    return response.data;
  } catch (error) {
    console.error("Error fetching combined data:", error);
    return null;
  }
};
