import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import api from "../../api/axiosInstance";

const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);

  // Function to update user in backend
  const saveUserToDB = async (user) => {
    try {
      const payload = {
        email: user.email,
        name: user.displayName || "User",
        image: user.photoURL || null,
      };
      await api.put("/users", payload);
      // No need to handle response here explicitly
    } catch (error) {
      console.error("Failed to save user to DB:", error);
      // You can optionally show an error toast here if needed
    }
  };

  // Email/Password Login Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter both email and password.",
      });
    }

    setLoading(true);

    signInUser(email, password)
      .then(async (result) => {
        // Save user info to backend
        await saveUserToDB(result.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${result.user.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        const message =
          error.code === "auth/user-not-found"
            ? "No user found with this email."
            : error.code === "auth/wrong-password"
            ? "Incorrect password. Please try again."
            : error.message;

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
        });
      });
  };

  // Google Login Handler
  const handleGoogleLogin = () => {
    setLoading(true);
    googleSignIn()
      .then(async (result) => {
        // Save user info to backend
        await saveUserToDB(result.user);

        Swal.fire({
          icon: "success",
          title: "Google Login Successful",
          text: `Welcome, ${result.user.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <motion.div
      className="min-h-screen pt-20 flex items-center justify-center bg-gray-950 p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
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
                  ref={emailRef}
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
                  ref={passwordRef}
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
                  className={`w-full max-w-md bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300
                    ${
                      loading
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer hover:bg-blue-700"
                    }`}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mx-auto text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Sign In"
                  )}
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
            <GoogleLogin onClick={handleGoogleLogin} />

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
