import { motion } from "framer-motion";

const events = [
  {
    title: "Summer Football League",
    date: "Aug 15 - Aug 20",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    title: "Elite Tennis Open",
    date: "Nov 5-10",
    image:
      "https://i.postimg.cc/jd895LQD/premium-photo-1733342490554-4bcb4c60631e-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg",
  },
  {
    title: "Swimming Championship",
    date: "Dec 12-15",
    image:
      "https://i.postimg.cc/nrFRVJXK/photo-1691272472455-885135750a94-q-80-w-1087-auto-format-fit-crop-ixlib-rb-4-1.jpg",
  },
];

const UpcomingEvents = () => {
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
            <span className="text-yellow-400">Upcoming</span> Events
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't miss our exciting tournaments and competitions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="flex items-center text-yellow-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {event.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
