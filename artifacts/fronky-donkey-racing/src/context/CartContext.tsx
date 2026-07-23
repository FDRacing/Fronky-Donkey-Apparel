import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string) => void;
  updateQty: (product: Product, size: string, delta: number) => void;
  removeItem: (product: Product, size: string) => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(product: Product, size: string) {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(product: Product, size: string, delta: number) {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(product: Product, size: string) {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === product.id && i.size === size))
    );
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQty,
        removeItem,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
