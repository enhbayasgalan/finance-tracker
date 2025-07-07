"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        form
      );

      const { token } = res.data as {token : string}

      localStorage.setItem("token", token);

      router.push("/");
    } catch (err) {
      console.log(err);
      setError("Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">🔐 Login</h2>

        {error && (
          <p className="mb-4 text-red-500 font-medium text-sm">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1 text-black">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-black">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </main>
  );
}
