import React, { useState } from "react";
import { FcBusinessman } from "react-icons/fc";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        console.log("🚀⚡👨‍💻🚀 ~ handleSubmit ~ response.data🚀🔥🚀➢", response.data)
        login(response.data.userData);
        localStorage.setItem("token", response.data.token);
        if (response.data.userData.role === "admin") {
          console.log("🚀⚡👨‍💻🚀 ~ handleSubmit ~ response.data.userData.role🚀🔥🚀➢", response.data.userData.role)
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && !error.response.data.success) {
        setError(error.response.data.message);
      } else {
        setError("Server Error");
      }
    }
    console.log(email, password);
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 p-4 space-y-6">
      <div className="flex items-center gap-3 px-4 py-4">
        <FcBusinessman fontSize={45} />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 text-2xl font-semibold">
          StaffSync
        </span>
      </div>
      <div className="border shadow-lg p-6 w-full max-w-md bg-white rounded-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Login</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email*
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password*
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 mt-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password
            </a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
