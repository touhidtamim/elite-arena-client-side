import { motion } from "framer-motion";

const benefits = [
  {
    title: "Priority Booking",
    description: "Reserve courts and facilities before public release",
    icon: "⏱️",
    coupon: "EARLYACCESS20",
  },
  {
    title: "Exclusive Discounts",
    description: "20-30% off on all events and merchandise",
    icon: "💰",
    coupon: "ELITESAVINGS",
  },
  {
    title: "Personal Training",
    description: "Access to elite coaching sessions with professionals",
    icon: "💪",
    coupon: "TRAINPRO25",
  },
  {
    title: "VIP Lounge Access",
    description: "Members-only relaxation and recovery areas",
    icon: "✨",
    coupon: "VIPLOUNGE",
  },
  {
    title: "Guest Privileges",
    description: "Complimentary passes for friends and family",
    icon: "👥",
    coupon: "BRINGFRIEND",
  },
  {
    title: "Special Events",
    description: "Invites to exclusive tournaments and socials",
    icon: "🎉",
    coupon: "EVENTPASS",
  },
];

const MembershipBenefits = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
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
            Elite <span className="text-yellow-500">Membership</span> Perks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock premium benefits and exclusive discounts
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all relative overflow-hidden"
            >
              {/* Ribbon for Coupon */}
              <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12 shadow-sm">
                USE CODE: {benefit.coupon}
              </div>

              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600 mb-6">{benefit.description}</p>

              {/* Coupon Reveal */}
              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">DISCOUNT CODE</p>
                <p className="font-mono font-bold text-yellow-600 text-lg tracking-widest">
                  {benefit.coupon}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Offer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 md:p-10 text-center shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
            Limited Time Offer!
          </h3>
          <p className="text-lg text-gray-900 mb-6">
            Join now and get <span className="font-bold">50% OFF</span> your
            first month with code:{" "}
            <span className="font-mono font-bold">NEWELITE50</span>
          </p>
          <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all transform hover:scale-105">
            Claim Your Discount
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
