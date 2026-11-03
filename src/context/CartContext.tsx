import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../utils/storage';

export interface DetailedCartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  distinctCount: number;
  detailedItems: DetailedCartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  feedbackMessage: string | null;
  clearFeedback: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    return getStorageItem<CartItem[]>(STORAGE_KEYS.CART, []);
  });

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Sync cart changes with localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CART, cart);
  }, [cart]);

  // Clear feedback timer
  useEffect(() => {
    if (!feedbackMessage) return;
    const timer = window.setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [feedbackMessage]);

  const clearFeedback = useCallback(() => {
    setFeedbackMessage(null);
  }, []);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    if (!productId || quantity <= 0) return;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === productId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { productId, quantity }];
    });

    const targetProduct = PRODUCTS.find((p) => p.id === productId);
    const productName = targetProduct ? targetProduct.title : 'वस्तू';
    setFeedbackMessage(`"${productName}" चौकशी कार्टमध्ये जोडले गेले!`);
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    if (!productId) return;

    // Per brief rule: Cart quantity must never go below 1
    const validQty = Math.max(1, Math.floor(newQuantity));

    setCart((prev) => {
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: validQty } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    if (!productId) return;
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback(
    (productId: string): boolean => {
      return cart.some((item) => item.productId === productId);
    },
    [cart]
  );

  const getItemQuantity = useCallback(
    (productId: string): number => {
      const found = cart.find((item) => item.productId === productId);
      return found ? found.quantity : 0;
    },
    [cart]
  );

  // Hydrate cart line items with product metadata
  const detailedItems = useMemo<DetailedCartItem[]>(() => {
    return cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          product,
          quantity: item.quantity,
        };
      })
      .filter((item): item is DetailedCartItem => item !== null);
  }, [cart]);

  // Total quantity count across all items
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Distinct product count
  const distinctCount = useMemo(() => {
    return cart.length;
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      distinctCount,
      detailedItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      getItemQuantity,
      feedbackMessage,
      clearFeedback,
    }),
    [
      cart,
      cartCount,
      distinctCount,
      detailedItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      getItemQuantity,
      feedbackMessage,
      clearFeedback,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

