import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CourtCard from "./CourtCard";
import BookingModal from "./BookingModal";
import Spinner from "./../../../Components/Shared/Spinner";

const AllCourts = () => {
  const { user } = useContext(AuthContext);
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [slotCount, setSlotCount] = useState(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingBookings, setExistingBookings] = useState([]);
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [courtsPerPage] = useState(6); // 6 courts per page (2 rows of 3)

  // Location options
  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "dhaka", label: "Dhaka" },
    { value: "chittagong", label: "Chittagong" },
    { value: "rajshahi", label: "Rajshahi" },
    { value: "sylhet", label: "Sylhet" },
    { value: "khulna", label: "Khulna" },
    { value: "rangpur", label: "rangpur" },
    { value: "comilla", label: "comilla" },
    { value: "mymensingh", label: "mymensingh" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courtsResponse, bookingsResponse] = await Promise.all([
          api.get("/courts"),
          user
            ? api.get(`/bookings?userId=${user.uid}`)
            : Promise.resolve({ data: [] }),
        ]);
        setCourts(courtsResponse.data);
        setFilteredCourts(courtsResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Apply filters and sorting whenever searchTerm, sortOrder, or selectedLocation changes
  useEffect(() => {
    let result = [...courts];

    // Apply location filter
    if (selectedLocation !== "all") {
      result = result.filter(
        (court) =>
          court.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (court) =>
          court.name.toLowerCase().includes(term) ||
          court.location.toLowerCase().includes(term) ||
          court.type.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortOrder !== "none") {
      result.sort((a, b) => {
        if (sortOrder === "price-asc") {
          return a.rate - b.rate;
        } else if (sortOrder === "price-desc") {
          return b.rate - a.rate;
        }
        return 0;
      });
    }

    setFilteredCourts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [courts, searchTerm, sortOrder, selectedLocation]);

  // Pagination logic
  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = filteredCourts.slice(
    indexOfFirstCourt,
    indexOfLastCourt
  );
  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage);

  const handleBookNow = (court) => {
    if (!user) {
      toast.info("Please login to book a court");
      window.location.href = "/login";
      return;
    }
    setSelectedCourt(court);
    setBookingDate("");
    setSlotCount(1);
    setDateError("");
    setSlotError("");
    setIsBookingModalOpen(true);
  };

  const validateInputs = () => {
    let isValid = true;
    const selectedDate = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!bookingDate || selectedDate < today) {
      setDateError("Invalid booking date");
      isValid = false;
    }
    if (
      slotCount < 1 ||
      slotCount > 8 ||
      slotCount > selectedCourt.availability
    ) {
      setSlotError(`Slots must be between 1-8 and within availability`);
      isValid = false;
    }
    return isValid;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsSubmitting(true);
    const hasExistingBooking = existingBookings.some(
      (b) =>
        b.courtId === selectedCourt._id &&
        b.date === bookingDate &&
        b.status !== "cancelled"
    );
    if (hasExistingBooking) {
      toast.error("You already have a booking for this court on this date");
      setIsSubmitting(false);
      return;
    }

    try {
      const bookingData = {
        courtId: selectedCourt._id,
        date: bookingDate,
        slots: slotCount,
        totalPrice: slotCount * selectedCourt.rate,
        userId: user.uid,
        userEmail: user.email,
        status: "pending",
      };
      await api.post("/bookings", bookingData);
      toast.success("Booking request submitted for admin approval");
      setExistingBookings([...existingBookings, bookingData]);
      setIsBookingModalOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!courts.length)
    return <div className="text-center py-20">No courts available</div>;

  return (
    <div id="premium-courts">
      <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">
              Our Premium Courts
            </h2>
            <p className="text-lg text-gray-600">
              Explore and book from our selection of top-quality sports courts.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Courts
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name, location or type..."
                className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Location
              </label>
              <select
                id="location"
                className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sort by Price
              </label>
              <select
                id="sort"
                className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="none">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            Showing {filteredCourts.length} courts
          </div>

          {/* Courts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCourts.map((court) => (
              <CourtCard key={court._id} court={court} onBook={handleBookNow} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredCourts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">
                No courts found matching your criteria
              </h3>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSortOrder("none");
                  setSelectedLocation("all");
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && filteredCourts.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-l-md border border-gray-300 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`px-4 py-2 border-t border-b border-gray-300 ${
                        currentPage === number
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-r-md border border-gray-300 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      {isBookingModalOpen && selectedCourt && (
        <BookingModal
          selectedCourt={selectedCourt}
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          slotCount={slotCount}
          setSlotCount={setSlotCount}
          handleBookingSubmit={handleBookingSubmit}
          setIsBookingModalOpen={setIsBookingModalOpen}
          dateError={dateError}
          slotError={slotError}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default AllCourts;
