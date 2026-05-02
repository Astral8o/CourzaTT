import { Heart, Share2, MapPin, Calendar, Clock, Globe, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { motion } from 'motion/react';

interface CourseCardProps {
  course: Course;
  layout?: 'grid' | 'wide';
  key?: string | number;
}

export default function CourseCard({ course, layout = 'grid' }: CourseCardProps) {
  const isWide = layout === 'wide';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group bg-white rounded-[24px] border-2 border-brand-ink overflow-hidden hover:shadow-[12px_12px_0px_0px_rgba(215,196,255,1)] transition-all duration-500 ${
        isWide ? 'flex flex-col md:flex-row min-h-[220px]' : 'flex flex-col'
      }`}
    >
      {/* Imagery / Placeholder Column */}
      <div className={`relative overflow-hidden bg-brand-ink/5 ${isWide ? 'md:w-40 flex-shrink-0 border-r-2 border-brand-ink/5' : 'aspect-[2.5/1]'}`}>
        <div className="w-full h-full flex items-center justify-center text-brand-ink/10 font-display font-black text-6x group-hover:scale-110 transition-transform duration-700">
          {course.institutionName.charAt(0)}
        </div>
      </div>

      {/* Center Content Column (or Main Content for Vertical) */}
      <div className={`flex flex-col flex-grow min-w-0 ${isWide ? 'p-6 md:p-8' : 'p-7 md:p-9'}`}>
        <div className="flex-grow">
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-brand-ink text-white rounded-lg text-[8px] font-black uppercase tracking-[0.1em]">
                {course.type}
              </span>
              <span className="px-2.5 py-1 bg-brand-accent-blue/20 text-brand-ink rounded-lg text-[8px] font-black uppercase tracking-[0.1em] border border-brand-ink/5">
                {course.category}
              </span>
            </div>
            <p className="text-[11px] font-black text-brand-ink uppercase tracking-[0.15em] border-l-4 border-brand-accent-green pl-3 leading-none">
              {course.institutionName}
            </p>
          </div>
          
          <h3 className={`${isWide ? 'text-xl md:text-2xl' : 'text-xl md:text-2xl'} font-display font-black leading-tight mb-4 group-hover:text-blue-600 transition-colors`}>
            {course.title}
          </h3>

          <p className="text-sm text-brand-ink/60 line-clamp-2 mb-8 leading-relaxed font-medium">
            {course.summary}
          </p>

          {!isWide && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-brand-ink/30 uppercase tracking-tighter">Starts</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-ink">
                  <Calendar size={12} className="text-brand-accent-green" />
                  <span className="truncate">{course.startDate}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-brand-ink/30 uppercase tracking-tighter">Deadline</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-ink">
                  <Clock size={12} className="text-brand-accent-green" />
                  <span className="truncate">{course.deadline}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-brand-ink/30 uppercase tracking-tighter">Delivery</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-ink">
                  <Globe size={12} className="text-brand-accent-blue" />
                  <span className="truncate">{course.delivery}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-brand-ink/30 uppercase tracking-tighter">Location</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-ink">
                  <MapPin size={12} className="text-brand-accent-blue" />
                  <span className="truncate">{course.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`flex items-center gap-4 mt-auto ${!isWide ? 'pt-6 border-t border-brand-ink/5' : ''}`}>
          <div className="flex-grow">
            {!isWide && <span className="text-[9px] font-black text-brand-ink/20 uppercase block mb-0.5">Cost</span>}
            <span className={`${isWide ? 'text-2xl' : 'text-xl'} font-display font-black text-brand-ink`}>{course.cost}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl border-2 border-brand-ink/5 hover:border-brand-ink hover:text-red-500 transition-all text-brand-ink/30" title="Save">
              <Heart size={16} />
            </button>
            <button 
              className="p-2.5 rounded-xl border-2 border-brand-ink/5 hover:border-brand-ink hover:text-blue-500 transition-all text-brand-ink/30" 
              title="Share"
              onClick={(e) => {
                e.stopPropagation();
                if (navigator.share) {
                  navigator.share({
                    title: course.title,
                    text: `Check out this course: ${course.title} at ${course.institutionName}`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
            >
              <Share2 size={16} />
            </button>
            <button className="bg-brand-ink text-white px-6 py-3 rounded-xl font-bold text-xs hover:scale-105 transition-all">
              Visit Website
            </button>
          </div>
        </div>
      </div>

      {/* Right Metadata Column (Only for Wide Layout) */}
      {isWide && (
        <div className="hidden lg:flex w-72 bg-brand-ink/[0.02] border-l-2 border-brand-ink/5 p-8 flex-col justify-between">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-ink/30">
                <BookOpen size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Type</span>
              </div>
              <p className="text-xs font-black text-brand-ink truncate">{course.type}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-ink/30">
                <Calendar size={14} className="text-brand-accent-green" />
                <span className="text-[9px] font-black uppercase tracking-widest">Start</span>
              </div>
              <p className="text-xs font-black text-brand-ink truncate">{course.startDate}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-ink/30">
                <Clock size={14} className="text-brand-accent-green" />
                <span className="text-[9px] font-black uppercase tracking-widest">Deadline</span>
              </div>
              <p className="text-xs font-black text-brand-ink truncate">{course.deadline}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-ink/30">
                <Globe size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Format</span>
              </div>
              <p className="text-xs font-black text-brand-ink">{course.delivery}</p>
            </div>

            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-2 text-brand-ink/30">
                <MapPin size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Location</span>
              </div>
              <p className="text-xs font-black text-brand-ink truncate">{course.location}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-ink/5">
            <span className="text-[9px] font-black text-brand-ink/20 uppercase tracking-tighter block mb-1">Cost</span>
            <span className="text-2xl font-display font-black text-brand-ink">{course.cost}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
