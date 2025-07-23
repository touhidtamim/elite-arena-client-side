import { useContext, useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ApproveBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Different items per page for mobile (cards) and desktop (table)
  const mobileItemsPerPage = 6;
  const desktopItemsPerPage = 10;
  const itemsPerPage =
    window.innerWidth < 640 ? mobileItemsPerPage : desktopItemsPerPage;

  const fetchCourts = async () => {
    try {
      const res = await api.get("/courts");
      setCourts(res.data);
    } catch (error) {
      console.error("Error fetching courts:", error);
      toast.error("Failed to fetch court data");
    }
  };

  const getCourtName = (courtId) => {
    const court = courts.find((c) => c._id === courtId);
    return court ? court.name : "Unknown Court";
  };

  const fetchApprovedBookings = async () => {
    if (!user?.email) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(
        `/bookings/approved/${encodeURIComponent(user.email)}`
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching approved bookings:", error);
      toast.error("Failed to load approved bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchApprovedBookings();
      fetchCourts();
    }
  }, [user]);

  const handlePayment = (bookingId) => {
    navigate(`/dashboard/payment/${bookingId}`);
  };

  const handleCancelBooking = async (id, courtName) => {
    const result = await Swal.fire({
      title: "Confirm Cancellation",
      html: `Are you sure you want to cancel booking for <strong>${courtName}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
      background: "#1f2937",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Cancel failed:", error);
      toast.error("Failed to cancel booking");
    }
  };

  // Pagination logic
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-700">
          <h3 className="mt-4 text-lg font-medium text-white">
            No Approved Bookings
          </h3>
          <p className="mt-2 text-gray-400">
            You don't have any approved bookings at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Approved Bookings
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Manage your upcoming court reservations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-100">
                {bookings.length} approved
              </span>
              <span className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Cards (6 per page) */}
        <div className="sm:hidden space-y-4 p-4">
          {currentBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-white">
                    {getCourtName(booking.courtId)}
                  </h3>
                  <div className="text-sm text-gray-300 mt-1">
                    {booking.date}
                  </div>
                </div>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900 text-yellow-100">
                  {booking.paid ? "Paid" : "Unpaid"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="text-sm text-gray-300">
                  <div className="font-semibold text-gray-400">Time Slots</div>
                  <div>
                    {Array.isArray(booking.slots)
                      ? booking.slots.join(", ")
                      : booking.slots}
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  <div className="font-semibold text-gray-400">Amount</div>
                  <div className="font-medium text-white">
                    ৳{booking.totalPrice}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handlePayment(booking._id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Pay Now
                </button>
                <button
                  onClick={() =>
                    handleCancelBooking(
                      booking._id,
                      getCourtName(booking.courtId)
                    )
                  }
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table (10 per page) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Court
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Time Slots
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {currentBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {getCourtName(booking.courtId)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{booking.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {Array.isArray(booking.slots)
                        ? booking.slots.join(", ")
                        : booking.slots}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    ৳{booking.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900 text-yellow-100">
                      {booking.paid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handlePayment(booking._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Pay Now
                    </button>
                    <button
                      onClick={() =>
                        handleCancelBooking(
                          booking._id,
                          getCourtName(booking.courtId)
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Simplified Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-400">
                Showing{" "}
                <span className="font-medium text-white">
                  {indexOfFirstBooking + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-white">
                  {Math.min(indexOfLastBooking, bookings.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-white">
                  {bookings.length}
                </span>{" "}
                bookings
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-8 h-8 rounded-md text-sm ${
                          currentPage === number
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveBookings;
