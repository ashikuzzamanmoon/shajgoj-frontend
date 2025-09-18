"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const CheckoutSummary = () => {
  const { cartItems, cartTotal, itemCount } = useCart();
  const vat = cartTotal * 0.05; // Example 5% VAT
  const total = cartTotal + vat;

  return (
    <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
      <h3 className="font-semibold text-lg mb-4">SHOPPING BAG</h3>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.variant.id} className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={64}
                height={64}
                className="rounded-md border"
              />
              <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-sm">{item.product.brand}</p>
              <p className="text-xs text-gray-600">{item.variant.name}</p>
            </div>
            <p className="text-sm font-semibold">
              ৳{item.variant.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t space-y-2 text-sm">
        <div className="flex justify-between">
          <p>SUB TOTAL</p>
          <p>৳{cartTotal.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p>VAT (5%)</p>
          <p>৳{vat.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p>SHIPPING</p>
          <p>FREE</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
          <p>TOTAL</p>
          <p>৳{total.toLocaleString()}</p>
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="w-full border p-2 rounded-l-md"
          />
          <button className="bg-gray-800 text-white px-4 rounded-r-md">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutSummary;
