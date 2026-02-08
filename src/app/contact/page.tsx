"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, Phone, Mail, Home, Hammer, Bath, Ruler, CheckCircle2, Clock, DollarSign, ChevronRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ===========================================
// DATA: Project Planner Steps
// ===========================================
const PLANNING_STEPS = [
  {
    id: 'service',
    question: "What type of project are you planning?",
    options: [
      { label: "Full Home Remodel", icon: Home },
      { label: "Kitchen Renovation", icon: Hammer },
      { label: "Bathroom Remodel", icon: Bath },
      { label: "ADU / Addition", icon: Ruler },
      { label: "Custom Deck", icon: Home }, // Reusing Home icon for simplicity or add Deck icon
      { label: "Other", icon: CheckCircle2 },
    ]
  },
  {
    id: 'timeline',
    question: "When are you hoping to start?",
    options: [
      { label: "Immediately", icon: Clock },
      { label: "1-3 Months", icon: Clock },
      { label: "3-6 Months", icon: Clock },
      { label: "Just Browsing", icon: Clock },
    ]
  },
  {
    id: 'budget',
    question: "What is your estimated budget?",
    options: [
      { label: "$50k - $100k", icon: DollarSign },
      { label: "$100k - $250k", icon: DollarSign },
      { label: "$250k - $500k", icon: DollarSign },
      { label: "$500k+", icon: DollarSign },
    ]
  }
];

