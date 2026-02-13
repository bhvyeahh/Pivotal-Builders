"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Menu, 
  X,
  Instagram 
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

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuVariants: Variants = {
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

  const linkVariants: Variants = {
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
  
  {/* ========================
      LEFT SIDE: LOGO + NAV LINKS
  ======================== */}
  <div className="flex items-center gap-12 xl:gap-18">
    
    {/* LOGO CONFIGURATION 
        1. Added -ml-3 md:-ml-4 to pull it to the absolute left edge.
        2. Kept your scale values (2.6/2.8) but increased width (w-60) so it doesn't overlap links.
    */}
    <Link href="/" className="relative z-50 block w-40 h-20 md:w-60 md:h-16 shrink-0 -ml-16 md:-ml-4">
        <Image 
          src="/logo.png" 
          alt="Pivotal Builders Logo" 
          fill
          className="object-contain object-left scale-[2.6] md:scale-[2.8] origin-left"
          priority
        />
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-400 relative z-50">
      {navLinks.slice(0, 4).map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
            {link.name}
          </Link>
      ))}
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
    </nav>
  </div>

  {/* ========================
      RIGHT SIDE: ACTIONS
  ======================== */}
  <div className="flex items-center gap-6 z-50 relative">
    
    {/* Instagram Link (Desktop) */}
    <a 
      href="https://www.instagram.com/pivotalbuilders/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hidden lg:flex text-white/80 hover:text-white transition-colors"
    >
        <Instagram size={20} />
    </a>

    {/* License Number (Desktop) */}
    <div className="hidden xl:block text-white/90 text-sm font-semibold font-mono tracking-wider drop-shadow-md">
        LIC. #1110507
    </div>

    {/* CTA Button */}
    <Link 
      href="/contact" 
      className="hidden md:flex bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group shadow-lg"
    >
      Get a quote 
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </Link>

    {/* Mobile Menu Toggle */}
    <button 
      className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors drop-shadow-md"
      onClick={() => setIsMobileMenuOpen(true)}
    >
      <Menu size={32} strokeWidth={1.5} />
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
      className="fixed inset-0 z-[60] bg-[#050505] flex flex-col w-screen h-[100dvh] overflow-y-auto"
    >
      {/* Header */}
      {/* p-6 ensures exact alignment with nav links below */}
      <div className="flex justify-between items-center p-6 md:p-8 shrink-0 relative">
          
          {/* Mobile Menu Logo */}
          {/* Added -ml-4 to pull the logo leftwards */}
          <div className="relative w-40 h-20 -ml-18 pointer-events-none">
            <Image
              src="/logo.png" 
              alt="Pivotal Builders Logo" 
              fill
              className="object-contain object-left scale-[2.4] origin-left"
            />
          </div>

          {/* CLOSE BUTTON - Added z-50 to ensure it sits ON TOP of the logo's invisible box */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors relative z-50"
          >
            <X size={32} />
          </button>
      </div>

      {/* Navigation Links */}
      {/* Changed to motion.nav so staggerChildren works correctly */}
      <motion.nav 
        variants={menuVariants}
        className="flex flex-col gap-6 md:gap-8 flex-grow justify-center px-6 md:px-8 min-h-[400px]"
      >
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-fit"
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
      </motion.nav>

      {/* Bottom Footer Area */}
      <motion.div 
          variants={linkVariants}
          className="mt-auto border-t border-white/10 p-6 md:p-8 shrink-0 pb-12"
      >
          <div className="flex flex-col gap-8">
            
            {/* Instagram Link (Mobile Menu) */}
            <a 
              href="https://www.instagram.com/pivotalbuilders/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-neutral-300 transition-colors w-fit"
            >
              <div className="bg-white/10 p-3 rounded-full">
                  <Instagram size={20} />
              </div>
              <span className="text-lg font-light tracking-wide">Follow on Instagram</span>
            </a>

            {/* License Info */}
            <div className="flex flex-col gap-2">
              <span className="text-neutral-500 text-xs font-mono tracking-widest uppercase">
                Pivotal Builders Inc.
              </span>
              <span className="text-white text-lg font-bold tracking-wider">
                LIC. #1110507
              </span>
            </div>
            
          </div>
      </motion.div>

    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}