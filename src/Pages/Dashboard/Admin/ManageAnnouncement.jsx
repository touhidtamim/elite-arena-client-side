import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: "", content: "" });

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
    // Clear error when user starts typing
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
      background: "#1f2937", // gray-800
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
          confirmButtonColor: "#10b981", // emerald-500
          background: "#1f2937", // gray-800
          color: "#fff",
        });

        fetchAnnouncements();
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
    <div className="p-4 sm:p-6 bg-gray-900 rounded-xl text-white max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 sm:mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
            Manage Announcements
          </h2>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Create, edit, and manage system announcements
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-lg transition-all w-full md:w-auto"
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
          <span className="whitespace-nowrap">New Announcement</span>
        </button>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-20 sm:h-24 bg-gray-800/50 rounded-xl"
            />
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-8 sm:py-12 border-2 border-dashed border-gray-700 rounded-xl">
          <svg
            className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-gray-500"
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
          <h3 className="mt-3 sm:mt-4 text-lg font-medium text-gray-300">
            No announcements yet
          </h3>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">
            Click "New Announcement" to create your first one
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-700 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/80 backdrop-blur-sm">
                <tr>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell"
                  >
                    Content
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {announcements.map((ann) => (
                  <tr key={ann._id} className="hover:bg-gray-800/50 transition">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">{ann.title}</div>
                      <div className="text-gray-400 text-sm sm:hidden mt-1 line-clamp-2">
                        {ann.content}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <div className="text-gray-300 line-clamp-2">
                        {ann.content}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => openModal(ann)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-amber-500 rounded-md text-amber-400 hover:bg-amber-500/10 transition text-sm sm:text-base"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ann._id)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-red-500 rounded-md text-red-400 hover:bg-red-500/10 transition text-sm sm:text-base"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-xl w-full max-w-2xl relative border border-gray-700 shadow-2xl my-4">
            <button
              onClick={closeModal}
              disabled={isSubmitting}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              title="Close"
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

            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                {editAnnouncement
                  ? "Edit Announcement"
                  : "Create New Announcement"}
              </h3>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                {editAnnouncement
                  ? "Update the announcement details"
                  : "Fill in the form to create a new announcement"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border ${
                    errors.title ? "border-red-500" : "border-gray-700"
                  } text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
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
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border ${
                    errors.content ? "border-red-500" : "border-gray-700"
                  } text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  rows={4}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter announcement content"
                  maxLength={1000}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-400">{errors.content}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 sm:px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 sm:px-6 py-2 rounded-lg text-white font-medium transition ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg"
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
