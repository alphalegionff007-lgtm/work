import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, delta: number) => void;
}

export default function CartDrawer({ isOpen, onClose, cart, removeFromCart, updateQuantity }: CartDrawerProps) {
  const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-md z-[200]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-obsidian z-[201] flex flex-col shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] border-l border-white/5"
          >
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-2xl font-display italic text-cream tracking-tight">The Collective</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 transition-colors rounded-full text-gold"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-10 space-y-10 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 text-white/10 uppercase tracking-[0.4em] text-[10px] font-bold text-center">
                  <ShoppingCart size={64} strokeWidth={1} className="opacity-20 animate-pulse" />
                  <p>Your curation is currently void.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={`${item.id}-${item.selectedColor}`} className="flex gap-6 group items-center">
                    <div className="w-24 h-24 bg-white/5 border border-white/10 p-2 overflow-hidden">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream">{item.name}</h3>
                          <p className="text-[9px] text-gold/60 mt-1 uppercase tracking-[0.3em] font-bold">{item.selectedColor}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.selectedColor)} className="text-white/20 hover:text-rose transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-3 py-1.5">
                          <button onClick={() => updateQuantity(item.id, item.selectedColor, -1)} className="text-white/40 hover:text-gold transition-colors"><Minus size={12} /></button>
                          <span className="text-xs font-bold w-4 text-center text-cream">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.selectedColor, 1)} className="text-white/40 hover:text-gold transition-colors"><Plus size={12} /></button>
                        </div>
                        <p className="text-lg font-display text-gold">৳{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-10 border-t border-white/5 space-y-8 bg-white/[0.02]">
              <div className="flex justify-between items-center">
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-white/40">Total Valuation</span>
                <span className="text-3xl font-display text-gold italic">৳{total.toLocaleString()}</span>
              </div>
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="btn-premium-filled w-full block text-center py-5 uppercase tracking-[0.4em] text-[10px] relative overflow-hidden"
              >
                Proceed to Synthesis
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
