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

const RecentProjects = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const imageReveal = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-24 px-8 md:px-12" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        
        {/* =======================
            TOP ROW (Image + Text)
        ======================== */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          
          {/* Top Left: Large Image */}
          <motion.div 
            className="w-full lg:w-1/2 overflow-hidden rounded-sm"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageReveal}
          >
            <div className="relative aspect-[4/3] group cursor-pointer overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                alt="Modern Living Room with Brown Leather Sofa" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </motion.div>

          {/* Top Right: Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center rounded-sm"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <h2 className="text-4xl lg:text-5xl font-medium text-neutral-900 mb-6 leading-tight tracking-tight">
              Take a look at our <br/> recent projects
            </h2>
            
            <p className="text-neutral-500 text-sm leading-relaxed mb-10 max-w-md">
              Discover our real estate projects, featuring innovative designs and expert craftsmanship that bring every space to life with elegance.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2 group">
                Get a quote 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-3.5 rounded-full text-sm font-semibold text-neutral-900 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                Browse portfolio
              </button>
            </div>

            {/* Divider & Socials */}
            <div className="border-t border-neutral-100 pt-8 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-900">Follow our work on:</span>
              <div className="flex gap-5 text-neutral-900">
                <a href="#" className="hover:opacity-60 transition-opacity"><Facebook size={16} /></a>
                <a href="#" className="hover:opacity-60 transition-opacity"><Twitter size={16} /></a>
                <a href="#" className="hover:opacity-60 transition-opacity"><Instagram size={16} /></a>
                <a href="#" className="hover:opacity-60 transition-opacity"><Linkedin size={16} /></a>
              </div>
            </div>
          </motion.div>
        </div>


        {/* =======================
            BOTTOM ROW (Asymmetric Grid)
        ======================== */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Bottom Left: Narrower Image (approx 40%) */}
          <motion.div 
            className="w-full lg:w-[40%] overflow-hidden rounded-sm"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            variants={imageReveal}
          >
             <div className="relative aspect-[3/4] lg:aspect-[4/3] group cursor-pointer overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop" 
                alt="Marble Bathroom" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </motion.div>

          {/* Bottom Right: Wider Image (approx 60%) */}
          <motion.div 
            className="w-full lg:w-[60%] overflow-hidden rounded-sm"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            variants={imageReveal}
          >
             <div className="relative aspect-[4/3] group cursor-pointer overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop" 
                alt="Home Office Library" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default RecentProjects;