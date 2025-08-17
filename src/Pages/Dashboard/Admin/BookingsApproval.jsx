import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Spinner from "../../../Components/Shared/Spinner";

const BookingsApproval = () => {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default for desktop

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile
        setItemsPerPage(6);
      } else {
        // Desktop/Tablet
        setItemsPerPage(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      background: "#1f2937",
      color: "#fff",
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
      background: "#1f2937",
      color: "#fff",
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

  // Pagination logic
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Spinner />;

  if (bookings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-700">
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
          <h3 className="mt-2 text-lg font-medium text-white">
            No pending bookings
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            There are currently no bookings awaiting approval.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700">
        <div className="px-6 py-5 bg-gradient-to-r from-gray-700 to-gray-800 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Manage Bookings Approval
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Approve or reject pending court reservations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-100">
                {bookings.length} pending
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
                    {booking.userName || booking.userEmail || "N/A"}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {getCourtName(booking.courtId)}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-900 text-yellow-100">
                  Pending
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm text-white">{booking.date || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Slot</p>
                  <p className="text-sm text-white">
                    {Array.isArray(booking.slots)
                      ? booking.slots.join(", ")
                      : booking.slots || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="text-sm font-medium text-white">
                    ৳{booking.totalPrice || 0}
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

        {/* Desktop Table (10 per page) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Court
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Slot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Price
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
                      {booking.userName || booking.userEmail || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {getCourtName(booking.courtId)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {booking.date || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {Array.isArray(booking.slots)
                        ? booking.slots.join(", ")
                        : booking.slots || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      ৳{booking.totalPrice || 0}
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
                  className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`w-8 h-8 rounded-md text-sm ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsApproval;
