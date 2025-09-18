"use client";

interface ShippingStepProps {
  nextStep: () => void;
}
const ShippingStep = ({ nextStep }: ShippingStepProps) => {
  return (
    <div className="w-full lg:w-2/3">
      <div className="mb-6">
        <p className="text-gray-500">
          Already have an account?{" "}
          <a href="#" className="font-semibold text-teal-600">
            LOGIN TO PROCEED
          </a>
        </p>
      </div>
      <h3 className="font-semibold text-lg mb-4">SHIPPING INFORMATION</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name *"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Last Name *"
          className="border p-2 rounded-md"
        />
        <input
          type="email"
          placeholder="Email *"
          className="border p-2 rounded-md"
        />
        <input
          type="tel"
          placeholder="Phone *"
          className="border p-2 rounded-md"
        />
        <select className="border p-2 rounded-md">
          <option>Select City</option>
        </select>
        <select className="border p-2 rounded-md">
          <option>Select Area</option>
        </select>
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Address *"
            className="border p-2 rounded-md w-full"
          />
        </div>
      </div>
      <button
        onClick={nextStep}
        className="mt-6 w-full bg-[#2a676b] text-white py-3 rounded-md hover:bg-[#225558] transition-colors"
      >
        PROCEED TO PAYMENT & CONFIRMATION
      </button>
    </div>
  );
};
export default ShippingStep;
