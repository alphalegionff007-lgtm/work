import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar({ cartCount, setIsCartOpen }: { cartCount: number, setIsCartOpen: (o: boolean) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={cn(
      "glass-nav h-20 flex items-center px-6 md:px-12 fixed top-0 w-full z-50 transition-all duration-500",
      isScrolled ? "h-16 bg-obsidian/90 text-cream shadow-sm" : "text-cream",
      pathname === '/' && !isScrolled ? "bg-transparent border-transparent text-cream" : "bg-obsidian/60"
    )}>
      <div className="flex-1 flex items-center gap-6">
        <Link id="nav-logo" to="/" className="group flex items-center gap-2">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="bg-maroon w-full h-full group-hover:bg-gold transition-colors duration-500" />
            <div className="bg-navy w-full h-full group-hover:bg-gold transition-colors duration-500" />
            <div className="bg-rose w-full h-full group-hover:bg-gold transition-colors duration-500" />
            <div className="bg-cream w-full h-full group-hover:bg-gold transition-colors duration-500" />
          </div>
          <span className="font-display text-2xl tracking-widest font-bold">AMNT</span>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center items-center gap-8 uppercase text-[10px] tracking-[0.2em] font-semibold">
        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
        <Link to="/shop" className="hover:text-gold transition-colors">Collections</Link>
        <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
        <Link to="/about" className="hover:text-gold transition-colors">About</Link>
        <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-6">
        <button id="nav-search" className="hover:text-gold transition-colors"><Search size={20} /></button>
        <Link id="nav-account" to="/account" className="hover:text-gold transition-colors"><User size={20} /></Link>
        <button id="nav-cart" onClick={() => setIsCartOpen(true)} className="hover:text-gold transition-colors relative">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}><Menu size={20} /></button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-maroon text-cream p-12 flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-8 right-8" onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            <Link to="/" className="text-4xl font-display italic">Home</Link>
            <Link to="/shop" className="text-4xl font-display italic">Shop</Link>
            <Link to="/about" className="text-4xl font-display italic">About</Link>
            <Link to="/contact" className="text-4xl font-display italic">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
