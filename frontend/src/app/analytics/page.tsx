"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Transaction {
  id: string;
  category: string;
  amount: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<{ category: string; total: number }[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Auth token not found. Please login.");
          return;
        }

        const res = await axios.get<Transaction[]>(
          "http://localhost:4000/api/transactions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const grouped = res.data.reduce<Record<string, number>>((acc, txn) => {
          acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
          return acc;
        }, {});

        const chartData = Object.entries(grouped).map(([category, total]) => ({
          category,
          total,
        }));

        setData(chartData);
        setError("");
      } catch (err) {
       console.log(err);
       setError("Failed to fetch data")
      }
    };

    fetchData();
  }, []);

  return(
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Analytics</h1>

      {error && (
        <p className="mb-4 text-red-600 font-semibold">{error}</p>
      )}

      {!error && data.length === 0 && (
        <p>No data to display</p>
      )}

      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
