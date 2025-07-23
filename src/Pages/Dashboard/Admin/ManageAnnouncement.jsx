import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ManageAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: "", content: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default for mobile

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(8); // Tablet
      } else {
        setItemsPerPage(10); // Desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.get("/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch announcements. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = announcements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(announcements.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const validateForm = () => {
    const newErrors = { title: "", content: "" };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    } else if (formData.content.trim().length > 1000) {
      newErrors.content = "Content must be less than 1000 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const openModal = (announcement = null) => {
    if (announcement) {
      setEditAnnouncement(announcement);
      setFormData({
        title: announcement.title || "",
        content: announcement.content || "",
      });
    } else {
      setEditAnnouncement(null);
      setFormData({ title: "", content: "" });
    }
    setErrors({ title: "", content: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setEditAnnouncement(null);
      setFormData({ title: "", content: "" });
      setErrors({ title: "", content: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warn("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editAnnouncement) {
        await api.patch(`/announcements/${editAnnouncement._id}`, {
          title: formData.title.trim(),
          content: formData.content.trim(),
        });
        toast.success("Announcement updated successfully!");
      } else {
        await api.post("/announcements", {
          title: formData.title.trim(),
          content: formData.content.trim(),
        });
        toast.success("Announcement created successfully!");
      }

      closeModal();
      fetchAnnouncements();
      setCurrentPage(1); // Reset to first page after changes
    } catch (err) {
      console.error("Save error:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to save announcement. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/trash.gif")
        left top
        no-repeat
      `,
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/announcements/${id}`);

        await Swal.fire({
          title: "Deleted!",
          text: "Your announcement has been deleted.",
          icon: "success",
          confirmButtonColor: "#10b981",
          background: "#1f2937",
          color: "#fff",
        });

        fetchAnnouncements();
        // Adjust page if last item on page was deleted
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (err) {
        console.error("Delete error:", err);

        await Swal.fire({
          title: "Error!",
          text: err.response?.data?.error || "Failed to delete announcement",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#fff",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Manage Announcements
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Create, edit, and manage system announcements
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-lg transition-all w-full sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>New Announcement</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4 p-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-20 sm:h-24 bg-gray-700/50 rounded-xl"
              />
            ))}
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-8 text-center">
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
            <h3 className="mt-2 text-lg font-medium text-white">
              No announcements yet
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Click "New Announcement" to create your first one
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="sm:hidden space-y-4 p-4">
              {currentItems.map((ann) => (
                <div
                  key={ann._id}
                  className="bg-gray-750 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{ann.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {ann.content}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(ann)}
                        className="p-1.5 rounded-md bg-gray-700 text-amber-400 hover:bg-amber-500/10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(ann._id)}
                        className="p-1.5 rounded-md bg-gray-700 text-red-400 hover:bg-red-500/10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop/Tablet Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {currentItems.map((ann) => (
                    <tr key={ann._id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {ann.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 line-clamp-2">
                          {ann.content}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => openModal(ann)}
                          className="inline-flex items-center px-3 py-1 border border-amber-500 rounded-md text-amber-400 hover:bg-amber-500/10 transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ann._id)}
                          className="inline-flex items-center px-3 py-1 border border-red-500 rounded-md text-red-400 hover:bg-red-500/10 transition text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-400">
                    Showing{" "}
                    <span className="font-medium text-white">
                      {indexOfFirstItem + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-white">
                      {Math.min(indexOfLastItem, announcements.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-white">
                      {announcements.length}
                    </span>{" "}
                    announcements
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaAngleLeft className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => paginate(i + 1)}
                          className={`w-8 h-8 rounded-md text-sm ${
                            currentPage === i + 1
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaAngleRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-2xl relative border border-gray-700 shadow-2xl">
            <button
              onClick={closeModal}
              disabled={isSubmitting}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white">
                {editAnnouncement ? "Edit Announcement" : "Create Announcement"}
              </h3>
              <p className="text-gray-400 mt-1 text-sm">
                {editAnnouncement
                  ? "Update the announcement details"
                  : "Fill in the form to create a new announcement"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                    errors.title ? "border-red-500" : "border-gray-600"
                  } text-white focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter announcement title"
                  maxLength={100}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                    errors.content ? "border-red-500" : "border-gray-600"
                  } text-white focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  rows={5}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter announcement content"
                  maxLength={1000}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-400">{errors.content}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      {editAnnouncement ? "Updating..." : "Creating..."}
                    </span>
                  ) : editAnnouncement ? (
                    "Update Announcement"
                  ) : (
                    "Create Announcement"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAnnouncement;
