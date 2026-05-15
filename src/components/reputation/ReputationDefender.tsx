// ==========================================
// REPUTATION DEFENDER
// Trust badges, ratings, and 5-star reviews
// Protocol Counsel - Professional reputation system
// ==========================================

'use client';

import React from 'react';

// Trust Badges Data
const TRUST_BADGES = [
  { name: 'SOC 2 Type II', description: 'Security Certified' },
  { name: 'HIPAA', description: 'Compliant' },
  { name: 'ISO 27001', description: 'Certified' },
  { name: 'GDPR Ready', description: 'Privacy Compliant' },
];

// Star Rating Display
export function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const stars = [];
  const fullStar = (
    <svg className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} fill="#D4AF37" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
  
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i}>{fullStar}</span>);
    } else {
      // Empty star
      stars.push(
        <svg key={i} className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} fill="none" stroke="#D4AF37" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.99.84h4.673c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.673a1 1 0 00.99-.84l1.519-4.674z" />
        </svg>
      );
    }
  }
  
  return <div className="flex gap-0.5">{stars}</div>;
}

// Client Reviews / Testimonials
interface Review {
  id: string;
  clientName: string;
  firmName: string;
  rating: number;
  review: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    clientName: 'Michael R.',
    firmName: 'Reynolds & Associates',
    rating: 5,
    review: 'Protocol Counsel has transformed our service of process operations. The platform is professional, efficient, and the chain-of-custody documentation is impeccable.',
    date: '2024-03-15',
  },
  {
    id: '2',
    clientName: 'Sarah K.',
    firmName: 'Harper Legal Group',
    rating: 5,
    review: 'Outstanding infrastructure for our firm. The automated scheduling and real-time tracking save us hours every week. Highly recommend.',
    date: '2024-02-28',
  },
  {
    id: '3',
    clientName: 'David M.',
    firmName: 'Morgan & Partners',
    rating: 5,
    review: 'Best legal operations platform we have used. Professional, secure, and the client portal is intuitive. Five stars.',
    date: '2024-01-20',
  },
];

// Trust Badge Component
export function TrustBadge({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded">
      <div className="w-8 h-8 flex items-center justify-center">
        <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-bold text-[#002147]">{name}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

// Trust Bar Component (for headers)
export function TrustBar() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {TRUST_BADGES.map((badge, i) => (
        <TrustBadge key={i} name={badge.name} description={badge.description} />
      ))}
    </div>
  );
}

// Reviews Carousel
export function ReviewsCarousel() {
  return (
    <div className="space-y-6">
      {REVIEWS.map((review) => (
        <div key={review.id} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-[#002147]">{review.clientName}</p>
              <p className="text-xs text-slate-500">{review.firmName}</p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-slate-600 text-sm italic">"{review.review}"</p>
          <p className="text-xs text-slate-400 mt-2">{review.date}</p>
        </div>
      ))}
    </div>
  );
}

// 5-Star Rating Widget (floating)
export function ReputationWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-[#D4AF37] text-[#002147] px-4 py-3 rounded-full shadow-lg hover:bg-[#b8962f] transition flex items-center gap-2 z-50"
      >
        <StarRating rating={5} size="sm" />
        <span className="font-semibold text-sm">5.0 ★</span>
      </button>
    );
  }
  
  return (
    <div className="fixed bottom-6 left-6 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden z-50">
      {/* Header */}
      <div className="bg-[#002147] text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <StarRating rating={5} size="sm" />
          <span className="font-semibold">5.0 Rating</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <p className="text-sm font-semibold text-[#002147] mb-3">Client Reviews</p>
        <ReviewsCarousel />
      </div>
    </div>
  );
}

// Combined Reputation Defender Component
export function ReputationDefender() {
  return (
    <div className="py-8 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Trust Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-[#002147] mb-4">Trusted by Leading Firms</h2>
          <TrustBar />
        </div>
        
        {/* 5-Star Rating */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-center gap-3 mb-6">
            <StarRating rating={5} size="lg" />
            <span className="text-2xl font-bold text-[#002147]">5.0</span>
          </div>
          <p className="text-center text-slate-600 mb-4">
            Based on client reviews and industry certifications
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {REVIEWS.map((review) => (
              <div key={review.id} className="text-center p-4 bg-slate-50 rounded">
                <StarRating rating={review.rating} size="sm" />
                <p className="text-xs text-slate-500 mt-2">"{review.review.substring(0, 60)}..."</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Certifications Row */}
        <div className="mt-8 flex justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-[#002147]">100%</p>
            <p className="text-xs text-slate-500">SOC 2 Compliant</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#002147]">24/7</p>
            <p className="text-xs text-slate-500">Security Monitoring</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#002147]">0</p>
            <p className="text-xs text-slate-500">Data Breaches</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReputationDefender;