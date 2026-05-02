import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Layout({ children, activePage, setActivePage }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Discover Courses', id: 'discover' },
    { name: 'Institutions', id: 'institutions' },
    { name: 'List Your Institution', id: 'list' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-brand-cream/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActivePage('home')}
          >
            <Logo size="md" />
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`text-sm font-semibold transition-all hover:opacity-100 ${
                  activePage === link.id ? 'text-brand-ink opacity-100' : 'text-brand-ink opacity-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="p-2.5 hover:bg-brand-ink/5 rounded-full transition-colors relative">
              <Heart size={20} />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-border shadow-xl md:hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActivePage(link.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left text-lg font-bold ${
                      activePage === link.id ? 'text-brand-ink' : 'text-brand-ink/40'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-24">
        {children}
      </main>

      <footer className="bg-[#F3F2EC] text-brand-ink pt-24 pb-12 border-t border-brand-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            <div className="col-span-1 md:col-span-4">
              <Logo size="lg" className="mb-8" onClick={() => setActivePage('home')} />
              <p className="text-brand-ink/50 max-w-sm mb-10 leading-relaxed text-lg">
                The hub for discovering your next milestone. Bridging the gap between learners and institutions.
              </p>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h4 className="font-display font-bold mb-8 text-xl">Directory</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setActivePage('discover')} className="text-brand-ink/50 hover:text-brand-ink transition-colors">Courses</button></li>
                <li><button onClick={() => setActivePage('institutions')} className="text-brand-ink/50 hover:text-brand-ink transition-colors">Institutions</button></li>
                <li><button onClick={() => setActivePage('list')} className="text-brand-ink/50 hover:text-brand-ink transition-colors">Partner with us</button></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h4 className="font-display font-bold mb-8 text-xl">Support</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setActivePage('home')} className="text-brand-ink/50 hover:text-brand-ink transition-colors">FAQs</button></li>
                <li><button className="text-brand-ink/50 hover:text-brand-ink transition-colors">Contact</button></li>
                <li><button className="text-brand-ink/50 hover:text-brand-ink transition-colors">Privacy</button></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-4">
              <h4 className="font-display font-bold mb-8 text-xl">Newsletter</h4>
              <p className="text-brand-ink/50 mb-6 font-medium">Get the latest course guides and institutional updates.</p>
              <div className="flex bg-white rounded-full p-2 border border-brand-border shadow-sm">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-grow bg-transparent py-2 px-4 focus:outline-none text-sm font-medium"
                />
                <button className="bg-brand-ink text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-ink/90 transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium text-brand-ink/40">
            <p>&copy; 2026 CourzaTT Trinidad & Tobago. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-ink">Instagram</a>
              <a href="#" className="hover:text-brand-ink">LinkedIn</a>
              <a href="#" className="hover:text-brand-ink">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
