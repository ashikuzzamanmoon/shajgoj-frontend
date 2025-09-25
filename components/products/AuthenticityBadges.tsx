// components/products/AuthenticityBadges.tsx

import { ShieldCheck, Lock, Headset } from "lucide-react";
import React from "react";

const badgeData = [
  {
    Icon: ShieldCheck,
    text: "100% Genuine Products",
  },
  {
    Icon: Lock,
    text: "100% Secure Payments",
  },
  {
    Icon: Headset,
    text: "Help Center (+8809666737475)",
  },
];

const AuthenticityBadges = () => {
  return (
    <div className="my-8 py-6">
      <div className="container mx-auto grid grid-cols-3 gap-4 text-center">
        {badgeData.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-3"
          >
            {/* Icon */}
            <badge.Icon className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
            
            {/* Text */}
            <p className="text-sm font-medium text-gray-700">{badge.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthenticityBadges;
