import { Globe, BookOpen, ExternalLink } from 'lucide-react';
import { Institution } from '../types';
import { motion } from 'motion/react';

interface InstitutionCardProps {
  institution: Institution;
  key?: string | number;
}

export default function InstitutionCard({ institution }: InstitutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[32px] border-[3px] border-brand-ink p-8 hover:shadow-[12px_12px_0px_0px_rgba(10,10,10,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group relative overflow-hidden h-full"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent-blue/5 rounded-bl-[60px] -mr-8 -mt-8 group-hover:bg-brand-accent-blue/10 transition-colors" />
      
      <div className="flex items-center gap-5 mb-6 relative z-10">
        <div className="w-16 h-16 bg-brand-ink rounded-2xl flex items-center justify-center border-[3px] border-brand-ink shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] flex-shrink-0 group-hover:-rotate-6 transition-transform">
          <span className="text-brand-accent-yellow font-display font-black text-3xl">{institution.name.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <div className="bg-brand-accent-blue border-[2px] border-brand-ink py-0.5 px-3 rounded-full inline-block mb-2 shadow-[2px_2px_0px_0px_rgba(10,10,10,1)]">
             <span className="text-[10px] font-black text-brand-ink uppercase tracking-wider">{institution.type}</span>
          </div>
          <h3 className="font-display font-black text-xl leading-tight text-brand-ink uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors">{institution.name}</h3>
        </div>
      </div>

      <p className="text-sm font-medium text-brand-ink/60 mb-10 leading-relaxed line-clamp-3 relative z-10">
        {institution.summary}
      </p>

      <div className="mt-auto pt-6 border-t-[3px] border-brand-ink/5 flex flex-col gap-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-brand-ink/30 uppercase tracking-tighter">Status</span>
            <div className="flex items-center gap-1.5 text-xs font-black text-brand-ink">
              <div className="w-2 h-2 bg-brand-accent-green rounded-full border border-brand-ink" />
              <span>Accredited</span>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-black text-brand-ink/30 uppercase tracking-tighter">Availability</span>
            <div className="flex items-center gap-1.5 text-xs font-black text-brand-ink">
              <BookOpen size={14} className="text-brand-ink" />
              <span>{institution.courseCount} Programmes</span>
            </div>
          </div>
        </div>
        
        <motion.a 
          href={institution.website} 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-brand-accent-purple text-brand-ink border-[3px] border-brand-ink py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] hover:shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] transition-all flex items-center justify-center gap-2 w-full"
        >
          Explore Institution
          <ExternalLink size={14} />
        </motion.a>
      </div>
    </motion.div>
  );
}
