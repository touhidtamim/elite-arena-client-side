import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import api from "../../api/axiosInstance";

const AllCourts = () => {
  const { currentUser } = useContext(AuthContext);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Fetch courts data from backend API
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await api.get("/courts");
        setCourts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch courts");
        console.error("Error fetching courts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  const handleBookNow = (court) => {
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    setSelectedCourt(court);
    setBookingDate("");
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourt || !bookingDate) return;

    try {
      const bookingData = {
        courtId: selectedCourt._id,
        date: bookingDate,
        rate: selectedCourt.rate,
        userId: currentUser.uid,
        status: "pending",
      };

      await api.post("/bookings", bookingData);
      setIsBookingModalOpen(false);
      alert("Booking request submitted for admin approval");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!courts || courts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-gray-600 text-lg">No courts available</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900">
      {/* Top dark section */}
      <div className="bg-gradient-to-b from-gray-950 to-gray-800 h-24"></div>

      {/* Main white content */}
      <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4">
              Our Elite Courts
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Book your preferred court and join the champions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courts.map((court) => (
              <motion.div
                key={court._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {court.name}
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                      {court.type}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {court.location}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {court.availability}
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {court.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{court.rate}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">
                        per hour
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Capacity: {court.capacity}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBookNow(court)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all shadow-md"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom dark section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-950 h-24"></div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedCourt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Book {selectedCourt.name}
                </h3>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleBookingSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Court Details
                    </label>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="font-medium">{selectedCourt.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rate</p>
                          <p className="font-medium">
                            ₹{selectedCourt.rate}/hour
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">
                            {selectedCourt.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Availability</p>
                          <p className="font-medium">
                            {selectedCourt.availability}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={!bookingDate}
                      className={`w-full py-3 px-4 rounded-md font-bold ${
                        !bookingDate
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-yellow-400 hover:bg-yellow-500"
                      } transition-all`}
                    >
                      Request Booking
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AllCourts;
