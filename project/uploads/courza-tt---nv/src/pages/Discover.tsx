import { Search, SlidersHorizontal, ChevronDown, X, Filter } from 'lucide-react';
import { CATEGORIES, COURSES } from '../data';
import CourseCard from '../components/CourseCard';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ITEMS_PER_PAGE = 12;

export default function Discover() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [limit, setLimit] = useState(ITEMS_PER_PAGE);

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                           course.institutionName.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesType = !selectedType || course.type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, selectedCategory, selectedType]);

  const displayedCourses = filteredCourses.slice(0, limit);

  const types = Array.from(new Set(COURSES.map(c => c.type)));

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory(null);
    setSelectedType(null);
    setLimit(ITEMS_PER_PAGE);
  };

  const hasFilters = search || selectedCategory || selectedType;

  return (
    <div className="container mx-auto px-4 md:px-6 mb-32">
      <div className="flex flex-col gap-8">
        {/* Top Header */}
        <div className="pt-12 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">Discover <span className="text-brand-accent-green">Programmes</span></h1>
          <p className="text-brand-ink/50 text-xl max-w-2xl font-medium">
            Find the right path among {COURSES.length} accredited options from leading institutions across Trinidad & Tobago.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-ink/30 group-focus-within:text-brand-ink transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Search for courses, degrees, or institutions..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLimit(ITEMS_PER_PAGE); // Reset pagination on search
            }}
            className="w-full bg-white border-4 border-brand-ink rounded-[32px] py-6 pl-16 pr-8 text-xl font-bold focus:outline-none focus:ring-4 focus:ring-brand-ink/5 transition-all shadow-xl shadow-brand-ink/5"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mt-8">
          {/* Side Filters (Refined) */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-12 space-y-12">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black uppercase tracking-[0.2em] text-[10px] text-brand-ink/30">Filter By</h3>
                  {hasFilters && (
                    <button 
                      onClick={clearFilters}
                      className="text-[10px] font-black text-brand-accent-green hover:underline underline-offset-4 uppercase tracking-widest"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                <div className="space-y-10">
                  {/* Category Filter */}
                  <div className="space-y-5">
                    <h4 className="text-xs font-black text-brand-ink uppercase tracking-widest">Industry</h4>
                    <div className="flex flex-col gap-2.5">
                      <button 
                        onClick={() => setSelectedCategory(null)}
                        className={`text-left text-sm font-bold transition-colors ${!selectedCategory ? 'text-brand-ink' : 'text-brand-ink/40 hover:text-brand-ink'}`}
                      >
                        All Industries
                      </button>
                      {CATEGORIES.slice(0, 8).map(cat => (
                        <button 
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setLimit(ITEMS_PER_PAGE);
                          }}
                          className={`text-left text-sm font-bold transition-colors ${selectedCategory === cat ? 'text-blue-600' : 'text-brand-ink/40 hover:text-brand-ink'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-5">
                    <h4 className="text-xs font-black text-brand-ink uppercase tracking-widest">Format</h4>
                    <div className="flex flex-col gap-2.5">
                      <button 
                        onClick={() => setSelectedType(null)}
                        className={`text-left text-sm font-bold transition-colors ${!selectedType ? 'text-brand-ink' : 'text-brand-ink/40 hover:text-brand-ink'}`}
                      >
                        All Formats
                      </button>
                      {types.map(t => (
                        <button 
                          key={t}
                          onClick={() => {
                            setSelectedType(t);
                            setLimit(ITEMS_PER_PAGE);
                          }}
                          className={`text-left text-sm font-bold transition-colors ${selectedType === t ? 'text-blue-600' : 'text-brand-ink/40 hover:text-brand-ink'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Course List (Wide Layout) */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-10 border-b border-brand-ink/5 gap-4">
              <div className="flex items-center gap-6">
                 <p className="text-[10px] font-black text-brand-ink/20 uppercase tracking-[0.2em]">
                   Found <span className="text-brand-ink font-black ml-1">{filteredCourses.length} Programmes</span>
                 </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-brand-ink/30 uppercase tracking-widest">Sort By</span>
                <select className="bg-transparent text-[10px] font-black uppercase text-brand-ink focus:outline-none cursor-pointer border-b-2 border-brand-ink pb-1">
                  <option>Most Relevant</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Upcoming Start</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
              <AnimatePresence mode="popLayout">
                {displayedCourses.length > 0 ? (
                  displayedCourses.map((course, idx) => (
                    <motion.div
                      key={course.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.5) }}
                    >
                      <CourseCard course={course} layout="wide" />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-32 text-center"
                  >
                    <div className="w-20 h-20 bg-brand-ink/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search size={32} className="text-brand-ink/20" />
                    </div>
                    <p className="text-2xl text-brand-ink/30 font-display font-black mb-4">No Programmes Found</p>
                    <p className="text-brand-ink/50 max-w-sm mx-auto mb-8 font-medium">We couldn't find anything matching your current filters. Try adjusting your search terms or category.</p>
                    <button 
                      onClick={clearFilters}
                      className="bg-brand-ink text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-brand-ink/20"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {filteredCourses.length > limit && (
              <div className="pt-20 text-center">
                <button 
                  onClick={() => setLimit(prev => prev + ITEMS_PER_PAGE)}
                  className="px-16 py-5 bg-white border-4 border-brand-ink rounded-[24px] font-black text-brand-ink uppercase tracking-widest hover:bg-brand-ink hover:text-white transition-all shadow-xl shadow-brand-ink/5 hover:scale-105"
                >
                  See More Courses
                </button>
                 <p className="mt-6 text-sm font-bold text-brand-ink/30 italic">
                   Showing {limit} of {filteredCourses.length} results
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
