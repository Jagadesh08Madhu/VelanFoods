import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { FaTrash } from "react-icons/fa";
import emptyCart from '../../assets/Empty Box.json'
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.offerPrice * (quantities[item.id] || 1),
    0
  );

  if (!cartItems.length) {
    return( 
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-5">
        <Lottie animationData={emptyCart} loop={true} className="w-72 mb-6" />
        <p className="text-primary font-SpaceGrotesk tracking-wide text-lg font-medium">
            No products in the cart. <br />
            Add products to the cart
        </p>
        <button className="border-primary border mt-5 px-5 py-2 text-primary font-SpaceGrotesk hover:bg-primary hover:text-white transition-all ease-in-out duration-200" onClick={()=>navigate("/products")}>Shop now</button>
    </div>);
  }

  return (
    <div className="p-5 lg:p-10 flex flex-col lg:flex-row gap-8">
      {/* Cart Items */}
      <div className="flex-1 flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{item.name}</span>
                <span className="text-green-700 font-semibold">₹{item.offerPrice}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <button
                onClick={() =>
                  handleQuantityChange(
                    item.id,
                    Math.max(1, quantities[item.id] - 1)
                  )
                }
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                className="w-14 text-center border rounded px-1 py-1"
                value={quantities[item.id]}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                }
              />
              <button
                onClick={() =>
                  handleQuantityChange(item.id, quantities[item.id] + 1)
                }
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Subtotal & Delete */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className="font-semibold text-gray-800">
                ₹{item.offerPrice * quantities[item.id]}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Totals */}
      <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Subtotal</span>
          <span className="text-green-700 font-bold">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Total</span>
          <span className="text-green-700 font-bold">₹{subtotal}</span>
        </div>
        <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg mt-4 font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
