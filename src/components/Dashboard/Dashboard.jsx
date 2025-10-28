import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import AddProducts from './AddProducts';
import { RxHamburgerMenu } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import AllProducts from './AllProducts';
import CreateCategory from './CreateCategory';
import DashboardContent from './DashboardContent';
import DashboardContact from './DashboardContact';

export default function Dashboard() {
  // State for active tab
  const [activeTab, setActiveTabState] = useState(
    sessionStorage.getItem("activeTab") || "Dashboard"
  );
  const [tabData, setTabData] = useState(null);
  const [openSideNav, setOpenSideNav] = useState(false);

  // Whenever activeTab changes → update sessionStorage
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Custom function to switch tabs and pass optional data
  const handleSetActiveTab = (tabName, data = null) => {
    setActiveTabState(tabName);
    setTabData(data);
  };

  const liItems = ["Dashboard", "All products", "Add Products", "Create Category","Contact Details"];

  return (
    <section className="">
      {/* Header */}
      <div className='flex fixed items-center w-full justify-between px-5 lg:px-40 py-5 bg-purple-200 z-20'>
        <img className='w-40' src={logo} alt="" />
        <span
          className='text-2xl rounded-full text-white cursor-pointer bg-primary p-3'
          onClick={() => setOpenSideNav(!openSideNav)}
        >
          <RxHamburgerMenu />
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar with Framer Motion */}
        <AnimatePresence>
          {openSideNav && (
            <motion.div
              key="sidebar"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:w-96 overflow-y-auto w-full fixed top-[108px] flex flex-col justify-between bg-primary border border-primary z-10 h-[calc(100vh-108px)]"
            >
              {/* Top Section */}
              <div>
                <h1 className="text-center py-10 text-white font-semibold tracking-widest">
                  Shri Velan Organic Foods
                </h1>

                <ul className="flex flex-col px-2 w-full gap-4">
                  {liItems.map((item) => (
                    <li
                      key={item}
                      onClick={() => {
                        handleSetActiveTab(item);
                        setOpenSideNav(false);
                      }}
                      className={`w-full tracking-widest text-center cursor-pointer transition-all duration-300 ease-in-out py-3 rounded ${
                        activeTab === item
                          ? "bg-white text-black font-semibold"
                          : "bg-none text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Section: Signup Link */}
              <div className="mb-10 px-2">
               
                <a
                  href="/dashboard-signup"
                  className="w-full block tracking-widest text-center py-3 text-white font-semibold rounded hover:bg-white hover:text-black transition-all duration-300"
                >
                  Signup as a Admin
                </a>
                 <a
                  href="/"
                  className="w-full block tracking-widest text-center py-3 text-white font-semibold rounded hover:bg-white hover:text-black transition-all duration-300"
                >
                  ← Back to home page
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Section */}
        <div className="w-full mt-32 mb-10 px-5 lg:px-20">
          {activeTab === "Dashboard" && <DashboardContent />}
          {activeTab === "All products" && <AllProducts setActiveTab={handleSetActiveTab} />}
          {activeTab === "Add Products" && <AddProducts setActiveTab={handleSetActiveTab} productData={tabData?.product} />}
          {activeTab === "Create Category" && <CreateCategory />}
          {activeTab === "Contact Details" && <DashboardContact />}
        </div>
      </div>
    </section>
  );
}
