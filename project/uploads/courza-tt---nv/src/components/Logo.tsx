import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function Logo({ size = 'md', className = "", onClick }: LogoProps) {
  const sizes = {
    sm: { box: 'w-8 h-8', text: 'text-lg' },
    md: { box: 'w-10 h-10', text: 'text-2xl' },
    lg: { box: 'w-14 h-14', text: 'text-4xl' },
  };

  const s = sizes[size];

  return (
    <div 
      className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 10 }}
          className={`${s.box} flex items-center justify-center`}
        >
          <svg 
            viewBox="0 0 40 40" 
            className="w-full h-full"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* The "C" shape */}
            <path 
              d="M28 10C25.5 8 22.5 7 19 7C11.8203 7 6 12.8203 6 20C6 27.1797 11.8203 33 19 33C22.5 33 25.5 32 28 30" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round"
              className="text-brand-ink"
            />
            {/* The Accent Dot */}
            <circle 
              cx="28" 
              cy="20" 
              r="5" 
              className="fill-brand-accent-green stroke-brand-ink" 
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>
      
      <div className="flex flex-col">
        <div className={`${s.text} font-display font-black tracking-tighter text-brand-ink flex items-baseline`}>
          <span>Courza</span>
          <span className="text-brand-ink ml-0.5">TT</span>
        </div>
      </div>
    </div>
  );
}
