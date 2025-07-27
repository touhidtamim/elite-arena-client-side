import React from "react";
import { motion } from "framer-motion";

const GalleryHero = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[90vh] pt-20 w-full overflow-hidden text-white flex items-center justify-center bg-black">
      {/* Background with parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://i.postimg.cc/Gt391rcR/photo-1663440234478-0ed988066e55-mark-https-images-unsplash-com-opengraph-logo-png-mark-w-64-mark.jpg"
          alt="Elite Arena Stadium"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      </motion.div>

      {/* Content with staggered animation */}
      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif tracking-tight">
            Moments That Define Us
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
        >
          Witness the passion, glory, and unforgettable memories that shape the
          Elite Arena legacy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        ></motion.div>
      </div>
    </section>
  );
};

export default GalleryHero;
