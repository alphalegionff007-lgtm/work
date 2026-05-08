import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="main-footer" className="px-12 py-12 border-t border-white/5 flex flex-col items-center gap-8 text-[9px] tracking-[0.2em] uppercase text-white/40 bg-obsidian">
      <div className="flex flex-wrap justify-center gap-12">
        <a href="#" className="hover:text-gold transition-colors">Instagram</a>
        <a href="#" className="hover:text-gold transition-colors">Messenger</a>
        <a href="#" className="hover:text-gold transition-colors">Facebook</a>
        <a href="#" className="hover:text-gold transition-colors">Pinterest</a>
      </div>
      
      <div className="text-center max-w-2xl italic leading-relaxed">
        "We do not make bags. We make heirlooms." — প্রতিটি সেলাই একটি প্রতিশ্রুতি।
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="text-cream/20 tracking-[0.5em] font-display text-lg">AMNT</div>
        <div>© 2025 AMNT. Built to last.</div>
      </div>
    </footer>
  );
}
