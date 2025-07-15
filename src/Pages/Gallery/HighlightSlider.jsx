import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const highlights = [
  {
    src: "https://images.unsplash.com/photo-1543357480-c60d400e2ef9",
    caption: "Elite Arena Launch",
    year: "2021",
    description:
      "The grand opening that marked the beginning of a new sports legacy.",
    stats: "500+ attendees | 15 sports | 1 vision",
  },
  {
    src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    caption: "First Intra-Club Championship",
    year: "2021",
    description:
      "The inaugural club championship featured intense competition across all categories.",
    stats: "150 athletes | 10 sports | 18 medals",
  },
  {
    src: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402",
    caption: "Summer Sports Fest",
    year: "2022",
    description:
      "A family-friendly event with tournaments, workshops, and food stalls.",
    stats: "3-day event | 2000+ visitors | 25 activities",
  },
  {
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
    caption: "Elite Cricket Cup",
    year: "2022",
    description:
      "Intense cricketing action between 8 teams vying for the Elite Cup.",
    stats: "8 teams | 15 matches | Avg score: 176",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    caption: "Fitness Bootcamp Initiative",
    year: "2022",
    description:
      "Our first bootcamp focused on strength, endurance, and discipline.",
    stats: "6-week plan | 50 participants | Avg fat loss: 5.2kg",
  },
  {
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
    caption: "Women's Volleyball League",
    year: "2023",
    description:
      "Empowering women through high-intensity volleyball tournaments.",
    stats: "6 teams | 10 matches | 85% female attendance",
  },
  {
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    caption: "Night Football Fiesta",
    year: "2023",
    description:
      "Elite Arena hosted a unique under-the-lights football tournament.",
    stats: "12 teams | 3 nights | 5-a-side format",
  },
  {
    src: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    caption: "Skill Development Workshops",
    year: "2023",
    description:
      "Multi-sport workshops to nurture the next generation of athletes.",
    stats: "100+ kids | 6 trainers | 4 disciplines",
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
    caption: "New Gym Facility",
    year: "2024",
    description:
      "State-of-the-art fitness zone equipped for both beginners and pros.",
    stats: "₹1.2Cr investment | 20+ machines | 3 trainers",
  },
  {
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2",
    caption: "Basketball Showdown 2024",
    year: "2024",
    description: "Thrilling slam dunks and buzzer beaters in a packed arena.",
    stats: "6 teams | Avg score: 62 | MVP: A. Rahman",
  },
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    caption: "Martial Arts Showcase",
    year: "2024",
    description: "A stunning display of skill, discipline, and technique.",
    stats: "9 black belts | 3 hours | 500+ audience",
  },
  {
    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    caption: "Elite Arena Anniversary",
    year: "2024",
    description: "Celebrating 3 years of growth, unity, and excellence.",
    stats: "1000+ attendees | Awards night | 12 performances",
  },
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
    caption: "Sports Nutrition Seminar",
    year: "2024",
    description:
      "Educating our athletes on health, hydration, and peak performance.",
    stats: "3 guest speakers | 2-hour session | 80 participants",
  },
  {
    src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
    caption: "Junior Talent Hunt",
    year: "2024",
    description:
      "Scouting and encouraging young talents across multiple disciplines.",
    stats: "60 kids | 5 categories | 10 scholarships awarded",
  },
  {
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    caption: "Regional Tournament Host",
    year: "2025",
    description:
      "Elite Arena hosted the largest regional sports meet in its history.",
    stats: "300+ athletes | 15 clubs | 3-day event",
  },
  {
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
    caption: "Goalkeeper Masterclass",
    year: "2025",
    description:
      "Advanced-level training for aspiring goalkeepers led by a national coach.",
    stats: "20 players | 2-day camp | 6 hours daily",
  },
  {
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    caption: "Elite Esports Launch",
    year: "2025",
    description:
      "Expanding into virtual sports with Elite's first official esports division.",
    stats: "4 games | 60 players | ₹50K prize pool",
  },
  {
    src: "https://images.unsplash.com/photo-1517646287270-a5a9ca6e9446",
    caption: "Coach the Coaches Program",
    year: "2025",
    description:
      "Professional development for our in-house trainers and sports mentors.",
    stats: "5-day training | 15 coaches | 2 international speakers",
  },
  {
    src: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
    caption: "Inclusive Sports Day",
    year: "2025",
    description:
      "Bringing together athletes of all abilities in a celebration of sport.",
    stats: "150 participants | 12 activities | 100% smiles",
  },
  {
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d",
    caption: "Elite Arena Annual Gala",
    year: "2025",
    description:
      "An elegant night celebrating the athletes, coaches, and partners of our journey.",
    stats: "VIP guests | 14 awards | Live music",
  },
];

const HighlightSlider = () => {
  const sliderRef = useRef(null);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || highlights.length <= 3) return;

    let scrollAmount = 0;
    const speed = 0.5;
    let animationFrame;

    const animate = () => {
      scrollAmount += speed;
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
      }
      slider.scrollLeft = scrollAmount;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Drag to scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 font-serif tracking-tight">
            Hall of Fame Highlights
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Relive the iconic moments that defined our legacy
          </p>
        </motion.div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar py-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {highlights.map((highlight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="flex-shrink-0 w-80 md:w-96 relative group rounded-xl overflow-hidden"
              onClick={() => setSelectedHighlight(highlight)}
            >
              <img
                src={highlight.src}
                alt={highlight.caption}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-yellow-400 bg-black/50 rounded-full">
                    {highlight.year}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {highlight.caption}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 flex items-center">
                    View details <span className="ml-2 text-yellow-400">→</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedHighlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedHighlight(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="h-[60vh]">
                  <img
                    src={selectedHighlight.src}
                    alt={selectedHighlight.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-400 bg-gray-800 rounded-full mb-4">
                      {selectedHighlight.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedHighlight.caption}
                    </h3>
                  </div>

                  <div className="prose prose-invert text-gray-300 mb-6">
                    <p>{selectedHighlight.description}</p>
                  </div>

                  <div className="mt-auto">
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                      <h4 className="text-sm text-gray-400 uppercase mb-2">
                        Key Stats
                      </h4>
                      <p className="text-yellow-400">
                        {selectedHighlight.stats}
                      </p>
                    </div>

                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                      View Full Story
                      <svg
                        className="w-5 h-5 ml-2"
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
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white hover:text-yellow-400 transition-all"
                onClick={() => setSelectedHighlight(null)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HighlightSlider;
