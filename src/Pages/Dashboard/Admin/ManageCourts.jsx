import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";

const AREAS = [
  "all",
  "dhaka",
  "chittagong",
  "rajshahi",
  "sylhet",
  "khulna",
  "barishal",
  "rangpur",
  "comilla",
  "mymensing",
];

// Helper to convert file to base64 string
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ManageCourts = () => {
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterArea, setFilterArea] = useState("all");

  const [editingCourtId, setEditingCourtId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const navigate = useNavigate();

  const fetchCourts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/courts");
      if (Array.isArray(res.data)) {
        setCourts(res.data);
        setError(null);
        if (filterArea === "all") {
          setFilteredCourts(res.data);
        } else {
          setFilteredCourts(
            res.data.filter(
              (court) => court.location?.toLowerCase() === filterArea
            )
          );
        }
      } else {
        setError("Invalid data received");
        setCourts([]);
        setFilteredCourts([]);
      }
    } catch (err) {
      setError("Failed to fetch courts");
      setCourts([]);
      setFilteredCourts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterArea === "all") {
      setFilteredCourts(courts);
    } else {
      setFilteredCourts(
        courts.filter((court) => court.location?.toLowerCase() === filterArea)
      );
    }
  }, [filterArea, courts]);

  const handleFilterChange = (e) => {
    setFilterArea(e.target.value.toLowerCase());
  };

  const handleEditClick = (court) => {
    setEditingCourtId(court._id);
    setEditFormData({
      name: court.name || "",
      type: court.type || "",
      location: court.location || "",
      rate: court.rate || "",
      capacity: court.capacity || "",
      availability: court.availability || "",
      description: court.description || "",
      amenities: court.amenities ? court.amenities.join(", ") : "",
      image: court.image || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingCourtId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // handle image file input change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setEditFormData({
          ...editFormData,
          image: base64,
        });
      } catch (error) {
        alert("Failed to read image file");
      }
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      // convert amenities string back to array (trim spaces)
      const amenitiesArray = editFormData.amenities
        ? editFormData.amenities.split(",").map((a) => a.trim())
        : [];

      // Prepare data object for patch
      const patchData = {
        ...editFormData,
        amenities: amenitiesArray,
      };

      await api.patch(`/courts/${id}`, patchData);
      setEditingCourtId(null);
      setEditFormData({});
      fetchCourts();
    } catch (err) {
      alert("Failed to update court");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this court?")) return;
    try {
      await api.delete(`/courts/${id}`);
      fetchCourts();
    } catch (err) {
      alert("Failed to delete court");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">
        Manage Courts
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <button
          onClick={() => navigate("/dashboard/courts/add")}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add New Court
        </button>

        <select
          value={filterArea}
          onChange={handleFilterChange}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area.charAt(0).toUpperCase() + area.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-700">Loading courts...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      {!loading && !error && filteredCourts.length === 0 && (
        <p className="text-gray-700">No courts found for selected area.</p>
      )}

      {!loading && !error && filteredCourts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <motion.div
              key={court._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col"
            >
              {/* Image & Overlay */}
              <div className="relative h-48 group overflow-hidden">
                <img
                  src={
                    court.image ||
                    "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?auto=format&fit=crop&w=1470&q=80"
                  }
                  alt={court.name}
                  onError={(e) =>
                    (e.target.src =
                      "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?auto=format&fit=crop&w=1470&q=80")
                  }
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex items-end justify-between text-white text-sm font-semibold">
                  <h3 className="text-lg font-bold truncate">{court.name}</h3>
                  <div className="flex gap-2 text-yellow-400 items-center text-xs bg-black/50 px-3 py-1 rounded-full">
                    {court.type}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow text-gray-800">
                {editingCourtId === court._id ? (
                  <>
                    <div className="space-y-3 mb-4 flex-grow overflow-auto">
                      <input
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Name"
                      />
                      <input
                        name="type"
                        value={editFormData.type}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Type"
                      />
                      <input
                        name="location"
                        value={editFormData.location}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Location"
                      />
                      <input
                        name="rate"
                        type="number"
                        value={editFormData.rate}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Rate"
                      />
                      <input
                        name="capacity"
                        type="number"
                        value={editFormData.capacity}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Capacity"
                      />
                      <input
                        name="availability"
                        value={editFormData.availability}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Availability"
                      />
                      <input
                        name="description"
                        value={editFormData.description}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Description"
                      />
                      <input
                        name="amenities"
                        value={editFormData.amenities}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Amenities (comma separated)"
                      />

                      <div>
                        <p className="mb-1 font-semibold">Image Preview:</p>
                        {editFormData.image && (
                          <img
                            src={editFormData.image}
                            alt="court"
                            className="w-40 h-24 object-cover rounded mb-2 border"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-auto">
                      <button
                        onClick={() => handleSaveEdit(court._id)}
                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-400 px-5 py-2 rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-sm mb-2 text-gray-700">
                      <FaMapMarkerAlt className="mr-2 text-yellow-500" />
                      <span className="capitalize">{court.location}</span>
                    </div>
                    <p className="text-sm mb-2 line-clamp-3 font-medium text-gray-800">
                      {court.description ||
                        "Premium quality court with excellent facilities."}
                    </p>

                    {/* Amenities */}
                    {court.amenities?.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold mb-1 text-gray-900">
                          Facilities:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {court.amenities.slice(0, 4).map((amenity, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-200 px-2 py-1 rounded-full font-medium"
                            >
                              {amenity}
                            </span>
                          ))}
                          {court.amenities.length > 4 && (
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full font-medium">
                              +{court.amenities.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-6 mb-4 text-gray-700 text-sm">
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-yellow-500" />
                        <span>{court.availability}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="mr-2 text-yellow-500" />
                        <span>Max {court.capacity}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-auto">
                      <button
                        onClick={() => handleEditClick(court)}
                        className="bg-yellow-400 px-5 py-2 rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(court._id)}
                        className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCourts;
