"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { X, Plus, Minus, User } from "lucide-react";
import navigationData from "@/data/navigation.json";

interface NavLink {
  name: string;
  href: string;
}

interface MegaMenuSection {
  title: string;
  links: NavLink[];
}

interface NavigationItem {
  name: string;
  href: string;
  isPill?: boolean;
  pillColor?: string;
  megaMenu?: MegaMenuSection[];
}

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  // পরিবর্তন ১: লেভেল ২-এর (সাব-মেনু) জন্য নতুন স্টেট
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName) 
        : [...prev, categoryName]
    );
  };

  // পরিবর্তন ২: সাব-মেনু টগল করার জন্য নতুন ফাংশন
  const toggleSubMenu = (subMenuTitle: string) => {
    setOpenSubMenus(prev =>
        prev.includes(subMenuTitle)
            ? prev.filter(s => s !== subMenuTitle)
            : [...prev, subMenuTitle]
    );
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel className="fixed inset-y-0 left-0 w-full max-w-xs bg-white flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6">
                <div className="space-y-4">
                  <Link href="#" className="flex items-center space-x-3"><User size={24} /><span className="font-medium">Login</span></Link>
                  <hr/>
                  {(navigationData as NavigationItem[]).map(item => (
                    <div key={item.name}>
                      {item.megaMenu ? (
                        <div>
                          <button onClick={() => toggleCategory(item.name)} className="w-full flex justify-between items-center py-2 font-medium">
                            <span>{item.name}</span>
                            {openCategories.includes(item.name) ? <Minus size={16} /> : <Plus size={16} />}
                          </button>
                          {openCategories.includes(item.name) && (
                            <div className="pl-4 mt-2 space-y-3">
                              {item.megaMenu.map((section) => (
                                <div key={section.title}>
                                   <button onClick={() => toggleSubMenu(section.title)} className="w-full flex justify-between items-center py-1 font-semibold text-gray-700 text-left">
                                    <span>{section.title}</span>
                                    {openSubMenus.includes(section.title) ? <Minus size={14} /> : <Plus size={14} />}
                                   </button>
                                   {openSubMenus.includes(section.title) && (
                                       <div className="pl-2 mt-1 space-y-1">
                                        {section.links.map((link) => (
                                            <Link key={link.name} href={link.href} className="block text-sm text-gray-500 hover:text-pink-500 py-1">{link.name}</Link>
                                        ))}
                                       </div>
                                   )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link href={item.href} className="block py-2 font-medium">{item.name}</Link>
                      )}
                    </div>
                  ))}
                </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MobileMenu;