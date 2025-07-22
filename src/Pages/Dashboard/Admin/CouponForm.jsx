import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/axiosInstance";

const CouponForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coupon: "",
    discountAmount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
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
      await api.post("/coupons", {
        title: title.trim(),
        description: description.trim(),
        coupon: coupon.trim(),
        discountAmount: discountValue,
      });

      toast.success("Coupon added successfully");

      // Reset form
      setFormData({
        title: "",
        description: "",
        coupon: "",
        discountAmount: "",
      });

      // Trigger parent refresh
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Add failed:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to add coupon";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl space-y-4 shadow mb-10"
    >
      <h3 className="text-xl font-semibold text-white mb-2">Add New Coupon</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Summer Sale"
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
            placeholder="Short description"
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
            placeholder="e.g. SUMMER20"
            value={formData.coupon}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Discount Amount</label>
          <input
            type="text"
            name="discountAmount"
            placeholder="Amount in ৳"
            value={formData.discountAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded text-white ${
            isSubmitting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Coupon"}
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
