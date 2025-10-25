import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

export default function DashboardSignup() {
  const navigate = useNavigate();

  // Redirect if no accessToken
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/"); // redirect to home
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://shri-velan-food.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }), // confirmPassword not sent
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Admin registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "ADMIN",
        });
      } else {
        setMessage(`❌ ${data.message || "Registration failed"}`);
      }
    } catch (error) {
      setMessage("❌ Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-[#0F0C1E] text-white">
      {/* Left Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 relative hidden md:flex"
      >
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
          alt="Signup Visual"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-10 left-0 w-full text-center text-white text-lg font-medium">
          Capturing Emotions, Creating Stories
        </div>
      </motion.div>

      {/* Right Signup Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="md:w-1/2 flex justify-center min-h-screen items-center p-8 md:p-16"
      >
        <div className="bg-[#1E1A2B] w-full max-w-md p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Admin Signup👋
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2C2638] border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2C2638] border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-gray-300">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2C2638] border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400"
              >
                {showPassword ? (
                  <VscEyeClosed />
                ) : (
                  <VscEye />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block mb-1 text-gray-300">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#2C2638] border border-gray-600 text-white focus:outline-none focus:border-purple-500"
                placeholder="Confirm your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              }`}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center ${
                message.startsWith("✅") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
