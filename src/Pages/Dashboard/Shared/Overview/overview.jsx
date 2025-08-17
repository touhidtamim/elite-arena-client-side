import React, { useEffect, useState, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUsers,
  FaClipboardList,
  FaCalendarAlt,
  FaDoorOpen,
} from "react-icons/fa";
import api from "../../../../api/axiosInstance";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Spinner from "../../../../Components/Shared/Spinner";
import { Link } from "react-router";

const StatCard = ({ title, value, icon }) => (
  <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition">
    <div>
      <p className="text-gray-400 text-sm sm:text-base">{title}</p>
      <p className="text-xl sm:text-2xl font-bold">{value}</p>
    </div>
    <div className="text-2xl sm:text-3xl text-yellow-500">{icon}</div>
  </div>
);

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [membersCount, setMembersCount] = useState(0);
  const [approvedBookingsCount, setApprovedBookingsCount] = useState(0);
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [availableFacilities] = useState([
    { name: "Courts", value: 40 },
    { name: "Halls", value: 30 },
    { name: "Swimming Pool", value: 20 },
    { name: "Gym", value: 10 },
  ]);
  const [bookingsData, setBookingsData] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#FACC15", "#FBBF24", "#F59E0B", "#B45309"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersRes = await api.get("/users?");
        setMembersCount(usersRes.data.length);

        const bookingsRes = await api.get(`/bookings?userEmail=${user.email}`);
        const approved = bookingsRes.data.filter(
          (b) => b.status === "approved"
        );
        const pending = bookingsRes.data.filter((b) => b.status === "pending");
        setApprovedBookingsCount(approved.length);
        setPendingBookingsCount(pending.length);

        const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const dayCountMap = {};
        weekDays.forEach((day) => (dayCountMap[day] = 0));
        approved.forEach((b) => {
          const bookingDate = new Date(b.date);
          const dayName =
            weekDays[bookingDate.getDay() === 0 ? 6 : bookingDate.getDay() - 1];
          dayCountMap[dayName] += 1;
        });
        const chartData = weekDays.map((day) => ({
          day,
          bookings: dayCountMap[day],
        }));
        setBookingsData(chartData);

        const announcementsRes = await api.get("/announcements");
        const latestAnnouncements = announcementsRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setAnnouncements(latestAnnouncements);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.email]);

  if (loading) return <Spinner />;

  const cards = [
    { title: "Total Members", value: membersCount, icon: <FaUsers /> },
    {
      title: "Approved Bookings",
      value: approvedBookingsCount,
      icon: <FaClipboardList />,
    },
    {
      title: "Pending Bookings",
      value: pendingBookingsCount,
      icon: <FaCalendarAlt />,
    },
    {
      title: "Available Facilities",
      value: availableFacilities.length,
      icon: <FaDoorOpen />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Dashboard Overview
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {cards.map((card, idx) => (
          <StatCard
            key={idx}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">
            Bookings Over the Week (Approved)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookingsData}>
              <CartesianGrid stroke="#2d2d2d" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#FBBF24"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">
            Facility Usage
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={availableFacilities}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {availableFacilities.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: "#d1d5db" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notifications & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">
            Notifications
          </h3>
          <ul className="list-disc list-inside text-gray-400">
            {announcements.map((item) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-2 sm:gap-3">
            <Link
              to="/courts"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition text-center"
            >
              Book Courts
            </Link>
            <Link
              to="/events"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition text-center"
            >
              Register Event
            </Link>
            <Link
              to="/membership"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition text-center"
            >
              Renew Membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
