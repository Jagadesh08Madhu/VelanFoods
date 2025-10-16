import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import login from "../../assets/signup.webp";
import AuthLoader from "./AuthLoader";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://your-backend.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Optional: store token or user info if backend returns it
        // localStorage.setItem("token", data.token);

        // Redirect to login page after successful signup
        navigate("/login", { replace: true });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#1E1A2B] min-h-screen flex items-center justify-center px-5 lg:px-20 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col md:flex-row bg-[#2C2638] rounded-3xl overflow-hidden shadow-2xl w-full max-w-6xl"
      >
        {/* Left Side Image Section */}
        <div className="md:w-1/2 relative hidden md:flex items-end justify-center">
          <img
            src={login}
            alt="Signup visual"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-10 text-center text-white px-10">
            <h2 className="text-xl font-semibold">
              Capturing Moments, Creating Memories
            </h2>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 bg-[#2C2638] flex flex-col justify-center p-10 md:p-16">
          <h1 className="text-3xl font-semibold text-white mb-5 text-center">
            Create your account
          </h1>

          <form onSubmit={handleSignup} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-300 font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="px-5 py-3 rounded-xl border border-gray-600 bg-transparent text-white outline-none focus:border-purple-500 focus:shadow-md focus:shadow-purple-700/30 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-300 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-xl border border-gray-600 bg-transparent text-white outline-none focus:border-purple-500 focus:shadow-md focus:shadow-purple-700/30 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-300 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create password"
                className="px-5 py-3 rounded-xl border border-gray-600 bg-transparent text-white outline-none focus:border-purple-500 focus:shadow-md focus:shadow-purple-700/30 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-gray-300 font-medium">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="px-5 py-3 rounded-xl border border-gray-600 bg-transparent text-white outline-none focus:border-purple-500 focus:shadow-md focus:shadow-purple-700/30 transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-transparent cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              } text-white font-semibold flex items-center justify-center py-3 rounded-xl mt-3 transition-all`}
            >
              {loading ? <AuthLoader /> : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
