"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

const FloatingCartButton = () => {
    // CartContext থেকে প্রয়োজনীয় ডেটা এবং ফাংশন নেওয়া হচ্ছে
    const { toggleCart, itemCount, cartTotal } = useCart();

    return (
        <button
            onClick={toggleCart}
            className="fixed top-1/2 -translate-y-1/2 right-0 flex flex-col items-center shadow-lg rounded-l-lg z-30 transition-transform hover:scale-105"
        >
            {/* উপরের অংশ: আইকন এবং আইটেম সংখ্যা */}
            <div className="bg-[#1D1D3D] text-white px-3 py-2 flex flex-col items-center rounded-tl-lg">
                <ShoppingBag size={24} />
                <span className="text-[10px] font-bold mt-1">{itemCount} ITEMS</span>
            </div>
            {/* নিচের অংশ: মোট মূল্য */}
            <div className="bg-pink-500 text-white px-3 py-2 text-sm font-bold w-full text-center rounded-bl-lg">
                ৳{cartTotal.toLocaleString()}
            </div>
        </button>
    );
};

export default FloatingCartButton;