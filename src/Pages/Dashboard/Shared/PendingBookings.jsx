import { useContext, useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PendingBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourts = async () => {
    try {
      const res = await api.get("/courts");
      setCourts(res.data);
    } catch (error) {
      console.error("Error fetching courts:", error);
      toast.error("Failed to fetch court data");
    }
  };

  const getCourtName = (courtId) => {
    const court = courts.find((c) => c._id === courtId);
    return court ? court.name : "Unknown Court";
  };

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
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Cancellation",
      text: "Are you sure you want to cancel this booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Cancel failed:", error);
      toast.error("Failed to cancel booking");
    }
  };

  useEffect(() => {
    if (user) {
      fetchPendingBookings();
      fetchCourts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">
            No Pending Bookings
          </h3>
          <p className="text-gray-500 text-sm">
            You don't have any pending bookings at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Pending Bookings
            </h2>
            <p className="text-sm text-gray-500">
              Manage your upcoming court reservations
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {bookings.length} booking{bookings.length > 1 && "s"}
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Court
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Time Slots
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold">
                        {getCourtName(booking.courtId).charAt(0)}
                      </div>
                      <div className="text-gray-800 font-medium">
                        {getCourtName(booking.courtId)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-700">
                    {booking.date}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-700">
                    {booking.slots}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">
                    ৳{booking.totalPrice}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="text-red-600 hover:text-red-700 border border-red-200 rounded-md px-3 py-1 hover:bg-red-50 transition text-xs sm:text-sm"
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
    </div>
  );
};

export default PendingBookings;
