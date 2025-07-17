import { motion } from "framer-motion";

const sports = [
  {
    name: "Football",
    icon: "⚽",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    gradient: "from-green-500 to-green-700",
  },
  {
    name: "Basketball",
    icon: "🏀",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    name: "Tennis",
    icon: "🎾",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Swimming",
    icon: "🏊",
    image: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d5",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "Cricket",
    icon: "🏏",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
    gradient: "from-red-500 to-red-700",
  },
  {
    name: "Badminton",
    icon: "🏸",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    name: "Table Tennis",
    icon: "🏓",
    image: "https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea",
    gradient: "from-pink-500 to-pink-700",
  },
  {
    name: "Volleyball",
    icon: "🏐",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1",
    gradient: "from-indigo-500 to-indigo-700",
  },
  {
    name: "Athletics",
    icon: "🏃",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
    gradient: "from-amber-500 to-amber-700",
  },
  {
    name: "Gymnastics",
    icon: "🤸",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    gradient: "from-rose-500 to-rose-700",
  },
];

const FeaturedSports = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Elite <span className="text-yellow-500">Sports</span> Arena
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            World-class facilities for 10 premier sports disciplines
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {sports.map((sport, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${sport.gradient} opacity-90 z-10`}
              ></div>

              {/* Sport Image */}
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="text-5xl mb-3">{sport.icon}</span>
                <h3 className="text-2xl font-bold mb-2">{sport.name}</h3>
                <div className="w-12 h-1 bg-white my-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <button className="mt-4 px-6 py-2 bg-white text-gray-900 font-medium rounded-full opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300">
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-lg transition-all transform hover:scale-105">
            View All Sports Facilities
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSports;
