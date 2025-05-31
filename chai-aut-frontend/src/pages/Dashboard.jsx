import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { TiUploadOutline } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import VideoWatch from "./VideoWatch";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, videosRes] = await Promise.all([
          API.get("/users/me"),
          API.get("/videos/my-videos"), // ⬅️ Make sure this route exists on your backend
        ]);
        setUser(profileRes.data.user);
        setVideos(videosRes.data.data); // assuming you wrapped response in ApiResponse
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.post("/users/logout");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleUploadClick = () => {
    navigate("/videos/video-upload");
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-6 py-4 shadow">
          <div className="text-xl font-bold text-red-600">ChaiTube</div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleUploadClick}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              <TiUploadOutline size={20} />
              Upload
            </button>
            <FaRegUser size={28} className="text-gray-700" />
          </div>
          <button onClick={handleLogout} title="logout">
            <TiUserDelete size={28} />
          </button>
        </header>

        {/* Main */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user?.username}
          </h2>

          {videos.length === 0 ? (
            <p className="text-center text-gray-500">No videos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded shadow p-4 hover:shadow-lg transition"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-400 gap-2">
                    <img
                      src={video.owner?.avatar}
                      alt={video.owner?.username}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>By {video.owner?.username}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      {/* <div className="max-2-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {!user ? (
          <p className="text-gray-600">Loading your profile...</p>
        ) : (
          <div className="space-y-2">
            <p>
              <b>UserName:</b> {user.username}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Dashboard;
