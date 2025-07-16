import { motion } from "framer-motion";

const MemberBenefits = () => {
  const benefits = [
    {
      title: "Exclusive Discounts",
      description: "20-30% off on all events and merchandise",
      icon: "💰",
    },
    {
      title: "Priority Access",
      description: "Early booking for all events and facilities",
      icon: "🎫",
    },
    {
      title: "Personal Training",
      description: "Discounted sessions with our elite coaches",
      icon: "💪",
    },
    {
      title: "VIP Lounge",
      description: "Access to members-only relaxation areas",
      icon: "✨",
    },
    {
      title: "Guest Passes",
      description: "Bring friends with complimentary passes",
      icon: "👥",
    },
    {
      title: "Special Events",
      description: "Invites to members-only tournaments and parties",
      icon: "🎉",
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
            <span className="text-yellow-400">Elite</span> Benefits
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Why join our membership program
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberBenefits;
