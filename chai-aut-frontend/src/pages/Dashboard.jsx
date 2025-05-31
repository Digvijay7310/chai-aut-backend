import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { TiUploadOutline } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        navigate("/");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleUploadClick = () => {
    // TODO: open upload modal or navigate to upload page
    alert("Upload button clicked!");
  };

  /* const fetchVideos = async () => {
      try {
        const res = await API.get("/users/videos");
        setVideos(res.data.videos || []);
      } catch (err) {
        console.error("Failed to load videos", err);
      }
    };
    fetchUser();
    fetchVideos();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    try {
      await API.post("/users/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    //   Refresh videos list
        const updated = await API.get("/users/videos");
      setVideos(updated.data.videos || []);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };
  */
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
        </header>

        {/* Main */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example video cards */}
            {[1, 2, 3].map((video) => (
              <div
                key={video}
                className="bg-white rounded shadow p-4 hover:shadow-lg transition"
              >
                <div className="bg-gray-300 h-40 rounded mb-3"></div>
                <h3 className="font-semibold">Sample Video Title</h3>
                <p className="text-sm text-gray-500">1K views • 2 days ago</p>
              </div>
            ))}
          </div>
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
