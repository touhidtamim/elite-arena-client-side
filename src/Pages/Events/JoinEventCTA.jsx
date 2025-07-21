import React from "react";
import { motion } from "framer-motion";

const JoinEventCTA = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-xl p-8 md:p-10 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-1 text-sm font-medium text-white bg-gray-900 rounded-full border border-black">
              LIMITED AVAILABILITY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-black mb-4 font-serif"
          >
            Write Your Chapter in Elite History
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-900 max-w-3xl mx-auto mb-8"
          >
            The arena awaits your story. Will you be our next champion or the
            most passionate fan?
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
                boxShadow: "0 10px 25px -5px rgba(202, 138, 4, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              href="/events"
              className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-all"
            >
              Claim Your Spot →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinEventCTA;
