import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // your axios instance

function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos");
        setVideos(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch videos");
      }
    };

    fetchVideos();
  }, []);

  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  if (videos.length === 0)
    return <p className="text-center mt-6">Loading videos...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {videos.map((video) => (
        <div
          key={video._id}
          onClick={() => navigate(`/videos/${video._id}`)}
          className="cursor-pointer rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          title={video.title}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="w-full h-48 object-cover"
          />
          <div className="px-4 py-2 bg-white">
            <h3 className="text-lg font-semibold text-gray-900">
              {video.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoGallery;
