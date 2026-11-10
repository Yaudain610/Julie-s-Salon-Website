/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { MyBookingsModal } from './components/MyBookingsModal';
import { 
  MessageCircle, 
  Calendar, 
  Sparkles, 
  Scissors, 
  ShieldCheck, 
  Phone, 
  ArrowRight,
  Star,
  MapPin,
  Clock
} from 'lucide-react';
import { SALON_INFO, SERVICES } from './data/salonData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState<boolean>(false);
  const [savedBookingsCount, setSavedBookingsCount] = useState<number>(0);

  // Sync saved bookings count
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('julies_salon_bookings') || '[]');
        setSavedBookingsCount(stored.length);
      } catch {
        setSavedBookingsCount(0);
      }
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, [isBookingsModalOpen]);

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappGeneralUrl = `https://wa.me/${SALON_INFO.whatsAppRaw}?text=${encodeURIComponent(
    "Hi Julie! I'm reaching out from your website and would like to ask about an appointment at your Greensboro salon."
  )}`;

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#EDEDED] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Top Notice Banner */}
            <div className="bg-[#101013] border-b border-[#1E1E23] py-2 px-4 text-center">
              <p className="text-xs text-[#A1A1AA] tracking-wide font-medium">
                (for Julie's Salon's preview only)
              </p>
            </div>

            {/* Hero Section */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onSelectServiceTab={() => setActiveTab('services')}
            />

            {/* Quick Proof & Value Pillars */}
            <section className="py-12 bg-[#0E0E10] border-b border-[#1E1E22]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  <div className="p-5 bg-[#141417] border border-[#222226] rounded-xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Star className="w-5 h-5 fill-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-white">4.8 Google Rated</h3>
                      <p className="text-xs text-[#A1A1AA] mt-0.5">281+ verified client reviews on West Market St.</p>
                    </div>
                  </div>

                  <div className="p-5 bg-[#141417] border border-[#222226] rounded-xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-white">Custom Balayage</h3>
                      <p className="text-xs text-[#A1A1AA] mt-0.5">Hand-painted dimension tailored to your natural tone.</p>
                    </div>
                  </div>

                  <div className="p-5 bg-[#141417] border border-[#222226] rounded-xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-white">Olaplex Certified</h3>
                      <p className="text-xs text-[#A1A1AA] mt-0.5">Bond-repairing formula with every lightening service.</p>
                    </div>
                  </div>

                  <div className="p-5 bg-[#141417] border border-[#222226] rounded-xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-white">Family & Kids</h3>
                      <p className="text-xs text-[#A1A1AA] mt-0.5">Patient, welcoming cuts for women, men, and children.</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Featured Services Preview */}
            <section className="py-16 lg:py-24 bg-[#0B0B0C]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#A1A1AA] mb-2">
                      <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">Specialized Offerings</span>
                      <span aria-hidden="true">·</span>
                      <span>Greensboro Studio</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      Signature Salon Experiences
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <span>View All Services & Pricing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1: Balayage */}
                  <div className="bg-[#121215] border border-[#222226] hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="aspect-[4/3] w-full overflow-hidden relative">
                        <img
                          src="/src/assets/images/service_balayage_color_1793582267134.jpg"
                          alt="Custom Balayage & Highlights"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-[#0B0B0C]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#E5C07B] border border-white/10">
                          $185+
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                          Color & Lightening
                        </span>
                        <h3 className="font-serif text-xl font-bold text-white mt-1">
                          Signature Custom Balayage & Glaze
                        </h3>
                        <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                          Hand-painted dimensional ribbons tailored to your skin tone and lifestyle, fortified with Olaplex for healthy, luminous movement.
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleOpenBooking('balayage-signature')}
                        className="w-full py-2.5 px-4 bg-[#18181D] hover:bg-[#D4AF37] text-white hover:text-[#0B0B0C] border border-[#2B2B33] hover:border-[#D4AF37] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Book Balayage
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Precision Cut */}
                  <div className="bg-[#121215] border border-[#222226] hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="aspect-[4/3] w-full overflow-hidden relative">
                        <img
                          src="/src/assets/images/service_precision_haircut_1793582268221.jpg"
                          alt="Women's Precision Haircut"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-[#0B0B0C]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#E5C07B] border border-white/10">
                          $65
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                          Cuts & Styling
                        </span>
                        <h3 className="font-serif text-xl font-bold text-white mt-1">
                          Precision Cut & Signature Blowout
                        </h3>
                        <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                          In-depth consultation, clarifying scalp bath, customized architectural texturizing, and luxury round-brush heat styling.
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleOpenBooking('haircut-women')}
                        className="w-full py-2.5 px-4 bg-[#18181D] hover:bg-[#D4AF37] text-white hover:text-[#0B0B0C] border border-[#2B2B33] hover:border-[#D4AF37] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Book Precision Cut
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Studio Ambiance & Treatments */}
                  <div className="bg-[#121215] border border-[#222226] hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="aspect-[4/3] w-full overflow-hidden relative">
                        <img
                          src="/src/assets/images/salon_interior_ambiance_1793582269026.jpg"
                          alt="Private Salon Experience"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-[#0B0B0C]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#E5C07B] border border-white/10">
                          $55
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                          Hair Treatments
                        </span>
                        <h3 className="font-serif text-xl font-bold text-white mt-1">
                          Olaplex Stand-Alone Bond Therapy
                        </h3>
                        <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                          Patented restorative treatment that rebuilds chemically compromised hair, restoring natural elasticity, shine, and soft texture.
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleOpenBooking('treatment-olaplex')}
                        className="w-full py-2.5 px-4 bg-[#18181D] hover:bg-[#D4AF37] text-white hover:text-[#0B0B0C] border border-[#2B2B33] hover:border-[#D4AF37] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Book Olaplex
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Google Reviews Showcase */}
            <ReviewsSection />

            {/* Direct Dual Booking Conversion Section on Home */}
            <BookingSection
              preselectedServiceId={preselectedServiceId}
              onClearPreselection={() => setPreselectedServiceId(undefined)}
            />
          </>
        )}

        {activeTab === 'services' && (
          <ServicesSection
            onSelectServiceToBook={(serviceId) => handleOpenBooking(serviceId)}
          />
        )}

        {activeTab === 'gallery' && (
          <GallerySection onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'about' && (
          <AboutSection onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'booking' && (
          <BookingSection
            preselectedServiceId={preselectedServiceId}
            onClearPreselection={() => setPreselectedServiceId(undefined)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(tab) => setActiveTab(tab)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Action Badge: WhatsApp Quick Connect & My Appointments */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        
        {/* Saved appointments button if user booked */}
        {savedBookingsCount > 0 && (
          <button
            onClick={() => setIsBookingsModalOpen(true)}
            className="flex items-center gap-2 bg-[#18181C] hover:bg-[#222228] text-white text-xs px-3.5 py-2 rounded-full border border-[#D4AF37]/40 shadow-xl transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>My Bookings ({savedBookingsCount})</span>
          </button>
        )}

        {/* Floating WhatsApp pill button (discreet, meets mobile sticky cap) */}
        <a
          href={whatsappGeneralUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-[#0B0B0C] px-4 py-2.5 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 text-xs font-bold tracking-wide"
          aria-label="Direct WhatsApp chat with Julie's Salon"
        >
          <MessageCircle className="w-4 h-4 fill-[#0B0B0C]" />
          <span>WhatsApp Julie</span>
        </a>

      </div>

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        onNewBookingClick={() => {
          setIsBookingsModalOpen(false);
          handleOpenBooking();
        }}
      />

    </div>
  );
}
