import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await API.post("/users/login", { username, email, password });
      console.log("Login success: ", res.data);
      navigate("/users/dashboard");
    } catch (error) {
      console.log("Login Failed: ", error.response?.data || error.message);
    }
  };
  return (
    <div className="flex justify-center flex-col">
      <form
        id="login"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 max-w-sm mx-auto"
      >
        <h3 className="font-bold text-2xl text-center ">Login</h3>
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          className="p-2 border"
          autoComplete="on"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="p-2 border"
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          className="p-2 border"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white hover:bg-blue-700 hover:font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className=" text-center">
        <p className="text-gray-700 text-sm hover:text-gray-900 hover:underline">
          Don't Have a Account?
          <span className="font-semibold text-lg">
            <Link to="/users/register"> Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
