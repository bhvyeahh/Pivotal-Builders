"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { Quote, Hammer, HeartHandshake, Ruler, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer'; 
import RecentProjects from '@/components/RecentProjects'; // Importing the Quality/Mission section
import QualityMissionSection from '@/components/QualityMissionSection';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const bioSectionRef = useRef<HTMLDivElement>(null);
  const bioImageRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // ===========================================
      // 1. HERO ANIMATIONS
      // ===========================================
      
      // Parallax Background
      gsap.to(heroImageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Text Reveal (Staggered Slide Up)
      const heroText = heroRef.current?.querySelectorAll(".hero-text");
      if (heroText && heroText.length > 0) {
        gsap.fromTo(heroText, 
          { y: 100, opacity: 0, rotateX: -10 },
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
      }

      // ===========================================
      // 2. BIO SECTION (Pinning & Read-through)
      // ===========================================
      
      // Desktop Pinning Logic (Only runs > 1024px)
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
          ScrollTrigger.create({
            trigger: bioSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: bioImageRef.current, 
            pinSpacing: false 
          });
        }
      });

      // Text Fade-In as you scroll
      const paragraphs = document.querySelectorAll(".bio-text p, .bio-text .quote-box");
      paragraphs.forEach((p) => {
        gsap.from(p, {
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });


      // ===========================================
      // 3. PHILOSOPHY CARDS
      // ===========================================
      const cards = document.querySelectorAll(".philosophy-card");
      gsap.fromTo(cards, 
        { y: 100, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 75%",
          }
        }
      );

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full bg-white relative selection:bg-black selection:text-white">
      
      {/* =========================================
          1. HERO SECTION (Cinematic Dark Mode)
      ========================================= */}
      <section ref={heroRef} className="relative w-full h-[90vh] lg:h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
        
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 opacity-60">
           <div className="w-full h-[120%] relative -top-[10%] overflow-hidden">
             <img 
               ref={heroImageRef}
               src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2600&auto=format&fit=crop" 
               alt="Construction Texture" 
               className="w-full h-full object-cover grayscale brightness-75" 
             />
             <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]"></div>
           </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl px-6 text-center text-white flex flex-col items-center">
          <div className="overflow-hidden mb-6">
            <div className="hero-text inline-block border border-white/20 px-5 py-2 rounded-full backdrop-blur-md bg-white/5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300">Est. 2011 • San Francisco</span>
            </div>
          </div>
          
          <div className="overflow-hidden w-full">
            <h1 className="hero-text text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter leading-[0.95] mb-8">
              Built on trust & <br/>
              <span className="text-neutral-500 italic font-serif">craftsmanship.</span>
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <p className="hero-text text-lg md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
              Meet the team dedicated to transforming the San Francisco Bay Area, one project at a time.
            </p>
          </div>

          <div className="hero-text mt-16 opacity-50">
             <ArrowDown className="animate-bounce w-8 h-8" strokeWidth={1} />
          </div>
        </div>
      </section>


      {/* =========================================
          2. BIO SECTION (Split Layout)
      ========================================= */}
      <section ref={bioSectionRef} className="relative w-full bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT: Image Column 
              Mobile: Normal block | Desktop: Sticky Pinned
          */}
          <div ref={bioImageRef} className="relative w-full h-[60vh] lg:h-screen lg:sticky lg:top-0 flex items-center justify-center bg-neutral-100 lg:bg-transparent px-6 py-12 lg:p-0 z-10">
            <div className="relative w-full max-w-md lg:max-w-xl aspect-[3/4] lg:h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop" 
                alt="Paul Magill - Pivotal Builders" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              
              {/* Badge */}
              <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 bg-white/90 backdrop-blur-xl p-6 lg:p-8 rounded-2xl border border-white/20 shadow-xl max-w-[200px] lg:max-w-xs">
                <p className="font-serif text-2xl lg:text-3xl italic mb-2 text-black">Paul Magill</p>
                <div className="h-[1px] w-12 bg-black mb-4"></div>
                <p className="text-[10px] lg:text-xs font-mono uppercase tracking-widest text-neutral-500">Owner & Founder</p>
              </div>
            </div>
          </div>


          {/* RIGHT: Text Column (Scrollable) */}
          <div className="flex flex-col justify-center px-6 py-16 md:p-16 lg:p-24 lg:min-h-screen bg-white relative z-20">
            <div className="bio-text space-y-10 max-w-2xl mx-auto lg:mx-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-[1.1] tracking-tight">
                From the shores of <br/> Lough Neagh to the <span className="italic font-serif text-neutral-500">SF Bay.</span>
              </h2>

              <div className="prose prose-lg prose-neutral font-light text-lg md:text-xl leading-relaxed text-neutral-600 space-y-8">
                <p>
                  I’m Paul Magill, the owner of Pivotal Builders Inc. Born and raised in Ireland on the southern shores of Lough Neagh, I moved to San Francisco in 2011 and quickly became deeply rooted in the Bay Area construction industry.
                </p>
                <p>
                  Over the years, I’ve built my career around hands-on experience, local expertise, and a deep appreciation for the craft of building in one of the most unique markets in the country.
                </p>
                
                <div className="quote-box border-l-4 border-black pl-6 lg:pl-8 py-2 my-12 bg-neutral-50 lg:bg-transparent rounded-r-xl lg:rounded-none">
                  <p className="text-xl md:text-3xl text-neutral-900 font-medium italic leading-snug">
                    "I started Pivotal Builders with a simple goal: to build high-quality spaces while giving clients a construction experience that feels clear, honest, and well managed."
                  </p>
                </div>

                <p>
                  I stay personally involved throughout the entire process – from early planning and design conversations to the final details at completion. I believe the best results come from listening closely, setting clear expectations, and taking pride in every decision made along the way.
                </p>
                <p>
                  For me, craftsmanship isn’t just about how something looks when it’s finished but how well it functions and how confidently it was built. Building or remodeling is a major investment, and I don’t take that responsibility lightly.
                </p>
                <p>
                  At Pivotal Builders, success isn’t just measured by the final product – it’s measured by satisfied clients, lasting relationships, and work I’m proud to stand behind.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-8 opacity-80">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-12 lg:h-16 w-auto opacity-60 invert-0" />
              </div>
            </div>
          </div>

        </div>
      </section>


      
            <QualityMissionSection />
      <Footer />
    </main>
  );
}