"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactConfetti from "react-confetti";

interface PaymentStepProps {
  prevStep: () => void;
}
const PaymentStep = ({ prevStep }: PaymentStepProps) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { clearCart } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);

    // অ্যানিমেশন দেখানোর জন্য ৪ সেকেন্ড পর রিডাইরেক্ট করা হচ্ছে
    setTimeout(() => {
      clearCart(); // কার্ট খালি করা হচ্ছে
      router.push("/thank-you"); // Thank you পেজে পাঠানো হচ্ছে
    }, 4000);
  };

  return (
    <div className="w-full lg:w-2/3">
      {isPlacingOrder && <ReactConfetti recycle={false} numberOfPieces={200} />}
      <h3 className="font-semibold text-lg mb-4">PAYMENT METHOD</h3>
      <div className="space-y-4 border rounded-md p-4">
        <div>
          <input type="radio" id="cod" name="payment" defaultChecked />
          <label htmlFor="cod" className="ml-3">
            Cash On Delivery
          </label>
        </div>
        <hr />
        <div>
          <input type="radio" id="online" name="payment" />
          <label htmlFor="online" className="ml-3">
            Online Payment
          </label>
        </div>
      </div>
      <div className="mt-6">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms" className="ml-3 text-sm">
          I agree to the{" "}
          <a href="#" className="underline">
            Terms and conditions
          </a>
          ,{" "}
          <a href="#" className="underline">
            Return & Refund policies
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </label>
      </div>
      <button
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
        className="mt-6 w-full bg-[#2a676b] text-white py-3 rounded-md hover:bg-[#225558] transition-colors disabled:bg-gray-400 cursor-pointer"
      >
        {isPlacingOrder ? "Placing Order..." : "PLACE ORDER"}
      </button>
      <button
        onClick={prevStep}
        className="mt-2 w-full text-gray-600 py-3 rounded-md hover:bg-gray-100 transition-colors"
      >
        Back to Shipping
      </button>
    </div>
  );
};
export default PaymentStep;
