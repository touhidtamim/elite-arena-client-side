import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance"; // Adjust path if needed
import { toast } from "react-toastify";

const ManageMember = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch members with role 'member'
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users?role=member");
      setMembers(res.data);
      setFilteredMembers(res.data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  // Delete member by user ID
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this member?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/users/${id}`);
      toast.success("Member deleted successfully");
      setMembers((prev) => prev.filter((m) => m._id !== id));
      setFilteredMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Failed to delete member:", error);
      toast.error("Failed to delete member");
    }
  };

  // Search members by name
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(
        members.filter((member) =>
          (member.name || "").toLowerCase().includes(value)
        )
      );
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) return <p className="text-center py-10">Loading members...</p>;

  if (members.length === 0)
    return <p className="text-center py-10">No members found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Members</h2>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search members by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member._id} className="border-t">
                  <td className="px-4 py-2">{member.name || "N/A"}</td>
                  <td className="px-4 py-2">{member.email || "N/A"}</td>
                  <td className="px-4 py-2">{member.role || "N/A"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No members match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMember;
