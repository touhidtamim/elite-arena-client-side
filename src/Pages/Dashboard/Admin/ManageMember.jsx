import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageMember = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/members");
      setMembers(res.data);
      setFilteredMembers(res.data);
      toast.success("Members loaded successfully");
    } catch (error) {
      console.error("Failed to fetch members:", error);
      toast.error("Failed to load members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, memberName) => {
    const result = await Swal.fire({
      title: "Confirm Removal",
      html: `Are you sure you want to remove <strong>${memberName}</strong> as a member?<br>They will be downgraded to a regular user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await api.patch(`/members/downgrade/${id}`);
      if (res.data.message === "Member downgraded to user") {
        toast.success("Member removed successfully");
        setMembers((prev) => prev.filter((m) => m._id !== id));
        setFilteredMembers((prev) => prev.filter((m) => m._id !== id));
      } else {
        toast.error("Failed to remove member");
      }
    } catch (error) {
      console.error("Error downgrading member:", error);
      toast.error("Failed to remove member. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(
        members.filter((member) => {
          const nameMatch = (member.name || "").toLowerCase().includes(value);
          const emailMatch = (member.email || "").toLowerCase().includes(value);
          return nameMatch || emailMatch;
        })
      );
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No Members Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are currently no members registered.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Manage Members
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                View and manage all member accounts
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {members.length} member{members.length !== 1 && "s"}
            </span>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y divide-gray-200">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div key={member._id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {member.name || "N/A"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {member.email || "N/A"}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {member.role || "N/A"}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      handleDelete(member._id, member.name || member.email)
                    }
                    className="text-red-600 hover:text-red-700 border border-red-200 rounded-md px-3 py-1 hover:bg-red-50 transition text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500 italic">
              No members match your search.
            </div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {member.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {member.role || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          handleDelete(member._id, member.name || member.email)
                        }
                        className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No members match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMember;
