import React from "react";
import { useCart } from "./CartContext";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      disabled={product.stock <= 0}
      className={`${
        product.stock > 0
          ? "bg-primary hover:bg-green-700"
          : "bg-gray-500 cursor-not-allowed"
      } text-white px-4 py-2 rounded-md transition-all`}
    >
      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
