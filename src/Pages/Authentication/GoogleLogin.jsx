import React from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const GoogleLogin = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 py-3 px-4 rounded-lg transition-all duration-200"
      whileHover={{ y: -2 }}
    >
      <FcGoogle className="text-xl" />
      <span className="text-sm font-medium">Continue with Google</span>
    </motion.button>
  );
};

export default GoogleLogin;
