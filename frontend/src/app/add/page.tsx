"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AddTransactionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    type: "EXPENSE",
    amount: "",
    category: "",
    note: "",
    date: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) return setError("Not logged in");

      await axios.post("http://localhost:4000/api/transactions", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push("/history");
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">+ Add Transaction</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 "
        />

        
        <input
          name="note"
          placeholder="Note"
          value={form.note}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />

         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">
          Save
        </button>
      </form>
    </div>
  );
}
