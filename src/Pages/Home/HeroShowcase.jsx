import React from "react";

const EliteExperience = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-yellow-400 mb-4 tracking-widest text-sm uppercase">
              THE ELITE DIFFERENCE
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-light mb-6 leading-tight">
              Curated{" "}
              <span className="text-yellow-400 font-normal">Experiences</span>{" "}
              for
              <br className="hidden sm:block" />
              Discerning{" "}
              <span className="text-yellow-400 font-normal">Athletes</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm sm:text-base">
              Elite Arena transcends conventional sports facilities with bespoke
              training programs, personalized coaching, and exclusive member
              events designed for those who demand excellence.
            </p>
            <ul className="space-y-4 text-sm sm:text-base text-gray-300">
              {[
                "Private training sessions with Olympians",
                "Biometric performance tracking",
                "Luxury recovery lounges",
                "Concierge service",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start justify-center md:justify-start"
                >
                  <span className="text-yellow-400 mr-2">✧</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl shadow-lg">
              <img
                src="/BannerImg/slide-3.webp"
                alt="Elite Experience"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute -bottom-1 -left-1 w-20 h-20 sm:w-28 sm:h-28 border-l-2 border-b-2 border-yellow-400" />
              <div className="absolute -top-1 -right-1 w-20 h-20 sm:w-28 sm:h-28 border-r-2 border-t-2 border-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteExperience;
