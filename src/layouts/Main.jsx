import React from 'react'
import Navbar from '../shared/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../shared/Footer'

export default function Main() {
  return (
    <main>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </main>
  )
}
