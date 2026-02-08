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
// DATA: FEATURED PROJECTS (Main Sections)
// ===========================================
const projects = [
  {
    id: "01",
    location: "Menlo Park",
    category: "Full Home Remodel",
    year: "2023",
    description: "A complete transformation blending modern luxury with timeless details, featuring a spa-inspired bathroom and custom vanity spaces.",
    theme: "light",
    images: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&fit=crop"
    ]
  },
  {
    id: "02",
    location: "Mill Valley",
    category: "Custom Build & Interiors",
    year: "2024",
    description: "An expansive project featuring open-concept living, a chef's kitchen with a large island, and custom architectural details throughout.",
    theme: "dark",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&fit=crop",
      "https://images.unsplash.com/photo-1556911220-e8db7e105970?q=80&w=1200&fit=crop"
    ]
  },
  {
    id: "03",
    location: "Potrero Hill",
    category: "Kitchen & Structural",
    year: "2023",
    description: "Modern kitchen update utilizing warm wood tones, open shelving, and structural enhancements to open up the space.",
    theme: "light",
    images: [
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1200&fit=crop",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1200&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&fit=crop"
    ]
  },
  {
    id: "04",
    location: "Custom Decks",
    category: "Outdoor Living",
    year: "2023",
    description: "Architectural deck builds designed with precision carpentry to maximize outdoor living space and integrate seamlessly with the environment.",
    theme: "dark",
    images: [
      "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1200&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&fit=crop"
    ]
  }
];

// ===========================================
// DATA: GALLERY GRID (Masonry Layout)
// ===========================================
const galleryItems = [
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800", span: "md:col-span-2 md:row-span-2" }, // Big Square
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800", span: "md:col-span-1 md:row-span-1" }, // Small
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800", span: "md:col-span-1 md:row-span-2" }, // Tall
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800", span: "md:col-span-1 md:row-span-1" }, // Small
  { src: "https://images.unsplash.com/photo-1556911220-e8db7e105970?q=80&w=800", span: "md:col-span-2 md:row-span-1" }, // Wide
  { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800", span: "md:col-span-1 md:row-span-1" }, // Small
  { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800", span: "md:col-span-1 md:row-span-2" }, // Tall
  { src: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800", span: "md:col-span-2 md:row-span-2" }, // Big Square
  { src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800", span: "md:col-span-1 md:row-span-1" }, // Small
  { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=800", span: "md:col-span-1 md:row-span-1" }, // Small
  { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800", span: "md:col-span-2 md:row-span-1" }, // Wide
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800", span: "md:col-span-1 md:row-span-1" }, // Small
];

export default function PortfolioPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION
      const heroLines = document.querySelectorAll('.hero-line');
      gsap.fromTo(heroLines,
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );

      // 2. PROJECT SECTIONS ANIMATION
      const sections = document.querySelectorAll('.project-section');
      sections.forEach((section) => {
        const imgContainer = section.querySelector('.project-img-container');
        const text = section.querySelector('.project-text');
        const line = section.querySelector('.divider-line');

        // Animate Images (Staggered Collage)
        if (imgContainer) {
          const images = imgContainer.querySelectorAll('img');
          gsap.fromTo(images,
            { scale: 1.1, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 65%" }
            }
          );
        }

        // Text Slide In
        if (text) {
          gsap.fromTo(text,
            { x: -50, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 60%" }
            }
          );
        }

        // Divider Line
        if (line) {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1, duration: 1.5, ease: "expo.out",
              scrollTrigger: { trigger: section, start: "top 80%" }
            }
          );
        }
      });

      // 3. MASONRY GALLERY ANIMATION
      // This creates a wave effect as you scroll down the gallery
      const galleryItems = document.querySelectorAll('.gallery-img-wrapper');
      gsap.fromTo(galleryItems, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1, // Stagger effect for "wave" appearance
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".masonry-grid",
            start: "top 75%",
          }
        }
      );

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
          2. FEATURED PROJECTS
      ======================== */}
      <div className="flex flex-col">
        {projects.map((project, index) => {
          const isDark = project.theme === 'dark';
          const imageCount = project.images.length;
          
          return (
            <section 
              key={index}
              className={`project-section py-24 md:py-32 px-6 md:px-12 w-full flex items-center ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}
            >
              <div className="max-w-[1400px] mx-auto w-full">
                
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* TEXT CONTENT */}
                  <div className="project-text w-full lg:w-5/12 flex flex-col items-start justify-center py-8">
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
                      {project.location}
                    </h2>
                    
                    <p className={`text-lg md:text-xl leading-relaxed font-light mb-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* IMAGE CONTENT */}
                  <div className={`w-full lg:w-7/12 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <div className="project-img-container w-full h-full">
                      
                      {/* 2 IMAGES: 50/50 Split */}
                      {imageCount === 2 && (
                        <div className="grid grid-cols-2 gap-4 h-[40vh] lg:h-[50vh]">
                          {project.images.map((src, i) => (
                             <div key={i} className="relative w-full h-full overflow-hidden rounded-sm group">
                               <img src={src} alt={project.location} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"/>
                               <div className={`absolute inset-0 ${isDark ? 'bg-white/0 group-hover:bg-white/10' : 'bg-black/0 group-hover:bg-black/10'} transition-colors`}></div>
                             </div>
                          ))}
                        </div>
                      )}

                      {/* 3+ IMAGES: Collage Grid */}
                      {imageCount >= 3 && (
                         <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[50vh] lg:h-[70vh]">
                           {project.images.slice(0, 4).map((src, i) => {
                             const spanClasses = (imageCount === 3 && i === 0) ? 'row-span-2' : '';
                             return (
                              <div key={i} className={`relative w-full h-full overflow-hidden rounded-sm group ${spanClasses}`}>
                                <img src={src} alt={project.location} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"/>
                                <div className={`absolute inset-0 ${isDark ? 'bg-white/0 group-hover:bg-white/10' : 'bg-black/0 group-hover:bg-black/10'} transition-colors`}></div>
                              </div>
                             )
                           })}
                         </div>
                      )}

                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* =======================
          3. VISUAL ARCHIVE (The "ZigZag" Gallery)
      ======================== */}
      <section className="py-32 px-4 md:px-8 bg-[#050505] text-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-end justify-between border-b border-white/10 pb-8 mb-16">
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight">Visual Archive</h3>
            <span className="text-neutral-500 font-mono text-xs tracking-widest hidden md:block">ALL DETAILS</span>
          </div>

          <div className="masonry-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryItems.map((item, i) => (
              <div 
                key={i} 
                className={`gallery-img-wrapper relative group overflow-hidden rounded-sm cursor-pointer ${item.span}`}
              >
                <img 
                  src={item.src} 
                  alt="Gallery Item" 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* =======================
          4. FOOTER CTA
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