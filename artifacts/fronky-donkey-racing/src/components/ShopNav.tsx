import { Link } from "wouter";
import { useState } from "react";
import { ShoppingCart, Menu, X, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ShopCategory } from "../data/products";

const navLinks: { label: string; href: string; value: ShopCategory }[] = [
  { label: "All Gear", href: "/shop", value: "all" },
  { label: "Jerseys", href: "/shop/jerseys", value: "jerseys" },
  { label: "Hats & Beanies", href: "/shop/hats", value: "hats" },
];

interface ShopNavProps {
  activeCategory?: ShopCategory;
}

export default function ShopNav({ activeCategory }: ShopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();

  return (
    <>
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
                className={`text-lg font-display uppercase tracking-widest transition-colors pb-1 ${
                  activeCategory === link.value
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
            className={`text-4xl font-display uppercase transition-colors ${
              activeCategory === link.value
                ? "text-primary"
                : "text-white hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
