"use client"
import axios from "axios";
import { useEffect, useState } from "react";


type Transaction = {
    id : string;
    type : "INCOME" | "EXPENSE";
    amount: number;
    category: string;
    note? : string;
    date : string;
}

export default function HistoryPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

   useEffect(() => {
    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.get<Transaction[]>("http://localhost:4000/api/transactions", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTransactions(res.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    fetchTransactions();
}, [])

return(
    <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">📜 Transaction History</h1>

        <div className="space-y-4">
            {transactions.map((transaction) => (
                <div className={`p-4 rounded-lg shadow flex justify-between ${
                    transaction.type === "EXPENSE" ? "bg-red-100" : "bg-green-100"
                }`} key={transaction.id}>
                    <div>
                        <p className="font-semibold">{transaction.category}</p>
                        <p className="text-sm text-gray-600">{transaction.note}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold">
                            {transaction.type === "EXPENSE" ? "_" : "+"}₮{transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
}