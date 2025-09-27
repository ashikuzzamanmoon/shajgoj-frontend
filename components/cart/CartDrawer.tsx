// components/cart/CartDrawer.tsx
"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">CART</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={toggleCart}>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-8">
                        {cartItems.length > 0 ? (
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((item) => (
                                <li key={item.variant.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {/* ডেটা স্ট্রাকচার অনুযায়ী পরিবর্তন */}
                                    <Image src={item.product.image} alt={item.product.name} width={100} height={100} className="h-full w-full object-cover object-center"/>
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        {/* ডেটা স্ট্রাকচার অনুযায়ী পরিবর্তন */}
                                        <h3>{item.product.name}</h3>
                                        <button onClick={() => removeFromCart(item.variant.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={20}/>
                                        </button>
                                      </div>
                                      {/* ডেটা স্ট্রাকচার অনুযায়ী পরিবর্তন */}
                                      <p className="mt-1 text-sm text-gray-500">৳{item.variant.price}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center border rounded">
                                        <button onClick={() => updateQuantity(item.variant.id, item.quantity - 1)} className="px-2 py-1">-</button>
                                        <p className="px-3">{item.quantity}</p>
                                        <button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} className="px-2 py-1">+</button>
                                      </div>
                                      {/* ডেটা স্ট্রাকচার অনুযায়ী পরিবর্তন */}
                                      <p className="font-medium">৳{(item.variant.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="text-center mt-20">
                            <ShoppingBag size={60} className="mx-auto text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Your Shopping Bag is Empty</h3>
                            <div className="mt-6">
                              <button onClick={toggleCart} className="bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-black">
                                START SHOPPING
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Cart Total:</p>
                                <p className="text-pink-500">৳{cartTotal.toLocaleString()}</p>
                            </div>
                            <div className="mt-6">
                                <Link href="/checkout" onClick={toggleCart} className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black">
                                PROCEED
                                </Link>
                            </div>
                        </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}