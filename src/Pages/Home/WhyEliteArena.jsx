import { motion } from "framer-motion";

const WhyEliteArena = () => {
  const valueProps = [
    {
      icon: (
        <svg
          className="w-12 h-12 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Unmatched Facilities",
      description:
        "Olympic-standard venues with cutting-edge technology and luxury amenities",
      stats: "15+ world-class venues",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Elite Coaching",
      description:
        "Learn from Olympic medalists and national champions with personalized training",
      stats: "23 certified pro coaches",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      title: "Proven Excellence",
      description: "Home to 47 national records and 12 international medalists",
      stats: "Since 2015",
    },
  ];

  return (
    <section className="py-28 px-6 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-yellow-400 mb-4 tracking-widest font-light">
            WHY CHOOSE US
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
            The <span className="text-yellow-400 font-normal">Elite Arena</span>{" "}
            Difference
          </h2>
          <div className="w-24 h-px bg-yellow-400 mx-auto"></div>
        </motion.div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Card */}
              <div className="h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group-hover:border-yellow-400 transition-all p-8 flex flex-col">
                {/* Icon */}
                <div className="mb-6">{prop.icon}</div>

                {/* Content */}
                <h3 className="text-2xl font-serif font-light mb-4">
                  {prop.title}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow">
                  {prop.description}
                </p>
                <p className="text-yellow-400 text-sm font-medium">
                  {prop.stats}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { number: "12K+", label: "Members" },
            { number: "47", label: "National Records" },
            { number: "9", label: "Olympians Trained" },
            { number: "120+", label: "Events Monthly" },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center py-8 border border-gray-800 rounded-lg hover:bg-gray-900/50 transition-all"
            >
              <p className="text-4xl font-serif text-yellow-400 mb-2">
                {item.number}
              </p>
              <p className="text-gray-400 uppercase tracking-widest text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyEliteArena;
