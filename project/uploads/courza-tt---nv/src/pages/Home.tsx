import React from 'react';
import { Search, ChevronRight, ArrowRight, MessageSquare, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, COURSES, FAQS, BLOG_POSTS } from '../data';
import CourseCard from '../components/CourseCard';
import { useState } from 'react';
import { FAQCategory, FAQ } from '../types';

function FaqAccordionItem({ faq, idx }: { faq: FAQ, idx: number, key?: string | number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className={`group rounded-[32px] border-2 transition-all duration-500 overflow-hidden ${
        isExpanded 
          ? 'bg-white border-brand-ink shadow-2xl shadow-brand-ink/10 mt-6 mb-6' 
          : 'border-brand-ink/5 bg-[#F9F9F9] hover:bg-white hover:border-brand-ink/20'
      }`}
    >
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-8 text-left"
      >
        <span className="font-display font-black text-lg md:text-xl leading-tight pr-8">
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isExpanded 
            ? 'bg-brand-ink text-white rotate-[225deg]' 
            : 'bg-white text-brand-ink shadow-sm'
        }`}>
          <Plus size={24} />
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            <div className="px-8 pb-8 text-brand-ink/60 text-lg leading-relaxed font-medium max-w-2xl">
              {faq.answer}
              <div className="mt-8 flex items-center gap-4">
                 <div className="h-[2px] w-8 bg-brand-accent-green/20" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-brand-ink/30 italic">Helpful Resource</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface HomeProps {
  onDiscover: () => void;
  onFAQ: () => void;
}

export default function Home({ onDiscover, onFAQ }: HomeProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const featuredCourses = COURSES.filter(c => c.featured).slice(0, 3);

  return (
    <div className="space-y-32 mb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 pt-16 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-8xl font-display font-bold text-brand-ink leading-[0.95] mb-8">
                Learning skills <br />
                for a <span className="text-brand-accent-green">better you</span>
              </h1>
              <p className="text-xl text-brand-ink/50 max-w-lg mb-12 leading-relaxed font-medium">
                One place to discover programmes from public, private, and government institutions across Trinidad & Tobago.
              </p>
              
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="flex-grow flex bg-white rounded-[24px] p-2 border-[3px] border-brand-ink shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] group focus-within:shadow-[12px_12px_0px_0px_rgba(10,10,10,1)] transition-all w-full max-w-2xl">
                  <div className="flex items-center pl-6 text-brand-ink/30 italic">
                    <Search size={24} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search for courses, skills, or institutions..." 
                    className="flex-grow bg-transparent py-5 px-6 focus:outline-none text-lg font-black placeholder:text-brand-ink/20"
                  />
                  <button 
                    onClick={onDiscover}
                    className="bg-brand-ink text-white px-10 py-5 rounded-[18px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-8 pl-2">
                <button 
                  onClick={onFAQ}
                  className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-brand-ink/40 hover:text-brand-ink transition-all"
                >
                  <span className="relative">
                    Learn more
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-ink transition-all group-hover:w-full" />
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square max-w-xl mx-auto"
            >
              {/* Rounded imagery container - simulation of user photo */}
              <div className="absolute inset-0 bg-[#E5F0D0] rounded-[100px] transform -rotate-12 translate-x-4" />
              <div className="absolute inset-0 bg-brand-ink rounded-[100px] border-[12px] border-brand-ink overflow-hidden z-10 shadow-2xl group">
                 <img 
                   src="https://i.ibb.co/VWKrpJ69/Courzaheroimage1.png" 
                   alt="Learner" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   referrerPolicy="no-referrer"
                 />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Explore <span className="text-brand-accent-green">Top Categories</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Agriculture", color: "bg-brand-accent-purple", icon: "🌱" },
            { name: "Technical", color: "bg-brand-accent-blue", icon: "⚙️" },
            { name: "Creative Arts", color: "bg-brand-accent-green", icon: "🎨" },
            { name: "Technology", color: "bg-brand-accent-yellow", icon: "💻" },
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className={`${cat.color} border-[3px] border-brand-ink rounded-[32px] h-44 flex items-center justify-center transition-all duration-300 group-hover:shadow-[12px_12px_0px_0px_rgba(10,10,10,1)] group-hover:-translate-y-1`}>
                <span className="text-xl font-display font-black text-brand-ink px-6 text-center">{cat.name}</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-brand-ink rounded-2xl flex items-center justify-center shadow-xl z-10 group-hover:scale-110 transition-transform group-hover:rotate-12 border-4 border-white/20">
                <span className="text-xl">{cat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-24 text-center">
            <button 
              onClick={onDiscover}
              className="bg-brand-ink text-white px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-brand-ink/20"
            >
              View All 15+ Categories
            </button>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Trending <span className="text-brand-accent-blue">Courses</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-20 text-center">
             <button 
                onClick={onDiscover}
                className="bg-brand-ink text-white px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-brand-ink/20"
              >
                View All Courses
              </button>
        </div>
      </section>

      {/* Course Guides Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">Our <span className="text-brand-accent-green">Course Guides</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border-2 border-brand-ink rounded-[40px] overflow-hidden group flex flex-col hover:shadow-[12px_12px_0px_0px_rgba(183,201,154,1)] transition-all duration-500"
            >
              <div className="aspect-[16/10] bg-brand-ink/5 overflow-hidden relative">
                {/* Simulated blog imagery */}
                <div className="w-full h-full bg-brand-accent-blue/10 flex items-center justify-center italic text-brand-ink/10 text-2xl font-black group-hover:scale-110 transition-transform duration-700">
                  ARTICLE {idx + 1}
                </div>
              </div>
              <div className="p-9 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-black mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-border/50">
                  <span className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest">{post.date}</span>
                  <span className="text-sm font-bold text-brand-ink/40 uppercase tracking-widest">{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="bg-brand-ink text-white px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-brand-ink/20">
            Read More
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 md:px-6 scroll-mt-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-6 tracking-tight">Got <span className="text-blue-600">Questions?</span></h2>
            <p className="text-brand-ink/50 text-xl max-w-xl mx-auto font-medium">
              Everything you need to know about navigating your learning journey with CourzaTT.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* FAQ Sidebar Navigation */}
            <div className="lg:w-1/3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none">
              {FAQS.map((cat, idx) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveFaq(cat.title)}
                  className={`px-8 py-5 rounded-2xl text-sm font-black uppercase tracking-widest whitespace-nowrap lg:whitespace-normal text-left transition-all border-2 ${
                    (activeFaq || FAQS[0].title) === cat.title 
                      ? 'bg-brand-ink border-brand-ink text-white shadow-2xl shadow-brand-ink/20 scale-[1.05]' 
                      : 'bg-white border-transparent text-brand-ink/40 hover:bg-brand-ink/5 hover:text-brand-ink'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="opacity-30">0{idx + 1}</span>
                    <span>{cat.title}</span>
                  </div>
                </button>
              ))}
              
              <div className="hidden lg:block mt-8 p-8 bg-brand-accent-blue/5 rounded-[32px] border-2 border-brand-ink/5">
                <p className="text-sm font-bold text-brand-ink mb-4 italic">Still stuck? Our support team is always ready to help you out.</p>
                <button className="flex items-center gap-2 text-brand-accent-blue font-black uppercase text-xs tracking-widest hover:translate-x-2 transition-transform">
                  Contact Support <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* FAQ Questions List */}
            <div className="lg:w-2/3 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFaq || FAQS[0].title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {FAQS.find(cat => cat.title === (activeFaq || FAQS[0].title))?.questions.map((faq, idx) => (
                    <FaqAccordionItem key={`${activeFaq}-${idx}`} faq={faq} idx={idx} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
