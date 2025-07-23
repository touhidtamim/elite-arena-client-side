import React, { useEffect, useState, useContext } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaReceipt, FaTable, FaTh } from "react-icons/fa";
import { motion } from "framer-motion";

const PaymentHistory = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    return window.innerWidth < 768 ? 6 : 10;
  });
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 6 : 10);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchCourts = async () => {
    try {
      const res = await api.get("/courts");
      setCourts(res.data);
    } catch (error) {
      console.error("Error fetching courts:", error);
    }
  };

  const getCourtName = (courtId) => {
    const court = courts.find((c) => c._id === courtId);
    return court ? court.name : "Unknown Court";
  };

  useEffect(() => {
    if (!authLoading && user?.email) {
      fetchPayments(user.email);
      fetchCourts();
    }
  }, [authLoading, user]);

  const fetchPayments = async (email) => {
    setLoading(true);
    try {
      const res = await api.get(`/payments?email=${encodeURIComponent(email)}`);
      setPayments(res.data);
    } catch (error) {
      toast.error("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (authLoading || loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto bg-gray-900 min-h-screen flex justify-center items-center">
        <div className="animate-pulse text-gray-400">
          Loading payment history...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 max-w-7xl mx-auto bg-gray-900 min-h-screen flex justify-center items-center">
        <div className="text-gray-300 text-center">
          <p className="text-xl mb-2">
            Please login to view your payment history
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto rounded-2xl bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Payment History
          </h2>
          <p className="text-gray-300 mt-1">Your completed transactions</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <FaReceipt className="text-yellow-500" />
            <span>Total Payments: {payments.length}</span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-800 rounded-md p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md ${
                viewMode === "table"
                  ? "bg-gray-700 text-yellow-400"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
              title="Table View"
            >
              <FaTable />
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-md ${
                viewMode === "card"
                  ? "bg-gray-700 text-yellow-400"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
              title="Card View"
            >
              <FaTh />
            </button>
          </div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
          <svg
            className="mx-auto h-12 w-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-white">
            No payments found
          </h3>
          <p className="mt-2 text-gray-400">
            You haven't made any payments yet
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table - Only shown when viewMode is 'table' and not mobile */}
          {viewMode === "table" && (
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Court
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Slots
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {currentItems.map((payment) => (
                    <motion.tr
                      key={payment.transactionId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-750"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-md flex items-center justify-center">
                            <span className="text-gray-300 font-semibold">
                              {getCourtName(payment.courtId).charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {getCourtName(payment.courtId)}
                            </div>
                            <div className="text-sm text-gray-400">
                              {payment.date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {new Date(payment.paidAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {payment.slots} slot{payment.slots > 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-white font-medium">
                          ৳{payment.price.toLocaleString()}
                        </div>
                        {payment.couponCode && (
                          <div className="text-xs text-yellow-400 mt-1">
                            Coupon: {payment.couponCode}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === "paid"
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        <div className="truncate max-w-[120px]">
                          {payment.transactionId}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(payment.paidAt).toLocaleTimeString()}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Cards - Shown when viewMode is 'card' or on mobile */}
          {(viewMode === "card" || window.innerWidth < 768) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((payment) => (
                <motion.div
                  key={payment.transactionId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {getCourtName(payment.courtId)}
                      </h3>
                      <div className="text-gray-400 text-sm mt-1">
                        {payment.date}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        payment.status === "paid"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="text-gray-300">
                      {payment.slots} slot{payment.slots > 1 ? "s" : ""}
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        ৳{payment.price.toLocaleString()}
                      </div>
                      {payment.couponCode && (
                        <div className="text-xs text-yellow-400">
                          Used: {payment.couponCode}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="text-xs text-gray-400">
                      <div className="truncate">
                        TXN: {payment.transactionId}
                      </div>
                      <div>{new Date(payment.paidAt).toLocaleString()}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  «
                </button>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === pageNum
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  »
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
