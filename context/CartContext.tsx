// context/CartContext.tsx
"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";

// Interface গুলো অপরিবর্তিত থাকবে
interface Product {
  id: number;
  brand: string;
  name: string;
  image: string;
}

interface Variant {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  // এক্সপোর্ট করা হলো যাতে অন্য ফাইলে ব্যবহার করা যায়
  product: Product;
  variant: Variant;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, variant: Variant, quantity: number) => void;
  removeFromCart: (variantId: number) => void;
  updateQuantity: (variantId: number, newQuantity: number) => void;
  toggleCart: () => void;
  cartTotal: number;
  itemCount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ১. Local Storage থেকে ডেটা লোড করার জন্য useEffect
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("shajgoj_cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  // ২. কার্টে কোনো পরিবর্তন হলে Local Storage-এ সেভ করার জন্য useEffect
  useEffect(() => {
    localStorage.setItem("shajgoj_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product: Product, variant: Variant, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.variant.id === variant.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, variant, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (variantId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.variant.id !== variantId)
    );
    toast.error("Item removed from cart");
  };

  const updateQuantity = (variantId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(variantId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.variant.id === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      // ৩. এখানে isCartOpen এবং toggleCart যোগ করা হয়েছে
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        cartTotal,
        itemCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
