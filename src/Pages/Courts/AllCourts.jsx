import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";

const AllCourts = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Sample static data - will be replaced with database data later
  const courts = [
    {
      id: 1,
      name: "Tennis Court 1",
      type: "Tennis",
      image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
      slots: [
        { time: "06:00-08:00", price: 1500 },
        { time: "08:00-10:00", price: 1800 },
        { time: "10:00-12:00", price: 2000 },
        { time: "14:00-16:00", price: 2000 },
        { time: "16:00-18:00", price: 2200 },
        { time: "18:00-20:00", price: 2500 },
      ],
      description: "Professional-grade tennis court with floodlights",
    },
    {
      id: 2,
      name: "Badminton Court A",
      type: "Badminton",
      image: "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3",
      slots: [
        { time: "07:00-09:00", price: 800 },
        { time: "09:00-11:00", price: 1000 },
        { time: "11:00-13:00", price: 1000 },
        { time: "15:00-17:00", price: 1200 },
        { time: "17:00-19:00", price: 1500 },
      ],
      description: "Olympic-standard badminton court with wooden flooring",
    },
    {
      id: 3,
      name: "Squash Court Premier",
      type: "Squash",
      image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a26",
      slots: [
        { time: "08:00-09:00", price: 600 },
        { time: "09:00-10:00", price: 600 },
        { time: "10:00-11:00", price: 600 },
        { time: "16:00-17:00", price: 800 },
        { time: "17:00-18:00", price: 800 },
        { time: "18:00-19:00", price: 1000 },
      ],
      description: "Glass-back squash court with air conditioning",
    },
    {
      id: 4,
      name: "Basketball Court",
      type: "Basketball",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      slots: [
        { time: "06:00-08:00", price: 2000 },
        { time: "08:00-10:00", price: 2000 },
        { time: "16:00-18:00", price: 2500 },
        { time: "18:00-20:00", price: 3000 },
      ],
      description: "Full-size basketball court with NBA-standard flooring",
    },
  ];

  const handleBookNow = (court) => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
      return;
    }
    setSelectedCourt(court);
    setSelectedSlots([]);
    setBookingDate("");
    setIsBookingModalOpen(true);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlots((prev) => {
      if (prev.some((s) => s.time === slot.time)) {
        return prev.filter((s) => s.time !== slot.time);
      } else {
        return [...prev, slot];
      }
    });
  };

  const calculateTotal = () => {
    return selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking request to your backend
    console.log({
      courtId: selectedCourt.id,
      date: bookingDate,
      slots: selectedSlots,
      total: calculateTotal(),
      userId: currentUser.uid,
      status: "pending",
    });
    // Close modal after submission
    setIsBookingModalOpen(false);
    // Show success message
    alert("Booking request submitted for admin approval");
  };

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
                key={court.id}
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
                  <p className="text-gray-600 text-sm mb-4">
                    {court.description}
                  </p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Slots
                    </label>
                    <select
                      className="w-full border border-gray-300 text-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a time slot
                      </option>
                      {court.slots.map((slot, index) => (
                        <option key={index} value={slot.time}>
                          {slot.time} (₹{slot.price})
                        </option>
                      ))}
                    </select>
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
                      Available Slots
                    </label>
                    <div className="space-y-2">
                      {selectedCourt.slots.map((slot, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${
                            selectedSlots.some((s) => s.time === slot.time)
                              ? "border-yellow-400 bg-yellow-50"
                              : "border-gray-300 hover:border-yellow-300"
                          }`}
                          onClick={() => handleSlotSelection(slot)}
                        >
                          <div>
                            <span className="font-medium">{slot.time}</span>
                            <span className="text-gray-500 text-sm ml-2">
                              (₹{slot.price})
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedSlots.some(
                              (s) => s.time === slot.time
                            )}
                            className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                            readOnly
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSlots.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between font-medium">
                        <span>Selected Slots:</span>
                        <span>
                          {selectedSlots.length} slot
                          {selectedSlots.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="mt-2">
                        {selectedSlots.map((slot, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm py-1"
                          >
                            <span>{slot.time}</span>
                            <span>₹{slot.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={selectedSlots.length === 0 || !bookingDate}
                      className={`w-full py-3 px-4 rounded-md font-bold ${
                        selectedSlots.length === 0 || !bookingDate
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
