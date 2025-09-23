// components/layout/Footer/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Facebook, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  const topCategories = [
    { name: "MAKEUP", href: "/category/makeup" },
    { name: "SKIN", href: "/category/skin" },
    { name: "EYE CARE", href: "/category/eye-care" },
    { name: "HAIR", href: "/category/hair" },
    { name: "PERSONAL CARE", href: "/category/personal-care" },
    { name: "NATURAL", href: "/category/natural" },
    { name: "MOM & BABY", href: "/category/mom-and-baby" },
  ];

  const quickLinks = [
    { name: "OFFERS", href: "/category/offers" },
    { name: "MENS PRODUCTS", href: "/category/men" },
    { name: "SKIN CONCERNS", href: "/category/concerns" },
    { name: "NEW ARRIVAL", href: "/category/new-arrivals" },
    { name: "MAKEUP", href: "/category/makeup" },
  ];

  return (
    <footer className="bg-[#1D1D3D] text-white">
      {/* --- banner image --- */}
      <div className="bg-[#6b21a8]">
        <div className="max-w-7xl mx-auto">
          <Image
            src="/images/footer/footer-banner.png"
            alt="Our Promises"
            width={1920}
            height={150}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* column 1: SHAJGOJ */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-xl font-bold">SHAJGOJ</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:underline">
                  OUR STORY
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  SHAJGOJ MAGAZINE
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  SHAJGOJ OUTLETS
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  JOIN OUR TEAM
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  AUTHENTICITY
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm">SHARE YOUR LOVE</p>
              <div className="flex space-x-3 mt-2">
                <Link href="#">
                  <Facebook size={20} />
                </Link>
                <Link href="#">
                  <Youtube size={20} />
                </Link>
                <Link href="#">
                  <Instagram size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* column 2: TOP CATEGORIES */}
          <div className="text-sm">
            <h4 className="font-semibold mb-4">TOP CATEGORIES</h4>
            <ul className="space-y-2 text-gray-300">
              {topCategories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* column 3: QUICK LINKS */}
          <div className="text-sm">
            <h4 className="font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* column 4: ALL ABOUT BEAUTY */}
          <div className="text-sm">
            <h4 className="font-semibold mb-4">ALL ABOUT BEAUTY</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:underline">
                  KNOW YOUR ROUTINE
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  HAIR CARE 101
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  SKIN CARE 101
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  MAKEUP 101
                </Link>
              </li>
            </ul>
          </div>

          {/* column 5: HELP */}
          <div className="text-sm">
            <h4 className="font-semibold mb-4">HELP</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:underline">
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  POINTS
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  FAQS
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  SHIPPING & DELIVERY
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  TERMS & CONDITIONS
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  REFUND & RETURN POLICY
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  TRADE LICENSE
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  PRIVACY POLICY
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="#" className="hover:underline">
              AUTHENTICITY
            </Link>
            <Link href="#" className="hover:underline">
              TERMS & CONDITIONS
            </Link>
            <Link href="#" className="hover:underline">
              PRIVACY POLICY
            </Link>
          </div>
          <p>Copyright © 2025 Shajgoj Limited. All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
