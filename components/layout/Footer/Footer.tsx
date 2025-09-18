// components/layout/Footer/Footer.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, Mail, Copyright, ChevronDown } from "lucide-react";

const Footer = () => {
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);

  const customerCareLinks = [
    { name: "Delivery Information", href: "/delivery-info" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Customer Complaint Form", href: "/complaint" },
    { name: "Return & Refund Policies", href: "/refund-policy" },
    { name: "Our Stores", href: "/stores" },
  ];

  return (
    <footer className="relative bg-[#2a676b] text-white pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-6 z-10 relative pb-28">
        {/* --- footers main grid--- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* column 1: CONTACT */}
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold tracking-widest mb-4">CONTACT</h3>
            <div className="flex items-center space-x-3">
              <Phone size={16} />
              <a href="tel:+8801966444455">+880 1966 444455</a>
            </div>
            <div className="flex items-center space-x-3">
              <Clock size={16} />
              <span>Sunday to Thursday from 9:30 AM to 6:30 PM</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} />
              <a href="mailto:support@sundora.com.bd">support@sundora.com.bd</a>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <Link href="#">
                <Image
                  src="/images/socials/linkedin.webp"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/images/socials/facebook.webp"
                  alt="Facebook"
                  width={14}
                  height={14}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/images/socials/instagram.webp"
                  alt="Instagram"
                  width={18}
                  height={18}
                />
              </Link>
            </div>
            <div className="flex items-center space-x-3 pt-4 text-gray-400">
              <Copyright size={16} />
              <span>FCBT Ventures Pvt Ltd</span>
            </div>
          </div>

          {/* column 2: CUSTOMER CARE */}
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold tracking-widest mb-4">
              CUSTOMER CARE
            </h3>
            {customerCareLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* column 3: EXPERT INSIGHT */}
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold tracking-widest mb-4">
              EXPERT INSIGHT
            </h3>
            <Link href="/blogs" className="block hover:underline">
              Blogs
            </Link>
          </div>

          {/* column 4: PAYMENTS ACCEPTED */}
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold tracking-widest mb-4">
              PAYMENTS ACCEPTED
            </h3>
            <p>CASH ON DELIVERY</p>
            <p>BKASH</p>
            <div>
              <button
                className="flex items-center justify-between w-full"
                onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
              >
                <span>ONLINE PAYMENTS</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isPaymentsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isPaymentsOpen && (
                <div className="flex flex-col mt-2">
                  <Image
                    src="/images/footer/ssl.webp"
                    alt="SSL Commerz"
                    width={250}
                    height={100}
                  />
                  <Image
                    src="/images/footer/cards.webp"
                    alt="Card Payments"
                    width={250}
                    height={50}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* --- decorative image --- */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[400px] h-[150px]">
        <Image
          src="/images/footer/footer-art.webp"
          alt="Footer Art"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </footer>
  );
};

export default Footer;
