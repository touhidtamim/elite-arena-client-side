import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaTrophy,
} from "react-icons/fa";

const BookingModal = ({
  selectedCourt,
  bookingDate,
  setBookingDate,
  slotCount,
  setSlotCount,
  handleBookingSubmit,
  setIsBookingModalOpen,
  dateError,
  slotError,
  isSubmitting,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
            aria-label="Close modal"
          >
            <IoMdClose />
          </button>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              Book {selectedCourt.name}
            </h3>
            <p className="text-sm text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-1 text-yellow-500" />
              {selectedCourt.location}
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <FaClock className="mr-2 text-yellow-500" />
                  <span>৳{selectedCourt.rate}/hour</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-2 text-yellow-500" />
                  <span>Max {selectedCourt.capacity}</span>
                </div>
                <div className="flex items-center">
                  <FaTrophy className="mr-2 text-yellow-500" />
                  <span>{selectedCourt.type}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-yellow-500" />
                  <span>{selectedCourt.availability} slots left</span>
                </div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Booking Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingDate}
                  onChange={(e) => {
                    setBookingDate(e.target.value);
                  }}
                  className={`w-full border ${
                    dateError ? "border-red-500" : "border-gray-300"
                  } text-gray-900 rounded-md px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                />
                <FaCalendarAlt className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              {dateError && (
                <p className="mt-1 text-xs text-red-500">{dateError}</p>
              )}
            </div>

            {/* Slot Count */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Duration (Hours) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={slotCount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setSlotCount(value);
                  }}
                  className={`w-full border ${
                    slotError ? "border-red-500" : "border-gray-300"
                  } text-gray-900 rounded-md px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                />
                <FaClock className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              {slotError && (
                <p className="mt-1 text-xs text-red-500">{slotError}</p>
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2 text-gray-700">
                <span className="text-sm">Hourly Rate:</span>
                <span className="font-medium">৳{selectedCourt.rate}</span>
              </div>
              <div className="flex justify-between items-center mb-2 text-gray-700">
                <span className="text-sm">Hours:</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setSlotCount(Math.max(1, slotCount - 1))}
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                    disabled={slotCount <= 1}
                  >
                    -
                  </button>
                  <span className="w-10 text-center border-t border-b border-gray-300 py-0.5 text-gray-900">
                    {slotCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSlotCount(Math.min(8, slotCount + 1))}
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                    disabled={
                      slotCount >= 8 || slotCount >= selectedCourt.availability
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2 text-gray-900">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Total:</span>
                  <span className="font-bold text-lg">
                    ৳{selectedCourt.rate * slotCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md font-bold text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 shadow-md"
              } transition-all flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FaCalendarAlt className="mr-2" />
                  Confirm Booking
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
