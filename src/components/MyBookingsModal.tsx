import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Scissors, MessageCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { AppointmentRecord } from './BookingSection';
import { SALON_INFO } from '../data/salonData';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewBookingClick: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  onNewBookingClick,
}) => {
  const [bookings, setBookings] = useState<AppointmentRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('julies_salon_bookings') || '[]');
        setBookings(stored);
      } catch {
        setBookings([]);
      }
    }
  }, [isOpen]);

  const handleDelete = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    try {
      localStorage.setItem('julies_salon_bookings', JSON.stringify(updated));
    } catch {
      // storage error
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141417] border border-[#27272D] max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#232328] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white">Your Appointments</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A1A1AA] hover:text-white rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Calendar className="w-10 h-10 text-[#3F3F46] mx-auto" />
              <p className="text-sm text-[#A1A1AA]">No booked appointments saved on this browser yet.</p>
              <button
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="mt-2 px-4 py-2 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#E5C07B] transition-colors"
              >
                Book Now
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#1A1A1F] border border-[#2B2B32] rounded-xl p-4 space-y-3 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] font-semibold block mb-0.5">
                      REF #{b.id}
                    </span>
                    <h4 className="font-semibold text-white text-sm">{b.serviceName}</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-semibold">
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[#A1A1AA] bg-[#121215] p-2.5 rounded-lg border border-[#222228]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-white font-medium">{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-white font-medium">{b.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#E5C07B] font-semibold">{b.price}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${SALON_INFO.whatsAppRaw}?text=${encodeURIComponent(
                        `Hi Julie! Inquiring regarding my appointment for ${b.serviceName} on ${b.date} at ${b.time} (Ref: ${b.id}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded border border-[#25D366]/30 flex items-center gap-1 text-[11px]"
                    >
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </a>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-1 text-[#71717A] hover:text-rose-400 transition-colors"
                      title="Remove local record"
                      aria-label="Remove booking"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#232328] bg-[#101013] flex justify-between items-center text-xs">
          <span className="text-[#71717A]">Julie's Salon · 4925 W Market St</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#232328] hover:bg-[#2B2B32] text-white rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
