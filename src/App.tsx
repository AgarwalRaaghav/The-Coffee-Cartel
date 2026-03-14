/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Search, Coffee, Facebook, Instagram, ArrowRight, Star, ChevronDown, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[100] bg-coffee-dark flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="flex items-center border border-cream/20 px-6 py-2 mb-8">
        <div className="leading-none flex flex-col items-start">
          <span className="font-display text-2xl tracking-tighter text-cream uppercase">THE COFFEE CARTEL</span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-cream/50">EST. 2018</span>
        </div>
      </div>
      <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-primary"
        />
      </div>
    </motion.div>
  </motion.div>
);

const Header = ({ currentView, setView }: { currentView: string, setView: (view: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setView(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-bg-header py-4 px-6 md:px-12 flex items-center justify-between border-b border-black/5 sticky top-0 z-50">
      <div className="flex items-center md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-coffee-dark p-2">
          {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-widest uppercase text-coffee-dark">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => handleNavClick(item.id)} 
            className={`hover:text-primary transition-colors ${currentView === item.id ? 'text-primary border-b border-primary' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="flex-grow max-w-sm mx-8 hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search coffee, roasts, gear" 
            className="w-full bg-white border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div className="flex items-center border border-black/20 px-3 py-1 md:px-4">
        <div className="flex flex-col items-center mr-2 md:mr-3">
          <Coffee className="w-4 h-4 md:w-5 md:h-5 text-coffee-dark" />
        </div>
        <div className="leading-none flex flex-col items-start border-l border-black/20 pl-2 md:pl-3">
          <span className="font-display text-[10px] md:text-sm tracking-tighter text-coffee-dark">THE COFFEE CARTEL</span>
          <span className="text-[6px] md:text-[8px] font-bold tracking-[0.2em] text-coffee-dark/50 uppercase">Brooklyn, NY</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-0 top-[73px] z-40 bg-bg-header md:hidden flex flex-col p-8 space-y-6"
          >
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)} 
                className={`text-2xl font-display uppercase tracking-tight text-left ${currentView === item.id ? 'text-primary' : 'text-coffee-dark'}`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-8 border-t border-black/10">
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-white border-none rounded-full py-3 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="flex gap-6">
                <Facebook className="w-6 h-6 text-coffee-dark/40" />
                <Instagram className="w-6 h-6 text-coffee-dark/40" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => (
  <section className="relative min-h-[calc(100vh-80px)] hero-gradient overflow-hidden flex flex-col md:flex-row items-center">
    <div className="w-full md:w-1/2 px-6 md:pl-24 py-12 z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-display text-[5rem] sm:text-[8rem] md:text-[12rem] leading-[0.85] text-[#D8C7B1] tracking-tight mb-8"
      >
        BREWED<br />WITH<br />CARE
      </motion.h1>
      <p className="text-[#D8C7B1]/80 max-w-sm text-sm leading-relaxed mb-10 font-light">
        Savor the layered notes of every roast. From bean to brew, crafted with care in every cup.
      </p>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
        <div className="flex gap-4">
          <button 
            className="bg-primary hover:bg-[#724D31] text-white px-8 py-3 text-[10px] font-bold tracking-widest uppercase transition-all"
          >
            Order Online
          </button>
          <button className="border border-[#D8C7B1] text-[#D8C7B1] hover:bg-[#D8C7B1] hover:text-coffee-dark px-8 py-3 text-[10px] font-bold tracking-widest uppercase transition-all">
            Reserve a Table
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[#D8C7B1]/60">
        <div className="flex gap-3">
          <Facebook className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
          <Instagram className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
        </div>
        <div className="w-px h-4 bg-[#D8C7B1]/20"></div>
        <span className="text-[10px] font-medium tracking-wider uppercase">Trusted by 10k+ daily brewers</span>
      </div>
    </div>

    <div className="w-full md:w-1/2 relative flex justify-center items-center py-12">
      <div className="absolute right-8 top-12 flex flex-col items-center">
        <Coffee className="w-5 h-5 text-[#D8C7B1]/40 mb-2" />
        <span className="text-vertical text-[8px] tracking-[0.3em] uppercase text-[#D8C7B1]/40 font-semibold h-24">
          Small batch. Big flavor.
        </span>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-[80%] md:max-w-full group"
      >
        <video 
          src="/input_file_0.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] w-full h-full object-cover"
        />
      </motion.div>
    </div>
  </section>
);

const ProductCard = ({ title, price, description, image }: { title: string, price: string, description: string, image: string }) => (
  <div className="group cursor-pointer">
    <div className="aspect-[4/5] bg-coffee-dark overflow-hidden mb-6">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-display text-3xl text-coffee-dark uppercase">{title}</h3>
      <span className="text-primary font-bold">{price}</span>
    </div>
    <p className="text-coffee-dark/70 text-sm mb-6">{description}</p>
  </div>
);

const CuratedRoasts = () => (
  <section className="bg-cream py-24 px-6 md:px-24">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-coffee-dark leading-none uppercase">Curated<br />Roasts</h2>
          <p className="text-coffee-dark/60 mt-4 max-w-md">Small-batch roasted in our Brooklyn studio. Selected for complexity, depth, and character.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ProductCard 
          title="Midnight Blend" 
          price="$22.00" 
          description="Dark chocolate, molasses, and toasted walnut. Our boldest roast for early risers."
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBRAySK3rLeNeQsoALFKknVIjdpu0gVxGNyoJPFCMNAXSE1hY6OKMpiRLQfWx_bg0kvpv_ydOM0KUeQ2OtLbz-MVSvVxugpqMt-pnkKSCgddr5g_ehQkLdFRkAF5stHfaaN7b2UyewTXPQ_iIOhS7uVUscbHk6Ac9vho3gXjWA-gVcCGfMS1BNwtzRH7N0gL1qG-kFqJ7rcIuMk9DQ0WcP3dEn-MRHvCJP3DltbNiJyKeRHyu53gzYdNhMKbZy2KoASadg_livsMGN7"
        />
        <ProductCard 
          title="Golden Hour" 
          price="$24.00" 
          description="Citrus zest, honey, and floral jasmine notes. Bright, complex, and refreshing."
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuA6bhR-pfc7YHg5HfYVtW3_sbnQ8una25N8zZg4ws70RBSwYHDqMwxrxuTFjye8qUci3g10-SS5yO985s84nYzxevLekPQtQg1ZtaOdGcbfw2cu8EvWF9LS_LYozC-JTPPF8VMH_M2x5mqbP0bn4BMK2RD7nPfnfLUOTFGUWC19uM6fKlramaYNxdePNtj2u2Z-Kyac3YKa3ymlmWMqdUUBhkBr-3ts-8xrt2RU37MZY3nHPyAvX-Qb80XhdrhwllK5LVFeik69klgt"
        />
        <ProductCard 
          title="Heritage" 
          price="$21.00" 
          description="Caramelized sugar and red apple. A perfectly balanced everyday companion."
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBUMNKnfq2gDZK5F7oiLC7WbR23n5NFmkQzegAyOZY5mDXtlbgLnvrc6yHBUugkEVd8YMuK4tCcGmKMxZGCIC7tzM3p81ImP4gumb-ihrg7jU-VPNqVWop9kmAxBVpADEFGf1d7khcB_LijkGxnqYsey__Cn3iz1F4TOtk9bifsbzHdysiEx6-BHf4nnjWFFScWB8Ntd6O4n49gNdSyGAU4A-RIFtM4P_2TQfewTgrlMo7Wr-4y7Vz7hK3c5edMuzWIyBd8o6qzt8gA"
        />
      </div>
    </div>
  </section>
);

const SourcingSection = () => (
  <section className="bg-coffee-dark text-cream overflow-hidden">
    <div className="flex flex-col md:flex-row min-h-[600px]">
      <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-6">The Sourcing</span>
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl leading-none uppercase mb-8">Direct<br />From Origin</h2>
        <p className="text-cream/60 leading-relaxed mb-8 max-w-md">We partner directly with farmers in Ethiopia, Colombia, and Vietnam, ensuring fair trade practices and the highest quality beans before they even touch our roaster.</p>
        <a href="#" className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase group">
          Learn about our farmers 
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </a>
      </div>
      <div className="w-full md:w-1/2 relative min-h-[400px]">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC6qayvdGrtyUU14oBR62cnzrEdF3t3uMIC6SD6LVe2mGb9s8lO4YRFtGJmWWANKgzBX4erZ_Voub3C2CSwm0ysPvS_BSCdrn5yTSoLWbOg5h98v9fKrX7tPHCabG8WVyADbqW8OLcsAl9wpmOApPwET1vzbmKyvRU8WGNuQfpH-dS9df36WuURS_49TCNdZub-2RC1TizdtRbw7-VXxhbUzU9LXp1WFSbkQhNhHFbBwKf6HS24lsAatNTa-4_lToxecBMPht25ppj" 
          alt="Coffee Sourcing" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row-reverse min-h-[600px]">
      <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-6">The Roast</span>
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl leading-none uppercase mb-8">Precision<br />Artistry</h2>
        <p className="text-cream/60 leading-relaxed mb-8 max-w-md">Our master roasters treat every batch as a unique profile, monitoring temperature and timing to within a fraction of a degree to unlock the perfect flavor profile.</p>
        <a href="#" className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase group">
          Our roasting philosophy 
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </a>
      </div>
      <div className="w-full md:w-1/2 relative min-h-[400px]">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjd_MOxerRrPZ5nS1NRkJ2MZygWi_xubmmW3jf07TZP1bPyS9OGTJLq3lCfwGysCmOozIJbLS5Cl8N_ewmVBjw2ixSeJrR3g2-W7HjAkeALx1woSQ74ku4AfuKCIDRGVMwnaAXbAxjEBVoxHe5IhS9Xxm9lpxj7bAeJn-BaQZQWpHcCfshLwIlp5Te9h943J06WiBVDK9eAdOVevB9UaFJ47ihnkaXuvIR2hYNIUlEVTWtTcADlhjWU3u7fqGGHPEaMaPjG1-0RS_8" 
          alt="Coffee Roasting" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </section>
);

const Subscription = () => (
  <section className="relative py-32 px-6 overflow-hidden">
    <div className="absolute inset-0 bg-[#241A16] z-0"></div>
    <div className="max-w-4xl mx-auto relative z-10 text-center">
      <h2 className="font-display text-5xl md:text-7xl text-cream uppercase mb-6 tracking-tight">
        Never Run Out Of<br /><span className="text-secondary">Your Favorite Brew</span>
      </h2>
      <p className="text-cream/60 text-lg mb-12 max-w-2xl mx-auto">Join the Cartel. Custom delivery schedules, exclusive early access to rare roasts, and 15% off every order.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-primary hover:bg-[#724D31] text-white px-12 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-xl">
          Subscribe & Save 15%
        </button>
        <button className="border border-cream/30 text-cream hover:bg-cream hover:text-coffee-dark px-12 py-4 text-xs font-bold tracking-widest uppercase transition-all">
          Manage Subscription
        </button>
      </div>
      <p className="mt-8 text-cream/40 text-[10px] tracking-widest uppercase">No commitment. Skip or cancel anytime.</p>
    </div>
  </section>
);

const TestimonialCard = ({ quote, author }: { quote: string, author: string }) => (
  <div className="bg-white p-8 border border-coffee-dark/5">
    <div className="flex text-primary mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
    </div>
    <p className="text-coffee-dark italic mb-6">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-coffee-dark/10"></div>
      <span className="text-xs font-bold uppercase tracking-widest">{author}</span>
    </div>
  </div>
);

const Testimonials = () => (
  <section className="bg-cream py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase">Community</span>
        <h2 className="font-display text-5xl text-coffee-dark uppercase mt-4">Brewed For You</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TestimonialCard 
          quote="The Midnight Blend is a revelation. I've tried dozens of roasters, but the consistency here is unmatched."
          author="James W."
        />
        <TestimonialCard 
          quote="Fast shipping and incredible packaging. The subscription is so easy to manage. Best coffee in the city."
          author="Sarah L."
        />
        <TestimonialCard 
          quote="The Golden Hour roast changed how I drink my morning coffee. No milk needed, the flavor is so bright."
          author="Marcus K."
        />
      </div>
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (view: string) => void }) => (
  <footer className="bg-coffee-dark text-cream pt-24 pb-12 px-6 md:px-24 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="md:col-span-1">
          <div className="flex items-center border border-cream/20 px-4 py-1 w-fit mb-8">
            <div className="leading-none flex flex-col items-start">
              <span className="font-display text-sm tracking-tighter">THE COFFEE CARTEL</span>
              <span className="text-[8px] font-bold tracking-[0.2em]">EST. 2018</span>
            </div>
          </div>
          <p className="text-cream/50 text-xs leading-relaxed max-w-xs">Crafting exceptional coffee experiences from Brooklyn to your kitchen. Small batch. Big flavor.</p>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold tracking-widest uppercase text-primary mb-6">Explore</h4>
          <ul className="space-y-4 text-xs">
            <li><button onClick={() => setView('menu')} className="hover:text-primary transition-colors">The Menu</button></li>
            <li><button onClick={() => setView('gallery')} className="hover:text-primary transition-colors">Gallery</button></li>
            <li><button onClick={() => setView('about')} className="hover:text-primary transition-colors">Our Story</button></li>
            <li><button onClick={() => setView('contact')} className="hover:text-primary transition-colors">Contact</button></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] tracking-widest uppercase text-cream/30">
          © 2026 The Coffee Cartel. All Rights Reserved.
        </div>
        <div className="flex items-center gap-8">
          <Facebook className="w-4 h-4 text-cream/40 hover:text-white transition-colors cursor-pointer" />
          <Instagram className="w-4 h-4 text-cream/40 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>
    </div>
  </footer>
);

const About = () => (
  <div className="bg-cream min-h-screen pt-24 pb-24 px-6 md:px-24">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Our Story</span>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[10rem] text-coffee-dark leading-none uppercase mb-8 tracking-tighter">The<br />Cartel<br />Way</h1>
          <p className="text-coffee-dark/70 text-xl leading-relaxed mb-8 font-light">
            Founded in 2018, The Coffee Cartel began with a simple mission: to bring the precision of small-batch roasting to every kitchen. What started in a small garage in Brooklyn has grown into a community of passionate brewers.
          </p>
          <p className="text-coffee-dark/70 text-xl leading-relaxed font-light">
            We believe that coffee is more than just a morning ritual—it's an art form. From sourcing the finest beans directly from origin to the final pour, we treat every step with the respect it deserves.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] overflow-hidden shadow-2xl"
        >
          <img 
            src="https://picsum.photos/seed/roastery/1200/1500" 
            alt="Our Roastery" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-24 border-y border-coffee-dark/10">
        {[
          { title: "Sourcing", desc: "We travel to the source, building direct relationships with farmers who share our commitment to quality." },
          { title: "Roasting", desc: "Our small-batch process ensures that every bean reaches its full potential, unlocking complex flavor profiles." },
          { title: "Brewing", desc: "We provide the tools and knowledge to help you master the art of the perfect brew at home." }
        ].map((item, i) => (
          <div key={i} className="group">
            <span className="text-primary font-display text-4xl mb-4 block group-hover:scale-110 transition-transform origin-left">0{i + 1}</span>
            <h3 className="font-display text-3xl text-coffee-dark uppercase mb-4 tracking-tight">{item.title}</h3>
            <p className="text-coffee-dark/60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="py-32">
        <div className="text-center mb-20">
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Roasters</span>
          <h2 className="font-display text-6xl text-coffee-dark uppercase">The Hands Behind The Roast</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Elias Thorne", role: "Master Roaster", img: "https://picsum.photos/seed/roaster1/600/800" },
            { name: "Sarah Chen", role: "Green Buyer", img: "https://picsum.photos/seed/roaster2/600/800" },
            { name: "Marcus Vane", role: "Quality Control", img: "https://picsum.photos/seed/roaster3/600/800" },
            { name: "Elena Rossi", role: "Brew Scientist", img: "https://picsum.photos/seed/roaster4/600/800" }
          ].map((person, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <h4 className="font-display text-2xl text-coffee-dark uppercase tracking-tight">{person.name}</h4>
              <p className="text-primary text-[10px] font-bold tracking-widest uppercase">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="bg-coffee-dark min-h-screen pt-24 pb-24 px-6 md:px-24 text-cream">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div>
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[10rem] leading-none uppercase mb-12 tracking-tighter">Join The<br />Cartel</h1>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4">Visit Our Studio</h3>
                <p className="text-cream/70 text-lg leading-relaxed font-light">
                  123 Roaster's Row<br />
                  Brooklyn, NY 11201<br />
                  United States
                </p>
              </div>
              <div>
                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4">Opening Hours</h3>
                <p className="text-cream/70 text-lg leading-relaxed font-light">
                  Mon — Fri: 7am - 6pm<br />
                  Sat — Sun: 8am - 5pm
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4">Say Hello</h3>
                <p className="text-cream/70 text-lg leading-relaxed font-light">
                  hello@coffeecartel.co<br />
                  +1 (555) 123-4567
                </p>
              </div>
              <div>
                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4">Order Online</h3>
                <div className="flex flex-wrap gap-6 mt-2 items-center">
                  <img src="https://www.vectorlogo.zone/logos/zomato/zomato-ar21.svg" alt="Zomato" className="h-6 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer" referrerPolicy="no-referrer" />
                  <img src="https://www.vectorlogo.zone/logos/swiggy/swiggy-ar21.svg" alt="Swiggy" className="h-6 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer" referrerPolicy="no-referrer" />
                  <div className="text-[10px] font-bold tracking-tighter border border-white/20 px-2 py-1 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">EAZYDINER</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4">Follow Us</h3>
                <div className="flex gap-6 mt-2">
                  <Facebook className="w-5 h-5 text-cream/40 hover:text-white transition-colors cursor-pointer" />
                  <Instagram className="w-5 h-5 text-cream/40 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden shadow-2xl grayscale opacity-60 hover:opacity-100 transition-opacity duration-700">
          <img 
            src="https://picsum.photos/seed/cartel-contact/1200/1500" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="mt-32 p-1 bg-white/5">
        <div className="aspect-[21/9] w-full overflow-hidden grayscale opacity-30 hover:opacity-50 transition-opacity duration-700">
          <img 
            src="https://picsum.photos/seed/map-cartel/1920/800" 
            alt="Map Location" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-white/10 pt-24">
        <div>
          <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-8">Wholesale Inquiries</h3>
          <p className="text-cream/60 text-sm leading-relaxed mb-6">
            Looking to serve The Coffee Cartel at your cafe, restaurant, or office? We offer custom roasting profiles and barista training.
          </p>
          <p className="text-cream font-bold text-sm tracking-widest uppercase border-b border-primary w-fit pb-1 cursor-pointer hover:text-primary transition-colors">
            wholesale@coffeecartel.co
          </p>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-primary text-[10px] font-bold tracking-widest uppercase mb-8">Frequently Asked Questions</h3>
          <div className="space-y-8">
            {[
              { q: "Do you ship internationally?", a: "Yes, we ship our roasts worldwide. Shipping rates and times vary by location." },
              { q: "How fresh is the coffee?", a: "We roast in small batches every Tuesday and Thursday. Your coffee is typically shipped within 48 hours of roasting." },
              { q: "Can I visit the roastery?", a: "Our Brooklyn studio is open for tastings and tours every Saturday from 10am to 2pm. No reservation required." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/5 pb-8">
                <h4 className="text-cream font-display text-2xl uppercase mb-2 tracking-tight">{faq.q}</h4>
                <p className="text-cream/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Menu = () => {
  const menuCategories = [
    {
      name: "Espresso Bar",
      items: [
        { name: "Espresso", price: "$3.50", desc: "Double shot of our Midnight Blend" },
        { name: "Cortado", price: "$4.25", desc: "Equal parts espresso and steamed milk" },
        { name: "Cappuccino", price: "$4.75", desc: "Espresso, steamed milk, and dense foam" },
        { name: "Latte", price: "$5.25", desc: "Espresso with silky micro-foam" },
      ]
    },
    {
      name: "Slow Bar",
      items: [
        { name: "Pour Over", price: "$6.00", desc: "Rotating single origin selection" },
        { name: "Chemex for Two", price: "$11.00", desc: "Perfect for sharing, clean and bright" },
        { name: "Cold Brew", price: "$5.50", desc: "Steeped for 18 hours, served over ice" },
      ]
    },
    {
      name: "Signature",
      items: [
        { name: "Honey Lavender Latte", price: "$6.50", desc: "House-made lavender syrup and local honey" },
        { name: "Maple Oat Cortado", price: "$5.50", desc: "Vermont maple syrup and oat milk" },
        { name: "Espresso Tonic", price: "$6.00", desc: "Fever Tree tonic, espresso, and orange zest" },
      ]
    }
  ];

  return (
    <div className="bg-cream min-h-screen pt-24 pb-24 px-6 md:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Daily Ritual</span>
          <h1 className="font-display text-8xl md:text-[10rem] text-coffee-dark leading-none uppercase">The Menu</h1>
        </div>

        <div className="space-y-20">
          {menuCategories.map((cat, idx) => (
            <div key={idx}>
              <h2 className="font-display text-4xl text-coffee-dark border-b border-coffee-dark/10 pb-4 mb-8 uppercase tracking-tight">{cat.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start group">
                    <div className="flex-grow pr-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-coffee-dark mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-xs text-coffee-dark/50 italic">{item.desc}</p>
                    </div>
                    <span className="text-sm font-bold text-coffee-dark">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 border border-coffee-dark/10 text-center">
          <h3 className="font-display text-3xl text-coffee-dark uppercase mb-4">Pastries & Bites</h3>
          <p className="text-coffee-dark/60 text-sm italic">Selection changes daily. Visit our studio for today's fresh bakes from local artisans.</p>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const images = [
    { url: "https://picsum.photos/seed/coffee1/1200/800", size: "large", title: "The Roastery" },
    { url: "https://picsum.photos/seed/coffee2/800/800", size: "small", title: "Morning Light" },
    { url: "https://picsum.photos/seed/coffee3/800/800", size: "small", title: "Precision Pour" },
    { url: "https://picsum.photos/seed/coffee4/1200/800", size: "large", title: "Studio Vibes" },
    { url: "https://picsum.photos/seed/coffee5/800/1200", size: "tall", title: "The Perfect Pull" },
    { url: "https://picsum.photos/seed/coffee6/800/800", size: "small", title: "Latte Art" },
  ];

  return (
    <div className="bg-coffee-dark min-h-screen pt-24 pb-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Visual Stories</span>
          <h1 className="font-display text-8xl md:text-[10rem] text-cream leading-none uppercase">Gallery</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative group overflow-hidden ${
                img.size === 'large' ? 'md:col-span-2' : 
                img.size === 'tall' ? 'md:row-span-2' : ''
              }`}
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <h3 className="text-cream font-display text-3xl uppercase tracking-tight">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [view]);

  return (
    <div className="min-h-screen bg-cream selection:bg-primary selection:text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      
      <Header currentView={view} setView={setView} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'home' && (
              <>
                <Hero />
                <CuratedRoasts />
                <SourcingSection />
                <Subscription />
                <Testimonials />
              </>
            )}
            {view === 'menu' && <Menu />}
            {view === 'gallery' && <Gallery />}
            {view === 'about' && <About />}
            {view === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setView={setView} />
    </div>
  );
}
