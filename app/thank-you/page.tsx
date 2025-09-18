import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const ThankYouPage = () => {
  return (
    <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
      <CheckCircle2 size={80} className="text-green-500" />
      <h1 className="text-4xl font-bold mt-6">Thank You!</h1>
      <p className="text-lg text-gray-600 mt-2">
        Your order has been placed successfully.
      </p>
      <p className="mt-4 text-gray-500">
        You will receive a confirmation email shortly.
      </p>
      <Link href="/">
        <button className="mt-8 px-6 py-3 bg-[#2a676b] text-white rounded-md hover:bg-[#225558] transition-colors">
          Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
