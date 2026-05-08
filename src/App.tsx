/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { CartItem, Product, Order } from './types';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const hover = () => setIsActive(true);
    const unhover = () => setIsActive(false);

    window.addEventListener('mousemove', move);
    document.querySelectorAll('button, a, .clickable, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', hover);
      el.addEventListener('mouseleave', unhover);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor hidden md:block ${isActive ? 'active' : ''}`}
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-obsidian flex items-center justify-center z-[9999]">
         <div className="flex flex-col items-center gap-8 translate-y-[-10%]">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 grid grid-cols-2 gap-1 animate-pulse">
                <div className="bg-maroon/40 w-full h-full" />
                <div className="bg-navy/40 w-full h-full" />
                <div className="bg-rose/40 w-full h-full" />
                <div className="bg-gold/40 w-full h-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border border-gold/20 animate-spin-slow rotate-45" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-display text-4xl tracking-[0.5em] font-bold text-gold animate-shimmer bg-gradient-to-r from-gold via-cream to-gold bg-[length:200%_auto] bg-clip-text text-transparent">AMNT</span>
              <span className="text-[8px] tracking-[0.8em] uppercase text-white/20">Inherit Excellence</span>
            </div>
         </div>
      </div>
    );
  }

  const addToCart = (product: Product, color?: string) => {
    const selectedColor = color || product.colors[0].name;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === selectedColor);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.selectedColor === selectedColor) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedColor }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor === color)));
  };

  const updateQuantity = (id: string, color: string, delta: number) => {
    setCart(prev => prev.map(item => (item.id === id && item.selectedColor === color) ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar cartCount={cartCount} setIsCartOpen={setIsCartOpen} />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
              <Route path="/shop" element={<Shop addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
              <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
              <Route path="/checkout" element={<Checkout cart={cart} setOrders={setOrders} setCart={setCart} />} />
              <Route path="/confirmation" element={<OrderConfirmation />} />
              <Route path="/account" element={<Account orders={orders} wishlist={wishlist} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
        <CustomCursor />
      </div>
    </Router>
  );
}

