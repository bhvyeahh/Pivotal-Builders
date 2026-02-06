"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Hexagon, 
  Boxes, 
  Component, 
  Layers, 
  Triangle, 
  Zap 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const brands = [
  { icon: Boxes, name: 'Enterprise' },
  { icon: Component, name: 'Company' },
  { icon: Layers, name: 'Institute' },
  { icon: Hexagon, name: 'Venture' },
  { icon: Triangle, name: 'Agency' },
  { icon: Zap, name: 'Startup' },
  // Duplicate for seamless loop
  { icon: Boxes, name: 'Enterprise' },
  { icon: Component, name: 'Company' },
  { icon: Layers, name: 'Institute' },
  { icon: Hexagon, name: 'Venture' },
  { icon: Triangle, name: 'Agency' },
  { icon: Zap, name: 'Startup' },
];

const stats = [
  { value: 40, suffix: '+', label: 'Successful projects' },
  { value: 65, suffix: '+', label: 'Team members' },
  { value: 80, suffix: '+', label: 'Happy clients' },
];

export default function StatsAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. INFINITE MARQUEE (Velocity Aware)
      const marqueeInner = marqueeRef.current?.querySelector('.marquee-inner');
      if (marqueeInner) {
        const tl = gsap.to(marqueeInner, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "linear",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const scrollVelocity = self.getVelocity();
            const timeScale = 1 + Math.abs(scrollVelocity / 500); 
            gsap.to(tl, { timeScale: timeScale, duration: 0.2, overwrite: true });
            gsap.to(tl, { timeScale: 1, duration: 0.5, delay: 0.2 });
          }
        });
      }

      // 2. CINEMATIC IMAGE EXPANSION
      const tlExpand = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 80%",
          end: "center 50%",
          scrub: 1,
        }
      });

      tlExpand.fromTo(imageContainerRef.current, 
        { 
          clipPath: "inset(0% 10% 0% 10% round 20px)",
          scale: 0.95 
        },
        { 
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          ease: "power2.inOut" 
        }
      );

      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. NUMBER COUNTER ANIMATION
      // Now targeting the children correctly
      const statItems = statsContainerRef.current?.children;
      
      if (statItems && statItems.length > 0) {
        Array.from(statItems).forEach((item, index) => {
          const numElement = item.querySelector('.stat-num');
          const targetVal = stats[index].value;
          const counter = { val: 0 };

          gsap.to(counter, {
            val: targetVal,
            duration: 2, // Slightly slower for drama
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: "top 80%", // Trigger slightly earlier
            },
            onUpdate: () => {
              if (numElement) {
                numElement.textContent = Math.ceil(counter.val).toString();
              }
            }
          });
          
          // Fade up the item
          gsap.from(item, {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: "top 80%",
            }
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 md:py-32 relative overflow-hidden">
      
      


      {/* =======================
          2. TEXT CONTENT
      ======================== */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="max-w-2xl">
           <h2 className="text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight text-neutral-900 mb-8">
              Modernity <span className="text-neutral-300">&</span> <br/>
              Simplicity.
           </h2>
        </div>
        <div className="max-w-md pb-2">
           <p className="text-neutral-500 text-lg leading-relaxed mb-8">
             Discover designs tailored for modern living. We combine precise engineering with artistic vision to create spaces that inspire.
           </p>
           <button className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-60 transition-opacity">
              Explore Our Approach <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
           </button>
        </div>
      </div>


      {/* =======================
          3. EXPANDING IMAGE & STATS
      ======================== */}
      <div className="relative w-full h-[80vh] md:h-screen">
         
         {/* The Expanding Image Container */}
         <div ref={imageContainerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop" 
              alt="Award Winning Interior" 
              className="w-full h-[120%] object-cover object-center" 
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
         </div>

         {/* Overlay Stats */}
         <div className="absolute bottom-0 left-0 w-full z-10 px-6 md:px-12 pb-16 md:pb-24">
            {/* FIX: Move the REF here to the Grid Container so children are the stat columns */}
            <div ref={statsContainerRef} className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-12">
               
               {stats.map((stat, index) => (
                 <div key={index} className="flex flex-col text-white">
                    <div className="flex items-baseline gap-1 mb-2">
                       {/* The Counter */}
                       <span className="stat-num text-6xl md:text-8xl font-medium tracking-tighter">0</span>
                       <span className="text-4xl md:text-6xl font-light opacity-60">{stat.suffix}</span>
                    </div>
                    <span className="text-sm font-mono uppercase tracking-widest opacity-80 pl-2">
                       {stat.label}
                    </span>
                 </div>
               ))}

            </div>
         </div>

      </div>

    </section>
  );
}