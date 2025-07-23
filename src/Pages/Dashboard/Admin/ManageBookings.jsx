import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

      const paidBookings = bookingRes.data
        .filter((b) => b.status === "paid")
        .map((b) => ({
          ...b,
          courtName: courtMap[b.courtId] || b.courtId,
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // latest first

      setBookings(paidBookings);
      setFilteredBookings(paidBookings);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = bookings.filter((b) =>
      b.courtName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [search, bookings]);

  if (loading) return <div className="p-4">Loading bookings...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings (Paid)</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by court name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      {filteredBookings.length === 0 ? (
        <p>No paid bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-collapse border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Court Name</th>
                <th className="p-2 border">User Email</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Slots</th>
                <th className="p-2 border">Total Price</th>
                <th className="p-2 border">Booking ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b, idx) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{idx + 1}</td>
                  <td className="p-2 border">{b.courtName}</td>
                  <td className="p-2 border">{b.userEmail}</td>
                  <td className="p-2 border">{b.date}</td>
                  <td className="p-2 border text-center">{b.slots}</td>
                  <td className="p-2 border">{b.totalPrice} BDT</td>
                  <td className="p-2 border text-xs text-gray-600">{b._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
