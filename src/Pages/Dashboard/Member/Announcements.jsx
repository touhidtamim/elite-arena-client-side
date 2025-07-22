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
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-purple-500 opacity-30"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-900 px-4 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            📢 Announcements
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-8 bg-gray-800 rounded w-3/4 mx-auto"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-gray-800 rounded col-span-2"></div>
                  <div className="h-4 bg-gray-800 rounded col-span-1"></div>
                </div>
                <div className="h-4 bg-gray-800 rounded w-5/6 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-400">
            No announcements yet
          </h3>
          <p className="mt-1 text-gray-500">Check back later for updates!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {announcements.map(({ _id, title, content, createdAt }) => (
            <div
              key={_id}
              className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-600"></div>
              <div className="pl-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-gray-300 mb-2 whitespace-pre-line">
                  {content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
