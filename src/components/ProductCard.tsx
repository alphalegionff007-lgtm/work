import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import { Product } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProductCardProps {
  key?: string | number;
  product: Product;
  addToCart: (p: Product) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

export default function ProductCard({ product, addToCart, toggleWishlist, isWishlisted }: ProductCardProps) {
  return (
    <div id={`product-${product.id}`} className="group flex flex-col relative card-immersive clickable p-6">
      <div className="relative aspect-square mb-6 overflow-hidden bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center">
        <Link to={`/product/${product.id}`} className="w-full h-full">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-95" 
            referrerPolicy="no-referrer" 
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <span className="bg-gold text-obsidian text-[7px] uppercase font-bold tracking-widest px-2 py-0.5">New</span>}
          {product.isBestseller && <span className="bg-rose text-white text-[7px] uppercase font-bold tracking-widest px-2 py-0.5">Best</span>}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 flex border-t border-white/5">
          <button 
            onClick={() => addToCart(product)}
            className="flex-grow bg-gold text-obsidian hover:bg-cream transition-colors py-3 uppercase text-[9px] tracking-widest font-bold"
          >
            Add to Collective
          </button>
        </div>

        <button 
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute top-2 right-2 transition-all duration-300",
            isWishlisted ? "text-rose" : "text-white/40 hover:text-gold"
          )}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
           <p className="text-[9px] uppercase font-bold tracking-widest text-[#B07A7A]">{product.collection} Series</p>
           <span className="text-[10px] text-gold">★★★★★</span>
        </div>
        <Link to={`/product/${product.id}`} className="text-lg font-display tracking-wide hover:text-gold transition-colors">{product.name}</Link>
        <p className="text-xl font-display text-gold mt-2">৳{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
