// components/products/AuthenticityBadges.tsx
import { ShieldCheck, Truck } from "lucide-react";

const AuthenticityBadges = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 border border-[#2a676b] px-3 py-2 text-xs md:text-sm text-[#2a676b]">
        <ShieldCheck size={18} className="text-[#2a676b]" />
        <span>100% AUTHENTIC</span>
      </div>
      <div className="flex items-center space-x-2 border border-[#2a676b] px-3 py-2 text-xs md:text-sm text-[#2a676b]">
        <Truck size={18} className="text-[#2a676b]" />
        <span>OFFICIAL DISTRIBUTOR</span>
      </div>
    </div>
  );
};

export default AuthenticityBadges;
