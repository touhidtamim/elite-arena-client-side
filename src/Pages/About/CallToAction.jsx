import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-6 py-20 text-center border-t-2 border-gray-900"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-6"
      >
        Join the <span className="text-yellow-500">Elite Arena</span> Movement
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg max-w-3xl mx-auto mb-8 text-gray-300"
      >
        Whether you're chasing gold or just getting started — there's a place
        for you here. Elite Arena is your club, your coach, your second home.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          opacity: { delay: 0.6, duration: 0.6 },
          scale: { type: "spring", stiffness: 300 },
        }}
      >
        <Link
          to="/membership"
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition-colors duration-300"
        >
          Become a Member Today
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default CallToAction;
