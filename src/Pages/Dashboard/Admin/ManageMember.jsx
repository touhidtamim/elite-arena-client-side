import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../../../Components/Shared/Spinner";

const ManageMember = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Different items per page for mobile (cards) and desktop (table)
  const mobileItemsPerPage = 8;
  const desktopItemsPerPage = 10;
  const itemsPerPage =
    window.innerWidth < 640 ? mobileItemsPerPage : desktopItemsPerPage;

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/members");
      setMembers(res.data);
      setFilteredMembers(res.data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
      toast.error("Failed to load members");
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
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await api.patch(`/members/downgrade/${id}`);
      if (res.data.message === "Member downgraded to user") {
        toast.success("Member removed successfully");
        setMembers((prev) => prev.filter((m) => m._id !== id));
        setFilteredMembers((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (error) {
      console.error("Error downgrading member:", error);
      toast.error("Failed to remove member");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching

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

  // Pagination logic
  const indexOfLastMember = currentPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Spinner />;

  if (members.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-700">
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
          <h3 className="mt-2 text-lg font-medium text-white">
            No Members Found
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            There are currently no members registered.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700">
        <div className="px-6 py-5 bg-gray-750 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Manage Members
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                View and manage all member accounts
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-100">
                {members.length} member{members.length !== 1 && "s"}
              </span>
              {totalPages > 1 && (
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-700">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y divide-gray-700">
          {currentMembers.length > 0 ? (
            currentMembers.map((member) => (
              <div
                key={member._id}
                className="p-4 hover:bg-gray-750 border-b border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">
                      {member.name || "N/A"}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {member.email || "N/A"}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900 text-green-100">
                    {member.role || "N/A"}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      handleDelete(member._id, member.name || member.email)
                    }
                    className="text-red-400 hover:text-red-300 border border-red-700 rounded-md px-3 py-1 hover:bg-red-900/30 transition text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-400 italic">
              No members match your search.
            </div>
          )}
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
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {currentMembers.length > 0 ? (
                currentMembers.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {member.name || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {member.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-100">
                        {member.role || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          handleDelete(member._id, member.name || member.email)
                        }
                        className="text-red-400 hover:text-red-300 px-3 py-1 border border-red-700 rounded-md hover:bg-red-900/30 transition"
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
                    className="px-6 py-6 text-center text-gray-400 italic"
                  >
                    No members match your search.
                  </td>
                </tr>
              )}
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
                  {indexOfFirstMember + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-white">
                  {Math.min(indexOfLastMember, filteredMembers.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-white">
                  {filteredMembers.length}
                </span>{" "}
                members
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

export default ManageMember;
