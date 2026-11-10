import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  ExternalLink,
  Navigation
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about-section" className="py-16 lg:py-24 bg-[#0B0B0C] text-[#EDEDED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stylist Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#232326] shadow-2xl bg-[#141417]">
              <div className="aspect-[3/4] w-full">
                <img
                  src="/src/assets/images/about_stylist_julie_1793582269261.jpg"
                  alt="Julie, Master Hair Stylist & Colorist at Julie's Salon in Greensboro NC"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0F0F12]/90 backdrop-blur-md border border-[#26262B]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Julie</h3>
                    <p className="text-xs text-[#E5C07B]">Master Stylist & Color Specialist</p>
                  </div>
                  <span className="text-xs font-mono text-[#A1A1AA] bg-[#18181D] px-2.5 py-1 rounded border border-[#292930]">
                    15+ Yrs Exp
                  </span>
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="absolute -bottom-4 -right-4 hidden sm:block bg-[#18181B] border border-[#D4AF37]/40 rounded-xl p-3 shadow-xl max-w-[200px]">
              <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span>Client First</span>
              </div>
              <p className="text-[11px] text-[#A1A1AA] mt-1">
                Personalized consultation with every single appointment.
              </p>
            </div>
          </div>

          {/* Right Column: The Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
              <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">Our Story & Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>West Market St, Greensboro</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              A Private Sanctuary for Beautiful, Healthy Hair
            </h2>

            <p className="text-base text-[#A1A1AA] leading-relaxed">
              Founded on the belief that hair care should never feel rushed or transactional, <strong className="text-white">Julie's Salon</strong> offers a dedicated 1-on-1 experience in Greensboro, North Carolina. Julie combines master cutting architecture with modern balayage painting techniques to deliver styles that grow out gracefully.
            </p>

            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Whether you are coming in for a routine refresh, an all-day balayage transformation, or bringing in your child for their very first haircut, Julie provides a welcoming, patient, and pristine environment. Every client is treated like family with honest pricing, thoughtful recommendations, and certified bond-strengthening products.
            </p>

            {/* Key Salon Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#141417] border border-[#232326]">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sanitized & Spotless</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-1.5">
                  Clean styling tools, sanitized stations between clients, and private clean restroom.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141417] border border-[#232326]">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                  <span>Welcoming for Kids</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-1.5">
                  Gentle, patient haircuts for young children, teens, and families throughout Guilford County.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C07B] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Schedule with Julie
              </button>
              
              <a
                href={SALON_INFO.mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#17171A] hover:bg-[#202025] border border-[#27272A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                Get Driving Directions
              </a>
            </div>

          </div>

        </div>

        {/* Location & Studio Information Section */}
        <div className="mt-20 pt-16 border-t border-[#1E1E22]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Hours card */}
            <div className="lg:col-span-6 bg-[#141417] border border-[#232326] rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif text-xl font-bold text-white">Operating Hours</h3>
                </div>
                <span className="text-[11px] text-[#A1A1AA] uppercase tracking-wider bg-[#1C1C22] px-2.5 py-1 rounded border border-[#292930]">
                  By Appointment
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {SALON_INFO.hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-[#1F1F24] last:border-0"
                  >
                    <span className="font-medium text-[#D4D4D8]">{h.day}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-mono">{h.time}</span>
                      <span className="text-[10px] text-[#71717A] hidden sm:inline">
                        ({h.note})
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[11px] text-[#71717A] leading-relaxed border-t border-[#1F1F24] pt-4">
                * Note: Julie's Salon operates primarily by appointment to ensure every client gets undivided time without salon interruptions. Sunday appointments available upon prior inquiry.
              </p>
            </div>

            {/* Address & Contact Details Card */}
            <div className="lg:col-span-6 bg-[#141417] border border-[#232326] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-xl font-bold text-white">Location & Contact</h3>
              </div>

              <div className="space-y-4 text-xs text-[#D4D4D8]">
                <div className="p-4 bg-[#18181D] rounded-xl border border-[#26262D]">
                  <span className="text-[#A1A1AA] uppercase tracking-wider text-[10px] font-semibold block mb-1">
                    Salon Address
                  </span>
                  <p className="text-sm font-semibold text-white">
                    4925 W Market St, Suite 1130
                  </p>
                  <p className="text-xs text-[#A1A1AA]">
                    Greensboro, NC 27407 (Guilford County)
                  </p>
                  <p className="text-[11px] text-[#71717A] mt-2">
                    Convenient parking right outside Suite 1130. Close to Wendover Ave & West Market shopping corridor.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#18181D] rounded-xl border border-[#26262D]">
                    <span className="text-[#A1A1AA] uppercase tracking-wider text-[10px] font-semibold block mb-1">
                      Main Booking Line
                    </span>
                    <a
                      href={`tel:${SALON_INFO.phonePrimaryRaw}`}
                      className="text-sm font-bold text-[#E5C07B] hover:underline"
                    >
                      {SALON_INFO.phonePrimary}
                    </a>
                  </div>

                  <div className="p-3 bg-[#18181D] rounded-xl border border-[#26262D]">
                    <span className="text-[#A1A1AA] uppercase tracking-wider text-[10px] font-semibold block mb-1">
                      Direct Studio Line
                    </span>
                    <a
                      href="tel:13365004955"
                      className="text-sm font-bold text-white hover:underline"
                    >
                      (336) 500-4955
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={SALON_INFO.mapEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#232328] hover:bg-[#2C2C34] text-white text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 border border-[#33333C] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                  Open in Google Maps
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
