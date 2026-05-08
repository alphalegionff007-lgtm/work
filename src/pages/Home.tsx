import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home({ addToCart, toggleWishlist, wishlist }: { addToCart: (p: Product) => void, toggleWishlist: (id: string) => void, wishlist: string[] }) {
  const heroSlides = [
    {
      img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1920',
      title: 'THE FOUNDRY COLLECTION IS HERE',
      bn: 'শিল্পের নতুন অধ্যায়',
      cta: 'Shop Now'
    },
    {
      img: 'https://images.unsplash.com/photo-1491633715183-0362b7b83260?auto=format&fit=crop&q=80&w=1920',
      title: 'CARRY WHAT MATTERS',
      bn: 'প্রয়োজনীয়তা বয়ে চলুন',
      cta: 'Explore'
    },
    {
      img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1920',
      title: 'THE WALLET, REIMAGINED',
      bn: 'মানিব্যাগের নতুন রূপ',
      cta: 'View Collection'
    },
    {
      img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1920',
      title: 'BUILT FOR THE MODERN NOMAD',
      bn: 'আধুনিক যাযাবরের জন্য',
      cta: 'Shop Backpacks'
    },
    {
      img: 'https://images.unsplash.com/photo-1524333866944-8c8ecb219839?auto=format&fit=crop&q=80&w=1920',
      title: 'AMNT — TRUE LUXURY',
      bn: 'প্রকৃত আভিজাত্য',
      cta: 'Our Story'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % heroSlides.length), 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const featuredProducts = PRODUCTS.slice(0, 10);

  return (
    <div id="home-page" className="page-enter-active overflow-hidden">
      {/* Hero Section */}
      <section id="hero-slider" className="h-[100svh] w-full relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-obsidian z-10" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-tan blur-[140px] opacity-20 rounded-full" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-maroon/30 z-10" />
            <img 
              src={heroSlides[currentSlide].img} 
              className="w-full h-full object-cover ken-burns" 
              referrerPolicy="no-referrer" 
              alt={heroSlides[currentSlide].title}
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-cream text-center px-6">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-7xl tracking-[0.2em] font-light max-w-4xl leading-tight uppercase font-display"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              {heroSlides[currentSlide].bn && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="font-bengali text-2xl mt-4 opacity-80"
                >
                  {heroSlides[currentSlide].bn}
                </motion.p>
              )}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-12"
              >
                <Link to="/shop" className="btn-premium border-cream text-cream hover:text-maroon">
                  {heroSlides[currentSlide].cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
          {heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-500",
                currentSlide === i ? "bg-gold w-8" : "bg-cream/40"
              )}
            />
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section id="categories" className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold mb-2"
          >
            Shop By Category
          </motion.h2>
          <div className="w-12 h-px bg-gold mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: 'Backpacks', img: 'https://picsum.photos/seed/backpack-cat/600/800' },
            { name: 'Briefcases', img: 'https://picsum.photos/seed/briefcase-cat/600/800' },
            { name: 'Duffle Bags', img: 'https://picsum.photos/seed/duffle-cat/600/800' },
            { name: 'Wallets', img: 'https://picsum.photos/seed/wallet-cat/600/800' }
          ].map((cat, i) => (
            <Link 
              to={`/shop?category=${cat.name}`} 
              key={cat.name}
              className="group relative h-[450px] overflow-hidden card-immersive clickable"
            >
              <img 
                src={cat.img} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 opacity-60 group-hover:opacity-100" 
                referrerPolicy="no-referrer" 
                alt={cat.name}
              />
              <div className="absolute inset-0 bg-obsidian/40" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-cream text-2xl font-display italic transition-all duration-500 group-hover:text-gold uppercase tracking-widest">{cat.name}</h3>
                <div className="w-0 group-hover:w-full h-[1px] bg-gold transition-all duration-700 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-32 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold blur-[140px] opacity-10 rounded-full" />
         <div className="relative z-10">
           <div className="mb-20 text-center">
            <h2 className="text-5xl font-display italic mb-2 tracking-wide text-cream">Featured Pieces</h2>
             <p className="font-bengali text-xl opacity-40">আমাদের সেরা নির্বাচন</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {featuredProducts.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                addToCart={addToCart} 
                toggleWishlist={toggleWishlist} 
                isWishlisted={wishlist.includes(p.id)} 
              />
            ))}
          </div>
        </div>

        <div className="mt-32 text-center relative z-10">
          <Link to="/shop" className="btn-premium px-16 inline-flex">
            Explore All Assets
          </Link>
        </div>
      </section>

      {/* Philosophy Strip */}
      <section className="relative py-48 overflow-hidden">
        <div 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1920)' }}
          className="absolute inset-0 bg-fixed bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-maroon/85" />
        </div>
        <div className="relative z-10 text-center text-cream px-6">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display italic leading-tight"
          >
            "We do not make bags. We make heirlooms."
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-bengali text-2xl mt-8 opacity-60"
          >
            প্রতিটি সেলাই একটি প্রতিশ্রুতি।
          </motion.p>
        </div>
      </section>

      {/* Craftsman Stats */}
      <section className="bg-maroon py-24 px-6 md:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <StatBox label="Premium Leather" value="100%" />
          <StatBox label="Signature Collections" value="2" />
          <StatBox label="Happy Customers" value="500+" />
          <StatBox label="Years of Character" value="∞" />
        </div>
      </section>

      {/* Social Strip */}
      <section className="bg-white py-24">
        <div className="text-center mb-16 px-6">
          <h2 className="text-xs uppercase tracking-[0.4em] font-bold mb-8">Follow Our Journey @amnt_global</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 h-[300px]">
          {[1,2,3,4,5,6].map(i => (
             <div key={i} className="relative group overflow-hidden cursor-pointer">
                <img 
                  src={`https://picsum.photos/seed/ig-luxury-${i}/600/600`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                  alt="Instagram feed"
                />
                <div className="absolute inset-0 bg-maroon/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-cream" />
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* Bangla Closing */}
      <section className="bg-maroon py-32 px-6 text-center border-t border-cream/5">
         <h2 className="font-bengali text-4xl md:text-6xl text-cream mb-6 tracking-wide">যারা দীর্ঘস্থায়ী জিনিস বোঝেন — এটি তাদের জন্য।</h2>
         <p className="text-gold/60 uppercase tracking-[0.2em] text-[10px] mb-12">For those who understand permanence.</p>
         <Link to="/about" className="btn-premium border-cream text-cream">Discover AMNT</Link>
      </section>
    </div>
  );
}

function StatBox({ label, value }: { label: string, value: string }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value);
  const isInfinite = value === '∞';

  useEffect(() => {
    if (isInfinite) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    let timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [target, isInfinite]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-2"
    >
      <span className="text-4xl md:text-6xl font-display text-gold italic">
        {isInfinite ? '∞' : (value.includes('%') ? `${count}%` : (value.includes('+') ? `${count}+` : count))}
      </span>
      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 font-bold">{label}</p>
    </motion.div>
  );
}
