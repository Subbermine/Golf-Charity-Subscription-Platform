import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Charities = () => {
  const { charities, fetchCharities, isLoading } = useStore();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Just for mock UX
  const [selectedId, setSelectedId] = useState(user?.charityId || null);

  useEffect(() => {
    fetchCharities();
  }, [fetchCharities]);

  const categories = ['All', ...new Set(charities.map(c => c.category))];

  const filtered = charities.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-4">Choose Your Impact</h1>
        <p className="text-lg text-slate-400">Select an organization to receive a portion of your subscription fee. Change your selection anytime.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            className="pl-10 w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none focus:bg-[#1a1a1a]"
            placeholder="Search charities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
          <div className="flex items-center gap-2 mr-2 text-slate-500">
            <Filter size={18} />
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
                activeCategory === cat 
                  ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
                  : 'bg-[#111] text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="animate-pulse bg-[#111] rounded-2xl h-[400px]"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(charity => (
            <div 
              key={charity._id} 
              className={`group rounded-3xl overflow-hidden bg-[#111] shadow-xl transition-all duration-300 relative border ${
                selectedId === charity._id ? 'border-brand-500 shadow-brand-500/20' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="h-56 overflow-hidden relative">
                <img src={charity.image} alt={charity.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-110" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-charity-400 border border-white/10">
                  {charity.category || 'General'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{charity.name}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3">{charity.description}</p>
                
                <button
                  onClick={() => setSelectedId(charity._id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    selectedId === charity._id 
                      ? 'bg-brand-500/20 text-brand-400 border border-brand-500/50' 
                      : 'bg-white text-black hover:bg-slate-200'
                  }`}
                >
                  {selectedId === charity._id ? (
                    <><CheckCircle2 size={18} /> Selected</>
                  ) : (
                    'Support this cause'
                  )}
                </button>
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              No charities found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Charities;
