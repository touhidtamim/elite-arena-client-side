import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import CheckoutForm from "./CheckoutForm";
import { FaArrowLeft } from "react-icons/fa";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState(null);
  const [courtName, setCourtName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/bookings/${bookingId}`);
        setBooking(res.data);
        setFinalPrice(res.data.totalPrice || 0);

        if (res.data.courtId) {
          const courtRes = await api.get("/courts");
          const court = courtRes.data.find((c) => c._id === res.data.courtId);
          setCourtName(court ? court.name : "Unknown Court");
        }
      } catch (error) {
        toast.error("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      setApplyingCoupon(true);
      const couponsRes = await api.get("/coupons");
      const coupon = couponsRes.data.find(
        (c) => c.coupon.toLowerCase() === couponCode.toLowerCase()
      );

      if (!coupon) {
        toast.error("Invalid coupon code");
        setDiscount(0);
        setFinalPrice(booking.totalPrice);
        setCouponApplied(false);
        return;
      }

      const discountAmount = coupon.discountAmount;
      setDiscount(discountAmount);
      const newPrice = Math.max(0, booking.totalPrice - discountAmount);
      setFinalPrice(newPrice);
      setCouponApplied(true);
      toast.success(`Coupon applied! You saved ৳${discountAmount}`);
    } catch (error) {
      toast.error("Failed to apply coupon");
      setCouponApplied(false);
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleBackToBooking = () => {
    navigate(-1);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">Loading booking details...</div>
      </div>
    );

  if (!booking)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">Booking not found.</div>
      </div>
    );

  return (
    <div className="min-h-screen rounded-2xl px-4 md:px-12 py-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <button
        onClick={handleBackToBooking}
        className="flex items-center bg-gray-600 px-3 py-1 rounded text-white hover:text-blue-300 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Booking
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Complete Your Payment
      </h2>

      {/* Coupon Code Section */}
      <div
        className="w-full mb-6 p-0 md:p-0 lg:p-0 md:rounded-none lg:rounded-none bg-transparent md:bg-transparent lg:bg-transparent 
                      sm:bg-gray-800 sm:p-4 sm:rounded-lg"
      >
        <label className="block font-semibold mb-2 text-gray-300">
          Coupon Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className={`border rounded px-3 py-2 flex-grow ${
              couponApplied
                ? "bg-gray-700 border-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gray-900 border-gray-700 text-white"
            }`}
            placeholder="Enter coupon code"
            disabled={applyingCoupon || couponApplied}
          />
          <button
            onClick={handleApplyCoupon}
            disabled={applyingCoupon || couponApplied}
            className={`px-4 py-2 rounded font-medium ${
              applyingCoupon || couponApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {applyingCoupon
              ? "Applying..."
              : couponApplied
              ? "Applied"
              : "Apply"}
          </button>
        </div>
        {discount > 0 && (
          <div className="mt-2 text-green-400">
            Coupon discount: ৳{discount}
          </div>
        )}
      </div>

      {/* Booking Summary Section */}
      <div
        className="w-full mb-6 p-0 md:p-0 lg:p-0 md:rounded-none lg:rounded-none bg-transparent md:bg-transparent lg:bg-transparent 
                      sm:bg-gray-800 sm:p-4 sm:rounded-lg"
      >
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
          Booking Summary
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <div className="bg-gray-900 border border-gray-700 rounded w-full p-2 text-white opacity-90">
              {user?.email || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Court</label>
            <div className="bg-gray-900 border border-gray-700 rounded w-full p-2 text-white opacity-90">
              {courtName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Slots</label>
              <div className="bg-gray-900 border border-gray-700 rounded w-full p-2 text-white opacity-90">
                {booking.slots}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Date</label>
              <div className="bg-gray-900 border border-gray-700 rounded w-full p-2 text-white opacity-90">
                {new Date(booking.date).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Original Price:</span>
              <span className="text-white line-through">
                ৳{booking.totalPrice}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-green-400">
                <span>Discount:</span>
                <span>-৳{discount}</span>
              </div>
            )}
            <div className="flex justify-between items-center mt-2 font-bold text-lg">
              <span>Total Payable:</span>
              <span className="text-blue-400">৳{finalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Checkout Form */}
      <div
        className="w-full p-0 md:p-0 lg:p-0 md:rounded-none lg:rounded-none bg-transparent md:bg-transparent lg:bg-transparent 
                      sm:bg-gray-800 sm:p-4 sm:rounded-lg"
      >
        <CheckoutForm
          booking={{ ...booking, email: user?.email }}
          finalPrice={finalPrice}
          couponCode={couponCode}
          discount={discount}
          onPaymentSuccess={() => navigate("/dashboard/payments/history")}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
