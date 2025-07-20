// import React, { useContext } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { motion } from "framer-motion";
// import { AuthContext } from "../../Provider/AuthProvider";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// const GoogleLogin = () => {
//   const { googleSignIn } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleGoogleLogin = () => {
//     googleSignIn()
//       .then((result) => {
//         const loggedUser = result.user;

//         Swal.fire({
//           title: "Login Successful!",
//           text: `Welcome, ${loggedUser.displayName || "User"}!`,
//           icon: "success",
//           confirmButtonColor: "#3085d6",
//         });

//         navigate("/"); // Change this path if you want to redirect elsewhere
//       })
//       .catch((error) => {
//         Swal.fire({
//           title: "Login Failed",
//           text: error.message,
//           icon: "error",
//           confirmButtonColor: "#d33",
//         });
//       });
//   };

//   return (
//     <motion.button
//       onClick={handleGoogleLogin}
//       className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 py-3 px-4 rounded-lg transition-all duration-200"
//       whileHover={{ y: -2 }}
//       type="button"
//     >
//       <FcGoogle className="text-xl" />
//       <span className="text-sm font-medium">Continue with Google</span>
//     </motion.button>
//   );
// };

// export default GoogleLogin;
