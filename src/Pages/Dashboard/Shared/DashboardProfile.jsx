import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import api from "../../../api/axiosInstance";
import CountUp from "react-countup";

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);
  const [role, setRole] = useState("user");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const fileInputRef = useRef(null);

  // Load user info from backend
  useEffect(() => {
    const fetchUserAndStats = async () => {
      try {
        const res = await api.get(`/users/${user?.email}`);
        const userData = res.data;

        setName(userData.name || "");
        setPhotoURL(userData.image || "");
        setLastLogin(userData.lastLoggedIn);
        setRole(userData.role || "user");

        if (userData.role === "admin") {
          const statsRes = await api.get("/admin/overview");
          setTotalUsers(statsRes.data.totalUsers || 0);
          setTotalBookings(statsRes.data.totalBookings || 0);
          setTotalMembers(statsRes.data.totalMembers || 0);
        }
      } catch (err) {
        console.error("Failed to fetch user/admin data:", err.message);
        Swal.fire(
          "Error",
          "Failed to load user profile or admin stats.",
          "error"
        );
      }
    };

    if (user?.email) {
      fetchUserAndStats();
    }
  }, [user?.email]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const imageForm = new FormData();
      imageForm.append("image", file);

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
        setPhotoURL(data.data.url);
        Swal.fire("Success", "Preview updated. Save to apply.", "success");
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      const res = await api.patch(`/users/${user?.email}`, {
        name,
        image: photoURL,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Profile updated successfully", "success");
        setIsEditing(false);
      } else {
        Swal.fire("No changes", "No update was made.", "info");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const getRoleDisplay = () => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "member":
        return "Premium Member";
      default:
        return "Regular User";
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case "admin":
        return "bg-red-900 text-red-100";
      case "member":
        return "bg-blue-900 text-blue-100";
      default:
        return "bg-gray-700 text-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 rounded-2xl py-12 px-4 sm:px-6 lg:px-8">
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImagePreview(false)}
        >
          <div className="max-w-4xl max-h-full">
            <img
              src={photoURL || "https://i.ibb.co/2kR6YKM/default-avatar.png"}
              alt="Profile Preview"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-100 font-serif">
              My Profile
            </h1>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <img
                  src={
                    photoURL || "https://i.ibb.co/2kR6YKM/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-800 shadow-md cursor-pointer"
                  onClick={() => setShowImagePreview(true)}
                />
                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      disabled={isUploading}
                      className="absolute inset-0 bg-black bg-opacity-70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {isUploading ? (
                        <span className="text-white text-sm">Uploading...</span>
                      ) : (
                        <span className="text-white text-sm">Change Photo</span>
                      )}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                )}
              </div>

              <div className="flex-1 w-full">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-gray-700 text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-100">
                      {name || "Unnamed User"}
                    </h2>
                    <p className="text-gray-400 mt-1">{user?.email}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Last login:{" "}
                      <span className="font-medium text-gray-300">
                        {lastLogin
                          ? new Date(lastLogin).toLocaleString()
                          : "N/A"}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 font-medium hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={isUploading}
                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-gray-100 font-bold rounded-lg shadow-md transition-colors disabled:opacity-70"
                  >
                    Save Changes
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-gray-100 font-bold rounded-lg shadow-md transition-colors"
                >
                  Edit Profile
                </motion.button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-yellow-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Membership Status
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">{getRoleDisplay()}</span>
              <span
                className={`px-3 py-1 ${getRoleBadgeColor()} text-xs font-medium rounded-full`}
              >
                {role?.toUpperCase() || "USER"}
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-yellow-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Recent Activity
            </h3>
            <p className="text-gray-400">
              Last login:{" "}
              {lastLogin ? new Date(lastLogin).toLocaleString() : "N/A"}
            </p>
          </div>
        </div>
      </motion.div>
      {role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Total Users Card */}
          <motion.div
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
            }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700 text-center relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-600 opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-yellow-600/20">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-yellow-400 mb-2">
                Total Users
              </h4>
              <CountUp
                end={totalUsers}
                duration={1.5}
                className="text-4xl font-bold text-gray-100 mb-1"
              />
              <p className="text-sm text-gray-400">Registered accounts</p>
            </div>
          </motion.div>

          {/* Total Bookings Card */}
          <motion.div
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
            }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700 text-center relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-600 opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-600/20">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-blue-400 mb-2">
                Total Bookings
              </h4>
              <CountUp
                end={totalBookings}
                duration={1.5}
                className="text-4xl font-bold text-gray-100 mb-1"
              />
              <p className="text-sm text-gray-400">Court reservations</p>
            </div>
          </motion.div>

          {/* Total Members Card */}
          <motion.div
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
            }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700 text-center relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-600 opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-600/20">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-purple-400 mb-2">
                Premium Members
              </h4>
              <CountUp
                end={totalMembers}
                duration={1.5}
                className="text-4xl font-bold text-gray-100 mb-1"
              />
              <p className="text-sm text-gray-400">Subscribed users</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardProfile;
