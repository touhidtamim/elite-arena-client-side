import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  const fullText = "Applications closing soon for 2026 intake";
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 1500; // pause before deleting

  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;

    if (!isDeleting && displayedText.length < fullText.length) {
      // typing
      timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === fullText.length) {
      // pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && displayedText.length > 0) {
      // deleting
      timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      // finished deleting, start typing again
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, fullText]);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-xl p-8 md:p-10"
        >
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-6 font-serif tracking-tight">
              Join the Elite
            </h3>

            <p className="text-gray-900 text-lg mb-8 max-w-xl mx-auto">
              Begin your journey to greatness with our championship-winning
              program
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/membership"
                className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-all"
              >
                Enroll Now
              </Link>
            </motion.div>

            {/* Typing effect paragraph */}
            <p className="text-gray-700 text-sm mt-8 font-mono tracking-wide select-none mx-auto">
              {displayedText}
              <span className="animate-blink">|</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
