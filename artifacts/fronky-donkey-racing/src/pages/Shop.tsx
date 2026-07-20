import { Link } from "wouter";
import { useState } from "react";
import { ShoppingCart, Menu, X, ArrowLeft } from "lucide-react";

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
  {
    id: 4,
    name: "Checkered Flag",
    subtitle: "Red / White Trucker",
    price: 28,
    category: "hats",
    image: "/hat-2.jpg",
  },
  {
    id: 5,
    name: "Mud Slinger",
    subtitle: "Olive Fitted",
    price: 35,
    category: "hats",
    image: "/hat-1.jpg",
    soldOut: true,
  },
  {
    id: 6,
    name: "Cold Starts Beanie",
    subtitle: "Orange Knit",
    price: 24,
    category: "hats",
    image: "/hat-2.jpg",
  },
];

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

interface ShopProps {
  category: Category;
}

export default function Shop({ category }: ShopProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const filtered =
    category === "all" ? products : products.filter((p) => p.category === category);

  function addToCart() {
    setCartCount((c) => c + 1);
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo / back */}
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-2xl md:text-3xl font-display text-white uppercase tracking-wider group-hover:text-primary transition-colors">
              Fronky Donkey
            </span>
          </Link>

          {/* Desktop category links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.value}
                href={link.href}
                data-testid={`nav-${link.value}`}
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

          {/* Cart */}
          <button
            className="relative p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Cart"
            data-testid="button-cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-display w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground hover:text-primary p-2 ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
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
            data-testid={`mobile-nav-${link.value}`}
            className={`text-4xl font-display uppercase transition-colors ${
              category === link.value ? "text-primary" : "text-white hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <main className="container mx-auto px-6 py-12">
        {/* Page header */}
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
              data-testid={`pill-${link.value}`}
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
              data-testid={`card-product-${product.id}`}
              className="group bg-card border border-border hover:border-primary transition-colors duration-300 flex flex-col"
            >
              {/* Image */}
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

                {/* Quick Add hover */}
                {!product.soldOut && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <button
                      onClick={addToCart}
                      data-testid={`button-quickadd-${product.id}`}
                      className="bg-white text-black font-display text-2xl uppercase px-8 py-4 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                    >
                      Quick Add
                    </button>
                  </div>
                )}
              </div>

              {/* Info */}
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
                  onClick={product.soldOut ? undefined : addToCart}
                  disabled={product.soldOut}
                  data-testid={`button-addtocart-${product.id}`}
                  className={`mt-auto w-full font-display text-lg uppercase py-3 transition-colors border-2 ${
                    product.soldOut
                      ? "bg-secondary/50 text-muted-foreground border-border cursor-not-allowed"
                      : "bg-transparent text-white border-white hover:bg-primary hover:border-primary"
                  }`}
                >
                  {product.soldOut ? "Notify Me" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer strip */}
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
    </div>
  );
}
