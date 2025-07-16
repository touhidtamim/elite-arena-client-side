import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    previewImage: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate password when typing
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("At least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("At least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("At least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("At least one number");
    }

    setPasswordError(errors.length > 0 ? errors.join(", ") : "");
    return errors.length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: file,
          previewImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final password validation
    if (!validatePassword(formData.password)) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    console.log("Registration data:", formData);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-950 pt-24 p-4 relative overflow-hidden"
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
                Create Account
              </h2>
              <p className="text-gray-400 text-sm">
                Join our premium community
              </p>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-2">
                <div className="w-20 h-20 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
                  {formData.previewImage ? (
                    <img
                      src={formData.previewImage}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
              </div>
              <p className="text-xs text-gray-400">
                Upload profile picture (optional)
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Name and Email side by side */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  required
                />
                {passwordError && formData.password && (
                  <p className="text-xs text-red-400 mt-1">{passwordError}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  required
                />
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1">
                      Passwords don't match
                    </p>
                  )}
              </div>

              {/* Centered Sign Up Button */}
              <div className="md:col-span-2 flex justify-center">
                <motion.button
                  type="submit"
                  className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={
                    passwordError ||
                    formData.password !== formData.confirmPassword
                  }
                >
                  Create Account
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

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
