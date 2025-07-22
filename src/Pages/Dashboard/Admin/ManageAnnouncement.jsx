import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const ManageAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.get("/announcements");
      // backend returns array directly? or { announcements: [...] } ?
      // Assuming backend returns array directly, else adjust here.
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Open modal with optional announcement to edit
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
    setIsModalOpen(true);
  };

  // Close modal and reset form
  const closeModal = () => {
    setIsModalOpen(false);
    setEditAnnouncement(null);
    setFormData({ title: "", content: "" });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form: create or update announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = formData.title.trim();
    const content = formData.content.trim();

    if (!title || !content) {
      toast.warn("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editAnnouncement) {
        // Update existing announcement
        await api.patch(`/announcements/${editAnnouncement._id}`, {
          title,
          content,
        });
        toast.success("Announcement updated");
      } else {
        // Create new announcement
        await api.post("/announcements", { title, content });
        toast.success("Announcement added");
      }

      closeModal();
      fetchAnnouncements();
    } catch (err) {
      console.error("Save error:", err);
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Failed to save announcement");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete announcement by id
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;

    try {
      await api.delete(`/announcements/${id}`);
      toast.success("Announcement deleted");
      fetchAnnouncements();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete announcement");
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-white max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage Announcements</h2>

      <button
        onClick={() => openModal()}
        className="mb-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded"
      >
        Add New Announcement
      </button>

      {loading ? (
        <p>Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p>No announcements found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 px-4 py-2">Title</th>
              <th className="border border-gray-600 px-4 py-2">Content</th>
              <th className="border border-gray-600 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((ann) => (
              <tr key={ann._id} className="hover:bg-gray-800 transition">
                <td className="border border-gray-600 px-4 py-2">
                  {ann.title}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {ann.content}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => openModal(ann)}
                    className="text-yellow-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ann._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg max-w-lg w-full relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white text-2xl hover:text-red-500"
              title="Close"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">
              {editAnnouncement ? "Edit" : "Add"} Announcement
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block mb-1">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-emerald-500"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded text-white ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {isSubmitting
                    ? editAnnouncement
                      ? "Updating..."
                      : "Adding..."
                    : editAnnouncement
                    ? "Update"
                    : "Add"}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                  disabled={isSubmitting}
                >
                  Cancel
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
