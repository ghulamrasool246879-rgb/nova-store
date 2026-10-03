
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  isLoaded: boolean;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const STORAGE_KEY = "nova-store-cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved cart from the browser.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(
            (item): item is CartItem =>
              item !== null &&
              typeof item === "object" &&
              typeof item.id === "string" &&
              typeof item.name === "string" &&
              typeof item.price === "number" &&
              Number.isFinite(item.price) &&
              item.price >= 0 &&
              typeof item.image === "string" &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0
          );

          setItems(validItems);
        }
      }
    } catch {
      // Ignore invalid saved cart data.
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart changes.
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(items)
        );
      } catch {
        // The cart still works during this session
        // if browser storage is unavailable.
      }
    }
  }, [items, isLoaded]);

  const addToCart = useCallback(
    (product: CartProduct) => {
      setItems((current) => {
        const existing = current.find(
          (item) => item.id === product.id
        );

        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...current, { ...product, quantity: 1 }];
      });
    },
    []
  );

  const removeFromCart = useCallback((id: string) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (!Number.isInteger(quantity) || quantity < 1) {
        return;
      }

      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}