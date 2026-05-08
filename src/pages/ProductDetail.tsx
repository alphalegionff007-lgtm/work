import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Heart, Truck, RefreshCcw, ShieldCheck, ChevronDown, Plus, Minus } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ProductDetail({ addToCart, toggleWishlist, wishlist }: { addToCart: (p: Product, color: string) => void, toggleWishlist: (id: string) => void, wishlist: string[] }) {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0].name);
      setSelectedImage(0);
    }
  }, [product]);

  if (!product) return <div className="pt-32 text-center">Product not found.</div>;

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 bg-obsidian min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-white/[0.03] border border-white/5 overflow-hidden flex items-center justify-center p-12">
            <motion.img 
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={product.images[selectedImage] || product.images[0]} 
              className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "aspect-square bg-white/[0.03] border transition-all p-4 flex items-center justify-center",
                  selectedImage === i ? "border-gold shadow-[0_0_20px_-10px_#C9A96E]" : "border-white/5 opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-4">
             <span className="w-8 h-[1px] bg-gold" />
             <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">{product.collection} Series</span>
          </div>
          <h1 className="text-6xl font-display italic mb-6 leading-tight text-cream tracking-tight">{product.name}</h1>
          <p className="text-3xl font-display text-gold mb-10">৳{product.price.toLocaleString()}</p>

          <div className="mb-10 p-8 card-immersive">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-6 text-white/40">The Palette</h4>
            <div className="flex gap-6">
              {product.colors.map(color => (
                <button 
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "w-10 h-10 rounded-full border transition-all p-1",
                    selectedColor === color.name ? "border-gold scale-110 shadow-[0_0_15px_-5px_#C9A96E]" : "border-white/10 opacity-60"
                  )}
                  title={color.name}
                >
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-12 mb-12">
             <div className="flex-grow">
                <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-6 text-white/40">Unit Count</h4>
                <div className="flex items-center justify-between border border-white/10 px-8 py-4 w-full max-w-[200px]">
                  <button className="text-gold hover:text-white transition-colors" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                  <span className="font-bold text-lg text-cream">{quantity}</span>
                  <button className="text-gold hover:text-white transition-colors" onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
                </div>
             </div>
          </div>

          <div className="flex gap-4 mb-16">
            <button 
              onClick={() => addToCart(product, selectedColor)}
              className="btn-premium-filled flex-grow py-6 text-[11px] tracking-[0.4em]"
            >
              Add to Collection
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                "p-6 border transition-all duration-500",
                wishlist.includes(product.id) ? "bg-rose text-white border-rose" : "bg-transparent text-white/40 border-white/10 hover:border-gold hover:text-gold"
              )}
            >
              <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-12">
            <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/30">
              <Truck size={16} className="text-gold" /> Nationwide Delivery
            </div>
            <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/30">
              <ShieldCheck size={16} className="text-gold" /> Lifetime Authenticity
            </div>
          </div>

          {/* Accordion */}
          <div className="mt-16 space-y-4">
            {[
              { id: 'description', title: 'Philosophical intent', content: product.description },
              { id: 'materials', title: 'Elements & Preservation', content: product.materials || 'Full-grain Italian leather. Clean with a soft, dry cloth. Avoid direct exposure to sunlight and moisture.' },
              { id: 'dimensions', title: 'Spatial Geometry', content: product.dimensions || 'Standard size tailored for modern needs.' }
            ].map(item => (
              <div key={item.id} className="border-b border-white/5 last:border-0 pb-4">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                  className="w-full flex justify-between items-center py-4 text-[11px] uppercase tracking-[0.3em] font-bold text-left text-white/60 hover:text-gold transition-colors"
                >
                  {item.title} <ChevronDown className={cn("transition-transform duration-500", activeAccordion === item.id && "rotate-180 text-gold")} size={14} />
                </button>
                <AnimatePresence>
                  {activeAccordion === item.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-sm italic text-white/40 leading-relaxed max-w-xl">{item.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested */}
      {relatedProducts.length > 0 && (
        <section className="mt-64 pt-32 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-12 bg-obsidian text-[11px] uppercase tracking-[0.5em] text-white/20">Related Assets</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                addToCart={() => addToCart(p, p.colors[0].name)} 
                toggleWishlist={toggleWishlist} 
                isWishlisted={wishlist.includes(p.id)} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
