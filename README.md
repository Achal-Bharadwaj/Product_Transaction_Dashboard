# Product Transaction Dashboard - using MERN Stack

## 🚀 Project Overview

This is a **MERN Stack (MongoDB, Express, React, Node.js)** project that displays product transactions in a table with search, pagination, and interactive charts. It fetches transaction data, provides filtering, and generates statistics using backend APIs.

## 🎯 Features

- **Transaction Table:** Lists all product transactions with search & pagination
- **Statistics Section:** Shows total sales, sold & unsold items
- **Bar Chart:** Displays price range distribution of transactions
- **Pie Chart:** Shows category-wise item distribution
- **Month Selection:** Filters data by month, regardless of year
- **Backend API Integration:** Fetches and processes data from a third-party API

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Axios, Recharts
- **Backend:** Node.js, Express.js, MongoDB
- **Database:** MongoDB Atlas / Local MongoDB
- **Deployment:** GitHub, Render (Backend), Vercel (Frontend)

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/mern-transaction-dashboard.git
cd mern-transaction-dashboard
```

### 2️⃣ Install Backend Dependencies

```sh
cd backend
npm install
```

### 3️⃣ Setup `.env` File in Backend

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
THIRD_PARTY_API=https://s3.amazonaws.com/roxiler.com/product_transaction.json
```

### 4️⃣ Start Backend Server

```sh
npm run dev
```

### 5️⃣ Install Frontend Dependencies

```sh
cd ../frontend
npm install
```

### 6️⃣ Start Frontend Server

```sh
npm run dev
```

📌 **Frontend runs on** `http://localhost:5173/`\
📌 **Backend runs on** `http://localhost:5000/`

---

## 📡 API Endpoints

### 🔹 Initialize Database (Fetch & Seed Data)

```http
GET /api/initialize-db
```

**Response:** `{ "message": "Database initialized successfully!" }`

### 🔹 Get Transactions (Search & Pagination)

```http
GET /api/transactions?month=March&page=1&perPage=10&search=laptop
```

**Response:** List of transactions

### 🔹 Get Statistics (Total Sales, Sold & Unsold Items)

```http
GET /api/transactions/statistics?month=March
```

**Response:**

```json
{
  "totalSales": 10500.50,
  "totalSoldItems": 35,
  "totalUnsoldItems": 15
}
```

### 🔹 Get Bar Chart Data (Price Range Distribution)

```http
GET /api/transactions/bar-chart?month=March
```

**Response:** `{ "range": "0-100", "count": 5 }`

### 🔹 Get Pie Chart Data (Category-wise Count)

```http
GET /api/transactions/pie-chart?month=March
```

**Response:** `{ "category": "Electronics", "count": 20 }`

### 🔹 Get Combined Data (Statistics, Bar & Pie Chart)

```http
GET /api/transactions/combined?month=March
```

---

## 🚀 Deployment Guide

### 📌 Deploy Backend to Render

1. **Push Code to GitHub**
2. **Go to** [Render](https://render.com/) and create a new Web Service
3. **Connect GitHub Repository**
4. **Set Environment Variables** (MONGO\_URI, PORT, THIRD\_PARTY\_API)
5. **Deploy & Get the Live Backend URL**

### 📌 Deploy Frontend to Vercel

1. **Push Code to GitHub**
2. **Go to** [Vercel](https://vercel.com/) and create a new project
3. **Connect GitHub Repository**
4. \*\*Update \*\***`frontend/src/services/api.js`** with the live backend URL
5. **Deploy & Get the Live Frontend URL**

---

## 🎉 Conclusion

This project successfully demonstrates a **full-stack MERN dashboard** with data visualization and filtering. Feel free to enhance it with more features or a better UI!

🚀 **Developed by Achal S Bharadwaj**\
🔗 **GitHub:** [https://github.com/Achal-Bharadwaj](https://github.com/Achal-Bharadwaj)\


