# 🫖 chai-aut-backend

Backend for **Chai-Aut**, a video-sharing platform inspired by YouTube. Built with Node.js, Express, MongoDB, and Cloudinary, this service provides APIs for authentication, video uploads, comments, likes, and more.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based login/register)
- 📹 Video Upload using Multer and Cloudinary
- ❤️ Like/Unlike functionality
- 💬 Commenting on videos
- 👤 User profile management
- 📁 RESTful API architecture

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer + Cloudinary
- **Environment Config**: dotenv

---

## 📁 Project Structure

chai-aut-backend/
│
├── src/
│ ├── controllers/ # Route logic
│ ├── models/ # Mongoose schemas
│ ├── middlewares/ # Auth and error handling
│ ├── db/ # MongoDB connection setup
│ ├── routes/ # Express routes
│ ├── utils/ # Helper functions (e.g. upload, response format)
│ ├── app.js # Express app configuration
│ ├── index.js # Entry point
│ └── constants.js # Static configuration/constants
│
├── .env # Environment variables (not committed)
├── package.json
└── README.md

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Digvijay7310/chai-aut-backend.git
cd chai-aut-backend

Create .env file in the root of the folder
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret



🧪 Testing
Use Postman to test endpoints.

If you have a Postman Collection or Swagger/OpenAPI docs, you can include them here too.
```
