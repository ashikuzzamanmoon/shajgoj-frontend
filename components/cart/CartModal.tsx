// components/cart/CartModal.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartModal = () => {
  const {
    isCartOpen,
    toggleCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    itemCount,
  } = useCart();

  const router = useRouter();

  const handleCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    toggleCart();
    router.push("/category/all");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-xs transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-lg font-semibold">SHOPPING BAG</h2>
            <button onClick={toggleCart}>
              <X size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <p className="text-xl">0 Products</p>
              <div className="w-full p-6 mt-4">
                <div className="flex justify-between text-gray-500">
                  <p>Price</p>
                  <p>৳0</p>
                </div>
                <div className="flex justify-between text-gray-500">
                  <p>Shipping cost</p>
                  <p>৳0</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold text-2xl">
                  <p>0,00 ৳</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.variant.id} className="flex space-x-4">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="object-cover border rounded-md"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.product.brand}</p>
                    <p className="text-sm text-gray-600">{item.product.name}</p>
                    <p className="text-xs text-gray-500">{item.variant.name}</p>
                    <div className="flex items-center border rounded-md w-24 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.variant.id, item.quantity - 1)
                        }
                        className="px-2 py-1 text-gray-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="flex-grow text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.variant.id, item.quantity + 1)
                        }
                        className="px-2 py-1 text-gray-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => removeFromCart(item.variant.id)}
                      className="text-gray-400 hover:text-black mb-2"
                    >
                      <X size={16} />
                    </button>
                    <p className="font-semibold">
                      ৳{(item.variant.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-6 border-t mt-auto">
            <div className="flex justify-between font-semibold">
              <span>TOTAL ({itemCount} products)</span>
              <span>৳{cartTotal.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className={`w-full mt-4 py-3 text-white rounded-md transition-colors ${
                cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 cursor-pointer"
              }`}
              disabled={cartItems.length === 0}
            >
              CHECKOUT
            </button>
            <button
              onClick={handleContinueShopping}
              className="w-full mt-2 py-3 border border-black rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
