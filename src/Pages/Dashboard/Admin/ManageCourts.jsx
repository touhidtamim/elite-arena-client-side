import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaEdit,
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import Swal from "sweetalert2";

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
  const [currentPage, setCurrentPage] = useState(1);
  const courtsPerPage = 6;

  const navigate = useNavigate();

  const fetchCourts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/courts");
      if (Array.isArray(res.data)) {
        setCourts(res.data);
        setError(null);
        filterCourts(res.data, filterArea);
      } else {
        throw new Error("Invalid data received");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch courts");
      setCourts([]);
      setFilteredCourts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCourts = (courtsList, area) => {
    if (area === "all") {
      setFilteredCourts(courtsList);
    } else {
      setFilteredCourts(
        courtsList.filter((court) => court.location?.toLowerCase() === area)
      );
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  useEffect(() => {
    filterCourts(courts, filterArea);
  }, [filterArea, courts]);

  const handleFilterChange = (e) => {
    setFilterArea(e.target.value.toLowerCase());
  };

  // Get current courts for pagination
  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = filteredCourts.slice(
    indexOfFirstCourt,
    indexOfLastCourt
  );
  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        Swal.fire({
          title: "Error!",
          text: "Failed to process image",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#fff",
        });
      }
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      const amenitiesArray = editFormData.amenities
        ? editFormData.amenities.split(",").map((a) => a.trim())
        : [];

      const patchData = {
        ...editFormData,
        amenities: amenitiesArray,
      };

      await api.patch(`/courts/${id}`, patchData);

      Swal.fire({
        title: "Success!",
        text: "Court updated successfully",
        icon: "success",
        confirmButtonColor: "#10b981",
        background: "#1f2937",
        color: "#fff",
      });

      setEditingCourtId(null);
      setEditFormData({});
      fetchCourts();
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.error || "Failed to update court",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/courts/${id}`);

        await Swal.fire({
          title: "Deleted!",
          text: "Court has been deleted.",
          icon: "success",
          confirmButtonColor: "#10b981",
          background: "#1f2937",
          color: "#fff",
        });

        fetchCourts();
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.error || "Failed to delete court",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#fff",
        });
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto rounded-2xl bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Manage Courts
          </h2>
          <p className="text-gray-300 mt-1">
            Add, edit, and manage sports courts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate("/dashboard/courts/add")}
            className="px-4 sm:px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition flex items-center justify-center gap-2"
          >
            <FaEdit />
            Add New Court
          </button>

          <select
            value={filterArea}
            onChange={handleFilterChange}
            className="border border-gray-600 bg-gray-800 text-gray-100 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {AREAS.map((area) => (
              <option key={area} value={area}>
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-800 rounded-xl h-96"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && filteredCourts.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
          <svg
            className="mx-auto h-12 w-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-white">
            No courts found
          </h3>
          <p className="mt-2 text-gray-400">
            {filterArea === "all"
              ? "No courts available"
              : `No courts in ${filterArea}`}
          </p>
        </div>
      )}

      {!loading && !error && filteredCourts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourts.map((court) => (
              <motion.div
                key={court._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl shadow-md border border-gray-700 overflow-hidden flex flex-col"
              >
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

                <div className="p-5 flex flex-col flex-grow text-gray-200">
                  {editingCourtId === court._id ? (
                    <>
                      <div className="space-y-3 mb-4 flex-grow overflow-auto">
                        {Object.entries(editFormData).map(
                          ([key, value]) =>
                            key !== "image" && (
                              <input
                                key={key}
                                name={key}
                                value={value}
                                onChange={handleInputChange}
                                className="border border-gray-600 bg-gray-700 text-white rounded px-3 py-2 w-full"
                                placeholder={
                                  key.charAt(0).toUpperCase() + key.slice(1)
                                }
                              />
                            )
                        )}

                        <div>
                          <p className="mb-1 font-semibold text-gray-300">
                            Image Preview:
                          </p>
                          {editFormData.image && (
                            <img
                              src={editFormData.image}
                              alt="court"
                              className="w-40 h-24 object-cover rounded mb-2 border border-gray-600"
                            />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 text-sm text-gray-300"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-auto">
                        <button
                          onClick={() => handleSaveEdit(court._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition flex-1"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center text-sm mb-2 text-gray-300">
                        <FaMapMarkerAlt className="mr-2 text-yellow-500" />
                        <span className="capitalize">{court.location}</span>
                      </div>
                      <p className="text-sm mb-2 line-clamp-3 font-medium text-gray-300">
                        {court.description ||
                          "Premium quality court with excellent facilities."}
                      </p>

                      {court.amenities?.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold mb-1 text-gray-300">
                            Facilities:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {court.amenities.slice(0, 4).map((amenity, i) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full font-medium"
                              >
                                {amenity}
                              </span>
                            ))}
                            {court.amenities.length > 4 && (
                              <span className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full font-medium">
                                +{court.amenities.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-6 mb-4 text-sm text-gray-300">
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
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition flex-1 flex items-center justify-center gap-2"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(court._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition flex-1 flex items-center justify-center gap-2"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleDoubleLeft />
                </button>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleLeft />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === number
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleRight />
                </button>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleDoubleRight />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageCourts;
