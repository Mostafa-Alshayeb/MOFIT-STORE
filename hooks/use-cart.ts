"use client";

import { useState, useEffect } from "react";
import type { CartItem } from "@/lib/types";
import {
  getCart,
  addToCart as addToCartStorage,
  updateCartItemQuantity as updateQuantityStorage,
  removeFromCart as removeFromCartStorage,
  clearCart as clearCartStorage,
  getCartTotal,
  getCartItemCount,
} from "@/lib/storage";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
  }, []);

  const addToCart = (item: CartItem) => {
    addToCartStorage(item);
    setCart(getCart());
  };

  const updateQuantity = (id: string, size: number, quantity: number) => {
    updateQuantityStorage(id, size, quantity);
    setCart(getCart());
  };

  const removeItem = (id: string, size: number) => {
    removeFromCartStorage(id, size);
    setCart(getCart());
  };

  const clearCart = () => {
    clearCartStorage();
    setCart([]);
  };

  const total = mounted ? getCartTotal() : 0;
  const itemCount = mounted ? getCartItemCount() : 0;

  return {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    itemCount,
    mounted,
  };
}
