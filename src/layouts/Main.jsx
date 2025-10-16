import React from 'react'
import Navbar from '../shared/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../shared/Footer'

export default function Main() {
  const location = useLocation()

  const hiddenRoutes = ["/login", "/register", "/forget-password", "/reset-password"]

  const isHiddenPage = hiddenRoutes.includes(location.pathname)

  return (
    <main>
      {/* Show Navbar & Footer only if not in hidden routes */}
      {!isHiddenPage && <Navbar />}
      
      <Outlet />
      
      {!isHiddenPage && <Footer />}
    </main>
  )
}
