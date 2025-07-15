import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const TrustAndProof = () => {
  const stats = [
    { label: "Active Members", value: "10,000+" },
    { label: "Tournaments Hosted", value: "100+" },
    { label: "Programs Offered", value: "10+" },
    { label: "Elite Coaches", value: "45+" },
  ];

  const testimonials = [
    {
      name: "Nabila Hasan",
      role: "National Badminton Champion",
      quote:
        "Elite Arena built me from the ground up. It's more than a club — it's a family of winners.",
      rating: 5,
    },
    {
      name: "Samiur Rahman",
      role: "Athlete",
      quote:
        "Their recovery system and coaching saved my career after injury. Truly elite!",
      rating: 5,
    },
    {
      name: "Tanisha Akter",
      role: "Member",
      quote:
        "I found strength, focus, and my people here. Elite Arena changed my lifestyle completely.",
      rating: 4,
    },
    {
      name: "Rafiq Islam",
      role: "Professional Player",
      quote:
        "The training facilities are world-class. I've improved my game significantly since joining.",
      rating: 5,
    },
    {
      name: "Farhana Yeasmin",
      role: "Beginner",
      quote:
        "As a complete beginner, I felt welcomed and supported throughout my journey.",
      rating: 4,
    },
    {
      name: "Arif Khan",
      role: "Parent",
      quote:
        "My kids have developed not just skills but also great discipline through their programs.",
      rating: 5,
    },
    {
      name: "Sabrina Ahmed",
      role: "Competitive Player",
      quote:
        "The coaching staff understands individual needs and tailors training accordingly.",
      rating: 5,
    },
    {
      name: "Imran Hossain",
      role: "Fitness Enthusiast",
      quote:
        "The fitness programs transformed my athletic performance in just 3 months.",
      rating: 4,
    },
    {
      name: "Mehnaz Begum",
      role: "Senior Member",
      quote:
        "Been with Elite Arena for 5 years. The community keeps getting better!",
      rating: 5,
    },
    {
      name: "Tahmid Chowdhury",
      role: "Junior Champion",
      quote:
        "Won my first tournament thanks to the expert guidance from Elite Arena coaches.",
      rating: 5,
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const testimonialContainerRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Auto-scroll testimonials
  useEffect(() => {
    const container = testimonialContainerRef.current;
    if (!container) return;

    let animationFrame;
    let speed = 0.5;
    let position = 0;

    const moveItems = () => {
      position -= speed;
      if (Math.abs(position) >= container.scrollWidth / 2) {
        position = 0;
      }
      container.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(moveItems);
    };

    animationFrame = requestAnimationFrame(moveItems);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
    hover: {
      scale: 1.05,
      boxShadow:
        "0 0 0 3px rgba(255,255,255,0.2), 0 0 20px rgba(234, 179, 8, 0.6), inset 0 0 30px rgba(0,0,0,0.5)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-black text-white  px-4 py-20 md:px-24 lg:space-y-20 overflow-hidden"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">
        {stats.map((item, i) => {
          const numericValue = parseInt(item.value.replace(/[^0-9]/g, ""), 10);
          const suffix = item.value.replace(/[0-9,]/g, "");

          return (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={statVariants}
              whileHover="hover"
              className="relative bg-yellow-500 text-black p-4 md:p-8 rounded-xl border-2 border-white cursor-default group"
            >
              <div className="absolute inset-0 rounded-xl border-2 border-black opacity-0 group-hover:opacity-100 group-hover:animate-pulse pointer-events-none transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] group-hover:shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300 pointer-events-none" />

              <span className="block text-3xl md:text-5xl font-extrabold relative z-10">
                <CountUp end={numericValue} duration={2.5} separator="," />
                {suffix}
              </span>

              <p className="text-sm md:text-xl font-semibold mt-2 relative z-10">
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Testimonials */}
      <div className="space-y-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10 pb-2 border-b-4 border-yellow-500 inline-block"
        >
          What Our Members Say
        </motion.h3>

        <div className="relative overflow-x-hidden w-full">
          <div
            ref={testimonialContainerRef}
            className="flex gap-6 py-4 w-max"
            style={{ willChange: "transform" }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="bg-black text-white p-4 md:p-6 rounded-xl shadow-md space-y-3 md:space-y-4 min-w-[80vw] sm:min-w-[60vw] md:min-w-[320px] max-w-[80vw] sm:max-w-[60vw] md:max-w-[320px] border-2 border-yellow-500 transition-all duration-300 cursor-default"
              >
                <div className="flex">
                  {[...Array(5)].map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        starIdx < t.rating ? "text-yellow-400" : "text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs md:text-base text-gray-300 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-sm md:text-base font-bold text-yellow-400">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndProof;
