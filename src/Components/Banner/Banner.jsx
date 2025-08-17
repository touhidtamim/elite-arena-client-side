import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Elite Championship Training",
    subtitle: "2026 Season Registration",
    description: "Train like the pros with national-level cricket coaches",
    image: "/BannerImg/slide-1.webp",
    cta: "Join Now",
    link: "/membership",
  },
  {
    id: 2,
    title: "Next Gen Athlete Program",
    subtitle: "Ages 14-21",
    description:
      "Develop championship mentality with our proven training system",
    image: "/BannerImg/slide-2.webp",
    cta: "Discover More",
    link: "/membership",
  },
  {
    id: 3,
    title: "Elite Performance Center",
    subtitle: "Now Open",
    description: "Bangladesh's most advanced sports science facility",
    image: "/BannerImg/slide-3.webp",
    cta: "Book Tour",
    link: "/courts",
  },
  {
    id: 4,
    title: "Summer Intensive Camp",
    subtitle: "Limited Spaces",
    description: "6-week transformational training with international coaches",
    image: "/BannerImg/slide-4.webp",
    cta: "Reserve Spot",
    link: "/courts",
  },
  {
    id: 5,
    title: "Pro Athlete Combine",
    subtitle: "October 2026",
    description: "Showcase your skills for national team scouts",
    image: "/BannerImg/slide-5.webp",
    cta: "Register Now",
    link: "/membership",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
    }),
  };

  return (
    <section className="relative bg-gray-900 h-[70vh] md:h-[80vh] lg:h-[90vh] max-h-[900px] overflow-hidden pt-20">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate={currentSlide === index ? "center" : "exit"}
          className="absolute inset-0 flex items-center"
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover absolute"
            loading="eager"
          />

          <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.span
                className="text-yellow-400 font-medium mb-2 block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {slide.subtitle}
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif tracking-tight leading-tight">
                {slide.title}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                {slide.description}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  to={slide.link}
                  className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg transition-colors gap-2"
                >
                  {slide.cta}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ))}
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-yellow-400 w-6"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
    </section>
  );
};

export default Banner;
