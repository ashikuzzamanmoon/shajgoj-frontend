// context/CartContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

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

interface CartItem {
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

// Context created
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component created
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    setIsCartOpen(true); // Adding items to cart will open the cart.
  };

  const removeFromCart = (variantId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.variant.id !== variantId)
    );
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

// Custom hook created
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
