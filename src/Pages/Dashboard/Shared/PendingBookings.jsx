import { useContext, useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const PendingBookings = () => {
  const { user } = useContext(AuthContext);
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
      } else if (window.innerWidth < 1024) {
        // Tablet
        setItemsPerPage(8);
      } else {
        // Desktop
        setItemsPerPage(10);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const fetchPendingBookings = async () => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/bookings/pending/${user.uid}`);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Cancellation",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
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

  useEffect(() => {
    if (user) {
      fetchPendingBookings();
      fetchCourts();
    }
  }, [user]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);
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
        <div className="bg-gray-800 rounded-xl shadow-md p-6 text-center border border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
            No Pending Bookings
          </h3>
          <p className="text-gray-400 text-sm">
            You don't have any pending bookings at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Pending Bookings
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage your upcoming court reservations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-100">
              {bookings.length} booking{bookings.length > 1 && "s"}
            </span>
            <span className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Mobile Cards (6 per page) */}
        <div className="sm:hidden space-y-3 p-4">
          {currentItems.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-750 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-white">
                    {getCourtName(booking.courtId)}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">{booking.date}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-900 text-yellow-100">
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <p className="text-xs text-gray-400">Time Slots</p>
                  <p className="text-sm text-gray-200">{booking.slots}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Amount</p>
                  <p className="text-sm font-medium text-white">
                    ৳{booking.totalPrice}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet/Desktop Table (8-10 per page) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Court
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Time Slots
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {currentItems.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-750">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-md flex items-center justify-center text-gray-300 font-semibold">
                        {getCourtName(booking.courtId).charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">
                          {getCourtName(booking.courtId)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {booking.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {booking.slots}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                    ৳{booking.totalPrice}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900 text-yellow-100">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="text-red-400 hover:text-red-300 border border-red-700 rounded-md px-3 py-1 hover:bg-red-900/50 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-400">
                Showing{" "}
                <span className="font-medium text-white">
                  {indexOfFirstItem + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-white">
                  {Math.min(indexOfLastItem, bookings.length)}
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

export default PendingBookings;
