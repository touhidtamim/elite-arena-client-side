import { motion } from "framer-motion";

const CourtFacilities = () => {
  const facilities = [
    {
      title: "Locker Rooms",
      description: "Spacious changing rooms with secure lockers",
      icon: "🔒",
    },
    {
      title: "Equipment Rental",
      description: "High-quality rackets, balls, and other gear available",
      icon: "🎾",
    },
    {
      title: "Pro Coaching",
      description: "Book sessions with certified coaches",
      icon: "👨‍🏫",
    },
    {
      title: "Café Lounge",
      description: "Refreshments and snacks available",
      icon: "☕",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 font-serif">
            <span className="text-yellow-400">Court</span> Facilities
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            More than just courts - everything you need for the perfect game
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{facility.icon}</div>
              <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
              <p className="text-gray-300">{facility.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourtFacilities;
