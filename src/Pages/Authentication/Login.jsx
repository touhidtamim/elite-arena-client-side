import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-950 p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2c+PC9zdmc+')]"></div>

      {/* Floating Blur Effects (blue tint) */}
      <div className="fixed -top-1/4 -left-1/4 w-[150%] h-[150%] z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-900/20 to-blue-700/10 rounded-full blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-gradient-to-br from-blue-900/20 to-blue-700/10 rounded-full blur-[100px]"
          animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="z-10 w-full max-w-3xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-1">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm">
                Sign in to continue to Elite Arena
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  required
                />
              </div>

              {/* Centered Sign In Button */}
              <div className="md:col-span-2 flex justify-center">
                <motion.button
                  type="submit"
                  className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </div>
            </form>

            {/* OR Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900 px-3 text-sm text-gray-400">
                  OR
                </span>
              </div>
            </div>

            {/* Google Login */}
            <GoogleLogin />

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
