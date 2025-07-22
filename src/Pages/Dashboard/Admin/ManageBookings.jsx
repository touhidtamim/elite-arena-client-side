import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all pending bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings/pending");
      setBookings(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Accept: update status to approved + user becomes member (handled in backend)
  const handleAccept = async (id) => {
    try {
      const res = await api.patch(`/bookings/${id}`, { status: "approved" });
      if (res.status === 200) {
        toast.success("Booking approved & member role assigned");
        // Remove the booking from local state after approval
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error("Approval failed");
      }
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("Failed to approve booking");
    }
  };

  // Reject: delete the booking
  const handleReject = async (id) => {
    const confirmReject = window.confirm("Reject and delete this booking?");
    if (!confirmReject) return;

    try {
      const res = await api.delete(`/bookings/${id}`);
      if (res.status === 200) {
        toast.success("Booking rejected and deleted");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error("Rejection failed");
      }
    } catch (error) {
      console.error("Rejection error:", error);
      toast.error("Failed to reject booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p className="text-center py-10">Loading bookings...</p>;

  if (bookings.length === 0)
    return <p className="text-center py-10">No pending bookings.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">User Email</th>
              <th className="px-4 py-2 text-left">Court</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Slot</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="px-4 py-2">{booking.userEmail || "N/A"}</td>
                <td className="px-4 py-2">
                  {booking.courtName || booking.courtId || "N/A"}
                </td>
                <td className="px-4 py-2">{booking.date || "N/A"}</td>
                <td className="px-4 py-2">
                  {Array.isArray(booking.slots)
                    ? booking.slots.join(", ")
                    : booking.slots || booking.slot || "N/A"}
                </td>
                <td className="px-4 py-2">
                  ৳{booking.totalPrice || booking.price || 0}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleAccept(booking._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(booking._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Reject
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

export default ManageBookings;
