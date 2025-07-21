import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const CourtTestimonials = () => {
  const testimonials = [
    {
      quote:
        "The best tennis courts in the city! Perfect surface and lighting.",
      author: "Rafiq Ahmed",
      role: "Amateur Tennis Player",
    },
    {
      quote:
        "I've been coming here for badminton every week. Never disappointed.",
      author: "Fatima Naz",
      role: "Regular Member",
    },
    {
      quote: "Excellent facilities and professional staff. Highly recommended!",
      author: "Sajid Hossain",
      role: "Squash Enthusiast",
    },
    {
      quote:
        "The coaching programs transformed my game completely. Worth every penny!",
      author: "Nusrat Jahan",
      role: "Competitive Player",
    },
    {
      quote:
        "Clean, well-maintained, and always available. My go-to sports complex.",
      author: "Imran Khan",
      role: "Weekend Warrior",
    },
    {
      quote:
        "The indoor courts are perfect for our league matches, rain or shine.",
      author: "Coach Rahman",
      role: "Local Team Coach",
    },
    {
      quote:
        "My kids love the junior programs. Safe and professional environment.",
      author: "Ayesha Siddique",
      role: "Parent",
    },
    {
      quote: "The gym equipment is top-notch and always well-maintained.",
      author: "Rashed Alam",
      role: "Fitness Trainer",
    },
    {
      quote: "Best value for money among all sports facilities I've tried.",
      author: "Tanvir Hossain",
      role: "Student Athlete",
    },
    {
      quote: "The staff goes above and beyond to accommodate special requests.",
      author: "Maria Chowdhury",
      role: "Corporate Event Organizer",
    },
    {
      quote:
        "Perfect lighting for evening games. Never have visibility issues.",
      author: "Omar Faruq",
      role: "Badminton Player",
    },
    {
      quote: "The cafe serves healthy post-workout meals - a great addition!",
      author: "Sadia Rahman",
      role: "Health Enthusiast",
    },
    {
      quote:
        "I've improved my serve dramatically since joining their tennis clinic.",
      author: "Rajib Karim",
      role: "Tennis Player",
    },
    {
      quote:
        "The locker rooms are always clean and well-stocked with amenities.",
      author: "Emon Islam",
      role: "Swim Team Captain",
    },
    {
      quote:
        "Their membership plans are flexible and suit all types of athletes.",
      author: "Dilara Akter",
      role: "Marathon Runner",
    },
    {
      quote: "Great atmosphere and friendly community for all sports lovers.",
      author: "Arif Chowdhury",
      role: "Basketball Player",
    },
    {
      quote:
        "The physiotherapy services helped me recover quickly after injury.",
      author: "Nabila Khan",
      role: "Athlete",
    },
    {
      quote: "Flexible timing and affordable rates make this club stand out.",
      author: "Habib Ullah",
      role: "Fitness Enthusiast",
    },
    {
      quote: "My children enjoy the swimming lessons here every weekend.",
      author: "Farhana Siddiqui",
      role: "Parent",
    },
    {
      quote: "Top quality coaching that really pushes you to the next level.",
      author: "Shafiqur Rahman",
      role: "Professional Player",
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
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
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
                  className="bg-white p-8 rounded-xl shadow-lg w-80 flex-shrink-0 border border-yellow-500 relative group hover:shadow-xl transition-all"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-yellow-400/30 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 pointer-events-none"></div>

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
                  className="bg-white p-8 rounded-xl shadow-lg w-80 flex-shrink-0 border border-gray-200 relative group hover:shadow-xl transition-all"
                  whileHover={{ y: -5 }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-yellow-400/30 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 pointer-events-none"></div>

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
            <motion.div
              key={dot}
              className={`w-3 h-3 rounded-full ${
                dot === 1 ? "bg-yellow-500" : "bg-gray-300"
              }`}
              animate={{
                scale: dot === 1 ? [1, 1.2, 1] : 1,
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourtTestimonials;
