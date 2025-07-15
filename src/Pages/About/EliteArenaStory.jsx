import React from "react";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const EliteArenaStory = () => {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-4 py-24 md:px-20 space-y-24">
      {/* Our Story */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUpVariant}
          className="text-4xl md:text-5xl font-bold mb-6 font-serif text-yellow-400 drop-shadow-sm"
        >
          Our Story
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          className="text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          Since our founding in 2021,{" "}
          <span className="text-white font-semibold">Elite Arena</span> has
          evolved from a humble dream into one of Bangladesh’s premier sports
          hubs. We began with just 2 courts and a bold vision — to craft a safe,
          world-class space where athletic dreams are born and raised.
        </motion.p>
        <motion.p
          variants={fadeUpVariant}
          className="text-lg md:text-xl text-gray-400 mt-6"
        >
          To us, sports are more than competition — they’re transformation.
          We’re not just a club. We’re a movement. From young rookies to elite
          champions, we support every athlete’s journey with passion,
          dedication, and care.
        </motion.p>
      </motion.div>

      {/* Why We Stand Out */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
      >
        <motion.img
          variants={fadeUpVariant}
          src="https://i.postimg.cc/pL55tjLX/Jason-Brunson-Athletes-Arena-Personal-Training7.jpg"
          alt="Elite Arena Facility"
          className="rounded-xl shadow-2xl w-full h-auto object-cover"
        />
        <motion.div variants={fadeUpVariant}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why We Stand Out
          </h3>
          <ul className="space-y-4 text-gray-300 text-lg list-disc list-inside">
            <li>🏟️ 10+ advanced courts with smart lighting & scheduling</li>
            <li>💪 Certified coaching for beginners to pros</li>
            <li>🏆 Hosted 200+ high-stakes tournaments nationwide</li>
            <li>🧠 Wellness zone — gym, recovery & mental strength sessions</li>
            <li>🤝 Inclusive, family-safe, and athlete-first community</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Vision & Mission */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-900/80 p-10 md:p-14 rounded-xl shadow-inner max-w-6xl mx-auto text-center space-y-6 border border-gray-800"
      >
        <h3 className="text-3xl md:text-4xl font-bold font-serif text-yellow-400">
          Our Vision & Mission
        </h3>
        <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
          We dream of a Bangladesh where sports are not a privilege, but a
          birthright — open to every child, youth, and adult ready to rise.
        </p>
        <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
          Our mission is to develop character, build champions, and unite
          communities through elite facilities, world-class mentorship, and
          fierce commitment to growth.
        </p>
      </motion.div>
    </section>
  );
};

export default EliteArenaStory;
