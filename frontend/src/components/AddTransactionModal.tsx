"use client";

import axios from "axios";
import { useState } from "react";


export default function AddTransactionModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    type: "EXPENSE",
    amount: 0,
    category: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/transactions", form);
      onClose();
    } catch (err) {
      console.error("Failed to add transaction", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Add Transaction</h2>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          type="text"
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
