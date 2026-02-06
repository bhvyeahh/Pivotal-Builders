"use client";

import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  ArrowUpRight,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0A0A0A] text-white pt-16 lg:pt-24 pb-8 lg:pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* =======================
            TOP CONTENT GRID
        ======================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 lg:mb-24">
          
          {/* LEFT COLUMN: Brand & Description (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 w-fit">
              <div className="w-8 h-8 border-2 border-white rounded-sm flex items-center justify-center">
                 <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Pivotal Builders
              </span>
            </a>

            {/* Description */}
            <p className="text-neutral-400 text-sm leading-7 max-w-sm">
              We design spaces that transform lives. Every project is a fusion of innovation, functionality, and aesthetics, crafted for the future.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
                   <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>


          {/* RIGHT COLUMNS: Navigation Links (Span 7) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
            
            {/* Column 1: Main Pages */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase opacity-90">Main pages</h4>
              <nav className="flex flex-col gap-3 text-sm text-neutral-400">
                {['Home', 'About Us', 'Services', 'Projects', 'Blog'].map((item) => (
                   <a key={item} href="#" className="hover:text-white transition-colors w-fit">{item}</a>
                ))}
              </nav>
            </div>

            {/* Column 2: Utility Pages */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase opacity-90">Utility pages</h4>
              <nav className="flex flex-col gap-3 text-sm text-neutral-400">
                {['Contact', 'Get a quote', 'Privacy Policy', 'Terms & Conditions', '404 Not Found'].map((item) => (
                   <a key={item} href="#" className="hover:text-white transition-colors w-fit">{item}</a>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact (Full width on mobile if needed, or 3rd col) */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4 lg:gap-6">
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase opacity-90">Contact</h4>
              <div className="flex flex-col gap-4 text-sm text-neutral-400">
                <a href="#" className="flex items-start gap-3 hover:text-white transition-colors group">
                   <MapPin size={16} className="mt-1 shrink-0 text-neutral-500 group-hover:text-white transition-colors" />
                   <span>San Francisco, CA <br/> Bay Area</span>
                </a>
                <a href="mailto:info@pivotalbuilders.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                   <Mail size={16} className="shrink-0 text-neutral-500 group-hover:text-white transition-colors" />
                   <span>info@pivotalbuilders.com</span>
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-3 hover:text-white transition-colors group">
                   <Phone size={16} className="shrink-0 text-neutral-500 group-hover:text-white transition-colors" />
                   <span>+1 (555) 123-4567</span>
                </a>
                
                <a href="#" className="inline-flex items-center gap-2 text-white mt-4 hover:opacity-70 text-xs font-semibold uppercase tracking-wider border-b border-white/30 pb-1 w-fit">
                  <span>View on map</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>


        {/* =======================
            BOTTOM BAR: Copyright
        ======================== */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500">
          <p className="text-center md:text-left">
            Copyright © {currentYear} Pivotal Builders. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Cookies</a>
             <div className="flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 rounded-full">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               <span className="font-medium text-white tracking-wide text-[10px] uppercase">System Operational</span>
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
}