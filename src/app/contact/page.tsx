"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ===========================================
// DATA: Services
// ===========================================
const serviceOptions = [
  "Full Home Remodel",
  "Kitchen Remodel",
  "Bathroom Remodel",
  "ADU / Extension",
  "Additions & Structural",
  "Custom Deck Build",
  "Other Inquiry"
];

export default function ContactPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Animation
      gsap.from('.reveal-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Submit -> Calls API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' }); // Reset form
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main ref={mainRef} className="w-full bg-white relative selection:bg-black selection:text-white">
      
      {/* =======================
          DARK HEADER (Fixes Navbar)
      ======================== */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-[#050505] text-white">
        <div className="max-w-[1400px] mx-auto">
           <span className="reveal-item block text-neutral-400 font-mono text-sm tracking-widest uppercase mb-6">
             Start the Conversation
           </span>
           <h1 className="reveal-item text-5xl md:text-7xl lg:text-[6vw] font-bold tracking-tighter leading-none mb-6">
             CONTACT US
           </h1>
           <p className="reveal-item text-neutral-400 text-lg md:text-xl max-w-2xl font-light">
             Ready to start your project? Fill out the form below or contact us directly to discuss your vision.
           </p>
        </div>
      </section>

      {/* =======================
          MAIN CONTENT (Split)
      ======================== */}
      <section className="py-24 px-6 md:px-12 bg-white text-black">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT: Contact Info (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            
            <div className="reveal-item bg-[#F9F9F9] p-8 rounded-2xl border border-neutral-100">
               <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Contact Info</h3>
               
               <div className="space-y-8">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="mt-1 text-black" />
                    <div>
                      <p className="text-sm font-medium text-neutral-500 mb-1">Phone</p>
                      <a href="tel:4156109225" className="text-lg font-bold hover:text-neutral-600 transition-colors">415-610-9225</a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail size={20} className="mt-1 text-black" />
                    <div>
                      <p className="text-sm font-medium text-neutral-500 mb-1">Email</p>
                      <a href="mailto:info@pivotalbuildersinc.com" className="text-lg font-bold hover:text-neutral-600 transition-colors break-all">info@pivotalbuildersinc.com</a>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="mt-1 text-black" />
                    <div>
                      <p className="text-sm font-medium text-neutral-500 mb-1">Office</p>
                      <p className="text-lg font-medium leading-tight">2560 Geary Blvd Unit 204<br/>San Francisco, CA</p>
                      <p className="text-xs text-neutral-400 mt-2 font-mono">CA LIC 1123494</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="reveal-item">
               <p className="text-neutral-400 text-sm leading-relaxed">
                 "We believe the process should be as rewarding as the result. Let's discuss how we can bring your vision to life."
               </p>
               <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-neutral-300"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-900">Paul Magill</span>
               </div>
            </div>

          </div>


          {/* RIGHT: The Form (Span 8) */}
          <div className="lg:col-span-8 reveal-item">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full bg-white border-b border-neutral-200 px-0 py-4 focus:outline-none focus:border-black transition-colors text-lg placeholder:text-neutral-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-white border-b border-neutral-200 px-0 py-4 focus:outline-none focus:border-black transition-colors text-lg placeholder:text-neutral-300"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full bg-white border-b border-neutral-200 px-0 py-4 focus:outline-none focus:border-black transition-colors text-lg placeholder:text-neutral-300"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Service Needed</label>
                  <div className="relative">
                    <select 
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-white border-b border-neutral-200 px-0 py-4 appearance-none focus:outline-none focus:border-black transition-colors text-lg text-neutral-900"
                    >
                      <option value="" disabled className="text-neutral-300">Select an option...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="space-y-2 pt-4">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Project Details</label>
                <textarea 
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white border-b border-neutral-200 px-0 py-4 focus:outline-none focus:border-black transition-colors text-lg placeholder:text-neutral-300 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={status === 'submitting' || status === 'success'}
                  className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-neutral-800 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent Successfully' : 'Send Message'}
                  {status === 'idle' && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <p className="text-green-600 text-sm font-medium animate-pulse mt-4">
                  Thank you! We'll be in touch shortly.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm font-medium mt-4">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}