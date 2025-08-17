import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const CourtCard = ({ court, onBook }) => {
  return (
    <motion.div
      key={court.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 group
             hover:shadow-md hover:border-yellow-400"
    >
      {/* Decorative Corners - Updated to match WhyEliteArena */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Image Section - No changes */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={
            court.image || "/ImgPlaceholder/image-coming-soon-placeholder.webp"
          }
          alt={court.name}
          onError={(e) =>
            (e.target.src =
              "/ImgPlaceholder/image-coming-soon-placeholder.webp")
          }
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Text Overlay - No changes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex items-end justify-between text-white text-sm font-semibold">
          <h3 className="text-lg font-bold truncate">{court.name}</h3>
          <div className="flex gap-1 text-yellow-400 items-center text-xs bg-black/50 px-2 py-1 rounded-full">
            {court.type}
            {court.isPremium && (
              <span className="ml-2 flex items-center bg-yellow-500/80 text-black font-bold px-2 py-0.5 rounded-full">
                <FaStar className="text-xs mr-1" /> Premium
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Body - No changes */}
      <div className="p-6 text-gray-800">
        {/* Location */}
        <div className="flex items-center text-sm mb-3 text-gray-700">
          <FaMapMarkerAlt className="mr-1 text-yellow-500" />
          <span>{court.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm mb-4 line-clamp-3 font-medium">
          {court.description ||
            "Premium quality court with excellent facilities for professional play."}
        </p>

        {/* Facilities */}
        {court.amenities?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-1 text-gray-800">
              Facilities:
            </h4>
            <div className="flex flex-wrap gap-2">
              {court.amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 px-2 py-1 rounded-full font-medium"
                >
                  {amenity}
                </span>
              ))}
              {court.amenities.length > 4 && (
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full font-medium">
                  +{court.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Availability and Capacity */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <FaClock className="mr-2 text-yellow-500" />
            <span>{court.availability} slots</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <FaUsers className="mr-2 text-yellow-500" />
            <span>Max {court.capacity}</span>
          </div>
        </div>

        {/* Price and Book Button - No changes */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500">Starting from</span>
            <div className="text-lg font-bold text-gray-900">
              ৳{court.rate}
              <span className="text-sm font-normal text-gray-500">/hour</span>
            </div>
          </div>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(250,204,21,0.7)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBook(court)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all shadow-md flex items-center"
          >
            <FaCalendarAlt className="mr-2" />
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourtCard;
