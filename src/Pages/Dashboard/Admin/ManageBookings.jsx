import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Spinner from "../../../Components/Shared/Spinner";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(12);
      } else {
        setItemsPerPage(10);
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

      const paidBookings = bookingRes.data
        .filter((b) => b.status === "paid")
        .map((b) => ({
          ...b,
          courtName: courtMap[b.courtId]?.name || b.courtId,
          courtLocation: courtMap[b.courtId]?.location || "Unknown",
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setBookings(paidBookings);
      setFilteredBookings(paidBookings);
    } catch (err) {
      toast.error("Failed to load bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = bookings.filter(
      (b) =>
        b.courtName?.toLowerCase().includes(search.toLowerCase()) ||
        b.userEmail?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBookings(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [search, bookings]);

  // Pagination logic
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Manage Bookings (Paid)
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                View and manage all paid court reservations
              </p>
            </div>
            {filteredBookings.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-100">
                  {filteredBookings.length} booking
                  {filteredBookings.length > 1 && "s"}
                </span>
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search by court or user email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        {filteredBookings.length === 0 ? (
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
              No paid bookings found
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              {search
                ? "No matching bookings for your search"
                : "There are currently no paid bookings"}
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
                      <p className="text-xs text-gray-400 mt-1">
                        {booking.userEmail}
                      </p>
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
                      <p className="text-xs text-gray-400">Slots</p>
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
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-sm text-white capitalize">
                        {booking.courtLocation}
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
                      User
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
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {currentBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {booking.courtName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {booking.userEmail}
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
                        <div className="text-sm text-gray-300 capitalize">
                          {booking.courtLocation}
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
                      {Math.min(indexOfLastBooking, filteredBookings.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-white">
                      {filteredBookings.length}
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

export default ManageBookings;
