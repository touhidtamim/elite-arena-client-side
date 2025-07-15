import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-900 mask-b-to-gray-950 py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-gray-700">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif tracking-tight">
            Join the Elite
          </h3>

          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Begin your journey to greatness with our championship-winning
            program
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/membership"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg transition-all"
            >
              Enroll Now
            </Link>
          </motion.div>

          <p className="text-gray-500 text-sm mt-8">
            Applications closing soon for 2026 intake
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
