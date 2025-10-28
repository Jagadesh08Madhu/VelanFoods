import React from 'react';
import CartIcon from './CartIcon';
import { useNavigate } from 'react-router-dom';

export default function AddtoCartButton() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => navigate('/add-to-cart')}
        className="fixed z-[9999] bottom-5 right-5 border bg-third text-primary border-primary p-4 rounded-full cursor-pointer"
      >
        <CartIcon />
      </div>

    </div>
  );
}
