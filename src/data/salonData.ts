export interface Service {
  id: string;
  name: string;
  category: 'cuts' | 'color' | 'treatments' | 'kids';
  categoryLabel: string;
  price: string;
  priceNum: number;
  duration: string;
  description: string;
  popular?: boolean;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  source: 'Google' | 'Instagram' | 'Yelp';
  serviceMentioned?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'balayage' | 'cuts' | 'color' | 'treatments';
  categoryLabel: string;
  image: string;
  description: string;
  formula?: string;
  beforeImage?: string;
}

export const SALON_INFO = {
  name: "Julie's Salon",
  tagline: "Professional Haircuts & Custom Hair Coloring",
  address: "4925 W Market St Ste 1130, Greensboro, NC 27407",
  street: "4925 W Market St Ste 1130",
  cityStateZip: "Greensboro, NC 27407",
  phonePrimary: "(336) 324-7815",
  phonePrimaryRaw: "13363247815",
  whatsAppRaw: "19999999999",
  whatsAppBaseUrl: "https://wa.me/19999999999",
  formspreeEndpoint: "https://formspree.io/f/xpppoajd",
  phoneAlternate: "(336) 500-4955",
  phoneYelp: "(336) 235-2618",
  instagramHandle: "@julies_salon08",
  instagramUrl: "https://www.instagram.com/julies_salon08/",
  facebookUrl: "https://www.facebook.com/julies_salon08/",
  googleRating: 4.8,
  googleReviewCount: 281,
  mapEmbedUrl: "https://www.google.com/maps/search/?api=1&query=4925+W+Market+St+Ste+1130,+Greensboro,+NC+27407",
  specialties: [
    "Custom Balayage & Highlights",
    "Precision Haircuts for Women, Men & Kids",
    "Olaplex Restorative Treatments",
    "Multi-Dimensional Tone Correction",
  ],
  amenities: [
    "Good for Kids",
    "Private Clean Restroom",
    "Sanitized Stations & Single-Client Focus",
    "Complimentary Beverages & Wi-Fi",
    "By Appointment & Walk-In Inquiries"
  ],
  hours: [
    { day: "Monday", time: "10:00 AM – 6:00 PM", note: "By Appointment" },
    { day: "Tuesday", time: "10:00 AM – 6:00 PM", note: "Regular Hours" },
    { day: "Wednesday", time: "10:00 AM – 6:00 PM", note: "Regular Hours" },
    { day: "Thursday", time: "10:00 AM – 6:00 PM", note: "Regular Hours" },
    { day: "Friday", time: "10:00 AM – 6:00 PM", note: "Regular Hours" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM", note: "Popular Day" },
    { day: "Sunday", time: "1:00 PM – 6:00 PM", note: "By Appointment Only" },
  ]
};

export const SERVICES: Service[] = [
  {
    id: "balayage-signature",
    name: "Signature Custom Balayage & Glaze",
    category: "color",
    categoryLabel: "Color & Lightening",
    price: "$185+",
    priceNum: 185,
    duration: "2 hr 30 min",
    description: "Hand-painted bespoke gradient lightener tailored to your skin tone and natural fall, finished with gloss toning and nourishing Olaplex bond seal.",
    popular: true,
    image: "/src/assets/images/service_balayage_color_1793582267134.jpg"
  },
  {
    id: "haircut-women",
    name: "Women's Precision Cut & Signature Blowout",
    category: "cuts",
    categoryLabel: "Cuts & Styling",
    price: "$65",
    priceNum: 65,
    duration: "1 hr",
    description: "Detailed consultation, clarifying scalp cleanse, customized structural cut, and salon-finish blowout with heat styling.",
    popular: true,
    image: "/src/assets/images/service_precision_haircut_1793582268221.jpg"
  },
  {
    id: "highlights-full",
    name: "Full Dimensional Foil Highlights",
    category: "color",
    categoryLabel: "Color & Lightening",
    price: "$160+",
    priceNum: 160,
    duration: "2 hr 15 min",
    description: "Full head precision micro-foiling for maximum brightness, seamless blend, contrast depth, and custom gloss toner.",
    popular: false,
    image: "/src/assets/images/service_balayage_color_1793582267134.jpg"
  },
  {
    id: "highlights-partial",
    name: "Partial Dimensional Highlights",
    category: "color",
    categoryLabel: "Color & Lightening",
    price: "$120+",
    priceNum: 120,
    duration: "1 hr 45 min",
    description: "Crown, hairline, and parting placement to refresh brightness between full sessions, including nourishing tone wash.",
    popular: false,
  },
  {
    id: "color-root-touchup",
    name: "Custom Base / Root Touch-Up",
    category: "color",
    categoryLabel: "Color & Lightening",
    price: "$85+",
    priceNum: 85,
    duration: "1 hr 15 min",
    description: "100% gray coverage or base tone matching with enriched conditioning color formula to keep roots flawless.",
    popular: false,
  },
  {
    id: "color-all-over",
    name: "All-Over Vibrant Custom Color",
    category: "color",
    categoryLabel: "Color & Lightening",
    price: "$115+",
    priceNum: 115,
    duration: "1 hr 30 min",
    description: "Rich monochromatic espresso, warm mahogany, caramel bronze, or vibrant gloss from roots to ends with luminous reflectivity.",
    popular: false,
  },
  {
    id: "treatment-olaplex",
    name: "Olaplex Stand-Alone Bond Repair Therapy",
    category: "treatments",
    categoryLabel: "Hair Treatments",
    price: "$55",
    priceNum: 55,
    duration: "40 min",
    description: "Patented No. 1 & No. 2 bond re-linking treatment that repairs compromised, heat-damaged, or over-processed keratin structures.",
    popular: true,
    image: "/src/assets/images/salon_interior_ambiance_1793582269026.jpg"
  },
  {
    id: "treatment-scalp-deep",
    name: "Deep Moisture Infusion & Scalp Treatment",
    category: "treatments",
    categoryLabel: "Hair Treatments",
    price: "$45",
    priceNum: 45,
    duration: "35 min",
    description: "Intense peptide moisture bath paired with stimulating scalp massage to rebalance dryness and seal cuticles.",
    popular: false,
  },
  {
    id: "haircut-men",
    name: "Men's Classic Textured Cut",
    category: "cuts",
    categoryLabel: "Cuts & Styling",
    price: "$35",
    priceNum: 35,
    duration: "45 min",
    description: "Scissor-over-comb and taper craftsmanship, neckline cleanup, hot rinse, and matte styling paste finish.",
    popular: false,
  },
  {
    id: "haircut-kids",
    name: "Kids' Gentle Haircut (Ages 12 & Under)",
    category: "kids",
    categoryLabel: "Family & Kids",
    price: "$28",
    priceNum: 28,
    duration: "30 min",
    description: "Patient, friendly haircut experience for young boys and girls. Julie's Salon is celebrated across Greensboro as warm and family-friendly.",
    popular: true,
  },
  {
    id: "styling-blowout",
    name: "Boutique Blowout & Iron Wave Styling",
    category: "cuts",
    categoryLabel: "Cuts & Styling",
    price: "$45",
    priceNum: 45,
    duration: "45 min",
    description: "Volumizing round-brush blowout with lasting loose beach waves or ultra-sleek glass hair finish for events.",
    popular: false,
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Michelle K.",
    rating: 5,
    date: "Recent Google Review",
    comment: "It's worth to spend money and I highly recommend her service to my friends. Other than that, price is reasonable, clean place, and treated you nicely.",
    source: "Google",
    serviceMentioned: "Cut & Color Consultation"
  },
  {
    id: "rev-2",
    author: "Samantha T.",
    rating: 5,
    date: "Recent Google Review",
    comment: "My experience with Julie for my very first haircut was amazing. She listened to exactly what I wanted and gave me the best style I've had in Greensboro!",
    source: "Google",
    serviceMentioned: "First Time Haircut & Style"
  },
  {
    id: "rev-3",
    author: "Danielle R.",
    rating: 5,
    date: "Google Review",
    comment: "I went in for balayage highlights and the Olaplex treatment. Julie is truly an artist with hair color. My hair feels softer than before it was lightened. 10/10!",
    source: "Google",
    serviceMentioned: "Balayage & Olaplex Treatment"
  },
  {
    id: "rev-4",
    author: "Karen M.",
    rating: 5,
    date: "Google Review",
    comment: "Brought my 8-year-old daughter and also got my own trim. Julie is so patient and wonderful with children. Spotless salon and great atmosphere on West Market St.",
    source: "Google",
    serviceMentioned: "Kids Haircut & Trim"
  },
  {
    id: "rev-5",
    author: "Ashley P.",
    rating: 5,
    date: "Instagram Client",
    comment: "Obsessed with my dimensional highlights! Julie took her time to make sure my tone wasn't brassy. Found her through #juliessalon and I'll never go anywhere else.",
    source: "Instagram",
    serviceMentioned: "Dimensional Blonde Highlights"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Dimensional Honey Balayage & Wave Finish",
    category: "balayage",
    categoryLabel: "Balayage",
    image: "/src/assets/images/service_balayage_color_1793582267134.jpg",
    description: "Seamless blend from natural dark chocolate root into warm honey and champagne ribbons with Olaplex integrity.",
    formula: "Freehand Clay Lightener + Tone 9V/9GI + Olaplex No. 2"
  },
  {
    id: "gal-2",
    title: "Precision Razor Textured Bob",
    category: "cuts",
    categoryLabel: "Precision Cut",
    image: "/src/assets/images/service_precision_haircut_1793582268221.jpg",
    description: "Sharp architectural jawline cut with internal weight reduction for effortless everyday movement.",
    formula: "Wet Cut Line + Dry Point Texture"
  },
  {
    id: "gal-3",
    title: "Bespoke Modern Salon Studio",
    category: "treatments",
    categoryLabel: "Studio Ambiance",
    image: "/src/assets/images/salon_interior_ambiance_1793582269026.jpg",
    description: "Intimate, clean station featuring warm amber lighting, luxury professional haircare, and comfortable styling stations.",
  },
  {
    id: "gal-4",
    title: "Full Dimensional Blonde Transformation",
    category: "color",
    categoryLabel: "Hair Coloring",
    image: "/src/assets/images/hero_salon_styling_1793582266856.jpg",
    description: "Complete foil highlight transformation brightening natural level 5 hair into shimmering sun-kissed perfection.",
    formula: "Micro-Weave Foils + High Gloss Finish"
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: "ig-1",
    caption: "#cut #balayagehighlights #olaplextreatment #juliessalon💇‍♀️ Beautiful dimensional tones for this wonderful client!",
    timeAgo: "A week ago",
    likes: 48,
    comments: 6
  },
  {
    id: "ig-2",
    caption: "#cut #juliessalon💇‍♀️ Fresh seasonal chop and texture styling. Ready for the weekend in Greensboro!",
    timeAgo: "A week ago",
    likes: 35,
    comments: 4
  },
  {
    id: "ig-3",
    caption: "#balayagehighlights #olaplextreatment #juliessalon💇‍♀️ Healthy hair is always the top priority. Strong bonds, rich shine.",
    timeAgo: "3 weeks ago",
    likes: 62,
    comments: 9
  },
  {
    id: "ig-4",
    caption: "#cut #balaygehighlights #olaplextreatment #juliessalon💇‍♀️ Soft seamless blend that grows out like a dream.",
    timeAgo: "3 weeks ago",
    likes: 54,
    comments: 7
  }
];
