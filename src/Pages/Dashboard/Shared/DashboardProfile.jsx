import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import api from "../../../api/axiosInstance";

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);
  const [role, setRole] = useState("user");
  const [showImagePreview, setShowImagePreview] = useState(false);
  const fileInputRef = useRef(null);

  // Load user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${user?.email}`);
        setName(res.data.name || "");
        setPhotoURL(res.data.image || "");
        setLastLogin(res.data.lastLoggedIn);
        setRole(res.data.role || "user");
      } catch (err) {
        console.error("Failed to fetch user data:", err.message);
        Swal.fire("Error", "Failed to load user profile.", "error");
      }
    };

    if (user?.email) fetchUser();
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
        return "bg-red-100 text-red-800";
      case "member":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-2xl py-12 px-4 sm:px-6 lg:px-8">
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">
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
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md cursor-pointer"
                  onClick={() => setShowImagePreview(true)}
                />
                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      disabled={isUploading}
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {name || "Unnamed User"}
                    </h2>
                    <p className="text-gray-600 mt-1">{user?.email}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Last login:{" "}
                      <span className="font-medium">
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
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={isUploading}
                    className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-md transition-colors disabled:opacity-70"
                  >
                    Save Changes
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-md transition-colors"
                >
                  Edit Profile
                </motion.button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
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
              <span className="text-gray-600">{getRoleDisplay()}</span>
              <span
                className={`px-3 py-1 ${getRoleBadgeColor()} text-xs font-medium rounded-full`}
              >
                {role?.toUpperCase() || "USER"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
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
            <p className="text-gray-600">
              Last login:{" "}
              {lastLogin ? new Date(lastLogin).toLocaleString() : "N/A"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardProfile;
