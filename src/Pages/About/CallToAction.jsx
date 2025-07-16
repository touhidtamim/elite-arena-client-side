import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-black mb-6"
        >
          Join the <span className="text-black">Elite Arena</span> Movement
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-900 mb-8"
        >
          Whether you're chasing gold or just getting started — there's a place
          for you here. Elite Arena is your club, your coach, your second home.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="bg-black hover:bg-gray-900 text-white font-medium py-4 px-8 rounded-full text-lg shadow-lg">
            Become a Member Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
