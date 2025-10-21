import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLoader from "../../Auth/AuthLoader";

export default function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://shri-velan-food.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("accessToken", data.data.accessToken);
        sessionStorage.setItem("refreshToken", data.data.refreshToken);

        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex gap-10 bg-[#0f0d1f] text-white">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
          alt="background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-10 left-0 right-0 text-center text-lg font-medium">
          Capturing Emotions, Creating Stories
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex  items-center justify-center">
        <div className="bg-[#1a162b] p-10 rounded-2xl shadow-lg w-[90%] md:w-[70%]">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Welcome Back Admin👋
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <label className="text-lg text-gray-300 block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-[#221e35] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-5">
              <label className="text-lg text-gray-300 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-[#221e35] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={` ${loading ? "bg-transparent" : "bg-gradient-to-r "} from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 text-white py-3 flex items-center w-full justify-center  rounded-lg font-medium`}
            >
              {loading ? <AuthLoader /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
