import React from "react";
import { motion } from "framer-motion";

const CourtHero = () => {
  const sentence =
    "Book world-class courts and elevate your game with our state-of-the-art facilities.";

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[90vh] w-full overflow-hidden">
      {/* Background with parallax effect - matching the original */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img
          src="https://i.ibb.co/LhhJhf9z/horizontal-view-little-football-stadium-faroe-islands.jpg"
          alt="Premium sports facilities"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Consistent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/90 to-black/20 opacity-90"></div>
      </motion.div>

      {/* Content with matching animations */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title with same structure as original */}
          <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif tracking-tight text-white drop-shadow-xl">
            Experience the Courts
            <br />
            <span className="text-white">Elevate Your Game</span>
          </h1>

          {/* Text animation matching original timing */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06, // Same stagger speed
                },
              },
            }}
            className="text-medium md:text-xl text-gray-300 max-w-3xl mx-auto flex flex-wrap justify-center gap-x-1 text-center leading-relaxed"
          >
            {sentence.split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 8, filter: "blur(4px)" }, // Same animation
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.div>

          {/* Optional: Add matching CTA button like original might have */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10"
          >
            <a
              href="#premium-courts"
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md transition-colors duration-300"
            >
              Book Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourtHero;
