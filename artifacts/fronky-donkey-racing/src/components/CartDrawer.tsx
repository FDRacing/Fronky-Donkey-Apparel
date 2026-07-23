import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 75;

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, updateQty, removeItem, cartCount, subtotal } =
    useCart();

  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0f0f0f] border-l border-border z-[80] flex flex-col transition-transform duration-300 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div>
            <h2 className="font-display uppercase tracking-widest text-white text-2xl">
              Your Bag
            </h2>
            {cartCount > 0 && (
              <p className="text-muted-foreground text-sm font-sans mt-0.5">
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="text-muted-foreground hover:text-white transition-colors p-1"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal < FREE_SHIPPING_THRESHOLD ? (
          <div className="px-6 py-4 bg-[#1a1a1a] border-b border-border shrink-0">
            <p className="font-sans text-sm text-muted-foreground mb-2">
              You're{" "}
              <span className="text-white font-semibold">${remaining.toFixed(0)}</span>{" "}
              away from free shipping
            </p>
            <div className="h-1 bg-border w-full">
              <div
                className="h-1 bg-primary transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="px-6 py-4 bg-primary/10 border-b border-primary/30 shrink-0">
            <p className="font-sans text-sm text-primary font-semibold">
              🏁 You've unlocked free shipping!
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingCart className="w-16 h-16 text-border" />
              <p className="font-display uppercase text-2xl text-muted-foreground">
                Your bag is empty
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="font-display uppercase text-lg text-primary border-b border-primary pb-0.5 hover:text-white hover:border-white transition-colors"
              >
                Keep Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {cartItems.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 py-5"
                >
                  <div className="w-24 h-28 shrink-0 bg-secondary overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="font-display uppercase text-white text-base leading-tight truncate">
                          {item.product.name}
                        </p>
                        <p className="text-muted-foreground text-xs font-sans mt-0.5">
                          {item.product.subtitle}
                        </p>
                        <p className="text-muted-foreground text-xs font-sans uppercase tracking-wider mt-1">
                          Size: {item.size}
                        </p>
                      </div>
                      <span className="font-display text-white shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQty(item.product, item.size, -1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-border transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-display text-white text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.product, item.size, 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-border transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product, item.size)}
                        className="text-muted-foreground hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-6 border-t border-border shrink-0 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-display uppercase tracking-widest text-muted-foreground text-sm">
                Subtotal
              </span>
              <span className="font-display text-white text-2xl">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="font-sans text-xs text-muted-foreground">
              Taxes and shipping calculated at checkout.
            </p>
            <button className="w-full bg-primary text-white font-display uppercase text-xl py-4 hover:brightness-110 active:scale-[0.98] transition-all tracking-widest">
              Checkout
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full border border-border text-muted-foreground font-display uppercase text-base py-3 hover:border-white hover:text-white transition-colors tracking-widest"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
