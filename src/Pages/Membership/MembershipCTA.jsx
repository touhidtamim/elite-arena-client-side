import { motion } from "framer-motion";

const MembershipCTA = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-xl p-8 md:p-10 text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-black mb-6"
          >
            Ready to Become an Elite Member?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-900 mb-8"
          >
            Join today and get your first month at 50% off!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg transition-all"
            >
              Claim Your Discount Now
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipCTA;
