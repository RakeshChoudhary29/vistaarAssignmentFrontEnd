import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl=import.meta.env.VITE_BASE_URL;

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
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Transactions for Account:{" "}
        <span className="text-blue-600 font-mono">{accountId}</span>
      </h3>

      {loading && <p className="text-gray-500">Loading transactions...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {transactions.length === 0 ? (
            <p className="text-gray-500 italic">No transactions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Code</th>
                    <th className="px-4 py-2 border">Symbol</th>
                    <th className="px-4 py-2 border">Amount</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn,index) => (
                    <tr key={`transaction_${index}`} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        {new Date(txn.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border uppercase">{txn.transaction_code}</td>
                      <td className="px-4 py-2 border uppercase">{txn.symbol}</td>
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
