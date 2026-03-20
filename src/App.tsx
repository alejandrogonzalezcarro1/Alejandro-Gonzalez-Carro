/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Menu, Mail, ArrowUpRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    
    const scroll = () => {
      if (!isPaused && !isDragging) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-[#120F0D] font-sans selection:bg-[#120F0D] selection:text-[#F9F8F4]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 mix-blend-difference text-white">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-sm font-bold tracking-[0.2em] uppercase"
        >
          YOUR NAME
        </motion.div>
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hover:opacity-70 transition-opacity"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center pt-40 pb-24 px-6 md:px-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl md:text-[7.5rem] leading-[1.1] tracking-tight text-center mb-16"
        >
          Rewrite your worth.
        </motion.h1>

        {/* Awards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center mb-24"
        >
          <span className="text-[10px] uppercase tracking-widest text-black/40 mb-6">8x Designer of the Year</span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-serif italic text-black/80">
            <span className="flex items-center gap-2">❦ Awwwards 2023 ❧</span>
            <span className="flex items-center gap-2">❦ FWA 2024 ❧</span>
            <span className="flex items-center gap-2">❦ D&AD 2024 ❧</span>
            <span className="flex items-center gap-2">❦ Webby 2025 ❧</span>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] bg-[#E32636] rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden relative"
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-26772-large.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11px] uppercase tracking-widest text-black/50 mb-6 block">Services</span>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight mb-10">
              End-to-end solutions to build, scale, and elevate your digital presence.
            </h2>
            <button className="bg-[#120F0D] text-white rounded-full px-8 py-3.5 text-[13px] font-medium hover:bg-black/80 transition-colors">
              Explore Services
            </button>
          </div>
          
          <div className="lg:col-span-7 flex flex-col">
            {[
              { title: 'Digital Strategy', desc: 'Data-driven roadmaps for sustainable growth.' },
              { title: 'UI/UX Design', desc: 'Intuitive, engaging, and accessible user experiences.' },
              { title: 'Web Development', desc: 'High-performance, scalable, and secure applications.' },
              { title: 'Brand Identity', desc: 'Distinctive visual systems that command attention.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-black/10 group cursor-pointer">
                <h3 className="text-2xl font-light mb-2 md:mb-0 group-hover:italic transition-all">{item.title}</h3>
                <p className="text-[13px] text-black/50">{item.desc}</p>
              </div>
            ))}
            <div className="pt-8">
              <a href="#" className="text-[13px] font-medium flex items-center gap-2 hover:opacity-70 transition-opacity">
                All Services (8) <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-[#120F0D] text-[#F9F8F4] pt-32 pb-40">
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-widest text-white/50 mb-6 block">Case Studies</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-10 max-w-3xl">
            We will make your business so irresistible, its success is inevitable.
          </h2>
          <button className="bg-[#F9F8F4] text-[#120F0D] rounded-full px-8 py-3.5 text-[13px] font-medium hover:bg-white/90 transition-colors">
            Explore
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className={`flex gap-6 overflow-x-auto px-6 md:px-12 pb-12 hide-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[
            { img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop', title: 'Bose', date: '2024', tags: ['Brand Identity', 'Audio'] },
            { img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop', title: 'Spotify', date: '2023', tags: ['Digital', 'Campaign'] },
            { img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2669&auto=format&fit=crop', title: 'Architecture', date: '2025', tags: ['Web Design', 'Motion'] },
            { img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', title: 'Arcane', date: '2024', tags: ['Entertainment', 'Strategy'] },
            { img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop', title: 'Bose', date: '2024', tags: ['Brand Identity', 'Audio'] },
            { img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop', title: 'Spotify', date: '2023', tags: ['Digital', 'Campaign'] },
            { img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2669&auto=format&fit=crop', title: 'Architecture', date: '2025', tags: ['Web Design', 'Motion'] },
            { img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', title: 'Arcane', date: '2024', tags: ['Entertainment', 'Strategy'] }
          ].map((card, i) => (
            <div key={i} className="relative w-[85vw] md:w-[400px] h-[500px] md:h-[600px] rounded-3xl overflow-hidden shrink-0 group">
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-4xl font-serif text-white">{card.title}</h3>
                  <span className="text-sm font-medium text-white/80">{card.date}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-white border border-white/30 rounded-full px-3 py-1 backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Arts & Culture Section */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop" 
          alt="Team gathering" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute bottom-12 left-6 md:left-12 text-white">
          <span className="text-[11px] uppercase tracking-widest text-white/80 mb-4 block">Arts & Culture</span>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tight mb-8">Learning to see.</h2>
          <button className="bg-[#F9F8F4] text-[#120F0D] rounded-full px-8 py-3.5 text-[13px] font-medium hover:bg-white/90 transition-colors">
            Explore
          </button>
        </div>

        <div className="absolute bottom-12 right-6 md:right-12">
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-6 py-3 text-[13px] font-medium flex items-center gap-2 hover:bg-white/20 transition-colors">
            The House of Belonging <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#120F0D] text-[#F9F8F4] pt-32 pb-16 px-6 md:px-12 flex flex-col items-center">
        <div className="flex flex-col gap-2 mb-20 text-center">
          <a href="#" className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight hover:italic transition-all duration-300">Case Studies</a>
          <a href="#" className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight hover:italic transition-all duration-300">Services</a>
          <a href="#" className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight hover:italic transition-all duration-300">Arts & Culture</a>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 mb-40">
          <button className="bg-[#F9F8F4] text-[#120F0D] rounded-full px-8 py-3 text-[13px] font-medium hover:bg-white/90 transition-colors">
            Let's Talk
          </button>
          <a href="#" className="text-[13px] font-medium hover:opacity-70 transition-opacity">About Me</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-70 transition-opacity">Resume</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-70 transition-opacity">Writing</a>
        </div>

        <div className="w-full max-w-screen-2xl flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-12">
          <div className="mb-12 md:mb-0 w-full md:w-auto">
            <span className="block text-[13px] mb-4">Keep up to date</span>
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center border border-white/20 rounded-full pl-5 pr-2 py-2 w-full md:w-96 focus-within:border-white/50 transition-all duration-300 group"
            >
              <Mail className="w-4 h-4 mr-3 text-white/40 group-focus-within:text-white transition-colors" />
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent outline-none w-full text-[13px] placeholder:text-white/40 text-white" 
              />
              <button 
                type="submit" 
                className="bg-white text-[#120F0D] text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#F9F8F4] hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="flex gap-8 text-[13px] font-medium">
            <a href="#" className="hover:opacity-70 transition-opacity">X (Twitter)</a>
            <a href="#" className="hover:opacity-70 transition-opacity">LinkedIn</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
