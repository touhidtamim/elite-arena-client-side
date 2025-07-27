import { motion } from "framer-motion";

const MembershipHero = () => {
  const sentence =
    "Unlock access to premium perks, early reservations, and a lifestyle of elite privileges at Elite Arena.";

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[90vh] w-full overflow-hidden">
      {/* Background Image with Parallax Zoom-Out */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="https://i.postimg.cc/Pqcx7pZs/photo-1559171667-74fe3499b5ba-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg"
          alt="Elite Arena Membership"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/80"></div>
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif tracking-tight text-white drop-shadow-xl">
            Join the Circle.
            <br />
            Live Privileged.
          </h1>

          {/* Staggered Word-by-Word Reveal */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto flex flex-wrap justify-center gap-x-1 text-center leading-relaxed"
          >
            {sentence.split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipHero;
