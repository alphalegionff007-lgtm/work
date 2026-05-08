import { motion } from 'motion/react';

export default function About() {
  return (
    <div id="about-page" className="bg-obsidian min-h-screen">
      {/* Hero */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1920)' }}
          className="absolute inset-0 bg-cover bg-center scale-105"
        >
          <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center text-cream px-6 space-y-8">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5 }}
             className="w-px h-24 bg-gold mx-auto mb-12"
           />
           <motion.h1 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="text-6xl md:text-9xl font-display italic leading-tight tracking-tighter"
           >
             True luxury is the art <br/> of outlasting <span className="text-gold">time.</span>
           </motion.h1>
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.2 }}
             className="text-[10px] uppercase tracking-[1em] text-white/40 font-bold"
           >
             The AMNT Genesis
           </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-6 md:px-24">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-4">
                 <h2 className="text-5xl font-display italic text-gold tracking-tight">Our Genesis</h2>
                 <div className="w-12 h-px bg-gold/50" />
               </div>
               <p className="text-lg italic leading-relaxed text-cream/60 font-display">
                 Founded in a small atelier with a single piece of full-grain leather, AMNT was born from a refusal to accept the temporary. We believe that what you carry should tell your story — growing more beautiful with every mile, every touch, and every year.
               </p>
               <div className="font-bengali text-3xl text-gold border-l-2 border-gold/30 pl-10 py-6 bg-white/[0.02] card-immersive">
                 আমাদের প্রতিটি পণ্য সময়ের সাথে আরও সুন্দর হয়ে ওঠে।
               </div>
            </div>
            <div className="aspect-[3/4] card-immersive p-4 group">
               <div className="w-full h-full overflow-hidden relative">
                 <img 
                   src="https://images.unsplash.com/photo-1517677129300-07b130802f46?auto=format&fit=crop&q=80&w=800" 
                   className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" 
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-1000" />
               </div>
            </div>
          </div>

          <div className="text-center space-y-12 py-32 border-y border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full translate-y-1/2" />
             <h3 className="text-[10px] uppercase tracking-[1em] font-bold text-gold relative z-10">The Craft Philosophy</h3>
             <p className="text-2xl md:text-4xl font-display italic max-w-3xl mx-auto leading-relaxed text-cream relative z-10">
               We select only the top 5% of full-grain hides, tanning them with traditional methods that respect the earth and the material.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-center">
             <CraftStep step="01" title="Selection" desc="Scrupulous hide choosing" />
             <CraftStep step="02" title="Tanning" desc="Slow organic infusion" />
             <CraftStep step="03" title="Stitching" desc="The art of the saddle" />
             <CraftStep step="04" title="Testing" desc="Vigorously proofing" />
          </div>
        </div>
      </section>
    </div>
  );
}

function CraftStep({ step, title, desc }: any) {
  return (
    <div className="group space-y-6">
       <span className="text-xs font-bold text-gold opacity-20 mb-4 block group-hover:opacity-100 transition-all duration-700 font-mono tracking-widest">{step} / PROTOCOL</span>
       <div className="h-px bg-white/5 w-12 mx-auto transition-all duration-700 group-hover:w-full group-hover:bg-gold/50" />
       <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-cream group-hover:text-gold transition-colors">{title}</h4>
       <p className="text-[10px] italic text-white/30 lowercase tracking-widest group-hover:text-white/60 transition-colors">{desc}</p>
    </div>
  );
}
