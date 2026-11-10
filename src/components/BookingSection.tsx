import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageCircle, 
  CheckCircle, 
  Sparkles, 
  Scissors, 
  CalendarPlus,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { SERVICES, SALON_INFO, Service } from '../data/salonData';

interface BookingSectionProps {
  preselectedServiceId?: string;
  onClearPreselection?: () => void;
}

export interface AppointmentRecord {
  id: string;
  serviceId: string;
  serviceName: string;
  price: string;
  duration: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending';
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedServiceId,
  onClearPreselection,
}) => {
  // Booking mode: 'form' | 'whatsapp'
  const [bookingMode, setBookingMode] = useState<'form' | 'whatsapp'>('form');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || SERVICES[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  
  // Custom WhatsApp message template
  const [whatsappTopic, setWhatsappTopic] = useState<'appointment' | 'balayage' | 'pricing' | 'consultation'>('appointment');

  // Validation & Submission
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRecord | null>(null);

  // When preselected service updates from external click
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      setBookingMode('form');
    }
  }, [preselectedServiceId]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    setSelectedTime('11:00 AM');
  }, []);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  // Available time slots based on salon hours (10:00 AM - 6:00 PM)
  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:30 PM',
    '1:45 PM',
    '3:00 PM',
    '4:15 PM',
    '5:00 PM',
  ];

  // Validate form
  const validate = () => {
    const errors: Record<string, string> = {};
    if (!clientName.trim()) errors.name = 'Please provide your full name';
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please provide a valid 10-digit phone number';
    }
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      errors.email = 'Please provide a valid email address';
    }
    if (!selectedDate) errors.date = 'Please select a date';
    if (!selectedTime) errors.time = 'Please pick a time slot';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const newAppointment: AppointmentRecord = {
      id: `JS-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      duration: selectedService.duration,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      notes: clientNotes.trim(),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    try {
      // Connect with Formspree endpoint https://formspree.io/f/xpppoajd
      await fetch(SALON_INFO.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_name: newAppointment.clientName,
          phone: newAppointment.clientPhone,
          email: newAppointment.clientEmail,
          service: newAppointment.serviceName,
          price: newAppointment.price,
          duration: newAppointment.duration,
          appointment_date: newAppointment.date,
          appointment_time: newAppointment.time,
          notes: newAppointment.notes || 'None provided',
          booking_reference: newAppointment.id,
          salon: "Julie's Salon - Greensboro, NC",
          _subject: `New Salon Booking: ${newAppointment.serviceName} - ${newAppointment.clientName} (${newAppointment.date} @ ${newAppointment.time})`,
        }),
      });
    } catch (error) {
      console.warn('Formspree dispatch notice:', error);
    } finally {
      // Always store locally so client record is immediately saved
      try {
        const existing = JSON.parse(localStorage.getItem('julies_salon_bookings') || '[]');
        localStorage.setItem('julies_salon_bookings', JSON.stringify([newAppointment, ...existing]));
      } catch {
        // Storage fallback
      }

      setIsSubmitting(false);
      setConfirmedBooking(newAppointment);
    }
  };

  // WhatsApp pre-formatted text generators (targeting https://wa.me/19999999999)
  const getWhatsAppMessage = () => {
    if (whatsappTopic === 'balayage') {
      return `Hi Julie! I'm interested in booking a custom Balayage / Highlights appointment at your salon. Can you let me know your soonest availability?`;
    }
    if (whatsappTopic === 'pricing') {
      return `Hi Julie! I'd like to get a quote and consultation for hair coloring/cut. My current hair is [length/color] and I want to achieve [desired style].`;
    }
    if (whatsappTopic === 'consultation') {
      return `Hi Julie! I'd like to schedule a quick 1-on-1 hair consultation at 4925 W Market St. What days this week work best?`;
    }
    return `Hi Julie! I would like to book an appointment for ${selectedService.name} (${selectedService.price}) on ${selectedDate || 'this upcoming week'}. My name is ${clientName || '[Your Name]'}.`;
  };

  const whatsappDirectUrl = `https://wa.me/${SALON_INFO.whatsAppRaw}?text=${encodeURIComponent(
    getWhatsAppMessage()
  )}`;

  // Google Calendar helper link
  const createGoogleCalendarUrl = (booking: AppointmentRecord) => {
    const title = encodeURIComponent(`Julie's Salon - ${booking.serviceName}`);
    const details = encodeURIComponent(
      `Appointment at Julie's Salon for ${booking.clientName}.\nService: ${booking.serviceName} (${booking.price})\nDuration: ${booking.duration}\nBooking Ref: ${booking.id}\nPhone: ${SALON_INFO.phonePrimary}`
    );
    const location = encodeURIComponent(SALON_INFO.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="book-appointment" className="py-16 lg:py-24 bg-[#0E0E10] text-[#EDEDED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs text-[#A1A1AA] mb-3">
            <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">Effortless Scheduling</span>
            <span aria-hidden="true">·</span>
            <span>By Appointment Only</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Book Your Appointment
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base sm:text-lg">
            Choose how you'd like to book: complete our straightforward reservation form below, or message Julie directly on WhatsApp for instant VIP confirmation.
          </p>

          {/* Dual Method Toggle Controls (Buttons with click handlers) */}
          <div className="mt-8 inline-flex p-1.5 bg-[#17171A] border border-[#27272A] rounded-xl">
            <button
              onClick={() => setBookingMode('form')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                bookingMode === 'form'
                  ? 'bg-[#D4AF37] text-[#0B0B0C] shadow-md'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              1. Complete Booking Form
            </button>
            <button
              onClick={() => setBookingMode('whatsapp')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                bookingMode === 'whatsapp'
                  ? 'bg-[#25D366] text-[#0B0B0C] shadow-md'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              2. Connect via WhatsApp
            </button>
          </div>
        </div>

        {/* Confirmation Modal / Screen */}
        {confirmedBooking && (
          <div className="max-w-2xl mx-auto bg-[#141417] border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 text-[#D4AF37] mb-4">
              <CheckCircle className="w-7 h-7 shrink-0 text-[#25D366]" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Appointment Confirmed!</h3>
                <p className="text-xs text-[#A1A1AA]">Reference Code: <span className="text-[#D4AF37] font-mono font-semibold">{confirmedBooking.id}</span></p>
              </div>
            </div>

            <div className="bg-[#1B1B1F] rounded-xl p-5 border border-[#27272A] space-y-3 text-sm">
              <div className="flex justify-between border-b border-[#2B2B30] pb-2">
                <span className="text-[#A1A1AA]">Service:</span>
                <span className="text-white font-medium">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between border-b border-[#2B2B30] pb-2">
                <span className="text-[#A1A1AA]">Date & Time:</span>
                <span className="text-white font-medium">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between border-b border-[#2B2B30] pb-2">
                <span className="text-[#A1A1AA]">Client:</span>
                <span className="text-white font-medium">{confirmedBooking.clientName} ({confirmedBooking.clientPhone})</span>
              </div>
              <div className="flex justify-between border-b border-[#2B2B30] pb-2">
                <span className="text-[#A1A1AA]">Duration & Estimate:</span>
                <span className="text-[#D4AF37] font-semibold">{confirmedBooking.duration} · {confirmedBooking.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A1A1AA]">Salon Address:</span>
                <span className="text-right text-xs text-[#EDEDED]">{SALON_INFO.address}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${SALON_INFO.whatsAppRaw}?text=${encodeURIComponent(
                  `Hi Julie! I just booked online for ${confirmedBooking.serviceName} on ${confirmedBooking.date} at ${confirmedBooking.time}. My ref is ${confirmedBooking.id}. Looking forward to seeing you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Notify Julie via WhatsApp
              </a>

              <a
                href={createGoogleCalendarUrl(confirmedBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#232328] hover:bg-[#2E2E35] text-white text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors border border-[#33333A]"
              >
                <CalendarPlus className="w-4 h-4 text-[#D4AF37]" />
                Add to Google Calendar
              </a>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setConfirmedBooking(null)}
                className="text-xs text-[#A1A1AA] hover:text-white underline cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        )}

        {/* METHOD 1: Complete Booking Form */}
        {bookingMode === 'form' && !confirmedBooking && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-[#141417] border border-[#232326] rounded-2xl p-6 sm:p-8 shadow-xl">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Step 1: Service Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2 flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#D4AF37]" />
                    1. Select Service
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((s) => {
                      const isSelected = s.id === selectedServiceId;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSelectedServiceId(s.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#1C1C22] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                              : 'bg-[#18181C] border-[#27272C] hover:border-[#3E3E46]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-semibold text-white leading-tight">
                              {s.name}
                            </span>
                            <span className="text-xs font-bold text-[#E5C07B] tabular-nums whitespace-nowrap">
                              {s.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-[11px] text-[#A1A1AA]">
                            <span>{s.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#A1A1AA]" />
                              {s.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date & Time Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#232326]">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
                      2. Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#18181C] border border-[#27272C] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      required
                    />
                    {formErrors.date && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {formErrors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      3. Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => {
                        const isTimeSelected = selectedTime === time;
                        return (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all cursor-pointer tabular-nums ${
                              isTimeSelected
                                ? 'bg-[#D4AF37] text-[#0B0B0C] border-[#D4AF37] font-semibold'
                                : 'bg-[#18181C] text-[#D4D4D8] border-[#27272C] hover:border-[#3F3F46]'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    {formErrors.time && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {formErrors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 3: Client Details */}
                <div className="pt-2 border-t border-[#232326] space-y-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    4. Your Contact Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-[#18181C] border border-[#27272C] rounded-lg px-4 py-3 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      />
                      {formErrors.name && (
                        <p className="text-xs text-rose-400 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number (e.g. 336-324-7815) *"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-[#18181C] border border-[#27272C] rounded-lg px-4 py-3 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-rose-400 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address (for instant confirmation receipt) *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-[#18181C] border border-[#27272C] rounded-lg px-4 py-3 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                      required
                    />
                    {formErrors.email && (
                      <p className="text-xs text-rose-400 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Notes for Julie (hair length, previous box dye, inspiration style, or kid haircut specifics)..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full bg-[#18181C] border border-[#27272C] rounded-lg px-4 py-3 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5C07B] disabled:opacity-60 disabled:cursor-not-allowed text-[#0B0B0C] font-semibold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0B0B0C]" />
                        <span>Sending Request to Formspree & Booking Desk...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirm Appointment ({selectedService.price})</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-[#71717A] mt-2 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Sent directly to salon inbox & recorded in your appointments
                  </p>
                </div>

              </form>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Service Summary Card */}
              <div className="bg-[#141417] border border-[#232326] rounded-2xl p-6 shadow-xl">
                <span className="text-xs uppercase tracking-wider text-[#A1A1AA] font-semibold block mb-3">
                  Summary & Pricing
                </span>
                
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  {selectedService.name}
                </h3>
                <p className="text-xs text-[#A1A1AA] mb-4">
                  {selectedService.description}
                </p>

                <div className="space-y-2.5 text-xs text-[#D4D4D8] border-t border-[#232326] pt-4">
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Estimated Price:</span>
                    <span className="text-[#D4AF37] font-semibold text-sm tabular-nums">
                      {selectedService.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Expected Duration:</span>
                    <span className="font-medium">{selectedService.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Lead Stylist:</span>
                    <span className="font-medium text-white">Julie (Master Stylist)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Location:</span>
                    <span className="font-medium text-right text-xs">4925 W Market St, Ste 1130</span>
                  </div>
                </div>

                {/* Quick WhatsApp Switch banner */}
                <div className="mt-6 pt-4 border-t border-[#232326]">
                  <p className="text-xs text-[#A1A1AA] mb-2">
                    Prefer direct chat rather than filling out the form?
                  </p>
                  <button
                    onClick={() => setBookingMode('whatsapp')}
                    className="w-full py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Switch to WhatsApp Booking
                  </button>
                </div>
              </div>

              {/* Salon Assurance Card */}
              <div className="bg-[#141417] border border-[#232326] rounded-2xl p-6 space-y-3 text-xs text-[#A1A1AA]">
                <h4 className="font-serif text-sm font-semibold text-white">
                  Why Book at Julie's Salon?
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Single-chair individualized focus — never rushed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Olaplex bond-building formulations protect hair integrity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Clean, sanitized environment with private restroom.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Warm and family-friendly atmosphere for kids and adults.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* METHOD 2: Direct WhatsApp Booking */}
        {bookingMode === 'whatsapp' && (
          <div className="max-w-3xl mx-auto bg-[#141417] border border-[#232326] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#25D366]">Direct WhatsApp Booking</span>
                <h3 className="font-serif text-2xl font-bold text-white">Chat Directly with Julie</h3>
              </div>
            </div>

            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
              Connect directly with Julie on WhatsApp to discuss your hair ideas, check same-week openings, ask for advice on balayage tones, or book right through text.
            </p>

            {/* Quick Topic Buttons */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-3">
                Select your conversation intent:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'appointment', label: 'Appointment Request' },
                  { id: 'balayage', label: 'Balayage Consult' },
                  { id: 'pricing', label: 'Quote & Pricing' },
                  { id: 'consultation', label: '1-on-1 Consult' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWhatsappTopic(item.id as any)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      whatsappTopic === item.id
                        ? 'bg-[#25D366]/20 border-[#25D366] text-white font-semibold'
                        : 'bg-[#18181C] border-[#27272C] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Preview Box */}
            <div className="bg-[#0B0B0C] rounded-xl p-4 border border-[#27272A] mb-6">
              <div className="flex items-center justify-between text-xs text-[#71717A] mb-2">
                <span>Message Preview to Julie ({SALON_INFO.phonePrimary}):</span>
                <span className="text-[#25D366] font-medium">Ready to send</span>
              </div>
              <p className="text-sm text-[#EDEDED] font-mono whitespace-pre-wrap bg-[#141417] p-3 rounded border border-[#1E1E22]">
                "{getWhatsAppMessage()}"
              </p>
            </div>

            {/* Primary WhatsApp Action */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-[#0B0B0C] font-semibold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/15 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Launch WhatsApp Chat
              </a>

              <a
                href={`tel:${SALON_INFO.phonePrimaryRaw}`}
                className="py-4 px-6 bg-[#18181C] hover:bg-[#222228] border border-[#2B2B32] text-white text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                Call Salon ({SALON_INFO.phonePrimary})
              </a>
            </div>

            {/* Helpful Hours Note */}
            <div className="mt-6 pt-4 border-t border-[#232326] flex items-center justify-between text-xs text-[#71717A]">
              <span>Response time: Typically within minutes during 10:00 AM – 6:00 PM</span>
              <button
                onClick={() => setBookingMode('form')}
                className="text-[#D4AF37] hover:underline cursor-pointer"
              >
                Use Web Booking Form instead →
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
