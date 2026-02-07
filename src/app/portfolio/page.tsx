"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ===========================================
// DATA: Projects
// ===========================================
const projects = [
  {
    id: "01",
    title: "Pacific Heights Residence",
    category: "Full Home Remodel",
    location: "San Francisco, CA",
    year: "2024",
    description: "A complete transformation of a historic Victorian home, blending period details with modern luxury living.",
    image: "https://images.unsplash.com/photo-1600596542815-e3287042856d?q=80&w=1600&auto=format&fit=crop",
    theme: "light" // White Background
  },
  {
    id: "02",
    title: "Presidio Terrace Kitchen",
    category: "Kitchen Remodel",
    location: "San Francisco, CA",
    year: "2023",
    description: "A chef's dream kitchen featuring custom walnut cabinetry, Calacatta marble, and professional-grade appliances.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    theme: "dark" // Black Background
  },
  {
    id: "03",
    title: "Marin County Retreat",
    category: "Additions & Structural",
    location: "Sausalito, CA",
    year: "2023",
    description: "Structural expansion adding 1,200 sqft of living space, maximizing panoramic bay views.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    theme: "light" // White Background
  },
  {
    id: "04",
    title: "Sunset District ADU",
    category: "Accessory Dwelling Unit",
    location: "San Francisco, CA",
    year: "2022",
    description: "Transforming an underutilized backyard into a stunning, functional modern rental unit.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    theme: "dark" // Black Background
  }
];

export default function PortfolioPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO TEXT ANIMATION (Staggered Reveal)
      const heroLines = document.querySelectorAll('.hero-line');
      gsap.fromTo(heroLines,
        { y: 100, opacity: 0, rotateX: -20 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power3.out", 
          delay: 0.2 
        }
      );

      // 2. PROJECT SECTIONS ANIMATION
      const sections = document.querySelectorAll('.project-section');
      
      sections.forEach((section) => {
        const img = section.querySelector('.project-img');
        const text = section.querySelector('.project-text');
        const line = section.querySelector('.divider-line');

        // Image Scale Reveal
        if (img) {
          gsap.fromTo(img,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
              }
            }
          );
        }

        // Text Slide In
        if (text) {
          gsap.fromTo(text,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 60%",
              }
            }
          );
        }

        // Divider Line Draw
        if (line) {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.5,
              ease: "expo.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              }
            }
          );
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full relative selection:bg-neutral-500 selection:text-white">
      
      {/* =======================
          1. HERO SECTION (Black)
      ======================== */}
      <section className="relative pt-48 pb-32 px-6 md:px-12 bg-[#050505] text-white min-h-[60vh] flex flex-col justify-end">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="overflow-hidden mb-2">
            <span className="hero-line block text-neutral-400 font-mono text-sm tracking-widest uppercase">
              Selected Works
            </span>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line text-6xl md:text-8xl lg:text-[10vw] font-bold tracking-tighter leading-[0.9] mb-8">
              OUR <br/> PORTFOLIO
            </h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-t border-white/20 pt-8">
            <div className="max-w-xl overflow-hidden">
              <p className="hero-line text-neutral-400 text-xl font-light leading-relaxed">
                Where precision engineering meets timeless design. A curated selection of projects across the Bay Area.
              </p>
            </div>
            <div className="hero-line animate-bounce text-white/50">
               <ArrowDown size={32} strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          2. PROJECT LIST (Alternating)
      ======================== */}
      <div className="flex flex-col">
        {projects.map((project, index) => {
          const isDark = project.theme === 'dark';
          
          return (
            <section 
              key={index}
              className={`project-section py-24 md:py-32 px-6 md:px-12 w-full flex items-center ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}
            >
              <div className="max-w-[1400px] mx-auto w-full">
                
                {/* Mobile: Stacked | Desktop: Grid */}
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* TEXT CONTENT */}
                  <div className="project-text w-full lg:w-5/12 flex flex-col items-start">
                    <div className="flex items-center gap-4 mb-8 w-full">
                       <span className={`font-mono text-sm border px-3 py-1 rounded-full ${isDark ? 'border-white/20 text-white/60' : 'border-black/10 text-black/60'}`}>
                         {project.id}
                       </span>
                       <div className={`divider-line h-[1px] flex-grow origin-left ${isDark ? 'bg-white/20' : 'bg-black/10'}`}></div>
                       <span className={`font-mono text-xs uppercase tracking-widest ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                         {project.year}
                       </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 leading-[1.1]">
                      {project.title}
                    </h2>
                    
                    <p className={`text-lg md:text-xl leading-relaxed font-light mb-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-10">
                      <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>
                        {project.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-400 self-center"></span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>
                        {project.location}
                      </span>
                    </div>

                    <button className={`group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-b pb-1 transition-all ${isDark ? 'border-white text-white hover:text-neutral-300 hover:border-neutral-300' : 'border-black text-black hover:text-neutral-600 hover:border-neutral-600'}`}>
                      View Project <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* IMAGE CONTENT */}
                  <div className="w-full lg:w-7/12">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                       <div className="project-img w-full h-full">
                         <img 
                           src={project.image} 
                           alt={project.title} 
                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                         />
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>


      {/* =======================
          3. GALLERY SECTION (Black)
      ======================== */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between border-b border-white/10 pb-8 mb-16">
            <h3 className="text-4xl font-medium tracking-tight">Archive</h3>
            <span className="text-neutral-500 font-mono text-xs tracking-widest hidden md:block">ALL PROJECTS</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
               "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=600",
               "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
               "https://images.unsplash.com/photo-1556911220-e8db7e105970?q=80&w=600"
             ].map((src, i) => (
               <div key={i} className="aspect-square bg-neutral-900 overflow-hidden relative group cursor-pointer">
                  <img src={src} alt="Archive" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* =======================
          4. FOOTER (Bottom CTA)
      ======================== */}
      <section className="py-24 px-6 text-center bg-white text-black">
         <div className="max-w-4xl mx-auto">
           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
             LET’S DISCUSS YOUR <br/> <span className="text-neutral-400">PROJECT</span>
           </h2>
           <a href="/contact" className="inline-block bg-black text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-neutral-800 transition-all">
             Contact Us
           </a>
         </div>
      </section>

      <Footer />
    </main>
  );
}