import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaUpload,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../../api/axiosInstance";

const AddCourtPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const courtTypes = [
    "Badminton",
    "Tennis",
    "Basketball",
    "Volleyball",
    "Futsal",
    "Squash",
    "Table Tennis",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const payload = {
        name: data.name,
        type: data.type,
        location: data.location,
        rate: Number(data.rate),
        capacity: Number(data.capacity),
        availability: data.availability,
        description: data.description || "",
        amenities: data.amenities || [],
        image: previewImage || "",
      };

      const response = await api.post("/courts", payload);

      if (response.status === 201) {
        toast.success("Court added successfully!");
        reset();
        setPreviewImage(null);
      } else {
        toast.error("Failed to add court. Please try again.");
      }
    } catch (error) {
      console.error("Add court error:", error);
      toast.error("Failed to add court. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gray-900 py-8 px-4 sm:px-6 lg:px-12 xl:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-serif">
            Add New Court
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Fill in the details to add a new sports court to Elite Arena
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6">
            <h2 className="text-xl font-bold text-white">Court Information</h2>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Court Name */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Court Name *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Court name is required" })}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="e.g. Center Court, Arena 1"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Court Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Court Type *
                </label>
                <select
                  id="type"
                  {...register("type", { required: "Court type is required" })}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select a court type</option>
                  {courtTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    id="location"
                    type="text"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="w-full pl-10 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Court location"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Hourly Rate */}
              <div>
                <label
                  htmlFor="rate"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Hourly Rate (৳) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMoneyBillWave className="text-gray-400" />
                  </div>
                  <input
                    id="rate"
                    type="number"
                    {...register("rate", {
                      required: "Hourly rate is required",
                      min: { value: 0, message: "Rate must be positive" },
                    })}
                    className="w-full pl-10 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="500"
                  />
                </div>
                {errors.rate && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.rate.message}
                  </p>
                )}
              </div>

              {/* Capacity */}
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Player Capacity *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUsers className="text-gray-400" />
                  </div>
                  <input
                    id="capacity"
                    type="number"
                    {...register("capacity", {
                      required: "Capacity is required",
                      min: { value: 1, message: "Minimum capacity is 1" },
                    })}
                    className="w-full pl-10 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="4"
                  />
                </div>
                {errors.capacity && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.capacity.message}
                  </p>
                )}
              </div>

              {/* Availability */}
              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Availability *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <select
                    id="availability"
                    {...register("availability", {
                      required: "Availability is required",
                    })}
                    className="w-full pl-10 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select availability</option>
                    <option value="morning">Morning (6AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 6PM)</option>
                    <option value="evening">Evening (6PM - 12AM)</option>
                    <option value="full-day">Full Day (6AM - 12AM)</option>
                  </select>
                </div>
                {errors.availability && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.availability.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Court Image *
                </label>
                <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg border border-gray-600 flex items-center transition-colors text-white"
                  >
                    <FaUpload className="mr-2" />
                    <span>Upload Image</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      {...register("image", {
                        required: "Court image is required",
                      })}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {previewImage && (
                    <div className="flex-shrink-0">
                      <img
                        src={previewImage}
                        alt="Court preview"
                        className="h-24 w-24 object-cover rounded-lg border border-gray-600"
                      />
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.image.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  Upload a high-quality image of the court (JPEG, PNG)
                </p>
              </div>

              {/* Description */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description")}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Describe the court features, surface type, lighting, etc."
                />
              </div>

              {/* Amenities */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {[
                    "Lighting",
                    "Showers",
                    "Locker Room",
                    "Parking",
                    "Seating",
                    "Refreshments",
                    "Equipment Rental",
                    "WiFi",
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        id={`amenity-${amenity}`}
                        type="checkbox"
                        value={amenity}
                        {...register("amenities")}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-600 rounded bg-gray-700"
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className="ml-2 text-sm text-gray-300"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Court"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddCourtPage;
