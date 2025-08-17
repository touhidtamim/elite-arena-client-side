import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const eventTypes = ["All", "Upcoming", "Ongoing", "Featured", "Past Glory"];

const EventWall = () => {
  const [activeType, setActiveType] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from public/events.json
  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filteredEvents =
    activeType === "All"
      ? events
      : events.filter((event) => event.type === activeType);

  const getAspectClass = (aspect) => {
    switch (aspect) {
      case "portrait":
        return "md:row-span-2";
      case "landscape":
        return "md:col-span-2";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-950 via-gray-700 to-gray-600 py-24 px-4 text-center min-h-screen flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-gray-950 via-gray-700 to-gray-600 py-24 px-4 text-center min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-700 to-gray-600 py-12 md:py-24 px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-bold text-yellow-400 bg-yellow-400/10 rounded-full border border-yellow-400/20">
            EVENT SHOWCASE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">
            <span className="text-yellow-400">Curated</span> Experiences
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 md:mb-8"></div>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm sm:text-md md:text-xl text-gray-300 max-w-3xl mx-auto text-center leading-relaxed italic"
          >
            Immerse yourself in Elite Arena's most exclusive events
          </motion.p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <motion.div
        className="flex justify-center mb-8 md:mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 bg-gray-900/50 p-1 rounded-full border border-gray-800">
          {eventTypes.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveType(type)}
              className={`px-4 sm:px-6 py-1 sm:py-2 border lg:border-none border-gray-700 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeType === type
                  ? "bg-yellow-400 text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No events found for this category
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(200px,auto)]">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className={`relative group ${getAspectClass(event.aspect)}`}
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Event Card */}
                <div className="h-full bg-gray-900 rounded-lg md:rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-400 transition-all shadow-lg">
                  {/* Image */}
                  <div className="h-full w-full relative overflow-hidden">
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredCard === event.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 text-xs font-bold tracking-wider">
                          {event.type.toUpperCase()}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {event.date}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {event.title}
                      </h3>

                      <p className="text-gray-300 text-xs sm:text-sm italic">
                        "{event.highlight}"
                      </p>

                      <div className="flex items-center text-gray-400 text-xs">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.venue}
                      </div>

                      {/* Status */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredCard === event.id ? 1 : 0,
                          y: hoveredCard === event.id ? 0 : 10,
                        }}
                        className="pt-1 sm:pt-2"
                      >
                        <span
                          className={`inline-block px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-bold rounded-full ${
                            event.type === "Past Glory"
                              ? "bg-gray-800 text-gray-300"
                              : "bg-yellow-400 text-black"
                          }`}
                        >
                          {event.status}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12 md:mt-20"
      >
        <motion.div>
          <Link
            to="/dashboard"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg shadow-lg inline-block text-center"
          >
            View Full Event Calendar
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventWall;
