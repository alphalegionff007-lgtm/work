import { motion } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <div className="pt-48 text-center"><Link to="/" className="btn-premium">Return Home</Link></div>;

  return (
    <div className="pt-48 pb-24 px-6 md:px-12 bg-obsidian min-h-screen">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-32 h-32 bg-gold/5 border border-gold text-gold rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_-10px_#C9A96E] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gold/10 animate-pulse" />
          <CheckCircle2 size={56} className="relative z-10" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-display italic text-cream tracking-tight">The Promise is Formed</h1>
          <p className="font-bengali text-white/40 text-xl tracking-widest leading-relaxed">আপনার অর্ডার সফলভাবে গৃহীত হয়েছে।</p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Transmission Sequence Authenticated</p>
        </div>
        
        <div className="card-immersive p-10 space-y-8 text-left shadow-2xl relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl pointer-events-none" />
           <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Manifest ID</span>
              <span className="text-sm font-bold text-gold tracking-widest">{order.id}</span>
           </div>
           <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Temporal Arrival</span>
              <span className="text-sm font-medium text-cream tracking-wide">MAY 15 - MAY 18, 2026</span>
           </div>
           <div className="space-y-6">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold underline underline-offset-8">Artifacts Registered</h4>
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-xs items-center group">
                   <span className="text-white/60 group-hover:text-cream transition-colors uppercase tracking-widest">{item.name} <span className="text-gold/40 mx-2">/</span> {item.quantity} units</span>
                   <span className="font-bold text-cream">৳{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
           </div>
           <div className="pt-8 border-t border-white/10 flex justify-between text-3xl font-display text-gold italic">
              <span>Settlement Total</span>
              <span>৳{order.total.toLocaleString()}</span>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
           <Link to="/shop" className="btn-premium px-12 uppercase tracking-widest">Continue Exploration</Link>
           <Link to="/account" className="btn-premium-filled px-12 uppercase tracking-widest">Audit Permanence</Link>
        </div>
      </div>
    </div>
  );
}
