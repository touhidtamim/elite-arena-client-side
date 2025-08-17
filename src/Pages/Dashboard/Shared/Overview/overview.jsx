import React from "react";
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
  BarChart,
  Bar,
} from "recharts";
import {
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaDoorOpen,
} from "react-icons/fa";

const Overview = () => {
  // Dummy data
  const stats = [
    {
      title: "Total Members",
      value: 320,
      icon: <FaUsers className="text-3xl text-yellow-500" />,
    },
    {
      title: "Active Bookings",
      value: 75,
      icon: <FaCalendarAlt className="text-3xl text-yellow-500" />,
    },
    {
      title: "Upcoming Events",
      value: 12,
      icon: <FaClipboardList className="text-3xl text-yellow-500" />,
    },
    {
      title: "Available Facilities",
      value: 8,
      icon: <FaDoorOpen className="text-3xl text-yellow-500" />,
    },
  ];

  const bookingsData = [
    { day: "Mon", bookings: 10 },
    { day: "Tue", bookings: 15 },
    { day: "Wed", bookings: 8 },
    { day: "Thu", bookings: 20 },
    { day: "Fri", bookings: 18 },
    { day: "Sat", bookings: 25 },
    { day: "Sun", bookings: 12 },
  ];

  const facilityData = [
    { name: "Courts", value: 40 },
    { name: "Halls", value: 30 },
    { name: "Swimming Pool", value: 20 },
    { name: "Gym", value: 10 },
  ];

  const COLORS = ["#FACC15", "#FBBF24", "#F59E0B", "#B45309"];

  const eventsData = [
    { name: "Football", participants: 20 },
    { name: "Basketball", participants: 15 },
    { name: "Tennis", participants: 8 },
    { name: "Swimming", participants: 12 },
  ];

  const notifications = [
    "New booking request from John Doe",
    "Membership renewal reminder: Alice",
    "Upcoming event: Annual Sports Day",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <p className="text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Bookings Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Bookings Over the Week
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookingsData}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#FBBF24"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Facility Usage Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Facility Usage
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={facilityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {facilityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Event Participation Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Event Participation
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={eventsData}>
            <CartesianGrid stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="participants" fill="#FBBF24" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Notifications & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Notifications
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            {notifications.map((note, idx) => (
              <li key={idx} className="mb-2">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-3">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition">
              Book Facility
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition">
              Register Event
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition">
              Renew Membership
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
