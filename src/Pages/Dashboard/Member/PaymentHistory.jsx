import React, { useEffect, useState, useContext } from "react";
import api from "../../../api/axiosInstance"; // Your axios instance
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";

const PaymentHistory = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user?.email) {
      fetchPayments(user.email);
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

  if (authLoading || loading) {
    return <div className="p-4 text-center">Loading payment history...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center">
        Please login to view your payment history.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Transaction ID</th>
                <th className="border px-4 py-2">Court Name</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Price (BDT)</th>
                <th className="border px-4 py-2">Slots</th>
                <th className="border px-4 py-2">Coupon</th>
                <th className="border px-4 py-2">Discount</th>
                <th className="border px-4 py-2">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.transactionId}>
                  <td className="border px-4 py-2 break-all">
                    {p.transactionId}
                  </td>
                  <td className="border px-4 py-2">{p.courtName || "N/A"}</td>
                  <td className="border px-4 py-2">{p.date}</td>
                  <td className="border px-4 py-2">{p.price}</td>
                  <td className="border px-4 py-2">{p.slots}</td>
                  <td className="border px-4 py-2">{p.couponCode || "-"}</td>
                  <td className="border px-4 py-2">{p.discountApplied || 0}</td>
                  <td className="border px-4 py-2">
                    {new Date(p.paidAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
