import { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 bg-obsidian min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Form */}
          <div className="space-y-16">
            <div className="space-y-4">
              <h1 className="text-6xl font-display italic text-cream tracking-tight">Initiate Dialogue</h1>
              <p className="text-sm italic text-white/40 max-w-md leading-relaxed uppercase tracking-[0.2em]">
                Our concierge team typically responds within 4 hours. How may we assist in your quest for permanence?
              </p>
            </div>

            <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 card-immersive p-8">
                 <Input label="Full Identity" placeholder="Abrar Ahmed" />
                 <Input label="Node Email" placeholder="abrar@amnt.com" />
              </div>
              <div className="card-immersive p-8 space-y-10">
                <Input label="Manifest Subject" placeholder="Regarding the Vanguard Collection" />
                <div className="flex flex-col gap-4">
                   <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Message Transmission</label>
                   <textarea className="bg-white/[0.03] border border-white/10 p-6 h-48 outline-none focus:border-gold transition-all duration-300 text-sm text-cream placeholder:text-white/5 rounded-sm" placeholder="Your thoughts..." />
                </div>
              </div>
              <button disabled={submitted} className="btn-premium-filled py-6 px-16 text-xs tracking-[0.4em]">
                {submitted ? 'Transmission Authenticated' : 'Initialize Dispatch'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="card-immersive p-12 flex flex-col justify-between shadow-2xl">
             <div className="space-y-16">
               <InfoBlock icon={<Mail size={24}/>} label="Correspondence" value="amntleathers.official@gmail.com" />
               <InfoBlock icon={<Instagram size={24}/>} label="Curation" value="@amnt_global" />
               <InfoBlock icon={<MessageCircle size={24}/>} label="Direct Inquiry" value="Messenger / WhatsApp" />
               <InfoBlock icon={<MapPin size={24}/>} label="The Atelier" value="Dhaka, Bangladesh" />
             </div>

             <div className="mt-24">
                <div className="aspect-video card-immersive border-white/5 bg-white/[0.02] flex items-center justify-center p-4">
                   {/* Map Placeholder */}
                   <div className="w-full h-full border border-white/5 flex flex-col items-center justify-center gap-4 text-center">
                     <MapPin size={32} className="text-gold opacity-10 animate-pulse" />
                     <div className="italic text-[10px] uppercase tracking-[0.4em] text-white/10">
                       Geospatial Node [Dhaka Matrix]
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-4">
       <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">{label}</label>
       <input className="bg-white/[0.03] border border-white/10 p-4 outline-none focus:border-gold transition-all duration-300 text-sm text-cream placeholder:text-white/5 rounded-sm" {...props} />
    </div>
  );
}

function InfoBlock({ icon, label, value }: any) {
  return (
    <div className="flex gap-8 items-start group">
       <div className="text-gold group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_10px_rgba(201,169,110,0.3)]">{icon}</div>
       <div>
          <h4 className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold/40 mb-3 underline underline-offset-8"> {label}</h4>
          <p className="text-lg font-display text-cream tracking-wide">{value}</p>
       </div>
    </div>
  );
}
