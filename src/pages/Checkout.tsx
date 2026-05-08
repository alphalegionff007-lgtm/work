import { useState, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Order } from '../types';
import { ChevronRight, CreditCard, Wallet, Smartphone, CheckCircle2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Checkout({ cart, setOrders, setCart }: { cart: CartItem[], setOrders: Dispatch<SetStateAction<Order[]>>, setCart: Dispatch<SetStateAction<CartItem[]>> }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const subtotal = cart.reduce((a, b) => a + (b.price * b.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: '', paymentMethod: 'card' as 'card' | 'bkash' | 'nagad' | 'cod'
  });

  const handlePlaceOrder = () => {
    const newOrder: Order = {
      id: `AMNT-${Math.floor(Math.random() * 1000000)}`,
      items: [...cart],
      total,
      status: 'Processing',
      date: new Date().toLocaleDateString(),
      shippingInfo: { ...formData }
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    navigate('/confirmation', { state: { order: newOrder } });
  };

  if (cart.length === 0 && step < 3) return (
     <div className="pt-64 pb-32 text-center px-6 bg-obsidian min-h-screen">
        <div className="max-w-md mx-auto space-y-12">
          <div className="relative">
            <ShoppingCart size={80} className="mx-auto text-gold/10" strokeWidth={0.5} />
            <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full" />
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-display italic text-cream tracking-tight">Curation is Empty</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Your collective vault awaits its first asset</p>
          </div>
          <Link to="/shop" className="btn-premium px-12">Return to Collective</Link>
        </div>
     </div>
  );

  return (
    <div id="checkout-page" className="pt-40 pb-24 px-6 md:px-12 bg-obsidian min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-12 mb-20">
          <Step dot={1} active={step >= 1} label="Shipping" />
          <div className={cn("w-16 h-px transition-colors duration-500", step > 1 ? "bg-gold" : "bg-white/10")} />
          <Step dot={2} active={step >= 2} label="Payment" />
          <div className={cn("w-16 h-px transition-colors duration-500", step > 2 ? "bg-gold" : "bg-white/10")} />
          <Step dot={3} active={step >= 3} label="Review" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-12">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="w-10 h-px bg-gold" />
                  <h3 className="text-4xl font-display italic text-cream">Shipping Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 card-immersive p-10">
                   <Input label="Full Name" placeholder="Abrar Ahmed" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
                   <Input label="Phone Number" placeholder="01712345678" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} />
                   <Input label="Email Address" placeholder="name@domain.com" type="email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
                   <Input label="City" placeholder="Dhaka" value={formData.city} onChange={(v: string) => setFormData({...formData, city: v})} />
                   <div className="md:col-span-2">
                     <Input label="Complete Address" placeholder="House 12, Road 5, Banani" value={formData.address} onChange={(v: string) => setFormData({...formData, address: v})} />
                   </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-premium-filled px-12">Continue to Payment</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <div className="flex items-center gap-6 mb-8">
                  <button onClick={() => setStep(1)} className="text-gold hover:text-white transition-colors"><ArrowLeft size={24}/></button>
                  <h3 className="text-4xl font-display italic text-cream">Financial Node</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <PaymentBtn active={formData.paymentMethod === 'bkash'} icon={<Smartphone/>} label="bKash" onClick={() => setFormData({...formData, paymentMethod: 'bkash'})} />
                  <PaymentBtn active={formData.paymentMethod === 'nagad'} icon={<Smartphone/>} label="Nagad" onClick={() => setFormData({...formData, paymentMethod: 'nagad'})} />
                  <PaymentBtn active={formData.paymentMethod === 'card'} icon={<CreditCard/>} label="Card" onClick={() => setFormData({...formData, paymentMethod: 'card'})} />
                  <PaymentBtn active={formData.paymentMethod === 'cod'} icon={<Smartphone/>} label="COD" onClick={() => setFormData({...formData, paymentMethod: 'cod'})} />
                </div>
                <div className="mt-8 p-10 card-immersive space-y-8">
                  {formData.paymentMethod === 'card' && (
                     <>
                        <Input label="Secure Card ID" placeholder="**** **** **** ****" />
                        <div className="grid grid-cols-2 gap-8">
                           <Input label="Temporal Expiry" placeholder="MM/YY" />
                           <Input label="Verification Code" placeholder="***" />
                        </div>
                     </>
                  )}
                  {(formData.paymentMethod === 'bkash' || formData.paymentMethod === 'nagad') && (
                    <div className="space-y-6">
                       <p className="text-xs italic text-white/40 leading-relaxed uppercase tracking-widest">Transmit Assets to: <span className="text-gold font-bold">01700000000</span></p>
                       <Input label="Transaction ID Hash" placeholder="TRX......" />
                    </div>
                  )}
                  {formData.paymentMethod === 'cod' && (
                    <p className="text-sm italic text-white/40 leading-relaxed uppercase tracking-widest">Settlement upon physical acquisition. Verification protocols required.</p>
                  )}
                </div>
                <button onClick={() => setStep(3)} className="btn-premium-filled px-12">Final Review</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                 <div className="flex items-center gap-6 mb-8">
                  <button onClick={() => setStep(2)} className="text-gold hover:text-white transition-colors"><ArrowLeft size={24}/></button>
                  <h3 className="text-4xl font-display italic text-cream">Final Synthesis</h3>
                </div>
                <div className="card-immersive p-10 space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold mb-4 underline underline-offset-8">Shipping Node</h4>
                        <p className="text-lg font-display text-cream">{formData.name}</p>
                        <p className="text-sm text-white/40 leading-relaxed">{formData.address}, {formData.city}</p>
                        <p className="text-sm text-gold font-mono">{formData.phone}</p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold mb-4 underline underline-offset-8">Financial Route</h4>
                        <p className="text-lg font-display text-cream uppercase tracking-widest">{formData.paymentMethod}</p>
                        <p className="text-sm text-white/40 italic leading-relaxed">System state: Ready for transmission</p>
                      </div>
                   </div>
                </div>
                <button onClick={handlePlaceOrder} className="btn-premium-filled w-full md:w-auto py-6 px-16 text-xs tracking-[0.4em]">Initialize Placement</button>
              </motion.div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-8">
            <div className="card-immersive p-8 flex flex-col gap-8 shadow-2xl">
               <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-gold border-b border-white/5 pb-6">Vault Summary</h3>
               <div className="space-y-8 flex-grow max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                 {cart.map(item => (
                   <div key={`${item.id}-${item.selectedColor}`} className="flex gap-6 items-center">
                     <div className="w-20 h-20 bg-white/5 border border-white/10 p-2">
                        <img src={item.images[0]} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                     </div>
                     <div className="flex-grow space-y-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-cream">{item.name}</h4>
                        <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">{item.selectedColor} — QTY: {item.quantity}</p>
                        <p className="text-lg font-display text-gold mt-2">৳{(item.price * item.quantity).toLocaleString()}</p>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="border-t border-white/10 pt-8 space-y-4">
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                    <span>Base Value</span>
                    <span className="text-cream">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                    <span>Shipping node</span>
                    <span className="text-cream">৳{shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-3xl font-display italic pt-6 border-t border-white/5 text-gold">
                    <span>Final Asset</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ dot, active, label }: { dot: number, active: boolean, label: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4 group", active ? "opacity-100" : "opacity-20")}>
       <div className={cn(
         "w-12 h-12 border flex items-center justify-center font-bold text-xs transition-all duration-700 relative",
         active ? "border-gold text-gold scale-110 shadow-[0_0_20px_-10px_#C9A96E]" : "border-white/10 text-white"
       )}>
         <div className={active ? "animate-pulse" : ""}>
          {active && dot < 3 ? <CheckCircle2 size={18} /> : `0${dot}`}
         </div>
       </div>
       <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/60 group-hover:text-gold transition-colors">{label}</span>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-4">
       <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">{label}</label>
       <input 
         className="bg-white/[0.03] border border-white/10 px-6 py-4 outline-none focus:border-gold transition-all duration-300 text-sm text-cream placeholder:text-white/10 rounded-sm" 
         {...props} 
         onChange={(e) => props.onChange?.(e.target.value)}
       />
    </div>
  );
}

function PaymentBtn({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8 border transition-all duration-500 rounded-sm group",
        active ? "border-gold text-gold bg-gold/5 shadow-[0_0_30px_-15px_#C9A96E]" : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/60"
      )}
    >
      <div className="transition-transform duration-500 group-hover:scale-110">{icon}</div>
      <span className="text-[10px] uppercase font-bold tracking-[0.3em]">{label}</span>
    </button>
  );
}
