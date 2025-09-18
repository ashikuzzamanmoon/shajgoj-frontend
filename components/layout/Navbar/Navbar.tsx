/* eslint-disable @typescript-eslint/no-explicit-any */
// components/layout/Navbar.tsx
"use client";

import { useRef, useState, Fragment } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import navigationData from "@/data/navigation.json";
import MobileMenu from "./MobileMenu";
// import { useCart } from "@/context/CartContext";

const pillColorClasses: { [key: string]: string } = {
  "bg-blue-600": "bg-blue-600",
  "bg-pink-600": "bg-pink-600",
  "bg-purple-600": "bg-purple-600",
  "bg-teal-500": "bg-teal-500",
  "bg-green-700": "bg-green-700",
};

interface NavigationItem {
  name: string;
  href: string;
  isPill: boolean;
  pillColor?: string;
  megaMenu?: any;
}

const Navbar = () => {
  // const { toggleCart, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(name);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          {/* --- Main Header (for Desktop) --- */}
          <div className="hidden md:flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-3xl font-bold tracking-widest">
                SHAJGOJ
              </Link>
              <Link href="/brands" className="text-sm font-semibold">
                BRANDS
              </Link>
            </div>
            <div className="w-full max-w-md mx-8">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search size={20} className="text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search for Products, Brands..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Heart size={16} />
                <span>WISHLIST</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                <User size={16} />
                <span>LOGIN</span>
              </button>
              <button className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <ShoppingBag size={16} />
                <span>BAG</span>
                <span>(0)</span>
              </button>
            </div>
          </div>

          {/* --- Main Header (For Mobile) --- */}
          <div className="md:hidden flex flex-col">
            <div className="flex justify-between items-center py-4">
              <button onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={28} />
              </button>
              <Link href="/" className="text-2xl font-bold tracking-widest">
                SHAJGOJ
              </Link>
              <div>
                {/* ডানদিকে User/Wishlist আইকন লাগলে এখানে যোগ করা যাবে */}
              </div>
            </div>
            <div className="relative mb-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={20} className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search for Products, Brands..."
                className="w-full pl-10 pr-4 py-2 border-2 border-pink-500 rounded-full focus:outline-none focus:ring-1 focus:ring-pink-400"
              />
            </div>
          </div>

          <hr className="hidden md:block border-gray-200" />

          {/* --- Navigation Bar (For Desktop) --- */}
          <nav className="hidden md:flex justify-center items-center h-12 relative">
            <ul className="flex items-center space-x-6 text-sm">
              {(navigationData as NavigationItem[]).map((item) => (
                <li
                  key={item.name}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  className="py-3"
                >
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors pb-2 ${
                      openMenu === item.name
                        ? "text-pink-500 border-b-2 border-pink-500"
                        : "text-gray-600 hover:text-pink-500"
                    }`}
                  >
                    {item.isPill ? (
                      <span
                        className={`px-3 py-1.5 text-white text-xs font-bold rounded-full ${
                          pillColorClasses[item.pillColor || ""] ||
                          "bg-gray-500"
                        }`}
                      >
                        {item.name}
                      </span>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </Link>
                  {item.megaMenu && (
                    <Transition
                      show={openMenu === item.name}
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-full w-full z-20">
                        <div className="bg-white shadow-lg">
                          <div className="max-w-7xl mx-auto px-4">
                            <div className="flex">
                              {item.megaMenu.map(
                                (section: any, index: number) => (
                                  <div
                                    key={section.title}
                                    className={`space-y-3 p-8 flex-1 ${
                                      index % 2 !== 0
                                        ? "bg-gray-50"
                                        : "bg-white"
                                    }`}
                                  >
                                    <h3 className="font-bold text-gray-800">
                                      {section.title}
                                    </h3>
                                    <ul className="space-y-2">
                                      {section.links.map((link: any) => (
                                        <li key={link.name}>
                                          <Link
                                            href={link.href}
                                            className="text-gray-500 hover:text-pink-500 hover:underline"
                                          >
                                            {link.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* --- Floating Cart Button (For Mobile) --- */}
      <button className="md:hidden fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg z-30">
        <ShoppingBag size={24} />
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          0
        </span>
      </button>

      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
};

export default Navbar;
