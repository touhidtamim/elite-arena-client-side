import React from "react";
import { motion } from "framer-motion";

const EventLandingHero = () => {
  const sentence =
    "Elite Arena brings you the most thrilling upcoming events in sports, fitness, and community growth.";

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[90vh] w-full overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img
          src="https://i.postimg.cc/k5C6MdZB/photo-1568663469495-b09d5e3c2e07-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg"
          alt="Elite Arena Event"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/90 to-black/20 opacity-90"></div>
      </motion.div>

      {/* Content with staggered animation */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif tracking-tight text-white drop-shadow-xl">
            Experience the Arena.
            <br />
            <span className="text-white">Live the Moment.</span>
          </h1>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
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
                  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventLandingHero;
