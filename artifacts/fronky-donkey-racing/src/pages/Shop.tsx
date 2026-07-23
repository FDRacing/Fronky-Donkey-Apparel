import { Link } from "wouter";
import { useState } from "react";
import { X } from "lucide-react";
import { products, JERSEY_SIZES, type ShopCategory } from "../data/products";
import { useCart } from "../context/CartContext";
import ShopNav from "../components/ShopNav";
import CartDrawer from "../components/CartDrawer";

const headings: Record<ShopCategory, string> = {
  all: "All Gear",
  jerseys: "Race Jerseys",
  hats: "Lids & Beanies",
};

interface ShopProps {
  category: ShopCategory;
}

export default function Shop({ category }: ShopProps) {
  const { addToCart } = useCart();
  const [sizePickerProductId, setSizePickerProductId] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const filtered =
    category === "all" ? products : products.filter((p) => p.category === category);

  const sizePickerProduct = products.find((p) => p.id === sizePickerProductId) ?? null;

  function handleAddToCart(productId: number) {
    const product = products.find((p) => p.id === productId);
    if (!product || product.soldOut) return;
    if (product.category === "jerseys") {
      setSizePickerProductId(productId);
      setSelectedSize(null);
    } else {
      addToCart(product, "One Size");
    }
  }

  function commitFromPicker() {
    if (!sizePickerProduct || !selectedSize) return;
    addToCart(sizePickerProduct, selectedSize);
    setSizePickerProductId(null);
    setSelectedSize(null);
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <ShopNav activeCategory={category} />
      <CartDrawer />

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
          {(
            [
              { label: "All Gear", href: "/shop", value: "all" },
              { label: "Jerseys", href: "/shop/jerseys", value: "jerseys" },
              { label: "Hats & Beanies", href: "/shop/hats", value: "hats" },
            ] as { label: string; href: string; value: ShopCategory }[]
          ).map((link) => (
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
              {/* Image — clicking goes to product detail */}
              <Link href={`/shop/product/${product.id}`} className="block">
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
                  {/* Quick Add hover overlay */}
                  {!product.soldOut && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product.id);
                        }}
                        className="bg-white text-black font-display text-2xl uppercase px-8 py-4 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                      >
                        Quick Add
                      </button>
                    </div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <Link href={`/shop/product/${product.id}`} className="block mb-1">
                  <div className="flex justify-between items-start">
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
                  <p className="text-sm text-muted-foreground font-sans mt-0.5">
                    {product.subtitle}
                  </p>
                </Link>

                <button
                  onClick={product.soldOut ? undefined : () => handleAddToCart(product.id)}
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

      {/* Footer */}
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

      {/* ── Size Picker Modal ─────────────────────────────────────────── */}
      {sizePickerProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
          onClick={() => setSizePickerProductId(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full sm:max-w-md bg-[#111] border border-border p-8 z-10 animate-[slideUp_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSizePickerProductId(null)}
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
              onClick={commitFromPicker}
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

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
