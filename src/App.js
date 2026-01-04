import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ShoppingCart, 
  Info,
  Image as ImageIcon,
  Quote,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Color Palette Constants ---
const COLORS = {
  primaryBg: '#2F4B3C',    // Court Green
  secondaryBg: '#1F332A',  // Deep Forest
  accent: '#C7A36A',       // Sand Clay
  lightSurface: '#F2EBDC', // Match Cream
  textPrimary: '#1E1E1C',  // Charcoal Ink
  border: '#9C8B73',       // Warm Stone
  darkCap: '#233D32',
  paddleGreen: '#1E3A30',
};

// --- Mock Data ---

const SCOOTERS = [
  {
    id: 1,
    name: "The Eagle Cruiser",
    price: "$2,499",
    tagline: "Stability meets style.",
    description: "Designed with a wider base for extra balance on uneven terrain. Features a plush, ergonomic seat and easy-read dashboard.",
    specs: ["15 MPH Max Speed", "36 Holes Battery Life", "Heavy-duty Suspension"],
    image: "https://images.unsplash.com/photo-1593111774240-d529f12db4b6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Birdie Lite",
    price: "$1,899",
    tagline: "Lightweight freedom.",
    description: "Perfect for the casual golfer. Easy to transport, simple to operate, and gentle on the turf.",
    specs: ["12 MPH Max Speed", "18 Holes Battery Life", "Quick-Fold Design"],
    image: "https://images.unsplash.com/photo-1628619623667-42b785d03a10?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Albatross Pro",
    price: "$3,200",
    tagline: "The tour standard.",
    description: "Premium leather finishing, extended range battery, and a built-in cooler. The ultimate luxury ride.",
    specs: ["20 MPH Max Speed", "54 Holes Battery Life", "GPS Integration"],
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Eagle Cruiser II",
    price: "$2,699",
    tagline: "Upgraded comfort.",
    description: "The classic Eagle model with enhanced suspension for those back nines.",
    specs: ["16 MPH Max Speed", "40 Holes Battery Life", "Orthopedic Seat"],
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Birdie Sport",
    price: "$2,100",
    tagline: "Zip around the green.",
    description: "A sportier version of our Lite model with higher torque for hilly courses.",
    specs: ["14 MPH Max Speed", "27 Holes Battery Life", "Hill Assist"],
    image: "https://images.unsplash.com/photo-1592919505780-30395071d480?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Grand Tourer",
    price: "$3,500",
    tagline: "For the long game.",
    description: "Maximum storage and comfort for full-day tournaments.",
    specs: ["18 MPH Max Speed", "60 Holes Battery Life", "Canopy Included"],
    image: "https://images.unsplash.com/photo-1616032070897-404283590059?auto=format&fit=crop&q=80&w=800"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Arthur D.",
    role: "Retired Architect",
    text: "I thought my golfing days were over due to my knees. The Eagle Cruiser gave me my game back. It's incredibly stable and easy to get on and off.",
    rating: 5
  },
  {
    id: 2,
    name: "Martha S.",
    role: "Club Champion '22",
    text: "The battery life is phenomenal. I can do 36 holes without even thinking about charging. Highly recommended for anyone wanting independence on the course.",
    rating: 5
  },
  {
    id: 3,
    name: "James P.",
    role: "Senior League Director",
    text: "Our club bought a fleet of these. They are gentle on the grass and the members absolutely love them. Simple controls, smooth ride.",
    rating: 5
  }
];

