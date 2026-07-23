import { Link } from "wouter";
import { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

type Category = "all" | "jerseys" | "hats";

interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  category: "jerseys" | "hats";
  image: string;
  badge?: string;
  soldOut?: boolean;
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "The Widowmaker",
    subtitle: "Red / Black Colorway",
    price: 65,
    category: "jerseys",
    image: "/jersey-1.jpg",
    badge: "New",
  },
  {
    id: 2,
    name: "Yellowjacket",
    subtitle: "Vintage Yellow / Black Stripes",
    price: 65,
    category: "jerseys",
    image: "/jersey-2.jpg",
  },
  {
    id: 3,
    name: "The Bone Crusher",
    subtitle: "Black Snapback",
    price: 32,
    category: "hats",
    image: "/hat-1.jpg",
  },
];

const JERSEY_SIZES = ["S", "M", "L", "XL", "XXL"];

const navLinks: { label: string; href: string; value: Category }[] = [
  { label: "All Gear", href: "/shop", value: "all" },
  { label: "Jerseys", href: "/shop/jerseys", value: "jerseys" },
  { label: "Hats & Beanies", href: "/shop/hats", value: "hats" },
];

const headings: Record<Category, string> = {
  all: "All Gear",
  jerseys: "Race Jerseys",
  hats: "Lids & Beanies",
};

const FREE_SHIPPING_THRESHOLD = 75;

interface ShopProps {
  category: Category;
}

export default function Shop({ category }: ShopProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sizePickerProduct, setSizePickerProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const filtered =
    category === "all" ? products : products.filter((p) => p.category === category);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  function handleAddToCart(product: Product) {
    if (product.soldOut) return;
    if (product.category === "jerseys") {
      setSizePickerProduct(product);
      setSelectedSize(null);
    } else {
      commitToCart(product, "One Size");
    }
  }

  function commitToCart(product: Product, size: string) {
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
    setSizePickerProduct(null);
    setSelectedSize(null);
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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-2xl md:text-3xl font-display text-white uppercase tracking-wider group-hover:text-primary transition-colors">
              Fronky Donkey
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.value}
                href={link.href}
                className={`text-lg font-display uppercase tracking-widest transition-colors pb-1 ${
                  category === link.value
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-display w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-foreground hover:text-primary p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ─────────────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-6 right-6 text-foreground"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.value}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`text-4xl font-display uppercase transition-colors ${
              category === link.value ? "text-primary" : "text-white hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-primary font-display text-xl uppercase tracking-widest mb-2 flex items-center gap-3">
              <span className="w-10 h-0.5 bg-primary inline-block" />
              The Collection
            </p>
            <h2 className="text-6xl md:text-8xl font-display uppercase text-white leading-none">
              {headings[category]}
            </h2>
          </div>
          <p className="text-muted-foreground font-sans text-lg">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Mobile pill filters */}
        <div className="flex md:hidden gap-3 overflow-x-auto pb-4 mb-8">
          {navLinks.map((link) => (
            <Link
              key={link.value}
              href={link.href}
              className={`shrink-0 font-display uppercase text-lg px-5 py-2 border-2 transition-all ${
                category === link.value
                  ? "bg-primary border-primary text-white"
                  : "bg-transparent border-border text-muted-foreground hover:border-primary hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border hover:border-primary transition-colors duration-300 flex flex-col"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                    product.soldOut ? "grayscale opacity-50" : "group-hover:scale-105"
                  }`}
                />
                {product.badge && !product.soldOut && (
                  <div className="absolute top-4 left-4 bg-primary text-black font-display text-lg uppercase px-3 py-1">
                    {product.badge}
                  </div>
                )}
                {product.soldOut && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/80 text-white font-display text-2xl uppercase px-6 py-3 rotate-12 shadow-lg">
                      Sold Out
                    </span>
                  </div>
                )}
                {!product.soldOut && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-white text-black font-display text-2xl uppercase px-8 py-4 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                    >
                      Quick Add
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`text-xl font-display uppercase transition-colors ${
                      product.soldOut
                        ? "text-muted-foreground"
                        : "text-white group-hover:text-primary"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <span
                    className={`text-xl font-display ${
                      product.soldOut ? "text-muted-foreground line-through" : "text-primary"
                    }`}
                  >
                    ${product.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-sans mb-5">
                  {product.subtitle}
                </p>
                <button
                  onClick={product.soldOut ? undefined : () => handleAddToCart(product)}
                  disabled={product.soldOut}
                  className={`mt-auto w-full font-display text-lg uppercase py-3 transition-colors border-2 ${
                    product.soldOut
                      ? "bg-secondary/50 text-muted-foreground border-border cursor-not-allowed"
                      : "bg-transparent text-white border-white hover:bg-primary hover:border-primary"
                  }`}
                >
                  {product.soldOut ? "Notify Me" : "Add to Bag"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="mt-24 border-t border-border py-10 bg-card">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Fronky Donkey Racing. All rights reserved. Go outside.
          </p>
          <Link
            href="/"
            className="font-display text-lg uppercase text-muted-foreground hover:text-primary transition-colors tracking-widest"
          >
            Back to Home
          </Link>
        </div>
      </footer>

      {/* ── Size Picker Modal ────────────────────────────────────────────── */}
      {sizePickerProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
          onClick={() => setSizePickerProduct(null)}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* panel */}
          <div
            className="relative w-full sm:max-w-md bg-[#111] border border-border p-8 z-10 animate-[slideUp_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSizePickerProduct(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={sizePickerProduct.image}
                alt={sizePickerProduct.name}
                className="w-16 h-20 object-cover object-center border border-border"
              />
              <div>
                <p className="font-display uppercase text-white text-xl leading-tight">
                  {sizePickerProduct.name}
                </p>
                <p className="text-muted-foreground text-sm font-sans">
                  {sizePickerProduct.subtitle}
                </p>
                <p className="text-primary font-display text-lg mt-1">
                  ${sizePickerProduct.price}
                </p>
              </div>
            </div>

            <p className="font-display uppercase tracking-widest text-sm text-muted-foreground mb-3">
              Select Size
            </p>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {JERSEY_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 font-display uppercase text-sm border-2 transition-all ${
                    selectedSize === size
                      ? "bg-primary border-primary text-white"
                      : "bg-transparent border-border text-muted-foreground hover:border-white hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedSize}
              onClick={() => selectedSize && commitToCart(sizePickerProduct, selectedSize)}
              className={`w-full font-display uppercase text-xl py-4 transition-all ${
                selectedSize
                  ? "bg-primary text-white hover:brightness-110"
                  : "bg-border text-muted-foreground cursor-not-allowed"
              }`}
            >
              {selectedSize ? `Add to Bag — ${selectedSize}` : "Select a Size"}
            </button>
          </div>
        </div>
      )}

      {/* ── Cart Drawer ──────────────────────────────────────────────────── */}
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
                  {/* Product image */}
                  <div className="w-24 h-28 shrink-0 bg-secondary overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
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

                    {/* Qty + remove */}
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

        {/* Footer — checkout */}
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

      {/* slide-up keyframe for size picker */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
