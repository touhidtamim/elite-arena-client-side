import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../../api/axiosInstance";

const CouponTable = ({ refreshToggle }) => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coupon: "",
    discountAmount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch coupons from backend
  const fetchCoupons = async () => {
    try {
      const res = await api.get("/coupons");
      setCoupons(res.data);
    } catch (err) {
      toast.error("Failed to load coupons");
    }
  };

  // Fetch coupons on mount and whenever refreshToggle changes
  useEffect(() => {
    fetchCoupons();
  }, [refreshToggle]);

  // Delete coupon
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await api.delete(`/coupons/${id}`);
      toast.success("Deleted successfully");
      fetchCoupons();
    } catch {
      toast.error("Failed to delete");
    }
  };

  // Open modal and fill form for editing
  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      title: coupon.title || "",
      description: coupon.description || "",
      coupon: coupon.coupon || "",
      discountAmount: coupon.discountAmount?.toString() || "",
    });
    setIsModalOpen(true);
  };

  // Close modal and reset
  const closeModal = () => {
    setSelectedCoupon(null);
    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      coupon: "",
      discountAmount: "",
    });
  };

  // Handle form input change inside modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "discountAmount") {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit updated coupon
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { title, description, coupon, discountAmount } = formData;

    if (!title || !description || !coupon || !discountAmount) {
      toast.warn("All fields are required");
      return;
    }

    const discountValue = Number(discountAmount);
    if (isNaN(discountValue) || discountValue <= 0) {
      toast.warn("Discount must be a positive number");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.patch(`/coupons/${selectedCoupon._id}`, {
        title: title.trim(),
        description: description.trim(),
        coupon: coupon.trim(),
        discountAmount: discountValue,
      });
      toast.success("Coupon updated successfully");
      closeModal();
      fetchCoupons();
    } catch (err) {
      toast.error("Failed to update coupon");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto bg-gray-900 p-6 rounded-xl shadow mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">All Coupons</h3>
        <table className="table-auto w-full text-left text-white">
          <thead>
            <tr className="bg-gray-800 text-sm">
              <th className="px-4 py-2">Coupon Code</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Discount (৳)</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No coupons available.
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr
                  key={coupon._id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-2">{coupon.coupon}</td>
                  <td className="px-4 py-2">{coupon.title}</td>
                  <td className="px-4 py-2">{coupon.description}</td>
                  <td className="px-4 py-2 text-emerald-400 font-bold">
                    ৳{Number(coupon.discountAmount)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(coupon)}
                      className="mr-3"
                      title="Edit Coupon"
                    >
                      <FaEdit className="text-yellow-400 hover:scale-110 duration-150" />
                    </button>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      title="Delete Coupon"
                    >
                      <FaTrash className="text-red-500 hover:scale-110 duration-150" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white text-2xl hover:text-red-500"
              title="Close"
            >
              &times;
            </button>

            <h3 className="text-white text-xl font-semibold mb-4">
              Edit Coupon
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Coupon Code</label>
                <input
                  type="text"
                  name="coupon"
                  value={formData.coupon}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">
                  Discount Amount (৳)
                </label>
                <input
                  type="text"
                  name="discountAmount"
                  value={formData.discountAmount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded text-white ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Coupon"}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CouponTable;