const FAQS = [
  {
    question: "How long does the battery last on a single charge?",
    answer: "Our batteries are specifically designed for golf. Depending on the model, you can expect between 18 to 60 holes of play. The Albatross Pro, for example, typically lasts 3 full rounds of 18 holes before needing a recharge."
  },
  {
    question: "Are these scooters safe for the turf?",
    answer: "Absolutely. Our scooters feature high-flotation, low-pressure tires specifically engineered to distribute weight evenly. They actually exert less pressure per square inch on the grass than a traditional 4-wheel golf cart."
  },
  {
    question: "Do I need any special tools to assemble it?",
    answer: "No. Most models arrive 95% assembled. You typically only need to attach the seat and handlebars with the included tool kit. It usually takes less than 15 minutes to get course-ready."
  },
  {
    question: "Can these handle hilly or uneven terrain?",
    answer: "Yes. Models like the Albatross Pro and Birdie Sport feature high-torque motors and advanced suspension systems designed specifically to climb steep fairway hills and stabilize on uneven roughs."
  },
  {
    question: "What kind of maintenance is required?",
    answer: "Very little. Because they are electric, there is no oil to change. We recommend checking tire pressure monthly and keeping the battery charged. We also provide a comprehensive 2-year warranty on major components."
  },
  {
    question: "Is there a weight limit for the riders?",
    answer: "Our standard models are tested for riders up to 300 lbs (136 kg). The Eagle Cruiser is specifically reinforced for maximum stability and support."
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1593111774240-d529f12db4b6?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1628619623667-42b785d03a10?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1592919505780-30395071d480?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1616032070897-404283590059?auto=format&fit=crop&q=80&w=800"
];

// --- Components ---

const Button = ({ children, variant = "primary", onClick, className = "", disabled = false, type = "button" }) => {
  const baseStyle = "px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: { backgroundColor: COLORS.accent, color: COLORS.textPrimary },
    secondary: { backgroundColor: COLORS.secondaryBg, color: COLORS.lightSurface },
    outline: { backgroundColor: 'transparent', border: `2px solid ${COLORS.border}`, color: COLORS.secondaryBg }
  };

  const currentStyle = variantStyles[variant] || variantStyles.primary;

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick} 
      className={`${baseStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
      style={currentStyle}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4 font-serif"
      style={{ color: COLORS.secondaryBg }}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100px" }}
      viewport={{ once: true }}
      className="h-1 mx-auto mb-6"
      style={{ backgroundColor: COLORS.accent }}
    />
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-xl opacity-80 max-w-2xl mx-auto"
        style={{ color: COLORS.textPrimary }}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Pages ---

const HomePage = ({ navigate }) => (
  <div className="w-full">
    {/* Hero Section */}
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: COLORS.primaryBg }}>
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=2000" 
          alt="Golf Course Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${COLORS.secondaryBg}80 0%, ${COLORS.primaryBg} 100%)` }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full font-bold tracking-wider mb-6 border" style={{ backgroundColor: `${COLORS.accent}33`, color: COLORS.accent, borderColor: `${COLORS.accent}4D` }}>
            REDISCOVER THE COURSE
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#F2EBDC] mb-8 font-serif leading-tight">
            Ride in Comfort.<br/>Play with Passion.
          </h1>
          <p className="text-xl md:text-2xl text-[#F2EBDC]/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Premium golf scooters designed for stability, ease of use, and a smoother game.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="primary" onClick={() => navigate('scooters')}>
              View Scooters
            </Button>
            <Button variant="outline" className="border-[#F2EBDC] text-[#F2EBDC] hover:text-[#1F332A]" onClick={() => navigate('quote')}>
              Request Quote
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Values Section */}
    <section className="py-20" style={{ backgroundColor: COLORS.lightSurface }}>
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
        {[
          { icon: <Star size={40} />, title: "Premium Comfort", desc: "Ergonomic seating designed for all-day play without fatigue." },
          { icon: <Info size={40} />, title: "Easy Operation", desc: "Intuitive controls. No learning curve. Just get on and go." },
          { icon: <MapPin size={40} />, title: "Turf Friendly", desc: "Lightweight engineering that protects the fairways you love." }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="p-8 rounded-2xl bg-white shadow-xl border-t-4"
            style={{ borderTopColor: COLORS.accent }}
          >
            <div className="mb-6 flex justify-center" style={{ color: COLORS.accent }}>{item.icon}</div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.secondaryBg }}>{item.title}</h3>
            <p className="text-lg" style={{ color: COLORS.textPrimary }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

const ScootersPage = () => (
  <section className="py-20 min-h-screen" style={{ backgroundColor: COLORS.lightSurface }}>
    <SectionHeading 
      title="Our Fleet" 
      subtitle="Choose the perfect companion for your next round. Each model is built with reliability and comfort as the priority."
    />
    
    <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {SCOOTERS.map((scooter, idx) => (
        <motion.div 
          key={scooter.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
        >
          <div className="relative h-64 overflow-hidden group">
            <img 
              src={scooter.image} 
              alt={scooter.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 text-[#F2EBDC] px-4 py-1 rounded-full font-bold shadow-md" style={{ backgroundColor: COLORS.secondaryBg }}>
              {scooter.price}
            </div>
          </div>
          
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold mb-2 font-serif" style={{ color: COLORS.secondaryBg }}>{scooter.name}</h3>
            <p className="font-medium mb-4 italic" style={{ color: COLORS.accent }}>{scooter.tagline}</p>
            <p className="mb-6 leading-relaxed" style={{ color: COLORS.textPrimary }}>{scooter.description}</p>
            
            <div className="mt-auto">
              <div className="space-y-2 mb-8">
                {scooter.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#7A6F60]">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.accent }}></div>
                    {spec}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">View Details</Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 min-h-screen" style={{ backgroundColor: COLORS.lightSurface }}>
      <SectionHeading title="On The Course" subtitle="See our scooters in their natural habitat." />
      
      <div className="container mx-auto px-6 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {GALLERY_IMAGES.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg cursor-pointer group relative"
            onClick={() => setSelectedImage(img)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
            <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white p-2">
              <X size={40} />
            </button>
            <img 
              src={selectedImage} 
              alt="Full view" 
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FAQPage = ({ navigate }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 min-h-screen" style={{ backgroundColor: COLORS.lightSurface }}>
      <SectionHeading 
        title="Common Questions" 
        subtitle="Everything you need to know about our golf scooters, maintenance, and course compatibility." 
      />
      
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden border border-[#E0D8C8] bg-white shadow-sm"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-[#F9F7F2] transition-colors"
              >
                <div className="flex items-center gap-4">
                   <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${COLORS.accent}22`, color: COLORS.accent }}
                   >
                     <HelpCircle size={20} />
                   </div>
                   <span className="text-lg font-bold" style={{ color: COLORS.secondaryBg }}>{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: COLORS.accent }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 ml-14">
                      <p className="text-lg leading-relaxed border-l-2 pl-6" style={{ color: COLORS.textPrimary, borderColor: COLORS.accent }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl text-center text-[#F2EBDC]"
          style={{ backgroundColor: COLORS.secondaryBg }}
        >
          <h3 className="text-2xl font-serif mb-4">Still have questions?</h3>
          <p className="mb-8 opacity-80">Our technical support team is available 7 days a week to help with repairs, maintenance, or parts.</p>
          <div className="flex justify-center gap-4">
             <Button variant="primary" className="px-10" onClick={() => navigate('support')}>Contact Support</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SupportPage = () => {
  const [formState, setFormState] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('success'), 1500);
  };

  if (formState === 'success') {
    return (
      <section className="py-20 min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: COLORS.lightSurface }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border-t-8"
          style={{ borderTopColor: COLORS.accent }}
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${COLORS.accent}22`, color: COLORS.accent }}>
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: COLORS.secondaryBg }}>Ticket Created</h2>
          <p className="text-lg opacity-80 mb-8">Thank you! Your support request has been received. A technician will contact you via email within 4-6 business hours.</p>
          <Button variant="secondary" className="w-full" onClick={() => setFormState('idle')}>Send Another Message</Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 min-h-screen" style={{ backgroundColor: COLORS.lightSurface }}>
      <SectionHeading 
        title="Technical Support" 
        subtitle="Encountered an issue? Our experts are here to keep you on the course. Fill out the form below for technical assistance." 
      />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-[#E0D8C8]">
          {/* Left Info Column */}
          <div className="lg:w-1/3 p-10 text-[#F2EBDC]" style={{ backgroundColor: COLORS.secondaryBg }}>
            <h3 className="text-2xl font-serif font-bold mb-8">How we help</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 p-3 rounded-xl" style={{ backgroundColor: `${COLORS.accent}33`, color: COLORS.accent }}>
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Direct Chat</h4>
                  <p className="text-sm opacity-70">Expert-led troubleshooting for electronics and motors.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 p-3 rounded-xl" style={{ backgroundColor: `${COLORS.accent}33`, color: COLORS.accent }}>
                  <ShoppingCart size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Parts & Tires</h4>
                  <p className="text-sm opacity-70">Order replacement components or upgraded high-flotation tires.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 p-3 rounded-xl" style={{ backgroundColor: `${COLORS.accent}33`, color: COLORS.accent }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Fast Response</h4>
                  <p className="text-sm opacity-70">Most support tickets are resolved within 24 hours.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-[#F2EBDC]1A">
               <p className="text-sm opacity-60 italic leading-relaxed">
                 "Our goal is to ensure your downtime is zero. Every GolfGlide owner is part of our family."
               </p>
               <p className="mt-2 font-bold text-sm" style={{ color: COLORS.accent }}>— Support Management</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:w-2/3 p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#7A6F60] mb-2">Model Serial Number</label>
                  <input required placeholder="GG-XXXX-XXXX" type="text" className="w-full p-4 rounded-xl bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none transition-all focus:ring-2 focus:ring-[#C7A36A]33" />
                  <p className="text-[10px] mt-1 opacity-50 uppercase tracking-tighter italic">Found on the base of the steering column</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#7A6F60] mb-2">Issue Category</label>
                  <select className="w-full p-4 rounded-xl bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none transition-colors">
                    <option>Battery/Charging</option>
                    <option>Motor/Acceleration</option>
                    <option>Tires/Suspension</option>
                    <option>Accessories/Parts</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#7A6F60] mb-2">Contact Name</label>
                  <input required type="text" className="w-full p-4 rounded-xl bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#7A6F60] mb-2">Email Address</label>
                  <input required type="email" className="w-full p-4 rounded-xl bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#7A6F60] mb-2">Describe the Problem</label>
                <textarea required rows="4" placeholder="Please provide as much detail as possible..." className="w-full p-4 rounded-xl bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none"></textarea>
              </div>

              <Button type="submit" disabled={formState === 'sending'} className="w-full">
                {formState === 'sending' ? 'Submitting...' : (
                  <>
                    <Send size={18} /> Submit Support Request
                  </>
                )}
              </Button>
              <p className="text-center text-xs opacity-40">By submitting, you agree to our privacy policy and technical service terms.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsPage = () => (
  <section className="py-20 min-h-screen relative overflow-hidden" style={{ backgroundColor: COLORS.primaryBg }}>
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2EBDC] opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C7A36A] opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#F2EBDC] mb-4 font-serif">Community Stories</h2>
        <div className="h-1 w-24 mx-auto" style={{ backgroundColor: COLORS.accent }}></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="p-10 rounded-2xl shadow-xl border"
            style={{ backgroundColor: COLORS.secondaryBg, borderColor: `${COLORS.border}4D` }}
          >
            <div className="mb-6" style={{ color: COLORS.accent }}>
              <Quote size={40} fill={COLORS.accent} />
            </div>
            <p className="text-[#F2EBDC] text-xl leading-relaxed italic mb-8">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl" style={{ backgroundColor: COLORS.accent, color: COLORS.secondaryBg }}>
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-[#F2EBDC] font-bold text-lg">{t.name}</h4>
                <p className="text-sm" style={{ color: COLORS.accent }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const QuotePage = () => (
  <section className="py-20 min-h-screen flex items-center" style={{ backgroundColor: COLORS.lightSurface }}>
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 p-10 flex flex-col justify-between text-[#F2EBDC]" style={{ backgroundColor: COLORS.secondaryBg }}>
          <div>
            <h3 className="text-3xl font-bold font-serif mb-6">Let's Get You Rolling</h3>
            <p className="opacity-80 mb-8 text-lg">Interested in a specific model? Fill out the form and our team will provide a personalized quote including shipping.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone size={20} style={{ color: COLORS.accent }} />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} style={{ color: COLORS.accent }} />
              <span>sales@golfscooters.com</span>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-10">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#7A6F60] mb-2">First Name</label>
                <input type="text" className="w-full p-4 rounded-lg bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#7A6F60] mb-2">Last Name</label>
                <input type="text" className="w-full p-4 rounded-lg bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#7A6F60] mb-2">Email Address</label>
              <input type="email" className="w-full p-4 rounded-lg bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#7A6F60] mb-2">Interested Model</label>
              <select className="w-full p-4 rounded-lg bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none transition-colors text-[#1E1E1C]">
                <option>The Eagle Cruiser</option>
                <option>Birdie Lite</option>
                <option>Albatross Pro</option>
                <option>Undecided / Need Advice</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#7A6F60] mb-2">Message (Optional)</label>
              <textarea rows="4" className="w-full p-4 rounded-lg bg-[#F9F7F2] border border-[#E0D8C8] focus:border-[#C7A36A] outline-none transition-colors"></textarea>
            </div>
            <Button className="w-full">Request Quote</Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Inject global styles
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap');
      body { font-family: 'Lato', sans-serif; margin: 0; padding: 0; }
      h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #F2EBDC; }
      ::-webkit-scrollbar-thumb { background: #C7A36A; border-radius: 4px; }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'scooters', label: 'Fleet' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'faq', label: 'Q&A' },
    { id: 'support', label: 'Support' },
    { id: 'testimonials', label: 'Stories' },
    { id: 'quote', label: 'Get Quote' },
  ];

  const handleNav = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#C7A36A] selection:text-white" style={{ backgroundColor: COLORS.lightSurface, color: COLORS.textPrimary }}>
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg py-3' : 'lg:bg-transparent py-6'
        }`}
        style={{ backgroundColor: scrolled ? COLORS.secondaryBg : COLORS.secondaryBg }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNav('home')}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
              <span className="font-bold text-xl" style={{ color: COLORS.secondaryBg }}>G</span>
            </div>
            <span className="text-2xl font-bold font-serif text-[#F2EBDC] tracking-wide">
              Golf<span style={{ color: COLORS.accent }}>Glide</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-lg font-medium transition-colors duration-300 ${
                  activeTab === item.id 
                    ? 'border-b-2' 
                    : 'text-[#F2EBDC] hover:text-[#C7A36A]'
                }`}
                style={{ 
                  color: activeTab === item.id ? COLORS.accent : '#F2EBDC',
                  borderBottomColor: activeTab === item.id ? COLORS.accent : 'transparent'
                }}
              >
                {item.label}
              </button>
            ))}
            <button 
               onClick={() => handleNav('quote')}
               className="px-6 py-2 rounded-full font-bold transition-colors hover:bg-opacity-90 active:scale-95 transform"
               style={{ backgroundColor: COLORS.accent, color: '#1E1E1C' }}
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#F2EBDC]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t overflow-hidden"
              style={{ backgroundColor: COLORS.secondaryBg, borderTopColor: `${COLORS.accent}33` }}
            >
              <div className="flex flex-col p-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className="text-xl font-medium text-left py-2"
                    style={{ color: activeTab === item.id ? COLORS.accent : '#F2EBDC' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <HomePage navigate={handleNav} />}
            {activeTab === 'scooters' && <ScootersPage />}
            {activeTab === 'gallery' && <GalleryPage />}
            {activeTab === 'faq' && <FAQPage navigate={handleNav} />}
            {activeTab === 'support' && <SupportPage />}
            {activeTab === 'testimonials' && <TestimonialsPage />}
            {activeTab === 'quote' && <QuotePage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t" style={{ backgroundColor: COLORS.secondaryBg, borderTopColor: `${COLORS.accent}4D`, color: '#F2EBDC' }}>
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold font-serif mb-6" style={{ color: COLORS.accent }}>GolfGlide</h3>
            <p className="opacity-80 text-lg leading-relaxed max-w-md">
              Bringing mobility, independence, and style back to your game. We believe golf is a sport for life, and we are here to help you play it comfortably.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6" style={{ color: COLORS.accent }}>Quick Links</h4>
            <ul className="space-y-3 opacity-80">
              <li onClick={() => handleNav('scooters')} className="cursor-pointer hover:text-[#C7A36A]">Our Models</li>
              <li onClick={() => handleNav('support')} className="cursor-pointer hover:text-[#C7A36A]">Technical Support</li>
              <li onClick={() => handleNav('faq')} className="cursor-pointer hover:text-[#C7A36A]">Questions & Answers</li>
              <li onClick={() => handleNav('testimonials')} className="cursor-pointer hover:text-[#C7A36A]">Customer Stories</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6" style={{ color: COLORS.accent }}>Contact Us</h4>
            <ul className="space-y-3 opacity-80">
              <li className="flex items-center gap-2"><Phone size={18} /> (555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail size={18} /> info@golfglide.com</li>
              <li className="flex items-center gap-2"><MapPin size={18} /> Scottsdale, AZ</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t text-center opacity-60 text-sm" style={{ borderTopColor: `${COLORS.border}33` }}>
          © {new Date().getFullYear()} GolfGlide Scooters. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;