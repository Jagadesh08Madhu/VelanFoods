import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "../components/Cart/CartContext"; // ✅ Import
import AddtoCartButton from "../components/Cart/AddtoCartButton";

export default function Main() {
  const { pathname } = useLocation();

  // Routes where Navbar & Footer are hidden
  const hiddenRoutes = ["/login", "/register", "/forget-password", "/reset-password", "/dashboard"];
  const shouldHideLayout = hiddenRoutes.includes(pathname);

  return (
    <CartProvider> {/* ✅ Wrap everything inside */}
      <main>
        {!shouldHideLayout && <Navbar />}

        <Outlet />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        <AddtoCartButton />

        {!shouldHideLayout && <Footer />}
      </main>
    </CartProvider>
  );
}
