import React from 'react'
import Navbar from '../shared/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../shared/Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  const location = useLocation()

  const hiddenRoutes = ["/login", "/register", "/forget-password", "/reset-password"]

  const isHiddenPage = hiddenRoutes.includes(location.pathname)

  return (
    <main>
      {/* Show Navbar & Footer only if not in hidden routes */}
      {!isHiddenPage && <Navbar />}
      
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored" // or "light"/"dark"
      />
      
      {!isHiddenPage && <Footer />}
    </main>
  )
}
