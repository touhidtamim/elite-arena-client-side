import React from "react";
import { motion } from "framer-motion";

const HeroAboutIntro = () => {
  return (
    <section className="relative w-full h-[90vh] pt-20 bg-[#1f1f23] overflow-hidden">
      {/* Background Image with scale-out animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="https://i.postimg.cc/J0SjC5Zm/view-empty-soccer-stadium-with-fantasy-dreamy-sky.jpg"
          alt="Elite Arena"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-gray-900/60 to-gray-800/30" />
      </motion.div>

      {/* Content with animation (unchanged) */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-4 tracking-tight drop-shadow-xl">
          Beyond Sports. <br /> A Legacy in Motion.
        </h1>
        <p className="max-w-3xl text-base md:text-xl text-gray-300">
          Step into{" "}
          <span className="text-white font-semibold">Elite Arena</span> — where
          excellence meets passion, athletes become icons, and every match
          forges history.
        </p>
      </motion.div>
    </section>
  );
};

export default HeroAboutIntro;
