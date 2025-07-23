import React, { useEffect, useState, useContext } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";

const ConfirmBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext); // get user from context

  const fetchData = async () => {
    try {
      const [bookingRes, courtRes] = await Promise.all([
        api.get("/bookings"),
        api.get("/courts"),
      ]);

      const courtMap = {};
      courtRes.data.forEach((court) => {
        courtMap[court._id] = court.name;
      });

      const filtered = bookingRes.data.filter(
        (b) => b.userEmail === user?.email && b.status === "paid"
      );

      const enriched = filtered.map((b) => ({
        ...b,
        courtName: courtMap[b.courtId] || b.courtId,
      }));

      setBookings(enriched);
    } catch (err) {
      toast.error("Failed to load paid bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchData();
  }, [user]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Your Confirmed (Paid) Bookings</h2>

      {bookings.length === 0 ? (
        <p>No paid bookings found for your account.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg p-4 shadow bg-gray-100"
            >
              <p>
                <strong>Court:</strong> {booking.courtName}
              </p>
              <p>
                <strong>User Email:</strong> {booking.userEmail}
              </p>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Slot(s):</strong> {booking.slots}
              </p>
              <p>
                <strong>Total Price:</strong> {booking.totalPrice} BDT
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfirmBookings;
