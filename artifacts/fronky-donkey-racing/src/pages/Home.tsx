import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, ChevronRight, ArrowUpRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

const navLinks = [
  { name: "Jerseys", href: "#jerseys" },
  { name: "Hats", href: "#hats" },
  { name: "The Dirt", href: "#story" },
  { name: "Gallery", href: "#gallery" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <h1 className="text-3xl md:text-4xl font-display text-white uppercase tracking-wider group-hover:text-primary transition-colors">
              Fronky Donkey
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg font-display uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
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
            <Link href="/shop" data-testid="link-shop-now" className="bg-primary text-primary-foreground font-display text-xl uppercase px-6 py-2 hover:bg-white hover:text-black transition-all border-2 border-primary hover:border-white shadow-sm hover:shadow-md transform hover:-translate-y-1">
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground hover:text-primary p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-4xl font-display uppercase text-white hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link href="/shop" data-testid="link-shop-now-mobile" className="mt-8 bg-primary text-white font-display text-2xl uppercase px-12 py-4 border-2 border-primary shadow-[4px_4px_0_0_#fff]">
            Shop Now
          </Link>
        </div>
      </header>

      <main>
        {/* Section 1: Hero */}
        <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img 
              src="/hero-dirt.jpg" 
              alt="Motocross rider kicking up dirt" 
              className="w-full h-full object-cover object-center scale-105 animate-in fade-in zoom-in duration-1000"
            />
          </div>
          
          <div className="container relative z-10 px-6 flex flex-col items-center text-center mt-12 md:mt-0">
            <h2 className="text-6xl md:text-8xl lg:text-[12rem] font-display uppercase leading-[0.85] text-white tracking-tighter drop-shadow-2xl">
              <span className="block transform -skew-x-6 hover:text-primary transition-colors duration-500 cursor-default">Ride Dirty.</span>
              <span className="block transform -skew-x-6 text-outline hover:text-white transition-colors duration-500 cursor-default">Look Clean.</span>
            </h2>
            <p className="mt-8 text-xl md:text-2xl text-gray-200 max-w-2xl font-sans font-light">
              Garage-born gear for riders who live for the track. No corporate bullshit. Just heavy canvas, breathable mesh, and the smell of exhaust.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <button 
                onClick={(e) => scrollToSection(e as any, "#jerseys")}
                className="bg-primary text-white font-display text-2xl uppercase px-10 py-5 hover:bg-white hover:text-black transition-all border-2 border-primary hover:border-white shadow-[6px_6px_0_0_#fff] hover:shadow-[8px_8px_0_0_#e84e1b] transform hover:-translate-y-1"
              >
                Gear Up
              </button>
              <button 
                onClick={(e) => scrollToSection(e as any, "#story")}
                className="bg-transparent text-white font-display text-2xl uppercase px-10 py-5 hover:bg-secondary transition-all border-2 border-white shadow-[6px_6px_0_0_#e84e1b] hover:shadow-[8px_8px_0_0_#fff] transform hover:-translate-y-1"
              >
                Our Story
              </button>
            </div>
          </div>
          
        </section>

        {/* Marquee */}
        <div className="bg-primary py-4 overflow-hidden border-y border-white/20 whitespace-nowrap flex z-20 relative">
          <div className="marquee-content flex gap-8 shrink-0 min-w-full items-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 shrink-0">
                <span className="font-display text-3xl md:text-5xl uppercase text-black tracking-widest">
                  Fronky Donkey Racing
                </span>
                <span className="text-black">
                  <X className="w-8 h-8" />
                </span>
                <span className="font-display text-3xl md:text-5xl uppercase text-white tracking-widest">
                  Eat Dirt
                </span>
                <span className="text-black">
                  <X className="w-8 h-8" />
                </span>
              </div>
            ))}
          </div>
          <div className="marquee-content flex gap-8 shrink-0 min-w-full items-center" aria-hidden="true">
             {[...Array(10)].map((_, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-8 shrink-0">
                <span className="font-display text-3xl md:text-5xl uppercase text-black tracking-widest">
                  Fronky Donkey Racing
                </span>
                <span className="text-black">
                  <X className="w-8 h-8" />
                </span>
                <span className="font-display text-3xl md:text-5xl uppercase text-white tracking-widest">
                  Eat Dirt
                </span>
                <span className="text-black">
                  <X className="w-8 h-8" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Jerseys */}
        <section id="jerseys" className="py-24 md:py-32 bg-card relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/30 -skew-x-12 origin-top transform translate-x-20 pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h3 className="text-primary font-display text-2xl md:text-3xl uppercase tracking-widest mb-2 flex items-center gap-4">
                  <span className="w-12 h-1 bg-primary inline-block"></span>
                  Track Proven
                </h3>
                <h2 className="text-5xl md:text-7xl font-display uppercase text-white leading-none">
                  Race Jerseys
                </h2>
              </div>
              <button className="group flex items-center gap-2 font-display text-xl uppercase hover:text-primary transition-colors">
                View All <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Product 1 */}
              <Link href="/shop/product/1" className="group relative bg-background border border-border p-4 hover:border-primary transition-colors duration-300 block">
                <div className="aspect-[4/5] bg-secondary relative overflow-hidden mb-6">
                  <img src="/jersey-1.jpg" alt="Widowmaker Red/Black Jersey" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-primary text-black font-display text-xl uppercase px-3 py-1">New</div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span className="bg-white text-black font-display text-2xl uppercase px-8 py-4 transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
                      View Product
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-display uppercase text-white group-hover:text-primary transition-colors">The Widowmaker</h4>
                    <p className="text-muted-foreground font-sans mt-1">Red / Black Colorway</p>
                  </div>
                  <span className="text-2xl font-display text-white">$65</span>
                </div>
              </Link>

              {/* Product 2 */}
              <Link href="/shop/product/2" className="group relative bg-background border border-border p-4 hover:border-primary transition-colors duration-300 mt-0 md:mt-16 block">
                <div className="aspect-[4/5] bg-secondary relative overflow-hidden mb-6">
                  <img src="/jersey-2.jpg" alt="Yellowjacket Vintage Jersey" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span className="bg-white text-black font-display text-2xl uppercase px-8 py-4 transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
                      View Product
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-display uppercase text-white group-hover:text-primary transition-colors">Yellowjacket</h4>
                    <p className="text-muted-foreground font-sans mt-1">Vintage Yellow / Black Stripes</p>
                  </div>
                  <span className="text-2xl font-display text-white">$65</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: Brand Story */}
        <section id="story" className="py-24 md:py-32 bg-background border-y border-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #e84e1b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-primary transform translate-x-4 translate-y-4 -z-10"></div>
                <img src="/garage.jpg" alt="Messy dirtbike garage" className="w-full aspect-square object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute -bottom-10 -right-10 bg-primary p-8 hidden md:block">
                  <span className="font-display text-6xl text-white uppercase block leading-none">Est.</span>
                  <span className="font-display text-8xl text-black uppercase block leading-none mt-2">2026</span>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h3 className="text-primary font-display text-2xl uppercase tracking-widest mb-4">The Dirt</h3>
                <h2 className="text-5xl md:text-7xl font-display uppercase text-white leading-[0.9] mb-8">
                  Born in a garage.<br/>
                  <span className="text-muted-foreground">Raised on the track.</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-300 font-sans font-light">
                  <p>
                    Fronky Donkey wasn't started in a boardroom. It was born out of frustration with sterile, corporate gear that looked like it belonged on a billboard instead of a dirtbike.
                  </p>
                  <p>
                    We wanted gear that matched the energy of racing: loud, a little bit stupid, and tough as nails. We don't care about aerodynamics or wind-tunnel testing. We care about jerseys that don't rip when you eat shit, and hats that look better the dirtier they get.
                  </p>
                  <p className="text-white font-medium border-l-4 border-primary pl-4 py-2">
                    "If you're not having fun, you're not riding fast enough."
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Hats */}
        <section id="hats" className="py-24 md:py-32 bg-card relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <h3 className="text-primary font-display text-2xl uppercase tracking-widest mb-2">Crowns for the Pit</h3>
              <h2 className="text-5xl md:text-7xl font-display uppercase text-white leading-none">
                Lids & Beanies
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-2xl mx-auto lg:max-w-none">
              {/* The Bone Crusher */}
              <Link href="/shop/product/3" className="group bg-background border border-border p-4 hover:border-primary transition-colors flex flex-col block">
                <div className="aspect-square bg-secondary relative overflow-hidden mb-4 p-6 flex items-center justify-center">
                  <img src="/hat-1.jpg" alt="The Bone Crusher Snapback" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span className="bg-white text-black font-display text-xl uppercase px-6 py-3 transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
                      View Product
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-display uppercase text-white mt-auto group-hover:text-primary transition-colors">The Bone Crusher</h4>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted-foreground font-sans">Black Snapback</p>
                  <span className="text-lg font-display text-primary">$32</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: Gallery / Lifestyle */}
        <section id="gallery" className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
             <div>
                <h3 className="text-primary font-display text-2xl uppercase tracking-widest mb-2">Community</h3>
                <h2 className="text-5xl md:text-7xl font-display uppercase text-white leading-none">
                  The Roost
                </h2>
              </div>
              <div className="hidden md:flex gap-4">
                 <a href="#" className="text-muted-foreground hover:text-white transition-colors">@fronky.donkey</a>
              </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-6">
            <div className="col-span-2 row-span-2 relative group overflow-hidden bg-card aspect-square md:aspect-auto">
              <img src="/gallery-2.jpg" alt="Dirtbike mid-air whip" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-display text-2xl uppercase">Full Send</span>
              </div>
            </div>
            <div className="relative group overflow-hidden bg-card aspect-square">
              <img src="/gallery-1.jpg" alt="Muddy boots" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative group overflow-hidden bg-primary flex items-center justify-center p-8 aspect-square">
              <h3 className="text-3xl md:text-5xl font-display uppercase text-black text-center leading-tight transform -skew-y-6">
                Send Us Your Worst Ideas.
              </h3>
            </div>
            <div className="relative group overflow-hidden bg-card aspect-square col-span-2 md:col-span-1">
              <img src="/hero-dirt.jpg" alt="Action shot" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="relative group overflow-hidden bg-secondary flex items-center justify-center p-8 aspect-square col-span-2 md:col-span-1 border border-border">
              <div className="text-center">
                <span className="block font-display text-4xl text-white mb-2">#FRONKYDONKEY</span>
                <button className="text-primary font-sans hover:text-white transition-colors underline underline-offset-4">Join the club</button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Newsletter / Footer */}
        <footer className="bg-card border-t border-border pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
              <div>
                <h2 className="text-6xl md:text-8xl font-display uppercase text-white leading-none mb-6">
                  Don't Get<br/>Left Behind.
                </h2>
                <p className="text-xl text-muted-foreground font-sans mb-8 max-w-md">
                  Sign up for drops, exclusive gear, and emails that actually don't suck. 
                </p>
                <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="flex-1 bg-background border border-border px-4 py-4 text-white font-display uppercase tracking-wider focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  <button type="submit" className="bg-primary text-black font-display text-xl uppercase px-8 py-4 hover:bg-white transition-colors">
                    Send It
                  </button>
                </form>
              </div>
              
              <div className="grid grid-cols-2 gap-8 md:pl-16">
                <div>
                  <h4 className="font-display text-xl uppercase text-white mb-6 tracking-widest border-b border-border pb-2 inline-block">Shop</h4>
                  <ul className="space-y-4 font-sans text-muted-foreground">
                    <li><a href="#jerseys" className="hover:text-primary transition-colors">Jerseys</a></li>
                    <li><a href="#hats" className="hover:text-primary transition-colors">Hats & Beanies</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-display text-xl uppercase text-white mb-6 tracking-widest border-b border-border pb-2 inline-block">Info</h4>
                  <ul className="space-y-4 font-sans text-muted-foreground">
                    <li><a href="#story" className="hover:text-primary transition-colors">The Story</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
              <p className="font-sans text-muted-foreground text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Fronky Donkey Racing. All rights reserved. Go outside.
              </p>
              <div className="flex gap-6">
                <a href="#" className="relative group/insta text-muted-foreground hover:text-white transition-colors font-display uppercase tracking-widest">
                  Insta
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#111] border border-border text-white text-xs font-sans px-3 py-1.5 opacity-0 group-hover/insta:opacity-100 transition-opacity duration-200 pointer-events-none">
                    @FronkyDonkeyRacing
                  </span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
      <CartDrawer />
    </div>
  );
}
