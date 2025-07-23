import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import CheckoutForm from "./CheckoutForm";

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
        return;
      }

      const discountAmount = coupon.discountAmount;
      setDiscount(discountAmount);
      const newPrice = Math.max(0, booking.totalPrice - discountAmount);
      setFinalPrice(newPrice);
      toast.success(`Coupon applied! You saved ${discountAmount}`);
    } catch (error) {
      toast.error("Failed to apply coupon");
    } finally {
      setApplyingCoupon(false);
    }
  };

  if (loading)
    return <div className="text-white">Loading booking details...</div>;
  if (!booking) return <div className="text-white">Booking not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>

      {/* Coupon Code Section */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Coupon Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border rounded px-3 py-2 flex-grow bg-transparent text-white placeholder-white"
            placeholder="Enter coupon code"
            disabled={applyingCoupon}
          />
          <button
            onClick={handleApplyCoupon}
            disabled={applyingCoupon}
            className="bg-blue-600 text-white px-4 rounded"
          >
            {applyingCoupon ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>

      {/* Booking Details Form */}
      <form className="space-y-4 mb-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="border rounded w-full p-2 bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Court</label>
          <input
            type="text"
            value={courtName}
            readOnly
            className="border rounded w-full p-2 bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Slots</label>
          <input
            type="number"
            value={booking.slots}
            readOnly
            className="border rounded w-full p-2 bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            value={booking.date}
            readOnly
            className="border rounded w-full p-2 bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            value={finalPrice}
            readOnly
            className="border rounded w-full p-2 bg-transparent text-white"
          />
        </div>
      </form>

      {/* Stripe CheckoutForm */}
      <CheckoutForm
        booking={{ ...booking, email: user?.email }}
        finalPrice={finalPrice}
        couponCode={couponCode}
        discount={discount}
        onPaymentSuccess={() => navigate("/dashboard/bookings/confirmed")}
      />
    </div>
  );
};

export default PaymentPage;
