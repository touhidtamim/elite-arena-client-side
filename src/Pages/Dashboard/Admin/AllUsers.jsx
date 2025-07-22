import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch users from backend with optional query params
  const fetchUsers = async (search = "", role = "all") => {
    try {
      setLoading(true);

      // Build query string for API call
      let query = "";
      if (search) query += `search=${encodeURIComponent(search)}&`;
      if (role !== "all") query += `role=${encodeURIComponent(role)}&`;

      const res = await api.get(`/users?${query}`);

      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Search input handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Refetch data on search (or debounce for better perf)
    fetchUsers(value, roleFilter);
  };

  // Role filter handler
  const handleRoleFilter = (e) => {
    const value = e.target.value;
    setRoleFilter(value);

    fetchUsers(searchTerm, value);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center py-10">Loading users...</p>;

  if (users.length === 0)
    return <p className="text-center py-10">No users found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">All Users</h2>

      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={roleFilter}
          onChange={handleRoleFilter}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Joined On</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name || "N/A"}</td>
                <td className="px-4 py-2">{user.email || "N/A"}</td>
                <td className="px-4 py-2 capitalize">{user.role || "N/A"}</td>
                <td className="px-4 py-2">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
