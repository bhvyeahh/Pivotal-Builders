"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // <--- IMPORT THIS
import { 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Menu, 
  X 
} from 'lucide-react';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Animation variants
  const menuVariants = {
    closed: { 
      opacity: 0,
      x: "100%",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    open: { 
      opacity: 1,
      x: "0%",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex items-center justify-between bg-transparent"
      >
        
        {/* LEFT: Logo */}
        <div className="flex items-center gap-16">
          <Link href="/" className="text-white flex items-center gap-3 group z-50 relative">
            <div className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300 backdrop-blur-sm">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M3 21h18"/>
                 <path d="M5 21V7l8-4 8 4v14"/>
                 <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/>
               </svg>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-400">
            {navLinks.slice(0, 4).map((link) => (
               <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                 {link.name}
               </Link>
            ))}
             <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>

        {/* RIGHT: Socials & CTA */}
        <div className="flex items-center gap-6 z-50 relative">
          {/* Social Icons (Desktop) */}
          <div className="hidden xl:flex items-center gap-5 text-white">
            <a href="#" className="hover:text-neutral-300 hover:-translate-y-0.5 transition-all"><Facebook size={18} strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-neutral-300 hover:-translate-y-0.5 transition-all"><Twitter size={18} strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-neutral-300 hover:-translate-y-0.5 transition-all"><Instagram size={18} strokeWidth={1.5} /></a>
            <a href="#" className="hover:text-neutral-300 hover:-translate-y-0.5 transition-all"><Linkedin size={18} strokeWidth={1.5} /></a>
          </div>

          {/* CTA Button */}
          <Link 
            href="/contact" 
            className="hidden md:flex bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          >
            Get a quote 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      {/* =======================
          MOBILE MENU OVERLAY
      ======================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-xl flex flex-col p-8 lg:hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
               <span className="text-white font-bold text-xl tracking-tight">Pivotal Builders</span>
               <button 
                 onClick={() => setIsMobileMenuOpen(false)} 
                 className="text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
               >
                 <X size={24} />
               </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div 
                    variants={linkVariants}
                    className="text-4xl md:text-5xl font-light text-white hover:text-neutral-400 transition-colors tracking-tight flex items-center gap-4 group"
                  >
                    {link.name}
                    <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-neutral-500" />
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Bottom Footer Area */}
            <motion.div 
               variants={linkVariants}
               className="mt-auto border-t border-white/10 pt-8"
            >
               <div className="flex items-center justify-between">
                  <span className="text-neutral-500 text-sm">Follow us</span>
                  <div className="flex gap-6 text-white">
                     <a href="#"><Facebook size={20} strokeWidth={1.5} /></a>
                     <a href="#"><Instagram size={20} strokeWidth={1.5} /></a>
                     <a href="#"><Twitter size={20} strokeWidth={1.5} /></a>
                     <a href="#"><Linkedin size={20} strokeWidth={1.5} /></a>
                  </div>
               </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}