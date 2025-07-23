import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/axiosInstance";

const CheckoutForm = ({
  booking,
  finalPrice,
  couponCode,
  discount,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet. Please wait...");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card details not found. Please try again.");
      return;
    }

    setProcessing(true);

    try {
      // 1. Create Payment Intent (get clientSecret)
      const res = await api.post("/create-payment-intent", {
        price: finalPrice,
      });

      const clientSecret = res?.data?.clientSecret;
      if (!clientSecret) {
        throw new Error("Failed to get payment credentials.");
      }

      // 2. Confirm Card Payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: booking?.name || "Unknown",
              email: booking?.email || "Unknown",
            },
          },
        }
      );

      if (error) {
        toast.error(error.message || "Payment failed.");
        setProcessing(false);
        return;
      }

      // 3. Success: Save Payment to DB (this will also update booking status in your backend)
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          transactionId: paymentIntent.id,
          bookingId: booking._id,
          email: booking.email,
          name: booking.name,
          courtId: booking.courtId,
          courtName: booking.courtName,
          slots: booking.slots,
          date: booking.date,
          price: finalPrice,
          originalPrice: booking.originalPrice || finalPrice,
          couponCode: couponCode || null,
          discountApplied: discount || 0,
        };

        await api.post("/payments", paymentInfo);

        toast.success("Payment successful!");
        onPaymentSuccess();
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(
        err?.response?.data?.error || err.message || "Payment failed."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        className="bg-white text-black p-3 rounded"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#000",
              "::placeholder": { color: "#888" },
            },
            invalid: { color: "#e53e3e" },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded text-white w-full disabled:opacity-50"
      >
        {processing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

export default CheckoutForm;
