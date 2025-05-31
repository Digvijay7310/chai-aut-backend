import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // ✅ import your axios instance

function VideoUpload() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !thumbnail) {
      alert("Both video and thumbnail are required");
      return;
    }

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("duration", duration);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await API.post("/videos/video-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload successful!");
      navigate("/users/dashboard");
    } catch (err) {
      console.error("Upload Failed", err.response?.data || err.message);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload Your Video</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>
          Select Video:
          <input
            type="file"
            accept="video/*"
            className="bg-gray-200"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </label>

        <label>
          Select Thumbnail:
          <input
            type="file"
            accept="image/*"
            className="bg-gray-200"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Duration (in seconds)"
            className="p-2 border rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
