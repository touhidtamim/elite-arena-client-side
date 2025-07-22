import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

const GoogleLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await googleSignIn();
      const loggedUser = result.user;

      // Prepare user data to save/update in backend
      const userData = {
        name: loggedUser.displayName || "User",
        email: loggedUser.email,
        image: loggedUser.photoURL || null,
      };

      // Send PUT request to backend /users endpoint
      const res = await api.put("/users", userData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome, ${userData.name}!`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      } else {
        throw new Error("Failed to save user data");
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message || "Something went wrong!",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleGoogleLogin}
      className={`w-full flex items-center justify-center gap-3 border rounded-lg py-3 px-4 transition-all duration-200
        ${
          isLoading
            ? "bg-gray-600 border-gray-600 cursor-not-allowed text-gray-400"
            : "bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-300 cursor-pointer"
        }
      `}
      whileHover={isLoading ? {} : { y: -2 }}
      type="button"
      disabled={isLoading}
    >
      <FcGoogle className="text-xl" />
      <span className="text-sm font-medium">
        {isLoading ? "Logging in..." : "Continue with Google"}
      </span>
    </motion.button>
  );
};

export default GoogleLogin;
