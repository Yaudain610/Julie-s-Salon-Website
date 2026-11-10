import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, ZoomIn, X, Scissors } from 'lucide-react';
import { GALLERY_ITEMS, INSTAGRAM_POSTS, SALON_INFO, GalleryItem } from '../data/salonData';

interface GallerySectionProps {
  onOpenBooking: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Before/after comparison slider state (0 to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'balayage', label: 'Balayage & Blondes' },
    { id: 'cuts', label: 'Precision Cuts' },
    { id: 'color', label: 'Custom Color' },
  ];

  const displayedItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery-section" className="py-16 lg:py-24 bg-[#0E0E10] text-[#EDEDED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA] mb-3">
              <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">Transformations</span>
              <span aria-hidden="true">·</span>
              <span>Real Salon Results</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              The Julie's Salon Portfolio
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base max-w-xl">
              Explore our latest balayage highlights, dimensional brunettes, precision bobs, and salon interior at 4925 W Market St.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'bg-[#D4AF37] text-[#0B0B0C]'
                    : 'bg-[#151518] text-[#A1A1AA] hover:text-white border border-[#232326]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#151518] border border-[#232327] hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer shadow-lg flex flex-col"
            >
              <div className="aspect-[4/5] w-full relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Quick zoom icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-white leading-snug line-clamp-2 mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Before & After Feature Showcase */}
        <div className="mt-16 bg-[#141418] border border-[#232326] rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Interactive comparison visual */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-3 text-xs text-[#A1A1AA]">
                <span className="font-medium text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Interactive Result Inspection
                </span>
                <span className="tabular-nums">Drag slider to compare</span>
              </div>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden select-none border border-[#2A2A30]">
                {/* "After" Image (Full background) */}
                <img
                  src="/src/assets/images/service_balayage_color_1793582267134.jpg"
                  alt="After: Healthy blonde balayage waves"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-[#E5C07B] border border-white/10">
                  After · Olaplex & Balayage
                </div>

                {/* "Before" Image (Clipped by slider position) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src="/src/assets/images/service_precision_haircut_1793582268221.jpg"
                    alt="Before: Overgrown tone"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover filter contrast-90 brightness-95"
                    style={{ width: '100%', minWidth: '100%' }}
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-[#A1A1AA] border border-white/10">
                    Precision Foundation Cut
                  </div>
                </div>

                {/* Slider bar */}
                <div
                  className="absolute inset-y-0 w-1 bg-[#D4AF37] cursor-ew-resize shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4AF37] text-[#0B0B0C] flex items-center justify-center font-bold text-xs shadow-xl">
                    ⇄
                  </div>
                </div>

                {/* Hidden input range for dragging */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  aria-label="Compare transformation before and after"
                />
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                Client Transformation Story
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                From Flat & Dry to Luminous Dimensional Waves
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                "It's worth to spend money and I highly recommend her service to my friends. Other than that, price is reasonable, clean place, and treated you nicely."
              </p>
              <div className="bg-[#1C1C22] p-4 rounded-xl border border-[#2B2B32] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Technique:</span>
                  <span className="text-white font-medium">Bespoke Clay Balayage + Root Smudge</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Integrity Treatment:</span>
                  <span className="text-[#E5C07B] font-medium">Olaplex Step 1 & 2 Infusion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Salon Visit Time:</span>
                  <span className="text-white font-medium">2 hours 30 min</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C07B] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Book Your Transformation
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Real Instagram Posts Feed (from @julies_salon08) */}
        <div className="mt-16 pt-12 border-t border-[#1E1E22]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#A1A1AA] mb-1">
                <Instagram className="w-4 h-4 text-[#E5C07B]" />
                <span className="text-white font-medium">{SALON_INFO.instagramHandle}</span>
                <span aria-hidden="true">·</span>
                <span>820+ Followers in Greensboro</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Latest Posts from the Salon
              </h3>
            </div>
            
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#17171A] hover:bg-[#202025] border border-[#27272A] rounded-lg text-xs font-medium text-[#EDEDED] transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>Follow @julies_salon08</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Instagram Post Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-[#121215] border border-[#222226] rounded-xl p-4 flex flex-col justify-between hover:border-[#383840] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#71717A] mb-3">
                    <span className="font-medium text-[#A1A1AA]">Julie</span>
                    <span>{post.timeAgo}</span>
                  </div>
                  <p className="text-xs text-[#D4D4D8] leading-relaxed mb-4 font-mono text-[11px]">
                    {post.caption}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-[#71717A] pt-3 border-t border-[#1C1C20]">
                  <div className="flex items-center gap-1.5 text-rose-400/80">
                    <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                    <span className="tabular-nums">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="tabular-nums">{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for zoomed item */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#141417] border border-[#27272A] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] w-full relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                  {selectedItem.categoryLabel}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] mt-2">
                  {selectedItem.description}
                </p>

                {selectedItem.formula && (
                  <div className="mt-4 p-3 bg-[#1C1C20] rounded-lg border border-[#292930] text-xs text-[#D4D4D8]">
                    <span className="text-[#A1A1AA] font-semibold block mb-0.5">Technique & Formula:</span>
                    <span className="font-mono text-[#E5C07B]">{selectedItem.formula}</span>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      onOpenBooking();
                    }}
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C07B] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Request This Style
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
