import React from "react";
import { motion } from "framer-motion";

const QuoteSection = () => {
  return (
    <section className="bg-white md:pt-20 lg:pt-0 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-r from-yellow-100 via-white to-yellow-100"></div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <svg
            className="w-12 h-12 mx-auto text-yellow-500 mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-gray-800 font-light max-w-4xl mx-auto leading-tight">
            “In every drop of sweat, there's a story. In every victory, a
            legacy. These are the moments we live for.”
          </blockquote>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 mb-2 h-0.5 bg-yellow-500 max-w-xs mx-auto"
          ></motion.div>

          <p className="text-gray-500 uppercase tracking-wider text-sm mt-6">
            Coach Michael Rodriguez
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
