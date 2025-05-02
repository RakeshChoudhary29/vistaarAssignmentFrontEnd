import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function TransactionList({ accountId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (accountId) {
      fetchTransactions(accountId);
    }
  }, [accountId]);

  const fetchTransactions = async (accountId) => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${baseUrl}/api/transactions/${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
    

      {loading && (
        <div className="text-center text-gray-500 py-4">Loading transactions...</div>
      )}

      {error && (
        <div className="text-center text-red-600 py-4">{error}</div>
      )}

      {!loading && !error && (
        <>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 italic">No transactions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-4 py-3 border">Date</th>
                    <th className="px-4 py-3 border">Code</th>
                    <th className="px-4 py-3 border">Symbol</th>
                    <th className="px-4 py-3 border">Amount</th>
                    <th className="px-4 py-3 border">Price</th>
                    <th className="px-4 py-3 border">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((txn, index) => (
                    <tr
                      key={`transaction_${index}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2 whitespace-nowrap border">
                        {new Date(txn.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 uppercase border">{txn.transaction_code}</td>
                      <td className="px-4 py-2 uppercase border">{txn.symbol}</td>
                      <td className="px-4 py-2 border">{txn.amount}</td>
                      <td className="px-4 py-2 border">${parseFloat(txn.price).toFixed(2)}</td>
                      <td className="px-4 py-2 border">${parseFloat(txn.total).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