export default function ContactPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  
  // State for Wizard
  const [currentStep, setCurrentStep] = useState(0);
  const [plannerData, setPlannerData] = useState({
    service: '',
    timeline: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

  // Handle Option Selection (Auto-advance)
  const handleSelect = (key: string, value: string) => {
    setPlannerData(prev => ({ ...prev, [key]: value }));
    // Delay slightly for visual feedback before moving next
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 250);
  };

  // Handle Text Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPlannerData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Final Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Combine wizard data into a single message for the email
    const fullMessage = `
      Project Type: ${plannerData.service}
      Timeline: ${plannerData.timeline}
      Budget: ${plannerData.budget}
      
      Additional Notes:
      ${plannerData.message}
    `;

    const payload = {
      name: plannerData.name,
      email: plannerData.email,
      phone: plannerData.phone,
      service: plannerData.service,
      message: fullMessage
    };

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setPlannerData({ service: '', timeline: '', budget: '', name: '', email: '', phone: '', message: '' });
    setStatus('idle');
  };

  return (
    <main ref={mainRef} className="w-full bg-white relative selection:bg-black selection:text-white">
      
      {/* =======================
          DARK HEADER
      ======================== */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-[#050505] text-white">
        <div className="max-w-[1400px] mx-auto">
           <span className="reveal-item block text-neutral-400 font-mono text-sm tracking-widest uppercase mb-6">
             Start Your Journey
           </span>
           <h1 className="reveal-item text-5xl md:text-7xl lg:text-[6vw] font-bold tracking-tighter leading-none mb-6">
             Contact <br/> Now
           </h1>
           <p className="reveal-item text-neutral-400 text-lg md:text-xl max-w-2xl font-light">
             Use our interactive planner to tell us about your vision. We'll review your details and get back to you with a personalized consultation.
           </p>
        </div>
      </section>

      {/* =======================
          MAIN CONTENT (Split)
      ======================== */}
      <section className="py-24 px-6 md:px-12 bg-white text-black min-h-screen">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT: Contact Info (Static) */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div className="reveal-item bg-[#F9F9F9] p-8 rounded-2xl border border-neutral-100">
               <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Direct Contact</h3>
               <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="mt-1 text-black" />
                    <div>
                      <p className="text-sm font-medium text-neutral-500 mb-1">Phone</p>
                      <a href="tel:4156109225" className="text-lg font-bold hover:text-neutral-600 transition-colors">415-610-9225</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail size={20} className="mt-1 text-black" />
                    <div>
                      <p className="text-sm font-medium text-neutral-500 mb-1">Email</p>
                      <a href="mailto:info@pivotalbuildersinc.com" className="text-lg font-bold hover:text-neutral-600 transition-colors break-all">info@pivotalbuildersinc.com</a>
                    </div>
                  </div>
               </div>
            </div>
            <div className="reveal-item">
               <p className="text-neutral-400 text-sm leading-relaxed">
                 "We prioritize clear communication and precise execution. Your project starts with a conversation."
               </p>
               <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-neutral-300"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-900">Paul Magill</span>
               </div>
            </div>
          </div>


          {/* RIGHT: THE INTERACTIVE WIZARD */}
          <div className="lg:col-span-8 reveal-item">
            <div className="bg-white border border-neutral-200 rounded-[2rem] overflow-hidden shadow-2xl min-h-[600px] relative flex flex-col">
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-neutral-100">
                <motion.div 
                  className="h-full bg-black"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / (PLANNING_STEPS.length + 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Wizard Content Area */}
              <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* SUCCESS STATE */}
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
                        <CheckCircle2 size={48} />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
                      <p className="text-neutral-500 text-lg mb-8 max-w-md mx-auto">
                        Thank you for sharing your project details. I will review your plan and contact you shortly to discuss the next steps.
                      </p>
                      <button 
                        onClick={resetForm}
                        className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition-opacity"
                      >
                        Start New Plan
                      </button>
                    </motion.div>
                  ) : (
                    
                    // WIZARD STEPS
                    currentStep < PLANNING_STEPS.length ? (
                      <motion.div
                        key={`step-${currentStep}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* ADD THIS BACK BUTTON BLOCK */}
{currentStep > 0 && (
  <button 
    onClick={() => setCurrentStep(prev => prev - 1)} 
    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-black mb-6 transition-colors"
  >
    <ArrowLeft size={14} /> Back
  </button>
)}
                        <h2 className="text-3xl md:text-4xl font-medium mb-10 text-center">
                          {PLANNING_STEPS[currentStep].question}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {PLANNING_STEPS[currentStep].options.map((opt) => (
                            <button
                              key={opt.label}
                              onClick={() => handleSelect(PLANNING_STEPS[currentStep].id, opt.label)}
                              className="group flex items-center gap-4 p-6 rounded-xl border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-all text-left"
                            >
                              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-black group-hover:text-white transition-colors">
                                {opt.icon && <opt.icon size={20} />}
                              </div>
                              <span className="text-lg font-medium">{opt.label}</span>
                              <ChevronRight className="ml-auto text-neutral-300 group-hover:text-black transition-colors" size={20} />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      
                      // FINAL STEP: CONTACT DETAILS
                      <motion.div
                        key="final-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="mb-8">
                           <button onClick={() => setCurrentStep(prev => prev - 1)} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-black mb-4 transition-colors">
                             <ArrowLeft size={14} /> Back
                           </button>
                           <h2 className="text-3xl font-medium">Almost Done.</h2>
                           <p className="text-neutral-500">Where should we send your project estimate?</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <input 
                                required name="name" type="text" placeholder="Full Name" value={plannerData.name} onChange={handleChange}
                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 focus:outline-none focus:border-black transition-colors"
                              />
                              <input 
                                required name="email" type="email" placeholder="Email Address" value={plannerData.email} onChange={handleChange}
                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 focus:outline-none focus:border-black transition-colors"
                              />
                           </div>
                           <input 
                              required name="phone" type="tel" placeholder="Phone Number" value={plannerData.phone} onChange={handleChange}
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 focus:outline-none focus:border-black transition-colors"
                           />
                           <textarea 
                              name="message" rows={3} placeholder="Any specific details or questions? (Optional)" value={plannerData.message} onChange={handleChange}
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 focus:outline-none focus:border-black transition-colors resize-none"
                           ></textarea>

                           <button 
                             type="submit" 
                             disabled={status === 'submitting'}
                             className="w-full bg-black text-white py-5 rounded-xl font-bold text-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                           >
                             {status === 'submitting' ? 'Sending...' : 'Complete & Send Request'}
                             {status !== 'submitting' && <ArrowRight size={20} />}
                           </button>
                        </form>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>

              {/* Step Indicator */}
              <div className="p-4 border-t border-neutral-100 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-neutral-400 bg-neutral-50">
                 <span>Step {Math.min(currentStep + 1, 4)} of 4</span>
                 {currentStep < 3 && <span className="text-black">Select an option</span>}
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}