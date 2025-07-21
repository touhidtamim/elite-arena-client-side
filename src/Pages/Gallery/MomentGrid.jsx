import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EliteMomentsGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch moments from public/moments.json
  useEffect(() => {
    fetch("/moments.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setMoments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gallery data", err);
        setError("Failed to load gallery. Please try again later.");
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-600 to-gray-300 flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-600 to-gray-300 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Gallery Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
          Elite Moments
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
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
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto">
        {filteredMoments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No moments found for this category
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
            {filteredMoments.map((moment, idx) => (
              <motion.div
                key={`${moment.caption}-${idx}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`relative group overflow-hidden rounded-xl shadow-md ${getColSpan(
                  moment.aspect
                )} ${
                  moment.aspect === "vertical" ? "row-span-2" : "row-span-1"
                }`}
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
                      View details{" "}
                      <span className="ml-2 text-yellow-400">→</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
            className="relative max-w-6xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
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
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-400 bg-gray-100 rounded-full mb-4">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedImage.caption}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-4">
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

                <div className="prose text-gray-700 mb-8">
                  <p>{selectedImage.description}</p>
                </div>

                <div className="mt-auto">
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <h4 className="text-sm text-gray-500 uppercase mb-2">
                      Key Stats
                    </h4>
                    <p className="text-yellow-500">{selectedImage.stats}</p>
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
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 text-gray-800 hover:text-yellow-500 transition-all"
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
      <div className="max-w-7xl mx-auto mt-24">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-xl p-8 md:p-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-black font-serif mb-6">
              Ready to Create Your Elite Moments?
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg"
            >
              Join Our Champions
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EliteMomentsGallery;
