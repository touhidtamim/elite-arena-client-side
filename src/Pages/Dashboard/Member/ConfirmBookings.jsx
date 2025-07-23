import React, { useEffect, useState, useContext } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ConfirmBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const { user } = useContext(AuthContext);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingRes, courtRes] = await Promise.all([
        api.get("/bookings"),
        api.get("/courts"),
      ]);

      const courtMap = {};
      courtRes.data.forEach((court) => {
        courtMap[court._id] = court;
      });

      const filtered = bookingRes.data.filter(
        (b) => b.userEmail === user?.email && b.status === "paid"
      );

      const enriched = filtered.map((b) => ({
        ...b,
        courtName: courtMap[b.courtId]?.name || "Unknown Court",
        courtLocation: courtMap[b.courtId]?.location || "Unknown Location",
        courtImage: courtMap[b.courtId]?.image,
      }));

      setBookings(enriched);
    } catch (err) {
      toast.error("Failed to load paid bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchData();
  }, [user]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Your Confirmed Bookings
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                View all your paid court reservations
              </p>
            </div>
            {bookings.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-100">
                  {bookings.length} booking{bookings.length > 1 && "s"}
                </span>
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {bookings.length === 0 ? (
          <div className="p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-500"
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
              No confirmed bookings
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              You don't have any paid bookings yet.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="sm:hidden space-y-4 p-4">
              {currentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-gray-750 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        {booking.courtName}
                      </h3>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <svg
                          className="w-3 h-3 mr-1 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="capitalize">
                          {booking.courtLocation}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-100">
                      Paid
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="text-sm text-white">{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Time Slot</p>
                      <p className="text-sm text-white">
                        {Array.isArray(booking.slots)
                          ? booking.slots.join(", ")
                          : booking.slots}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Amount</p>
                      <p className="text-sm font-medium text-white">
                        ৳{booking.totalPrice}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Booked On</p>
                      <p className="text-sm text-white">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop/Tablet Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Court
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Time Slot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Booked On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {currentBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {booking.courtName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300 capitalize">
                          {booking.courtLocation}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {booking.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {Array.isArray(booking.slots)
                            ? booking.slots.join(", ")
                            : booking.slots}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          ৳{booking.totalPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-700">
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
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
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
                        }
                      )}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmBookings;
