import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ListInstitution() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 mb-32">
      <div className="flex flex-col lg:flex-row gap-20 pt-12">
        {/* Left Side: Copy */}
        <div className="lg:w-1/2">
          <div className="inline-block bg-brand-ink text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            For Institutions
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold mb-8 tracking-tight">List your <br />institution.</h1>
          <p className="text-brand-ink/60 text-xl leading-relaxed mb-10">
            Join the growing directory of T&T institutions on CourzaTT. Reach learners who are 
            actively searching for accredited programmes, professional workshops, and training 
            opportunities.
          </p>

          <div className="space-y-6">
            {[
              "Reach active learners across T&T",
              "Showcase your programmes and workshops",
              "Direct traffic to your own website",
              "Verified trust badge for your profile"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-1/2">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[40px] border-[3px] border-brand-ink overflow-hidden shadow-[16px_16px_0px_0px_rgba(10,10,10,1)]"
              >
                <div className="h-48 md:h-64 overflow-hidden border-b-[3px] border-brand-ink bg-brand-accent-blue/10">
                  <img 
                    src="https://i.ibb.co/DPy1t6Mh/courzattlistyourinstitution1.png" 
                    alt="Registration banner" 
                    className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest pl-1">Institution Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. UWI Global Campus" 
                      className="w-full bg-brand-ink/5 border border-brand-border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-ink transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest pl-1">Contact Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. admin@institution.edu.tt" 
                      className="w-full bg-brand-ink/5 border border-brand-border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-ink transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest pl-1">Contact Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +1 (868) 000-0000" 
                      className="w-full bg-brand-ink/5 border border-brand-border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-ink transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest pl-1">Institution Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Public', 'Private', 'NGO', 'Technical', 'Other'].map(type => (
                        <label key={type} className="flex items-center gap-3 p-4 border border-brand-border rounded-2xl cursor-pointer hover:bg-brand-ink/5 transition-colors">
                          <input type="radio" name="type" className="accent-brand-ink" value={type} required />
                          <span className="text-sm font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest pl-1">Brief Description</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell learners about your institution..." 
                      className="w-full bg-brand-ink/5 border border-brand-border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-ink transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-ink text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-ink/10"
                  >
                    Submit Enquiry
                    <Send size={18} />
                  </button>
                  <p className="text-center text-[10px] text-brand-ink/30 px-6">
                    By submitting, you agree to our Terms of Service for Institutions and 
                    our Privacy Policy.
                  </p>
                </form>
              </div>
            </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[40px] border border-brand-border p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">Enquiry Submitted!</h2>
                <p className="text-brand-ink/60 mb-10 max-w-sm">
                  Thank you for your interest in CourzaTT. Our team will review your application 
                  and reach out to you within 2-3 business days.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="flex items-center gap-2 text-brand-ink font-bold hover:underline"
                >
                  Return to form
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
