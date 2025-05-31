import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/login", form); // token will be set in cookie
      navigate("/users/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          className="p-2 border rounded"
          autoComplete="on"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="p-2 border rounded"
          autoComplete="on"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          className="p-2 border rounded"
          autoComplete="on"
          value={form.password}
          onChange={handleChange}
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
