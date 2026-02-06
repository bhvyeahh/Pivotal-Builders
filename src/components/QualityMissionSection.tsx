"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QualityMissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animate all elements with class 'reveal-up'
      const items = document.querySelectorAll('.reveal-up');
      items.forEach((item) => {
        gsap.fromTo(item, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%", // Start animation when top of element hits 85% of viewport height
            }
          }
        );
      });

      // Image Scale Reveal
      const images = document.querySelectorAll('.reveal-img');
      images.forEach((img) => {
        gsap.fromTo(img,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24 lg:gap-32">
        
        {/* =======================
            ROW 1: Text Left, Image Right
        ======================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* TEXT CONTENT */}
          <div className="flex flex-col items-start lg:pr-8 order-1 lg:order-1">
            <h2 className="reveal-up text-4xl md:text-5xl font-medium leading-[1.1] text-neutral-900 mb-6 tracking-tight">
              An exceptional quality <br/> that can’t be beaten
            </h2>
            
            <p className="reveal-up text-neutral-500 text-sm md:text-base leading-7 mb-8 max-w-md">
              Explore homes crafted to perfection with spacious layouts, modern designs, and prime locations. Discover your dream home today.
            </p>
            
            <button className="reveal-up bg-[#111] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black transition-all hover:scale-105 flex items-center gap-2 group">
              Join us 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* IMAGE */}
          <div className="reveal-img relative h-[400px] lg:h-[500px] w-full rounded-sm overflow-hidden order-2 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" 
              alt="Modern Kitchen Interior" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>


        {/* =======================
            ROW 2: Image Left, Text Right
        ======================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* IMAGE (Left on Desktop, Top on Mobile) */}
          <div className="reveal-img relative h-[400px] lg:h-[500px] w-full rounded-sm overflow-hidden order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop" 
              alt="Luxury Living Room" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* TEXT CONTENT (Right on Desktop, Bottom on Mobile) */}
          <div className="flex flex-col items-start lg:pl-8 order-1 lg:order-2">
            <h2 className="reveal-up text-4xl md:text-5xl font-medium leading-[1.1] text-neutral-900 mb-6 tracking-tight">
              Our mission is to <br/> deliver high quality work
            </h2>
            
            <p className="reveal-up text-neutral-500 text-sm md:text-base leading-7 mb-8 max-w-md">
              Our goal is to find properties you love. From luxurious interiors to smart investments, we deliver excellence. Let us guide you home.
            </p>
            
            <button className="reveal-up px-8 py-3.5 rounded-full text-sm font-semibold text-neutral-900 border border-neutral-200 hover:bg-neutral-50 transition-colors">
              Learn more
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}