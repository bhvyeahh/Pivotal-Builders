"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "01",
    title: "Full Home Remodel",
    description: "A full home remodel with Pivotal Builders means an expertly curated space with custom details that elevate your daily living.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop" // Placeholder for Image 3
  },
  {
    id: "02",
    title: "Kitchen Remodel",
    description: "The kitchen is the heart of the home, and we craft spaces that blend form, function and beauty with upscale materials and custom millwork.",
    image: "https://images.unsplash.com/photo-1556911220-e8db7e105970?q=80&w=1000&auto=format&fit=crop" // Placeholder for Image 4
  },
  {
    id: "03",
    title: "Bathroom Remodel",
    description: "Thoughtfully designed and crafted with comfort and luxury in mind, transforming daily routines into spa-like experiences.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000&auto=format&fit=crop" // Placeholder for Image 5
  },
  {
    id: "04",
    title: "ADU’s",
    description: "Whether it’s a family retreat, rental unit or additional living space, we transform underutilized areas into functional extensions of your home.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop" // Placeholder for Image 6
  },
  {
    id: "05",
    title: "Additions & Structural",
    description: "Expand with intention by adding space. Seamlessly integrate new square footage without compromising your home’s character.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop" // Placeholder for Image 7
  },
  {
    id: "06",
    title: "Custom Deck Builds",
    description: "Custom decks thoughtfully designed and expertly built to enhance the way you live outdoors, blending nature with architecture.",
    image: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1000&auto=format&fit=crop" // Placeholder for Image 8
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Mobile Horizontal Scroll Snap (No GSAP needed, handled by CSS)
      
      // 2. Desktop Parallax "Stair" Effect
      // Only animate if we are on desktop (window width > 1024)
      if (window.innerWidth >= 1024) {
        gsap.to(rightColRef.current, {
          y: -100, // Moves the right column up slightly faster than scroll
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smooth scrubbing
          }
        });

        // Reveal Cards
        gsap.from(".service-card", {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="w-full bg-[#111] text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
           <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium leading-[1] mb-6 tracking-tight">
                Our expertise <br/>
                <span className="text-neutral-500">at your service.</span>
              </h2>
           </div>
           <div className="hidden md:block">
              <span className="text-sm text-neutral-400 uppercase tracking-widest border border-neutral-700 px-4 py-2 rounded-full">
                 Scroll to explore ↓
              </span>
           </div>
           {/* Mobile Swipe Hint */}
           <div className="md:hidden">
              <span className="text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                 Swipe to explore →
              </span>
           </div>
        </div>

        {/* =======================
            MOBILE VIEW: Horizontal Swipe (Solving the scroll issue)
        ======================== */}
        <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 scrollbar-hide">
           {services.map((service) => (
              <div 
                key={service.id} 
                className="snap-center shrink-0 w-[85vw] sm:w-[400px] bg-neutral-900 rounded-xl overflow-hidden flex flex-col"
              >
                 {/* Image Area */}
                 <div className="h-[250px] w-full relative overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full">
                       <ArrowUpRight size={20} className="text-white" />
                    </div>
                 </div>
                 {/* Content Area */}
                 <div className="p-8 flex flex-col flex-grow">
                    <span className="text-xs text-neutral-500 font-mono mb-4">/ {service.id}</span>
                    <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{service.description}</p>
                 </div>
              </div>
           ))}
        </div>


        {/* =======================
            DESKTOP VIEW: Stair-Step Layout
        ======================== */}
        <div className="hidden lg:flex gap-12 relative">
           
           {/* LEFT COLUMN (Starts at 0) */}
           <div ref={leftColRef} className="w-1/2 flex flex-col gap-12">
              {services.filter((_, i) => i % 2 === 0).map((service) => (
                 <ServiceCardDesktop key={service.id} service={service} />
              ))}
           </div>

           {/* RIGHT COLUMN (Starts Offset) */}
           <div ref={rightColRef} className="w-1/2 flex flex-col gap-12 pt-32">
              {services.filter((_, i) => i % 2 !== 0).map((service) => (
                 <ServiceCardDesktop key={service.id} service={service} />
              ))}
           </div>

        </div>

      </div>
    </section>
  );
}

// Sub-component for clean code
function ServiceCardDesktop({ service }: { service: any }) {
  return (
    <div className="service-card group relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer border-t border-white/10">
      
      {/* Background Image (Initially dimmed) */}
      <img 
        src={service.image} 
        alt={service.title} 
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Content Positioned Bottom Left */}
      <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col justify-end items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        
        <div className="flex justify-between w-full items-end border-b border-white/20 pb-6 mb-6">
           <div>
              <span className="text-xs font-mono text-neutral-400 block mb-2">/ {service.id}</span>
              <h3 className="text-3xl font-medium text-white">{service.title}</h3>
           </div>
           <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowUpRight size={24} strokeWidth={1} />
           </div>
        </div>
        
        {/* Reveal Description on Hover (or keep visible but subtle) */}
        <p className="text-neutral-300 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
           {service.description}
        </p>
      </div>
    </div>
  )
}