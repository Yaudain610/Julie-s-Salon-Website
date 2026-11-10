import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle, Calendar } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'booking', label: 'Book Appointment' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#1E1E22] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            aria-label="Julie's Salon Home"
          >
            <div className="w-9 h-9 rounded-full bg-[#18181B] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-serif text-lg font-bold group-hover:border-[#D4AF37] transition-colors">
              J
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white whitespace-nowrap shrink-0 group-hover:text-[#E5C07B] transition-colors">
                JULIE'S SALON
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] hidden sm:inline">
                Greensboro, NC
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#E5C07B] font-semibold'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${SALON_INFO.phonePrimaryRaw}`}
              className="text-xs text-[#A1A1AA] hover:text-[#E5C07B] flex items-center gap-1.5 transition-colors whitespace-nowrap"
              title="Call Salon"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="tabular-nums">{SALON_INFO.phonePrimary}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0B0C] bg-[#D4AF37] hover:bg-[#E5C07B] rounded transition-all duration-200 shadow-sm hover:shadow-[#D4AF37]/20 whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
            >
              Book Now
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-semibold text-[#0B0B0C] bg-[#D4AF37] rounded whitespace-nowrap"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#A1A1AA] hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111113] border-b border-[#232326] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base font-medium py-2 transition-colors ${
                  activeTab === link.id
                    ? 'text-[#D4AF37] font-semibold'
                    : 'text-[#D4D4D8] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#232326] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#0B0B0C] bg-[#D4AF37] rounded flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>

            <a
              href={`https://wa.me/${SALON_INFO.whatsAppRaw}?text=Hi%20Julie!%20I'd%20like%20to%20inquire%20about%20an%20appointment%20at%20Julie's%20Salon.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-medium text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 rounded flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>

            <a
              href={`tel:${SALON_INFO.phonePrimaryRaw}`}
              className="w-full py-2 text-center text-xs text-[#A1A1AA] hover:text-white flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              Call {SALON_INFO.phonePrimary}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
