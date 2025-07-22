import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { formatDistanceToNow } from "date-fns";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get("/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        📢 Announcements
      </h2>

      {loading ? (
        <p className="text-center text-gray-300">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-center text-gray-400">No announcements found.</p>
      ) : (
        <div className="grid gap-4">
          {announcements.map(({ _id, title, content, createdAt }) => (
            <div
              key={_id}
              className="bg-gray-900 text-white rounded-xl shadow-lg p-5 border border-gray-700 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-gray-300 mb-2">{content}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
