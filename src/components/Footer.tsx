"use client";

import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0A0A0A] text-white py-20 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">

        {/* =======================
            1. THE BIG CTA
        ======================== */}
        <div>
           <h2 className="text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tighter leading-[0.9] text-white mb-8">
             LET’S DISCUSS <br/> <span className="text-neutral-500">YOUR PROJECT</span>
           </h2>
           
           {/* Instagram Button */}
           <a 
             href="https://instagram.com/pivotalbuilders" 
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all group"
           >
              <Instagram size={18} />
              <span className="text-sm font-medium">Follow on Instagram</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </a>
        </div>

        {/* =======================
            2. CONTACT DETAILS GRID
        ======================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
           
           {/* Column 1: Contact */}
           <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Contact</span>
              <a href="tel:4156109225" className="text-lg font-medium hover:text-neutral-300 transition-colors">415-610-9225</a>
              <a href="mailto:info@pivotalbuildersinc.com" className="text-lg font-medium hover:text-neutral-300 transition-colors">info@pivotalbuildersinc.com</a>
           </div>

           {/* Column 2: Office */}
           <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Office</span>
              <p className="text-lg font-medium text-neutral-300 leading-snug">
                2560 Geary Blvd Unit 204 <br/>
                San Francisco, CA
              </p>
           </div>

           {/* Column 3: License & Copy */}
           <div className="flex flex-col gap-4 md:items-end md:text-right">
              <div className="px-3 py-1 border border-white/20 rounded-md w-fit">
                 <span className="text-xs font-mono uppercase tracking-widest text-white">
                   CA LIC 1123494
                 </span>
              </div>
              <p className="text-xs text-neutral-600">
                 © {currentYear} Pivotal Builders Inc.
              </p>
           </div>

        </div>

      </div>
    </footer>
  );
}