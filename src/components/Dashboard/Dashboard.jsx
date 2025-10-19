import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import AddProducts from './AddProducts'
import { RxHamburgerMenu } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import AllProducts from './AllProducts';

export default function Dashboard() {
  // Get from localStorage (fallback: Dashboard)
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("activeTab") || "Dashboard"
  )
  const [openSideNav, setOpenSideNav] = useState(false)

  // Whenever activeTab changes → update localStorage
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab)
  }, [activeTab])

  const liItems = ["Dashboard", "All products", "Add Products", "Contact Details", "Cancel Request"]

  return (
    <section className="">
      {/* Header */}
      <div className='flex fixed items-center w-full justify-between px-5 lg:px-40 py-5 bg-purple-200 z-20'>
        <img className='w-40' src={logo} alt="" />
        <span className='text-2xl rounded-full text-white cursor-pointer bg-primary p-3' onClick={() => setOpenSideNav(!openSideNav)}>
          <RxHamburgerMenu />
        </span>
      </div>

      <div className="flex flex-col items-st md:flex-row gap-10">
        {/* Sidebar with Framer Motion */}
        <AnimatePresence>
          {openSideNav && (
            <motion.div
              key="sidebar"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:w-96 w-full flex fixed top-[108px] flex-col justify-center bg-primary border border-primary z-10"
            >
              <h1 className="text-center py-10 text-white font-semibold tracking-widest">
                Shri Velan Organic Foods
              </h1>
              <ul className="flex flex-col h-screen px-2 w-full gap-10">
                {liItems.map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setActiveTab(item);
                      setOpenSideNav(false);
                    }}
                    className={`w-full tracking-widest text-center cursor-pointer transition-all duration-300 ease-in-out py-3 ${
                      activeTab === item
                        ? "bg-white text-black font-semibold"
                        : "bg-none text-white"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Section */}
        <div className="w-full mt-32 mb-10 px-5 lg:px-20">
          {activeTab === "Dashboard" && <div>Dashboard content</div>}
          {activeTab === "All products" && <div><AllProducts /></div>}
          {activeTab === "Add Products" && <AddProducts />}
          {activeTab === "Contact Details" && <div>Contact Details content</div>}
          {activeTab === "Cancel Request" && <div>Cancel Request content</div>}
        </div>
      </div>
    </section>
  )
}
