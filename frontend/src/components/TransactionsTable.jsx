import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";

function TransactionsTable({ month }) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions(month, page, perPage, search);
      if (data) {
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      }
    };

    getTransactions();
  }, [month, page, search]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Transactions</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title, description, or price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      {/* Transactions Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Title</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Price ($)</th>
              <th style={styles.tableHeader}>Category</th>
              <th style={styles.tableHeader}>Sold</th>
              <th style={styles.tableHeader}>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <>
                  <tr key={transaction._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td style={styles.tableCell}>{transaction.title}</td>
                    <td style={styles.tableCell}>{transaction.description}</td>
                    <td style={styles.tableCell}>${transaction.price.toFixed(2)}</td>
                    <td style={styles.tableCell}>{transaction.category}</td>
                    <td style={{ ...styles.tableCell, color: transaction.sold ? "#4CAF50" : "#FF6B6B" }}>
                      {transaction.sold ? "Yes" : "No"}
                    </td>
                    <td style={styles.tableCell}>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                  </tr>
                  <tr style={styles.emptyRow}></tr>
                </>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.noData}>
                  No Transactions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          style={styles.button}
        >
          ◀ Previous
        </button>
        <span style={styles.pageInfo}> Page {page} of {totalPages} </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          style={styles.button}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

// Dark Theme Styling
const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(255, 255, 255, 0.1)",
    marginTop: "20px",
    textAlign: "center",
    color: "#ffffff",
  },
  title: {
    marginBottom: "10px",
    fontSize: "24px",
    color: "#ffffff",
  },
  searchInput: {
    padding: "8px",
    width: "300px",
    marginBottom: "10px",
    backgroundColor: "#333",
    color: "#ffffff",
    border: "1px solid #444",
    borderRadius: "5px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#2a2a2a",
  },
  tableHeader: {
    backgroundColor: "#333333",
    color: "#ffffff",
    padding: "14px",
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
  },
  tableCell: {
    padding: "14px",
    borderBottom: "1px solid #444",
    textAlign: "left",
  },
  evenRow: {
    backgroundColor: "#252525",
  },
  oddRow: {
    backgroundColor: "#1e1e1e",
  },
  noData: {
    padding: "12px",
    textAlign: "center",
    color: "#FF6B6B",
    fontSize: "16px",
  },
  emptyRow: {
    height: "12px",
  },
  button: {
    padding: "10px 16px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "#ffffff",
    border: "1px solid #444",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#555",
  },
  pagination: {
    marginTop: "15px",
  },
  pageInfo: {
    margin: "0 10px",
    fontSize: "16px",
    color: "#ffffff",
  },
};

export default TransactionsTable;
