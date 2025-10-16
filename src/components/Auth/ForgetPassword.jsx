import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import login from "../../assets/login.webp";
import AuthLoader from "./AuthLoader";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://your-backend.com/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Password reset link sent to your email.");
        setTimeout(() => navigate("/login"), 3000); // Redirect after 3s
      } else {
        const errData = await response.json();
        setError(errData.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#1E1A2B] min-h-screen flex items-center justify-center px-5 lg:px-20 py-10 relative">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col md:flex-row bg-[#2C2638] rounded-3xl overflow-hidden shadow-2xl w-full max-w-6xl"
      >
        {/* Left Side Image */}
        <div className="md:w-1/2 relative hidden md:flex items-end justify-center">
          <img
            src={login}
            alt="Forget password visual"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-10 text-center text-white px-10">
            <h2 className="text-xl font-semibold">
              We’ll help you recover your account.
            </h2>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 bg-[#2C2638] flex flex-col justify-center p-10 md:p-16">
          <h1 className="text-3xl font-semibold text-white mb-5 text-center">
            Forgot Password
          </h1>
          <p className="text-gray-400 text-center text-sm mb-6">
            Enter your registered email and we’ll send you a password reset link.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-300 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                className="px-5 py-3 rounded-xl border border-gray-600 bg-transparent text-white outline-none focus:border-purple-500 focus:shadow-md focus:shadow-purple-700/30 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="text-green-400 text-sm text-center">{message}</p>
            )}
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
              {loading ? <AuthLoader /> : "Get reset link"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Remember your password?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
