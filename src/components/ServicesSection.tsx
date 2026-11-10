import React, { useState } from 'react';
import { Clock, Sparkles, Check, Scissors, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { SERVICES, Service } from '../data/salonData';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'color', label: 'Balayage & Color' },
    { id: 'cuts', label: 'Haircuts & Styling' },
    { id: 'treatments', label: 'Olaplex & Care' },
    { id: 'kids', label: 'Kids & Family' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services-section" className="py-16 lg:py-24 bg-[#0B0B0C] text-[#EDEDED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] mb-3">
            <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">Service Menu & Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Master Craftsmanship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Tailored Cuts, Color & Restorative Care
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base leading-relaxed">
            Every session at Julie's Salon begins with an in-depth consultation assessing your face structure, hair texture, and lifestyle. We exclusively use premium low-ammonia pigments and certified Olaplex bond sealers.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#D4AF37] text-[#0B0B0C] shadow-sm'
                    : 'bg-[#141417] text-[#A1A1AA] hover:text-white border border-[#232326]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            return (
              <div
                key={service.id}
                className="bg-[#121215] border border-[#232327] hover:border-[#383840] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs uppercase tracking-wider text-[#A1A1AA] font-medium">
                      {service.categoryLabel}
                    </span>
                    {service.popular && (
                      <span className="text-[11px] text-[#E5C07B] font-semibold tracking-wide flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Most Requested
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E5C07B] transition-colors">
                    {service.name}
                  </h3>

                  {/* Price & Duration */}
                  <div className="flex items-center gap-3 my-3 text-sm">
                    <span className="font-serif text-2xl font-bold text-[#D4AF37] tabular-nums">
                      {service.price}
                    </span>
                    <span className="text-[#3F3F46]">/</span>
                    <span className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
                      <Clock className="w-3.5 h-3.5 text-[#71717A]" />
                      {service.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-3 mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Booking Action */}
                <button
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="w-full py-2.5 px-4 bg-[#18181D] hover:bg-[#D4AF37] text-white hover:text-[#0B0B0C] border border-[#2B2B33] hover:border-[#D4AF37] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Select & Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Featured Olaplex & Technique Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#17171C] via-[#141418] to-[#17171C] border border-[#27272D] rounded-2xl p-8 lg:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>The Julie's Salon Difference</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Patented Olaplex Bond Protection with Every Color
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-2xl">
                Unlike rushed high-volume salons, Julie never compromises hair integrity. All lightening and balayage services are fortified with Olaplex to rebuild broken disulfide bonds on a molecular level, leaving your hair resilient, glossy, and silky smooth.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#EDEDED]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Zero brassiness guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Gentle on fine and delicate textures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Long-lasting seamless grow-out</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                onClick={() => onSelectServiceToBook('balayage-signature')}
                className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#E5C07B] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg cursor-pointer whitespace-nowrap"
              >
                Book Signature Balayage ($185+)
              </button>
              <span className="text-[11px] text-[#71717A] mt-2">
                Includes toner, glaze & Olaplex seal
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
