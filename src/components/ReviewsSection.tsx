import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, ExternalLink } from 'lucide-react';
import { REVIEWS, SALON_INFO } from '../data/salonData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#0E0E10] text-[#EDEDED] relative border-t border-b border-[#1E1E22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Rating Scoreboard */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA] mb-3">
              <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">Client Love & Feedback</span>
              <span aria-hidden="true">·</span>
              <span>Verified Google Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Trusted by 280+ Greensboro Clients
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] max-w-xl">
              Honest impressions from women, men, and parents who trust Julie with their hair styling and balayage color.
            </p>
          </div>

          {/* Aggregate Rating Summary Card */}
          <div className="bg-[#141417] border border-[#27272D] rounded-2xl p-5 sm:p-6 flex items-center gap-6 shadow-xl shrink-0">
            <div className="text-center pr-6 border-r border-[#24242A]">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-white tabular-nums block">
                {SALON_INFO.googleRating}
              </span>
              <div className="flex items-center justify-center gap-1 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]"
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#A1A1AA]">
                {SALON_INFO.googleReviewCount} Google Reviews
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#A1A1AA] w-3">5</span>
                <div className="w-24 sm:w-32 bg-[#222227] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#D4AF37] h-full w-[94%]" />
                </div>
                <span className="text-[10px] text-[#71717A] tabular-nums">94%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A1A1AA] w-3">4</span>
                <div className="w-24 sm:w-32 bg-[#222227] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#D4AF37] h-full w-[5%]" />
                </div>
                <span className="text-[10px] text-[#71717A] tabular-nums">5%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A1A1AA] w-3">3</span>
                <div className="w-24 sm:w-32 bg-[#222227] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#D4AF37] h-full w-[1%]" />
                </div>
                <span className="text-[10px] text-[#71717A] tabular-nums">1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121215] border border-[#222226] rounded-2xl p-6 flex flex-col justify-between hover:border-[#383840] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#71717A] uppercase tracking-wider font-mono">
                    {rev.source}
                  </span>
                </div>

                <p className="font-serif text-base text-white/95 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E1E22] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">{rev.author}</h4>
                  <p className="text-[11px] text-[#71717A]">{rev.serviceMentioned}</p>
                </div>
                <span className="text-[10px] text-[#52525B]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Google CTA */}
        <div className="mt-12 text-center">
          <a
            href={SALON_INFO.mapEmbedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-[#E5C07B] transition-colors underline underline-offset-4"
          >
            <span>Read all 281 Google Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
