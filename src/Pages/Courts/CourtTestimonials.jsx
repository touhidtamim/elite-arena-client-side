import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const CourtTestimonials = () => {
  const testimonials = [
    {
      quote:
        "The best tennis courts in the city! Perfect surface and lighting.",
      author: "Rafael M.",
      role: "Amateur Tennis Player",
    },
    {
      quote:
        "I've been coming here for badminton every week. Never disappointed.",
      author: "Sarah K.",
      role: "Regular Member",
    },
    {
      quote: "Excellent facilities and professional staff. Highly recommended!",
      author: "David P.",
      role: "Squash Enthusiast",
    },
    {
      quote:
        "The coaching programs transformed my game completely. Worth every penny!",
      author: "Priya S.",
      role: "Competitive Player",
    },
    {
      quote:
        "Clean, well-maintained, and always available. My go-to sports complex.",
      author: "Michael T.",
      role: "Weekend Warrior",
    },
    {
      quote:
        "The indoor courts are perfect for our league matches, rain or shine.",
      author: "Coach Williams",
      role: "Local Team Coach",
    },
    {
      quote:
        "My kids love the junior programs. Safe and professional environment.",
      author: "Lisa R.",
      role: "Parent",
    },
    {
      quote: "The gym equipment is top-notch and always well-maintained.",
      author: "Alex G.",
      role: "Fitness Trainer",
    },
    {
      quote: "Best value for money among all sports facilities I've tried.",
      author: "James L.",
      role: "Student Athlete",
    },
    {
      quote: "The staff goes above and beyond to accommodate special requests.",
      author: "Maria C.",
      role: "Corporate Event Organizer",
    },
    {
      quote:
        "Perfect lighting for evening games. Never have visibility issues.",
      author: "Oliver K.",
      role: "Badminton Player",
    },
    {
      quote: "The cafe serves healthy post-workout meals - a great addition!",
      author: "Sophie M.",
      role: "Health Enthusiast",
    },
    {
      quote:
        "I've improved my serve dramatically since joining their tennis clinic.",
      author: "Rajiv P.",
      role: "Tennis Player",
    },
    {
      quote:
        "The locker rooms are always clean and well-stocked with amenities.",
      author: "Emma S.",
      role: "Swim Team Captain",
    },
    {
      quote:
        "Their membership plans are flexible and suit all types of athletes.",
      author: "Daniel W.",
      role: "Marathon Runner",
    },
  ];

  const containerRef = useRef(null);
  const controls = useAnimation();
  const duration = 40; // seconds for one complete loop

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const contentWidth = container.firstChild.scrollWidth / 2; // Since we duplicate content

    const sequence = async () => {
      await controls.start({
        x: -contentWidth,
        transition: { duration: duration, ease: "linear" },
      });
      controls.set({ x: 0 });
      sequence();
    };

    sequence();
  }, [controls]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            <span className="text-yellow-500">Member</span> Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from those who've experienced our facilities firsthand
          </p>
        </motion.div>

        <div className="relative py-8">
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              animate={controls}
              className="flex gap-8 w-max"
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* Original testimonials */}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`original-${index}`}
                  className="bg-white p-8 rounded-xl shadow-lg w-80 flex-shrink-0 border border-gray-200 hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-yellow-400 text-4xl mb-4 font-serif">
                    "
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="font-bold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Duplicated testimonials for seamless looping */}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`duplicate-${index}`}
                  className="bg-white p-8 rounded-xl shadow-lg w-80 flex-shrink-0 border border-gray-200 hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-yellow-400 text-4xl mb-4 font-serif">
                    "
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="font-bold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient fade effects */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 rounded-full ${
                dot === 1 ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourtTestimonials;
