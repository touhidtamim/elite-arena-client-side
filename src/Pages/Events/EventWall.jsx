import React, { useState } from "react";
import { motion } from "framer-motion";

const eventTypes = ["All", "Upcoming", "Ongoing", "Featured", "Past Glory"];

const eliteEvents = [
  {
    id: 1,
    title: "Night Football Finals",
    type: "Featured",
    date: "Sat, Jun 15 • 8:30 PM",
    venue: "Main Arena",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    highlight: "Last year's champions defend their title under floodlights",
    status: "20 seats left",
    aspect: "landscape",
  },
  {
    id: 2,
    title: "Elite Summer Bootcamp",
    type: "Ongoing",
    date: "Daily until Jul 30",
    venue: "Training Grounds",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    highlight: "Transform your game with pro-level conditioning",
    status: "Join anytime",
    aspect: "portrait",
  },
  {
    id: 3,
    title: "Community Open Day",
    type: "Upcoming",
    date: "Sun, Jul 7 • 10 AM",
    venue: "Entire Facility",
    image: "https://images.unsplash.com/photo-1544210163-257effe9399e",
    highlight: "Free access to all arenas - bring your family!",
    status: "Registration open",
    aspect: "square",
  },
  {
    id: 4,
    title: "2023 Championship Rematch",
    type: "Past Glory",
    date: "Dec 10, 2023",
    venue: "Center Court",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    highlight: "The game that broke all attendance records",
    status: "Relive highlights",
    aspect: "landscape",
  },
  {
    id: 5,
    title: "Pro Scout Showcase",
    type: "Upcoming",
    date: "Aug 3-4 • 9 AM",
    venue: "Show Arena",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    highlight: "10+ national scouts confirmed",
    status: "Early bird signup",
    aspect: "portrait",
  },
  {
    id: 6,
    title: "Midnight Basketball",
    type: "Featured",
    date: "Every Friday • 11 PM",
    venue: "Court 2",
    image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
    highlight: "Where the city's best play after dark",
    status: "Ongoing league",
    aspect: "square",
  },
  {
    id: 7,
    title: "Women's Powerlifting Championship",
    type: "Featured",
    date: "Sep 8-10, 2025",
    venue: "Strength Arena",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c56f74",
    highlight: "Celebrating female strength and athleticism",
    status: "Qualifiers ongoing",
    aspect: "portrait",
  },
  {
    id: 8,
    title: "Junior Tennis Open",
    type: "Upcoming",
    date: "Oct 15-22, 2025",
    venue: "Outdoor Courts",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2",
    highlight: "Under-18 tournament with college scouts attending",
    status: "Early registration",
    aspect: "landscape",
  },
  {
    id: 9,
    title: "Yoga & Mindfulness Retreat",
    type: "Ongoing",
    date: "Every Saturday • 7 AM",
    venue: "Zen Garden",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    highlight: "Start your weekend with peace and purpose",
    status: "Walk-ins welcome",
    aspect: "square",
  },
  {
    id: 10,
    title: "Elite Anniversary Gala",
    type: "Special",
    date: "Nov 20, 2025",
    venue: "Grand Ballroom",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
    highlight: "Celebrating 5 years of sporting excellence",
    status: "VIP invites only",
    aspect: "landscape",
  },
  {
    id: 11,
    title: "Winter Swimming Challenge",
    type: "Upcoming",
    date: "Dec 5, 2025",
    venue: "Olympic Pool",
    image: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d5",
    highlight: "Test your endurance in our heated outdoor pool",
    status: "Registration opens Nov 1",
    aspect: "portrait",
  },
  {
    id: 12,
    title: "Boxing Masterclass",
    type: "Ongoing",
    date: "Mondays & Thursdays • 6 PM",
    venue: "Combat Zone",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
    highlight: "Learn from national champion coaches",
    status: "Members only",
    aspect: "square",
  },
  {
    id: 13,
    title: "2026 Season Kickoff",
    type: "Upcoming",
    date: "Jan 10, 2026",
    venue: "Main Stadium",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    highlight: "Live music, exhibitions, and season preview",
    status: "Free admission",
    aspect: "landscape",
  },
  {
    id: 14,
    title: "Elite Esports Tournament",
    type: "Featured",
    date: "Feb 14-16, 2026",
    venue: "Digital Arena",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    highlight: "₹5L prize pool across 3 gaming titles",
    status: "Team registrations",
    aspect: "portrait",
  },
  {
    id: 15,
    title: "Sunrise Marathon",
    type: "Upcoming",
    date: "Mar 22, 2026",
    venue: "City Route",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    highlight: "Run through the city as it wakes up",
    status: "Training programs available",
    aspect: "landscape",
  },
  {
    id: 16,
    title: "Midnight Basketball",
    type: "Featured",
    date: "Every Friday • 11 PM",
    venue: "Court 2",
    image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
    highlight: "Where the city's best play after dark",
    status: "Ongoing league",
    aspect: "square",
  },
];

const EventWall = () => {
  const [activeType, setActiveType] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredEvents =
    activeType === "All"
      ? eliteEvents
      : eliteEvents.filter((event) => event.type === activeType);

  // Calculate aspect ratio classes
  const getAspectClass = (aspect) => {
    switch (aspect) {
      case "portrait":
        return "row-span-2";
      case "landscape":
        return "col-span-2";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-700 to-gray-600 py-24 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-bold text-yellow-400 bg-yellow-400/10 rounded-full border border-yellow-400/20">
            EVENT SHOWCASE
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">
            <span className="text-yellow-400">Curated</span> Experiences
          </h1>
          <div className="w-24 bg-yellow-400 mx-auto mb-8"></div>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="text-md md:text-xl text-gray-300 max-w-3xl mx-auto text-center leading-relaxed italic"
          >
            Immerse yourself in Elite Arena's most exclusive events
          </motion.p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <motion.div
        className="flex justify-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex flex-wrap justify-center gap-3 bg-gray-900/50 p-1 rounded-full border border-gray-800">
          {eventTypes.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveType(type)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
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
              <div className="h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-400 transition-all shadow-lg">
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
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 text-xs font-bold tracking-wider">
                        {event.type.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {event.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {event.title}
                    </h3>

                    <p className="text-gray-300 text-sm italic">
                      "{event.highlight}"
                    </p>

                    <div className="flex items-center text-gray-400 text-xs">
                      <svg
                        className="w-4 h-4 mr-1"
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
                      className="pt-2"
                    >
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
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
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#f59e0b",
            boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg shadow-lg"
        >
          View Full Event Calendar
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EventWall;
