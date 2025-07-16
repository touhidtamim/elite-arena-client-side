import { motion } from "framer-motion";

const MembershipHero = () => {
  return (
    <section className="relative h-[90vh] bg-black overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1547347298-4074fc3086f0"
          alt="Elite Arena Members"
          className="w-full h-full object-cover opacity-60"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif"
          >
            <span className="text-yellow-400">Elevate</span> Your Experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Unlock exclusive benefits, priority access, and member-only
            discounts
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg"
          >
            Explore Memberships
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipHero;
