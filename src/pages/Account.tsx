import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';
import { User, Package, Heart, MapPin, Key, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Account({ orders, wishlist }: { orders: Order[], wishlist: string[] }) {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 bg-obsidian min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full md:w-72 space-y-6">
           <TabBtn icon={<Package size={18}/>} label="Historical Logs" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
           <TabBtn icon={<Heart size={18}/>} label="Curated Desires" active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} />
           <TabBtn icon={<User size={18}/>} label="Identity Node" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
           <TabBtn icon={<MapPin size={18}/>} label="Shipping Matrix" active={activeTab === 'addresses'} onClick={() => setActiveTab('addresses')} />
           <div className="pt-8 border-t border-white/5">
              <button className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.3em] text-rose/60 hover:text-rose transition-all">
                <LogOut size={18}/> Terminate Session
              </button>
           </div>
        </aside>

        {/* Content */}
        <div className="flex-grow">
           <AnimatePresence mode="wait">
              {activeTab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                   <h2 className="text-5xl font-display italic text-cream tracking-tight">Acquisition History</h2>
                   {orders.length === 0 ? (
                     <div className="py-24 text-center card-immersive glass-effect">
                        <Package className="mx-auto mb-6 text-gold/20" size={64} />
                        <p className="text-sm italic text-white/40 uppercase tracking-[0.2em]">No records of craftsmanship found.</p>
                        <Link to="/shop" className="mt-10 inline-flex btn-premium px-12">Browse Collective</Link>
                     </div>
                   ) : (
                     <div className="space-y-6">
                        {orders.map(order => (
                          <div key={order.id} className="card-immersive p-10 flex flex-col md:flex-row justify-between items-center gap-10 group">
                             <div className="space-y-2 text-center md:text-left">
                                <h4 className="text-sm font-bold tracking-widest text-gold">{order.id}</h4>
                                <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/20">{order.date}</p>
                             </div>
                             <div className="text-center">
                                <span className={cn(
                                  "text-[9px] uppercase font-bold tracking-[0.4em] px-6 py-2 border rounded-full transition-all duration-500",
                                  order.status === 'Processing' ? "border-tan/40 text-tan group-hover:bg-tan/10" : "border-gold/40 text-gold group-hover:bg-gold/10"
                                )}>
                                  {order.status}
                                </span>
                             </div>
                             <div className="text-center md:text-right">
                                <p className="text-2xl font-display text-cream tracking-tight">৳{order.total.toLocaleString()}</p>
                                <button className="text-[9px] uppercase font-bold tracking-[0.4em] text-gold hover:text-white transition-colors mt-4">Analyze Details</button>
                             </div>
                          </div>
                        ))}
                     </div>
                   )}
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                 <motion.div key="wishlist" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                    <h2 className="text-5xl font-display italic text-cream tracking-tight">Curated Artifacts</h2>
                    {wishlist.length === 0 ? (
                       <div className="py-24 text-center card-immersive">
                          <Heart className="mx-auto mb-6 text-rose/20" size={64} />
                          <p className="text-sm italic text-white/40 uppercase tracking-[0.2em]">Your curation is currently void.</p>
                       </div>
                    ) : (
                       <p className="text-sm italic text-white/40 uppercase tracking-[0.2em]">You have {wishlist.length} assets in your curation.</p>
                    )}
                 </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-xl">
                   <h2 className="text-5xl font-display italic text-cream tracking-tight">Identity Structure</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 card-immersive p-10">
                      <div className="flex flex-col gap-4">
                         <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Full Name</label>
                         <input className="bg-white/5 border border-white/10 p-4 outline-none text-sm text-cream" value="Abrar Ahmed" readOnly />
                      </div>
                      <div className="flex flex-col gap-4">
                         <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Node Email</label>
                         <input className="bg-white/5 border border-white/10 p-4 outline-none text-sm text-cream" value="alphalegionff007@gmail.com" readOnly />
                      </div>
                   </div>
                   <button className="btn-premium px-12">Update Identity</button>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-6 p-6 border transition-all duration-700 rounded-sm group relative overflow-hidden",
        active ? "bg-gold text-obsidian border-gold shadow-[0_0_25px_-10px_#C9A96E]" : "bg-white/[0.03] text-white/40 border-white/10 hover:border-white/20 hover:text-white"
      )}
    >
      <div className={cn("transition-transform duration-500", active ? "scale-110" : "group-hover:scale-110")}>{icon}</div>
      <span className="text-[10px] uppercase font-bold tracking-[0.3em]">{label}</span>
    </button>
  );
}
