import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionList from "./TransactionList";

const baseUrl=import.meta.env.VITE_BASE_URL;

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Fixed limit per page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  const fetchCustomers = async () => {
    const token = localStorage.getItem("token");

    console.log(baseUrl)

    try {
      const response = await axios.get(`${baseUrl}/api/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
        },
      });

      setCustomers(response.data.customers || []);
      setTotalPages(response.data.totalCount || 1);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Accounts</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{c.name}</td>
                <td className="py-2 px-4 border-b">{c.address}</td>
                <td className="py-2 px-4 border-b space-y-1">
                  {c.accounts.map((account_id) => (
                    <button
                      key={account_id}
                      onClick={() => setSelectedAccount(account_id)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      {account_id}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => {handlePageChange(page + 1); setSelectedAccount(null)}}
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {selectedAccount && (
        <div className="mt-6">
          <TransactionList accountId={selectedAccount} />
        </div>
      )}
    </div>
  );
}
