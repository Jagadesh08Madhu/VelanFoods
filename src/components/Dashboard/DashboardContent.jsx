import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { BarChart3, ShoppingBag, Layers, Users } from "lucide-react";

export default function DashboardContent() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [monthlyOrders, setMonthlyOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [productsRes, categoriesRes, ordersRes, usersRes, ordersMonthlyRes] =
          await Promise.all([
            fetch("https://shri-velan-food.onrender.com/api/products", { headers }),
            fetch("https://shri-velan-food.onrender.com/api/categories", { headers }),
            fetch("https://shri-velan-food.onrender.com/api/orders", { headers }),
            fetch("https://shri-velan-food.onrender.com/api/users", { headers }),
            fetch("https://shri-velan-food.onrender.com/api/orders/monthly", { headers }),
          ]);

        const products = await productsRes.json();
        const categories = await categoriesRes.json();
        const orders = await ordersRes.json();
        const users = await usersRes.json();
        const ordersMonthly = await ordersMonthlyRes.json();

        setStats({
          products: products?.data?.length || 0,
          categories: categories?.data?.length || 0,
          orders: orders?.data?.length || 0,
          users: users?.data?.length || 0,
        });

        // Assuming ordersMonthly.data = [{ month: "Jan", total: 10 }, ...]
        setMonthlyOrders(ordersMonthly?.data || []);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    { title: "Total Products", value: stats.products, icon: <ShoppingBag size={30} />, color: "bg-blue-500" },
    { title: "Total Categories", value: stats.categories, icon: <Layers size={30} />, color: "bg-green-500" },
    { title: "Total Orders", value: stats.orders, icon: <BarChart3 size={30} />, color: "bg-orange-500" },
    { title: "Registered Users", value: stats.users, icon: <Users size={30} />, color: "bg-purple-500" },
  ];

  return (
    <motion.section className="px-5 lg:px-20 py-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.h1 className="text-2xl font-semibold mb-8" initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
        Dashboard Overview
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
            {cards.map((item, index) => (
              <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={`rounded-2xl p-6 shadow-md flex items-center gap-5 bg-white border`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${item.color}`}>{item.icon}</div>
                <div>
                  <p className="text-gray-600 font-medium">{item.title}</p>
                  <h2 className="text-2xl font-semibold">{item.value}</h2>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Monthly Orders Chart */}
          <motion.div className="mt-10 bg-white border rounded-2xl shadow-md p-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-semibold mb-3">Monthly Orders</h2>
            {monthlyOrders.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyOrders} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-gray-400">No order data available</div>
            )}
          </motion.div>
        </>
      )}
    </motion.section>
  );
}
