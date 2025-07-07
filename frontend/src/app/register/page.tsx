"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", form);

      const { token } = res.data as {token : string}
      localStorage.setItem("token", token); 
      router.push("/"); 
    } catch (err) {
      console.log(err);
      setError("Registration failed");
    }
  };

  return(
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">📝 Register</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
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
          <label className="block text-sm mb-1">Password</label>
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
          className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </main>
  )
}