import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Shop({ addToCart, toggleWishlist, wishlist }: { addToCart: (p: Product) => void, toggleWishlist: (id: string) => void, wishlist: string[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') as Category | null;
  const activeCollection = searchParams.get('collection');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest'>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      const matchCat = activeCategory ? p.category === activeCategory : true;
      const matchCol = activeCollection ? p.collection === activeCollection : true;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCat && matchCol && matchPrice;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [activeCategory, activeCollection, priceRange, sortBy]);

  const clearFilters = () => setSearchParams({});

  return (
    <div id="shop-page" className="pt-40 pb-24 px-6 md:px-12 bg-obsidian min-h-screen">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full md:w-72 space-y-16">
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold mb-8 text-gold">Browse Collections</h3>
            <div className="flex flex-col gap-6 text-sm">
              {['Backpacks', 'Briefcases', 'Duffle Bags', 'Wallets'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSearchParams({ category: cat })}
                  className={cn(
                    "text-left uppercase tracking-[0.2em] text-[10px] transition-all duration-300",
                    activeCategory === cat ? "text-gold font-bold translate-x-2" : "text-white/40 hover:text-gold"
                  )}
                >
                  {cat}
                </button>
              ))}
              {activeCategory && (
                <button onClick={clearFilters} className="text-rose text-[9px] uppercase font-bold flex items-center gap-2 mt-4 px-4 py-2 border border-rose/20 rounded-sm">
                  <X size={10} /> Reset Filters
                </button>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold mb-8 text-gold">The Series</h3>
            <div className="flex flex-col gap-6 text-sm">
              {['Foundry', 'Bastion'].map(col => (
                <button 
                  key={col}
                  onClick={() => setSearchParams({ collection: col })}
                  className={cn(
                    "text-left uppercase tracking-[0.2em] text-[10px] transition-all duration-300",
                    activeCollection === col ? "text-gold font-bold translate-x-2" : "text-white/40 hover:text-gold"
                  )}
                >
                  The {col} series
                </button>
              ))}
            </div>
          </div>

          <div className="card-immersive p-8">
            <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold mb-8 text-gold">Value range</h3>
            <input 
              type="range" 
              min="0" 
              max="30000" 
              step="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-gold bg-white/10"
            />
            <div className="flex justify-between mt-4 text-[10px] uppercase font-bold text-gold">
              <span>৳0</span>
              <span>৳{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-10">
            <div className="space-y-1">
              <h2 className="text-6xl font-display italic text-cream">The Collective</h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">Inherit the craftsmanship</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Refine By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-obsidian border border-white/10 px-4 py-2 text-[10px] uppercase font-bold tracking-widest outline-none cursor-pointer text-gold rounded-sm appearance-none"
              >
                <option value="newest">Recent Arrivals</option>
                <option value="price-low">Value: Low to High</option>
                <option value="price-high">Value: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-40 text-center card-immersive">
              <p className="text-3xl font-display italic text-white/30">No pieces found in our vault.</p>
              <button onClick={clearFilters} className="mt-10 btn-premium px-12">Expand Search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  addToCart={addToCart} 
                  toggleWishlist={toggleWishlist} 
                  isWishlisted={wishlist.includes(p.id)} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
