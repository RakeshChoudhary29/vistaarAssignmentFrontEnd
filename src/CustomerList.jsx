import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionList from "./TransactionList";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  const fetchCustomers = async () => {
    const token = localStorage.getItem("token");

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
      setSelectedAccount(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Customer List</h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Accounts</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {customers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.address}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {c.accounts.map((account_id) => (
                        <button
                          key={account_id}
                          onClick={() => setSelectedAccount(account_id)}
                          className="text-sm text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md"
                        >
                          {account_id}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-gray-700">{`Page ${page} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>

        {/* Transactions */}
        {selectedAccount && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Transactions for Account: <span className="text-blue-600">{selectedAccount}</span>
            </h3>
            <TransactionList accountId={selectedAccount} />
          </div>
        )}
      </div>
    </div>
  );
}
