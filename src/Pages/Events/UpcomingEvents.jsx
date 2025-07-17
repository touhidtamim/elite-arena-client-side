import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    title: "Elite Arena Championship Finals",
    date: "November 15-18, 2025",
    location: "Main Stadium",
    description:
      "The grand finale of our annual championship series featuring top athletes from across Bangladesh.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    category: "Tournament",
  },
  {
    title: "Winter Training Intensive",
    date: "December 10-20, 2025",
    location: "High-Altitude Camp",
    description:
      "Specialized cold-weather conditioning program for serious athletes.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
    category: "Training",
  },
  {
    title: "Elite Arena Anniversary Cup",
    date: "March 5-7, 2026",
    location: "All Facilities",
    description:
      "Celebrating 5 years of excellence with special tournaments and exhibitions.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    category: "Special",
  },
  {
    title: "Summer Youth League",
    date: "June 1 - August 30, 2026",
    location: "Outdoor Complex",
    description:
      "Three-month development league for young athletes (ages 12-18).",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2",
    category: "Development",
  },
  {
    title: "Monsoon Fitness Challenge",
    date: "July 15, 2026",
    location: "Indoor Arena",
    description: "Test your limits in our signature endurance competition.",
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1",
    category: "Fitness",
  },
  {
    title: "Elite Pro Showcase 2027",
    date: "November 20-25, 2027",
    location: "Center Court",
    description: "International-level exhibition matches with star athletes.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    category: "Exclusive",
  },
];

const UpcomingEvents = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 md:px-8 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-bold text-yellow-400 bg-yellow-400/10 rounded-full">
            EVENT CALENDAR
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">
            Upcoming <span className="text-yellow-400">Experiences</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-yellow-400 transition-all"
            >
              {/* Image */}
              <div className="h-60 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category Badge */}
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold text-white bg-gray-900/80 rounded-full backdrop-blur-sm">
                  {event.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-yellow-400 text-sm mb-3">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {event.date}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <svg
                    className="w-4 h-4 mr-2"
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
                  {event.location}
                </div>

                <p className="text-gray-300 mb-5">{event.description}</p>

                <button className="w-full py-2.5 px-4 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-yellow-400 hover:text-black transition-all border border-gray-600">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
      </div>
    </motion.section>
  );
};

export default UpcomingEvents;
