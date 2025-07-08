import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center mt-[160px]">
      <div className="max-w-3xl mx-auto p-10 text-center bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900">
          💸 Personal Finance Tracker
        </h1>
        <p className="text-gray-600 mb-10 text-lg sm:text-xl">
          Effortlessly track your income, expenses, and visualize your financial
          journey.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/add">
            <Button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-700 transition">
              ➕ Add Transaction
            </Button>
          </Link>

          <Link href="/history">
            <Button className="flex items-center gap-2 bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-gray-100 transition">
              📜 View History
            </Button>
          </Link>

          <Link href="/analytics">
            <Button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-purple-700 transition">
              📊 Analytics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
