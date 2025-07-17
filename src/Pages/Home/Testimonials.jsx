import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Asif Rahman",
    role: "National Football Player",
    quote: "Elite Arena's facilities helped me improve my shot accuracy by 22%",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Tasnim Ahmed",
    role: "Olympic Swimmer",
    quote: "Dropped 1.8s off my 200m time using the hydrotherapy pools",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Rafiq Islam",
    role: "Celebrity Trainer",
    quote: "Achieved 5 viral fitness transformations at Elite Arena",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const brands = [
  { id: 1, name: "Nike", logo: "https://logo.clearbit.com/nike.com" },
  { id: 2, name: "Gatorade", logo: "https://logo.clearbit.com/gatorade.com" },
  { id: 3, name: "Technogym", logo: "https://logo.clearbit.com/technogym.com" },
  { id: 4, name: "Adidas", logo: "https://logo.clearbit.com/adidas.com" },
  { id: 5, name: "Red Bull", logo: "https://logo.clearbit.com/redbull.com" },
];

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const brandsContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = brandsContainerRef.current;
    let animationFrame;
    let speed = 0.5;
    let position = 0;

    const animate = () => {
      position += speed;
      if (position >= container.scrollWidth / 2) {
        position = 0;
      }
      container.scrollLeft = position;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <section className="py-24 px-4 text-center relative">
        <h2 className="text-5xl font-extrabold tracking-tight font-serif mb-4">
          Real Stories. <span className="text-yellow-400">Elite Impact.</span>
        </h2>
        <p className="text-lg max-w-xl mx-auto text-gray-300">
          Athletes who’ve trained here share their powerful transformations.
        </p>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 flex justify-center items-center py-12 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
              <img
                src={testimonials[activeTestimonial].image}
                alt={testimonials[activeTestimonial].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl italic text-gray-200 mb-4">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <h4 className="text-xl font-bold text-white">
                {testimonials[activeTestimonial].name}
              </h4>
              <p className="text-yellow-400 font-medium">
                {testimonials[activeTestimonial].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Brand Carousel */}
      <div className="py-16">
        <h3 className="text-2xl text-center font-serif mb-10">
          Endorsed by <span className="text-yellow-400">Elite Brands</span>
        </h3>
        <div
          ref={brandsContainerRef}
          className="overflow-hidden whitespace-nowrap flex gap-16 px-4 py-4"
        >
          {[...brands, ...brands].map((brand, index) => (
            <motion.div
              key={`${brand.id}-${index}`}
              className="inline-flex items-center justify-center px-6"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 brightness-75 hover:brightness-100 transition duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-20 bg-black/80">
        <h3 className="text-3xl font-serif text-white mb-6">
          Are You Ready to Become{" "}
          <span className="text-yellow-400">Elite?</span>
        </h3>
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          Step inside a facility where legends are born. Let your journey begin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105">
            Book a Tour
          </button>
          <button className="border border-white/30 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition-all">
            View Membership Plans
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p>© {new Date().getFullYear()} Elite Arena. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Premier Sports Facility | Dhaka, Bangladesh
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Testimonials;
