import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { INSTITUTIONS } from '../data';
import InstitutionCard from '../components/InstitutionCard';
import { motion } from 'motion/react';

export default function Institutions() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredInstitutions = INSTITUTIONS.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = !selectedType || inst.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = ['Public', 'Private', 'NGO', 'Technical', 'Other'];

  return (
    <div className="container mx-auto px-4 md:px-6 mb-32">
      <div className="flex flex-col gap-12 pt-20">
        <div className="text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-brand-accent-green border-[3px] border-brand-ink px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[4px_4px_0px_0px_rgba(10,10,10,1)]"
          >
            Institutional Network
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-brand-ink leading-[0.95] mb-8 tracking-tighter">
            Our Caribbean <br />
            <span className="text-brand-accent-blue">Partners</span>
          </h1>
          <p className="text-brand-ink/60 text-xl md:text-2xl max-w-3xl font-medium leading-relaxed">
            We bridge the gap between ambitious learners and the Caribbean's most prestigious universities, technical schools, and government training centres.
          </p>
        </div>

        <div className="flex flex-col gap-10 bg-brand-accent-blue/10 border-[3px] border-brand-ink rounded-[40px] p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(10,10,10,1)]">
           <div className="flex flex-col lg:flex-row gap-8 items-end">
            <div className="relative group w-full lg:flex-1">
              <label className="text-xs font-black text-brand-ink/40 uppercase tracking-widest mb-3 block pl-2">Search Network</label>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-ink/40" size={24} />
                <input 
                  type="text" 
                  placeholder="Find a specific institution..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border-[3px] border-brand-ink rounded-[24px] py-6 pl-16 pr-8 text-xl font-bold focus:outline-none focus:ring-8 focus:ring-brand-accent-blue/20 transition-all shadow-[4px_4px_0px_0px_rgba(10,10,10,1)]"
                />
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <label className="text-xs font-black text-brand-ink/40 uppercase tracking-widest mb-3 block pl-2">Institution Type</label>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setSelectedType(null)}
                  className={`px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider border-[3px] transition-all shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] active:translate-y-1 active:shadow-none ${!selectedType ? 'bg-brand-ink border-brand-ink text-white' : 'bg-white border-brand-ink text-brand-ink hover:bg-brand-ink/5'}`}
                >
                  All
                </button>
                {types.map(t => (
                  <button 
                    key={t}
                    onClick={() => setSelectedType(selectedType === t ? null : t)}
                    className={`px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider border-[3px] transition-all shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] active:translate-y-1 active:shadow-none ${selectedType === t ? 'bg-brand-ink border-brand-ink text-white' : 'bg-white border-brand-ink text-brand-ink hover:bg-brand-ink/5'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filteredInstitutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredInstitutions.map(inst => (
              <InstitutionCard key={inst.id} institution={inst} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[40px] border-[3px] border-brand-ink shadow-[16px_16px_0px_0px_rgba(10,10,10,1)]">
            <div className="w-24 h-24 bg-brand-accent-yellow rounded-2xl border-[3px] border-brand-ink flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] -rotate-6">
               <Search size={40} className="text-brand-ink" />
            </div>
            <p className="text-4xl text-brand-ink font-display font-black mb-4 uppercase italic tracking-tighter">No Matches Found</p>
            <p className="text-brand-ink/50 max-w-sm mx-auto font-bold text-lg">We couldn't find any institutions matching your criteria.</p>
            <button 
              onClick={() => {setSearch(''); setSelectedType(null);}}
              className="mt-10 bg-brand-accent-green text-brand-ink border-[3px] border-brand-ink px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] hover:shadow-[10px_10px_0px_0px_rgba(10,10,10,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
