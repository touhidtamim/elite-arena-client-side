// ...imports remain the same
import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import Spinner from "../../../Components/Shared/Spinner";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const mobileItemsPerPage = 6;
  const desktopItemsPerPage = 10;
  const itemsPerPage =
    window.innerWidth < 640 ? mobileItemsPerPage : desktopItemsPerPage;

  const fetchUsers = async (search = "", role = "all") => {
    try {
      setLoading(true);
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    fetchUsers(value, roleFilter);
  };

  const handleRoleFilter = (e) => {
    const value = e.target.value;
    setRoleFilter(value);
    setCurrentPage(1);
    fetchUsers(searchTerm, value);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Spinner />;
  }

  if (users.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-700">
          {/* empty state */}
          <h3 className="mt-2 text-lg font-medium text-white">
            No Users Found
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            There are currently no users registered.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="px-6 py-5 bg-gray-750 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                User Management
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                View and manage all user accounts
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-100">
                {users.length} user{users.length !== 1 && "s"}
              </span>
              {totalPages > 1 && (
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={roleFilter}
                onChange={handleRoleFilter}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y divide-gray-700">
          {currentUsers.map((user) => (
            <div
              key={user._id}
              className="p-4 hover:bg-gray-750 border-b border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">{user.name}</h3>
                  <p className="text-sm text-gray-300">{user.email}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === "admin"
                      ? "bg-purple-900 text-purple-100"
                      : user.role === "member"
                      ? "bg-green-900 text-green-100"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-300">
                Joined:{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-750">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Joined On
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-900 text-purple-100"
                          : user.role === "member"
                          ? "bg-green-900 text-green-100"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-400">
                Showing{" "}
                <span className="font-medium text-white">
                  {indexOfFirstUser + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-white">
                  {Math.min(indexOfLastUser, filteredUsers.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-white">
                  {filteredUsers.length}
                </span>{" "}
                users
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-8 h-8 rounded-md text-sm ${
                          currentPage === number
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
