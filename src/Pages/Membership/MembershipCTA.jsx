import { motion } from "framer-motion";

const MembershipCTA = () => {
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
          <button className="bg-black hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg">
            Claim Your Discount Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipCTA;
