import React from 'react';
import { Calendar, MessageCircle, Star, Clock, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onSelectServiceTab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onSelectServiceTab }) => {
  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsAppRaw}?text=${encodeURIComponent(
    "Hi Julie! I'd like to ask about availability or book an appointment at Julie's Salon."
  )}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1E1E22]">
      {/* Background glow ambiance */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Trust Kicker: Unboxed Clean Text with separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
              <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-[11px]">
                Greensboro, NC
              </span>
              <span aria-hidden="true" className="text-[#3F3F46]">·</span>
              <span className="flex items-center gap-1 text-white font-medium">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="tabular-nums font-semibold">4.8</span>
                <span className="text-[#A1A1AA]">(281 Google Reviews)</span>
              </span>
              <span aria-hidden="true" className="text-[#3F3F46]">·</span>
              <span>4925 W Market St</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] text-balance">
              Elevated Artistry in <br />
              <span className="italic font-normal text-[#E5C07B]">Cuts, Balayage</span> & Custom Color.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
              Welcome to <span className="text-white font-medium">Julie's Salon</span>, Greensboro's premier private studio specializing in bespoke hand-painted balayage, dimensional foil highlights, precision structural haircuts, and restorative Olaplex bond repair.
            </p>

            {/* Quick Proof Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-[#D4D4D8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Olaplex Bond Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Private 1-on-1 Attention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Good for Kids & Family</span>
              </div>
            </div>

            {/* Dual Booking CTAs as requested */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* Option 1: Full Booking Form CTA */}
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 bg-[#D4AF37] hover:bg-[#E5C07B] text-[#0B0B0C] font-semibold text-sm tracking-wide rounded uppercase flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#D4AF37]/15 hover:shadow-[#D4AF37]/25 cursor-pointer active:scale-98 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>

              {/* Option 2: Direct WhatsApp Connect */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#171719] hover:bg-[#202024] border border-[#27272A] hover:border-[#25D366]/60 text-white font-medium text-sm rounded flex items-center justify-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>Connect on WhatsApp</span>
              </a>

            </div>

            {/* Location & Opening Hours Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#71717A] border-t border-[#1C1C1F]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[#D4D4D8]">Mon–Sat: 10:00 AM – 6:00 PM</span>
                <span className="text-[#52525B]">·</span>
                <span>Sun: 1:00 PM – 6:00 PM</span>
              </div>
              <a
                href={SALON_INFO.mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#E5C07B] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Suite 1130, 4925 W Market St, Greensboro</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#232326] shadow-2xl bg-[#141417] group">
              
              {/* Image with fallback */}
              <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full relative">
                <img
                  src="/src/assets/images/hero_salon_styling_1793582266856.jpg"
                  alt="Julie's Salon professional haircut and balayage in Greensboro NC"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-black/20" />
              </div>

              {/* In-Image Floating Detail Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0F0F12]/90 backdrop-blur-md border border-[#27272A]/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#E5C07B] font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Specialty Feature</span>
                  </div>
                  <h4 className="text-white text-sm font-semibold mt-0.5">
                    Custom Balayage & Olaplex Bond Seal
                  </h4>
                  <p className="text-[#A1A1AA] text-xs">
                    Healthier hair, natural dimension, zero brassiness
                  </p>
                </div>
                <button
                  onClick={onSelectServiceTab}
                  className="text-xs px-3 py-1.5 rounded bg-[#1C1C20] hover:bg-[#27272D] text-[#EDEDED] font-medium transition-colors border border-[#333338] whitespace-nowrap cursor-pointer"
                >
                  View Services
                </button>
              </div>

            </div>

            {/* Corner Decorative Badge */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#18181B] border border-[#D4AF37]/50 rounded-xl px-3.5 py-2 text-center shadow-xl">
              <span className="block text-[10px] uppercase tracking-wider text-[#A1A1AA]">Rating</span>
              <span className="text-sm font-bold text-white tabular-nums flex items-center gap-1 justify-center">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> 4.8 / 5.0
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
