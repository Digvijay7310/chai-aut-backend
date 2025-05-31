import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

function VideoWatch() {
  const { videoid } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get(`/videos/${videoid}`);
        setVideo(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load video");
      }
    };

    fetchVideo();
  }, [videoid]);

  if (error)
    return (
      <div className="text-center mt-6 text-red-600">
        <p>{error}</p>
        <Link to="/videos" className="text-blue-600 underline mt-2 block">
          Back to Videos
        </Link>
      </div>
    );

  if (!video) return <p className="text-center mt-6">Loading video...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{video.title}</h2>
      <video
        controls
        src={video.videoUrl} // your backend should return videoUrl field
        className="w-full rounded shadow-md"
      />
      <p className="mt-3 text-gray-700">{video.description}</p>
      <Link to="/videos" className="inline-block mt-6 text-blue-600 underline">
        ← Back to Videos
      </Link>
    </div>
  );
}

export default VideoWatch;
