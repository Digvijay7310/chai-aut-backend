# chai aur backend series

I learn backend with js from chai aur backend

# 🎥 Chai-Aur-Backend (Video Sharing App Backend)

A full-featured backend API built with Node.js, Express, MongoDB, and Cloudinary for a video sharing platform. This backend supports user authentication, video uploads, liking, commenting, and profile management.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register with `username`, `email`, `password`, `avatar`, `coverImage`
  - JWT Access + Refresh Token system
  - Password change and secure logout
- 📹 **Video Upload & Management**
  - Upload videos with thumbnails
  - Fetch all videos uploaded by a user
  - Fetch a single video
  - Delete videos
- ❤️ **Video Likes**
  - Like/unlike a video (one user can like once)
- 💬 **Comments**
  - Comment on videos
  - Fetch all comments on a video
- 👤 **User Profile**
  - Get channel info by `username`
  - Update profile info (avatar, coverImage)
- 📼 **Watch History**
  - Tracks videos watched by the user

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (Access + Refresh tokens)
- **File Storage:** Cloudinary (for video, thumbnail, avatar, and coverImage)
- **Other:** bcrypt, multer, joi, dotenv

---

## 📁 Folder Structure

├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── uploads/
├── .env
├── server.js / app.js

---

## 🧪 API Endpoints Overview

### 🔐 Auth Routes

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| POST   | `/register`        | Register user (with images) |
| POST   | `/login`           | Login user                  |
| POST   | `/logout`          | Logout user                 |
| POST   | `/refresh-token`   | Get new access token        |
| POST   | `/change-password` | Change current password     |
| GET    | `/current-user`    | Get current logged-in user  |

---

### 👤 User Profile

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| PATCH  | `/update-account` | Update username, fullName, email |
| PATCH  | `/avatar`         | Update user avatar               |
| PATCH  | `/cover-image`    | Update user cover image          |
| GET    | `/c/:username`    | Get user's public channel        |

---

### 📼 Videos

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| POST   | `/video-upload`     | Upload new video (with thumbnail) |
| GET    | `/my-videos`        | Get all videos of current user    |
| GET    | `/video/:id`        | Get single video                  |
| DELETE | `/delete-video/:id` | Delete a video                    |

---

### ❤️ Likes

| Method | Endpoint          | Description    |
| ------ | ----------------- | -------------- |
| POST   | `/video`          | Like a video   |
| DELETE | `/video/:videoId` | Unlike a video |

---

### 💬 Comments

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/comment/:videoId`  | Add comment on video        |
| GET    | `/comments/:videoId` | Get all comments on a video |

---

### 🕓 Watch History

| Method | Endpoint   | Description                    |
| ------ | ---------- | ------------------------------ |
| GET    | `/history` | Get user's video watch history |

---

## 🔐 Authentication

All protected routes require a valid **Access Token** in the `Authorization` header:

PORT=5000
MONGODB_URI=your_mongodb_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
JWT_SECRET=your_access_token_secret
JWT_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=1d

---

## 🧪 Testing With Postman

- Register a new user using form-data with avatar and coverImage
- Login to get access + refresh tokens
- Pass the access token in headers to test protected routes
- Upload videos with `videoFile` and `thumbnail`
- Like/unlike videos, comment on them, and check responses

---

## 🔮 Future Improvements (optional)

- Real-time notifications via sockets
- Comment and like notifications with badge counts
- Like count and comment count caching
- Advanced video analytics
- Admin panel for moderation

---

## 🙌 Author

Made with ☕ by [Digvijaykumar]
