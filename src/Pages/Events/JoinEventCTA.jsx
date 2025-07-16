import React from "react";
import { motion } from "framer-motion";

const JoinEventCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-2"
        >
          <span className="inline-block px-4 py-1 text-sm font-bold text-yellow-400 bg-yellow-400/10 rounded-full border border-yellow-400/20">
            LIMITED AVAILABILITY
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif"
        >
          <span className="text-yellow-400">Write Your Chapter</span> in Elite
          History
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
        >
          The arena awaits your story. Will you be our next champion or the most
          passionate fan?
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            href="/events"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg transition-all"
          >
            Claim Your Spot →
          </motion.a>

          <motion.a
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            href="/membership"
            className="border-2 border-yellow-400 text-yellow-400 hover:text-white hover:border-white font-medium py-3.5 px-8 rounded-full text-lg transition-all"
          >
            Become a Member
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JoinEventCTA;
