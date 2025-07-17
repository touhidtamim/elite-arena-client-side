import React, { useState } from "react";
import { motion } from "framer-motion";

const moments = [
  {
    src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    caption: "National Championship 2023",
    category: "Victory",
    date: "May 15, 2023",
    location: "National Sports Complex",
    stats: "Won 3-2 | MVP: Alex Morgan | Attendance: 12,500",
    description:
      "Historic victory against our arch-rivals after 3 intense sets. The final point was scored with an incredible ace serve that left the crowd in awe.",
    aspect: "vertical",
  },
  {
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
    caption: "Winter Training Intensive",
    category: "Training",
    date: "Dec 10-20, 2022",
    location: "Elite High-Altitude Camp",
    stats: "40 athletes | 8hrs daily | 0 injuries",
    description:
      "Our annual high-altitude conditioning program where athletes pushed their limits with specialized snow training routines.",
    aspect: "horizontal",
  },
  {
    src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
    caption: "Team Bonding Retreat",
    category: "Team",
    date: "March 5-7, 2023",
    location: "Mountain View Resort",
    stats: "23 participants | 12 activities | 5 team challenges",
    description:
      "Leadership development through wilderness survival exercises and strategic games that strengthened team cohesion.",
    aspect: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    caption: "Record Breaking Tournament",
    category: "Victory",
    date: "August 20, 2023",
    location: "Elite Arena Main Court",
    stats: "18 goals | 7 clean sheets | 5-0 final score",
    description:
      "Dominating performance that set new league records for most consecutive wins and highest scoring differential.",
    aspect: "vertical",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    caption: "Performance Lab Inauguration",
    category: "Innovation",
    date: "Jan 10, 2023",
    location: "Elite Sports Science Wing",
    stats: "₹2.5Cr investment | 12 tech partners | 300+ data points",
    description:
      "Cutting-edge facility opening with motion capture technology and advanced biometric tracking systems.",
    aspect: "horizontal",
  },
  {
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    caption: "International Friendly",
    category: "Events",
    date: "July 7, 2023",
    location: "City Olympic Stadium",
    stats: "Drew 2-2 | 15,000 live | 1M+ online viewers",
    description:
      "Exhibition match against Olympic champions featuring spectacular aerial plays and last-minute equalizer.",
    aspect: "vertical",
  },
  {
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
    caption: "Summer Championship",
    category: "Victory",
    date: "June 15, 2023",
    location: "Coastal Arena",
    stats: "5-0 final | 12 assists | 92% serve accuracy",
    description:
      "Flawless tournament performance with our new offensive strategy proving unstoppable against all opponents.",
    aspect: "horizontal",
  },
  {
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    caption: "Season Finale Celebration",
    category: "Team",
    date: "Nov 30, 2023",
    location: "Elite Arena Clubhouse",
    stats: "3 trophies | 18 wins | 98% satisfaction",
    description:
      "Emotional farewell to our retiring captain after most successful season in club history.",
    aspect: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    caption: "Precision Training Week",
    category: "Training",
    date: "April 3-9, 2023",
    location: "Elite Training Complex",
    stats: "5000+ serves | 92% accuracy | 15% improvement",
    description:
      "Specialized serving clinic that transformed our players' second serve success rates.",
    aspect: "vertical",
  },
  {
    src: "https://images.unsplash.com/photo-1543357486-cf271e7f5b73",
    caption: "Net Play Masterclass",
    category: "Training",
    date: "Feb 18, 2023",
    location: "Elite Indoor Courts",
    stats: "8 hours | 3 coaches | 22 participants",
    description:
      "Legendary player Maria Sanchez shared her championship-winning net strategies with our team.",
    aspect: "horizontal",
  },
  {
    src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
    caption: "Strategic Timeout",
    category: "Team",
    date: "Sept 12, 2023",
    location: "Regional Finals",
    stats: "Timeout at 18-20 | Won 25-23 | 5 crucial points",
    description:
      "Pivotal moment when coach's adjustment led to championship-saving comeback in final set.",
    aspect: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
    caption: "Power Hitting Clinic",
    category: "Training",
    date: "Oct 5-8, 2023",
    location: "Elite Performance Center",
    stats: "15% power increase | 8mph speed gain | 0 injuries",
    description:
      "Biomechanics specialist helped players optimize swing mechanics for maximum power with minimal strain.",
    aspect: "vertical",
  },
  {
    src: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402",
    caption: "Junior Elite Camp",
    category: "Development",
    date: "July 24-30, 2023",
    location: "Elite Youth Academy",
    stats: "42 juniors | 6 age groups | 8 future recruits",
    description:
      "Annual talent identification program that discovered our next generation of champions.",
    aspect: "horizontal",
  },
  {
    src: "https://images.unsplash.com/photo-1544210163-257effe9399e",
    caption: "Mental Toughness Workshop",
    category: "Training",
    date: "March 18, 2023",
    location: "Elite Meditation Dome",
    stats: "12 sessions | 100% participation | 22% focus improvement",
    description:
      "Sports psychologist helped players develop championship mindset through visualization techniques.",
    aspect: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    caption: "Trail Running Session",
    category: "Conditioning",
    date: "May 5, 2023",
    location: "Mountain Reserve",
    stats: "10km | 500m elevation | 2hr duration",
    description:
      "High-altitude endurance training that built unmatched cardiovascular capacity for the team.",
    aspect: "vertical",
  },
];

const EliteMomentsGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    "All",
    ...new Set(moments.map((moment) => moment.category)),
  ];

  const filteredMoments =
    activeCategory === "All"
      ? moments
      : moments.filter((moment) => moment.category === activeCategory);

  const getColSpan = (aspect) => {
    if (window.innerWidth < 640) return "col-span-2";
    return aspect === "horizontal" ? "col-span-2" : "col-span-1";
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-600 to-gray-300 py-20 px-4 sm:px-6 lg:px-8">
      {/* Gallery Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 font-serif tracking-tight">
          Elite Moments
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Where every frame tells a story of triumph, passion, and excellence
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-yellow-400 text-black shadow-md"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
          {filteredMoments.map((moment, idx) => (
            <motion.div
              key={`${moment.caption}-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`relative group overflow-hidden rounded-xl ${getColSpan(
                moment.aspect
              )} ${moment.aspect === "vertical" ? "row-span-2" : "row-span-1"}`}
              onClick={() => setSelectedImage(moment)}
            >
              <img
                src={moment.src}
                alt={moment.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-yellow-400 bg-black/50 rounded-full">
                    {moment.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {moment.caption}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 flex items-center">
                    View details <span className="ml-2 text-yellow-400">→</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-6xl w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="h-[70vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-400 bg-gray-800 rounded-full mb-4">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedImage.caption}
                  </h3>
                  <div className="flex items-center text-gray-400 mb-4">
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
                      ></path>
                    </svg>
                    {selectedImage.date}
                    <svg
                      className="w-4 h-4 mx-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    {selectedImage.location}
                  </div>
                </div>

                <div className="prose prose-invert text-gray-300 mb-8">
                  <p>{selectedImage.description}</p>
                </div>

                <div className="mt-auto">
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <h4 className="text-sm text-gray-400 uppercase mb-2">
                      Key Stats
                    </h4>
                    <p className="text-yellow-400">{selectedImage.stats}</p>
                  </div>

                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                    View Full Story
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <button
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white hover:text-yellow-400 transition-all"
              onClick={() => setSelectedImage(null)}
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
                ></path>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-24 text-center"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-black font-serif mb-6">
          Ready to Create Your Elite Moments?
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-all shadow-lg"
        >
          Join Our Champions
        </motion.button>
      </motion.div>
    </section>
  );
};

export default EliteMomentsGallery;
