"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter 
} from 'lucide-react';

const CTASection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-[#111111] py-24 px-8 md:px-12" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto text-white">
        
        {/* =======================
            HEADLINE
        ======================== */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight">
            Let's work together <br />
            Get a quote today.
          </h2>
        </motion.div>


        {/* =======================
            DIVIDER
        ======================== */}
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[1px] bg-white/10 mb-16"
        />


        {/* =======================
            BOTTOM CONTENT
        ======================== */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12"
        >
          
          {/* Left: Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2 group">
              Get a quote 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 rounded-full text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
              Our Services
            </button>
          </div>

          {/* Right: Text & Contacts */}
          <div className="lg:max-w-md flex flex-col gap-8">
            <p className="text-neutral-400 text-sm leading-relaxed">
              Partner with us for comprehensive property solutions from planning to execution, providing tailored services that enhance value, exceed expectations, and ensure success in every project we undertake.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm font-semibold">
              {/* Social Icons */}
        

              {/* Email */}
              <a href="mailto:info@construktion.com" className="text-white hover:text-neutral-400 transition-colors">
                info@construktion.com
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;