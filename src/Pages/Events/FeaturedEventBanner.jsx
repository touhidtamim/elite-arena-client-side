import React from "react";
import { motion } from "framer-motion";

const FeaturedEventBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-24 px-6 overflow-hidden bg-black"
    >
      {/* Modern geometric overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-yellow-400 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-[120px]"></div>
      </div>

      {/* Glowing grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Modern image showcase */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Main image */}
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
                alt="Elite Championship"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />

              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🔥 Featured Event
              </div>
            </div>

            {/* Decorative frame elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-yellow-400 opacity-80"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-yellow-400 opacity-80"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-6 text-white"
          >
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-yellow-400/10 text-yellow-400 text-xs font-bold tracking-wider rounded-full border border-yellow-400/30">
                PREMIER LEAGUE
              </span>
              <span className="px-4 py-1.5 bg-white/10 text-white text-xs font-bold tracking-wider rounded-full border border-white/20">
                DEC 12-16, 2025
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              <span className="font-serif italic">The</span>{" "}
              <span className="font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Elite Championship
              </span>
            </h2>

            <p className="text-lg text-gray-300 max-w-lg">
              Where legends are forged in the crucible of competition. Witness
              Bangladesh's finest athletes battle for supremacy in our most
              prestigious tournament yet.
            </p>

            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Elite Arena Complex</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>8:00 PM Daily</span>
                </div>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "#f59e0b",
                  boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative overflow-hidden group bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-8 rounded-full text-lg shadow-md"
              >
                <span className="relative z-10">Reserve Your Seat</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedEventBanner;
