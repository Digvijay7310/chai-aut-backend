import React from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import VideoUpload from "./pages/VideoUpload";
import VideoGallery from "./pages/VideoGallery";
import VideoWatch from "./pages/VideoWatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/users/register" element={<Register />} />
        <Route
          path="/users/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/video-upload"
          element={
            <ProtectedRoute>
              <VideoUpload />
            </ProtectedRoute>
          }
        />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/videos/:videoid" element={<VideoWatch />} />
      </Routes>
    </Router>
  );
}

export default App;
