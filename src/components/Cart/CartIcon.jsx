import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    // Initial load
    updateCartCount();

    // Listen for cart updates from same tab (custom event)
    window.addEventListener("cartUpdated", updateCartCount);

    // Also listen for cross-tab updates
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart size={28} />
      {cartCount > 0 && (
        <span className="absolute -top-2 z-50 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
}
