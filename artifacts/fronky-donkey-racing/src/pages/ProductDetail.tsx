import { Link, useParams } from "wouter";
import { useState } from "react";
import { ChevronRight, Check, X } from "lucide-react";
import { products, JERSEY_SIZES, type Product } from "../data/products";
import { useCart } from "../context/CartContext";
import ShopNav from "../components/ShopNav";
import CartDrawer from "../components/CartDrawer";

const categoryLabel: Record<Product["category"], string> = {
  jerseys: "Jerseys",
  hats: "Hats & Beanies",
};

const categoryHref: Record<Product["category"], string> = {
  jerseys: "/shop/jerseys",
  hats: "/shop/hats",
};

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(params.id));

  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product?.category === "hats" ? "One Size" : null
  );
  const [added, setAdded] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center flex-col gap-6">
        <p className="font-display text-4xl uppercase text-muted-foreground">Product not found</p>
        <Link href="/shop" className="font-display uppercase text-primary border-b border-primary pb-0.5">
          Back to Shop
        </Link>
      </div>
    );
  }

  function handleAddToBag() {
    if (!selectedSize || !product) return;
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const sizes = product.category === "jerseys" ? JERSEY_SIZES : ["One Size"];
  const canAdd = !!selectedSize && !product.soldOut;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <ShopNav activeCategory={product.category} />
      <CartDrawer />

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center gap-1.5 text-sm font-sans text-muted-foreground">
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={categoryHref[product.category]} className="hover:text-white transition-colors">
            {categoryLabel[product.category]}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      {/* ── Product layout ──────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left — Image ─────────────────────────────────────────────── */}
          <div className="lg:w-[55%] lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover object-center ${
                  product.soldOut ? "grayscale opacity-60" : ""
                }`}
              />
              {product.badge && !product.soldOut && (
                <div className="absolute top-5 left-5 bg-primary text-black font-display text-lg uppercase px-3 py-1">
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
            </div>
          </div>

          {/* Right — Info ──────────────────────────────────────────────── */}
          <div className="lg:w-[45%] flex flex-col gap-8 lg:pt-2">

            {/* Name + price */}
            <div>
              <p className="font-display uppercase tracking-widest text-primary text-sm mb-2">
                Fronky Donkey Racing
              </p>
              <h1 className="font-display uppercase text-white text-5xl md:text-6xl leading-none mb-3">
                {product.name}
              </h1>
              <p className="text-muted-foreground font-sans text-base mb-4">
                {product.subtitle}
              </p>
              <p className="font-display text-4xl text-white">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-display uppercase tracking-widest text-sm text-muted-foreground">
                  {product.category === "jerseys" ? "Select Size" : "Size"}
                </p>
                {product.category === "jerseys" && (
                  <button
                    onClick={() => setSizeChartOpen(true)}
                    className="font-sans text-sm text-muted-foreground underline hover:text-white transition-colors"
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div className={`grid gap-2 ${product.category === "jerseys" ? "grid-cols-5" : "grid-cols-2"}`}>
                {sizes.map((size) => (
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
              {product.category === "jerseys" && !selectedSize && (
                <p className="mt-2 text-sm font-sans text-muted-foreground">
                  Please select a size to continue.
                </p>
              )}
            </div>

            {/* Add to bag */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToBag}
                disabled={!canAdd}
                className={`w-full font-display uppercase text-xl py-5 tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                  product.soldOut
                    ? "bg-border text-muted-foreground cursor-not-allowed"
                    : canAdd
                    ? added
                      ? "bg-green-600 text-white"
                      : "bg-primary text-white hover:brightness-110"
                    : "bg-border text-muted-foreground cursor-not-allowed"
                }`}
              >
                {product.soldOut ? (
                  "Sold Out"
                ) : added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>

              {product.soldOut && (
                <button className="w-full border-2 border-border text-muted-foreground font-display uppercase text-xl py-5 hover:border-white hover:text-white transition-colors tracking-widest">
                  Notify Me
                </button>
              )}
            </div>

            {/* Shipping note */}
            <p className="text-sm font-sans text-muted-foreground border-t border-border pt-6">
              Free shipping on orders over $75. Free returns within 30 days.
            </p>

            {/* Description */}
            <div className="border-t border-border pt-6">
              <h2 className="font-display uppercase tracking-widest text-white text-sm mb-4">
                Product Details
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed text-base mb-6">
                {product.description}
              </p>
              <ul className="space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm font-sans text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Back to category */}
            <div className="border-t border-border pt-6">
              <Link
                href={categoryHref[product.category]}
                className="font-display uppercase tracking-widest text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
              >
                ← More {categoryLabel[product.category]}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ── Size Chart Modal ─────────────────────────────────────────── */}
      {sizeChartOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          onClick={() => setSizeChartOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-[#111] border border-border p-8 z-10 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSizeChartOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display uppercase tracking-widest text-white text-2xl mb-1">
              Size Guide
            </h2>
            <p className="font-sans text-muted-foreground text-sm mb-6">
              All measurements are in inches.
            </p>

            <table className="w-full text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-display uppercase tracking-widest text-muted-foreground text-xs pb-3 pr-4">
                    Size
                  </th>
                  <th className="text-left font-display uppercase tracking-widest text-muted-foreground text-xs pb-3 pr-4">
                    Shoulder
                  </th>
                  <th className="text-left font-display uppercase tracking-widest text-muted-foreground text-xs pb-3 pr-4">
                    Bust
                  </th>
                  <th className="text-left font-display uppercase tracking-widest text-muted-foreground text-xs pb-3">
                    Top Length
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-4 pr-4 font-display uppercase text-white text-base">L</td>
                  <td className="py-4 pr-4 text-muted-foreground">18.7"</td>
                  <td className="py-4 pr-4 text-muted-foreground">44.5"</td>
                  <td className="py-4 text-muted-foreground">27.4"</td>
                </tr>
              </tbody>
            </table>

            <p className="mt-6 text-xs font-sans text-muted-foreground">
              Measurements may vary ±0.5". For the best fit, compare against a jersey you already own.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
