import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings/pending");
      setBookings(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourts = async () => {
    try {
      const res = await api.get("/courts");
      setCourts(res.data);
    } catch (error) {
      console.error("Error fetching courts:", error);
      toast.error("Failed to load courts.");
    }
  };

  // Get court name by ID
  const getCourtName = (courtId) => {
    const court = courts.find((c) => c._id === courtId);
    return court ? court.name : "Unknown Court";
  };

  const handleAccept = async (id, userName) => {
    const result = await Swal.fire({
      title: "Confirm Approval",
      html: `Approve booking for <strong>${userName}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await api.patch(`/bookings/${id}`, { status: "approved" });
      if (res.status === 200) {
        toast.success("Booking approved & member role assigned");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error("Approval failed");
      }
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("Failed to approve booking. Please try again.");
    }
  };

  const handleReject = async (id, userName) => {
    const result = await Swal.fire({
      title: "Confirm Rejection",
      html: `Reject booking for <strong>${userName}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await api.delete(`/bookings/${id}`);
      if (res.status === 200) {
        toast.success("Booking rejected and deleted");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error("Rejection failed");
      }
    } catch (error) {
      console.error("Rejection error:", error);
      toast.error("Failed to reject booking. Please try again.");
    }
  };

  useEffect(() => {
    fetchCourts();
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No pending bookings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are currently no bookings awaiting approval.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Manage Bookings
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Approve or reject pending court reservations
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {bookings.length} pending
            </span>
          </div>
        </div>

        {/* Mobile Cards with vertical gap */}
        <div className="sm:hidden space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 hover:bg-gray-50 rounded-md border border-gray-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {booking.userName || booking.userEmail || "N/A"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getCourtName(booking.courtId)}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium">{booking.date || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Slot</p>
                  <p className="text-sm font-medium">
                    {Array.isArray(booking.slots)
                      ? booking.slots.join(", ")
                      : booking.slots || booking.slot || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-sm font-medium">
                    ৳{booking.totalPrice || booking.price || 0}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() =>
                    handleAccept(
                      booking._id,
                      booking.userName || booking.userEmail
                    )
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleReject(
                      booking._id,
                      booking.userName || booking.userEmail
                    )
                  }
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Court
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.userName || booking.userEmail || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getCourtName(booking.courtId)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.date || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {Array.isArray(booking.slots)
                        ? booking.slots.join(", ")
                        : booking.slots || booking.slot || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ৳{booking.totalPrice || booking.price || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() =>
                        handleAccept(
                          booking._id,
                          booking.userName || booking.userEmail
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleReject(
                          booking._id,
                          booking.userName || booking.userEmail
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
