import { useEffect, useState, useContext } from "react";
import api from "../../../api/axiosInstance";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";

const PendingBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingBookings = async () => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/bookings/pending/${user.uid}`);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      toast.error("Failed to fetch pending bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchPendingBookings();
  }, [user]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!user)
    return (
      <p className="text-center py-10">Please login to see your bookings.</p>
    );
  if (bookings.length === 0)
    return <p className="text-center py-10">No pending bookings.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Pending Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Court</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Slots</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="px-4 py-2">
                  {booking.courtName || booking.courtId || "N/A"}
                </td>
                <td className="px-4 py-2">{booking.date || "N/A"}</td>
                <td className="px-4 py-2">
                  {booking.slots || booking.slot || "N/A"}
                </td>
                <td className="px-4 py-2">
                  ৳{booking.totalPrice || booking.price || 0}
                </td>
                <td className="px-4 py-2 capitalize">
                  {booking.status || "pending"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingBookings;
