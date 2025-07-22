import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import api from "../../api/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    previewImage: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validatePassword(formData.password)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters and contain uppercase, lowercase, and a number.",
      });
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords don't match");
      return Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Password and Confirm Password do not match.",
      });
    }

    if (!formData.name.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Name",
        text: "Please enter your full name.",
      });
    }

    setLoading(true);

    let uploadedImageURL = null;

    if (formData.profileImage) {
      const imageForm = new FormData();
      imageForm.append("image", formData.profileImage);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          {
            method: "POST",
            body: imageForm,
          }
        );

        const data = await res.json();
        if (data.success) {
          uploadedImageURL = data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (err) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: err.message,
        });
      }
    }

    createUser(formData.email, formData.password)
      .then(async () => {
        await updateUser({
          displayName: formData.name,
          photoURL: uploadedImageURL || null,
        });

        try {
          const userPayload = {
            name: formData.name,
            email: formData.email,
            image: uploadedImageURL || null,
          };
          await api.put("/users", userPayload);
        } catch (err) {
          console.error("Backend user save error:", err);
          Swal.fire({
            icon: "error",
            title: "Backend User Save Failed",
            text: err.message || "Please try again later.",
          });
          setLoading(false);
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${formData.name}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        let message;
        switch (error.code) {
          case "auth/email-already-in-use":
            message = "This email is already registered.";
            break;
          case "auth/invalid-email":
            message = "Invalid email format.";
            break;
          case "auth/weak-password":
            message = "Weak password. Please try a stronger one.";
            break;
          default:
            message = error.message;
        }
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: message,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Google Registration Successful",
          text: `Welcome, ${result.user.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-950 pt-24 p-4 relative overflow-hidden"
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
                Create Account
              </h2>
              <p className="text-gray-400 text-sm">
                Join our premium community
              </p>
            </div>

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
                  disabled={
                    loading ||
                    passwordError ||
                    formData.password !== formData.confirmPassword
                  }
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
                    "Create Account"
                  )}
                </motion.button>
              </div>
            </form>

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

            <GoogleLogin onClick={handleGoogleLogin} />

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
