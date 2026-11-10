import React from 'react';
import { Phone, MapPin, Instagram, Facebook, Clock, MessageCircle, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenBooking }) => {
  return (
    <footer className="bg-[#080809] border-t border-[#1A1A1D] text-[#A1A1AA] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#18181B] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-serif text-base font-bold">
                J
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-white">
                JULIE'S SALON
              </span>
            </div>
            
            <p className="text-xs text-[#8E8E93] leading-relaxed max-w-sm">
              Greensboro's dedicated private hair studio specializing in custom hand-painted balayage, dimensional blonde highlights, precision haircuts, and Olaplex bond repair.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141417] border border-[#27272D] flex items-center justify-center text-[#D4D4D8] hover:text-[#E5C07B] hover:border-[#E5C07B] transition-colors"
                aria-label="Julie's Salon Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={SALON_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141417] border border-[#27272D] flex items-center justify-center text-[#D4D4D8] hover:text-[#E5C07B] hover:border-[#E5C07B] transition-colors"
                aria-label="Julie's Salon Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${SALON_INFO.whatsAppRaw}?text=Hi%20Julie!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141417] border border-[#27272D] flex items-center justify-center text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp Julie's Salon"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['home', 'services', 'gallery', 'about', 'booking'].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => {
                      onNavClick(tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="capitalize hover:text-[#E5C07B] transition-colors cursor-pointer text-left"
                  >
                    {tab === 'booking' ? 'Book Appointment' : tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours Overview */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Operating Hours
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span>Mon – Sat:</span>
                <span className="text-white font-mono">10:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white font-mono">1:00 PM – 6:00 PM</span>
              </div>
              <div className="pt-2 text-[10px] text-[#71717A]">
                * Appointment recommended. Walk-in inquiries welcome based on daily schedule.
              </div>
            </div>
          </div>

          {/* Studio Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Studio Contact
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-[#D4D4D8]">
                {SALON_INFO.address}
              </p>
              <div className="pt-1">
                <a
                  href={`tel:${SALON_INFO.phonePrimaryRaw}`}
                  className="text-white hover:text-[#E5C07B] flex items-center gap-1.5 font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {SALON_INFO.phonePrimary}
                </a>
              </div>
              <div>
                <a
                  href="tel:13365004955"
                  className="text-[#8E8E93] hover:text-white flex items-center gap-1.5 font-mono text-[11px]"
                >
                  Alt: (336) 500-4955
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C07B] text-[#0B0B0C] font-semibold text-xs rounded uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Book Online
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#141416] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717A]">
          <p>© {new Date().getFullYear()} Julie's Salon. All rights reserved. 4925 W Market St, Greensboro, NC 27407.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with care for hair excellence</span>
            <span>·</span>
            <span>4.8 ★ Google Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
