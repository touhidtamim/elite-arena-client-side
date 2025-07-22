import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CourtCard from "./CourtCard";
import BookingModal from "./BookingModal";

const AllCourts = () => {
  const { user } = useContext(AuthContext);
  const [courts, setCourts] = useState([]);
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
        setExistingBookings(bookingsResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!courts.length)
    return <div className="text-center py-20">No courts available</div>;

  return (
    <div id="premium-courts" className="bg-gray-900">
      <div className="bg-gradient-to-b from-gray-950 to-gray-800 h-24" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courts.map((court) => (
              <CourtCard key={court._id} court={court} onBook={handleBookNow} />
            ))}
          </div>
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
