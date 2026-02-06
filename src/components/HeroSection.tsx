"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MoveDown } from 'lucide-react';


export default function HeroSection() {
  
  // Animation Variants
  const reveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const stagger = {
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[#0A0A0A] overflow-hidden">
      
      {/* Navbar Overlay */}
      

      {/* =======================
          LEFT PANEL: Dark Content 
          Mobile: 60vh | Desktop: 100vh (50% width)
      ======================== */}
      <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen flex flex-col justify-center px-6 md:px-16 xl:px-24 pt-32 pb-12 lg:py-0 z-10 relative">
        
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={stagger}
          className="max-w-2xl mx-auto lg:mx-0"
        >
          {/* Main Title */}
          <motion.h1 
            variants={reveal}
            className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] xl:text-[4.75rem] font-medium text-white leading-[1.1] tracking-tight mb-6 lg:mb-8"
          >
            Your pivotal partner <br />
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span>in building what</span>
              <span className="flex items-center gap-3 sm:gap-4">
                 matters
                 {/* White Line Graphic */}
                 <motion.div 
                   initial={{ width: 0, opacity: 0 }}
                   animate={{ width: "80px", opacity: 1 }}
                   transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                   className="h-[2px] sm:h-[3px] bg-white rounded-full hidden sm:block mt-2"
                 />
              </span>
            </div>
          </motion.h1>

          {/* Subtext */}

          {/* Buttons */}
          <motion.div variants={reveal} className="flex flex-wrap items-center gap-4">
            <a 
              href="#contact" 
              className="bg-white text-black h-[48px] sm:h-[54px] px-6 sm:px-8 rounded-full text-sm sm:text-[15px] font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2 group"
            >
              Contact Us 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#about"
              className="h-[48px] sm:h-[54px] px-6 sm:px-8 rounded-full text-sm sm:text-[15px] font-medium text-white border border-neutral-700 hover:border-white transition-colors flex items-center justify-center"
            >
              Learn more
            </a>
          </motion.div>

        </motion.div>
      </div>


      {/* =======================
          RIGHT PANEL: Image
          Mobile: 40vh | Desktop: 100vh (50% width)
      ======================== */}
      <div className="w-full lg:w-1/2 h-[40vh] lg:h-screen relative bg-neutral-900">
        
        {/* Background Image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
           <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop" 
            alt="Pivotal Builders High-End Construction Work" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 lg:bg-black/5"></div>
        </motion.div>

        {/* Scroll Indicator (Hidden on very small screens to save space) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="hidden sm:block absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
        >
          <a href="#services" className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-full border border-white/40 flex items-center justify-center text-white backdrop-blur-[2px] hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
             <MoveDown size={24} strokeWidth={1} className="animate-bounce" />
          </a>
        </motion.div>

        {/* Location Badge */}
        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 bg-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-md flex items-center gap-2 shadow-xl">
           <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-black rounded-full"></div>
           <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-black">SF Bay Area</span>
        </div>

      </div>

    </section>
  );
}