"use client";
import { useState } from "react";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import ShippingStep from "@/components/checkout/ShippingStep";
import PaymentStep from "@/components/checkout/PaymentStep";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Stepper UI */}
      <div className="flex justify-center items-center mb-12">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
          >
            1
          </div>
          <p className="ml-3 font-semibold">Shipping Information</p>
        </div>
        <div className="flex-grow h-px bg-gray-200 mx-4"></div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
          >
            2
          </div>
          <p className="ml-3 font-semibold">Payment & Confirmation</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {step === 1 && <ShippingStep nextStep={nextStep} />}
        {step === 2 && <PaymentStep prevStep={prevStep} />}
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
