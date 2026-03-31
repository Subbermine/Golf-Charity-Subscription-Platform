import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Heart, ExternalLink } from 'lucide-react';

const CharityManager = () => {
  const [charities] = useState([
    { id: 1, name: 'Swing For Kids', category: 'Children', donors: 4200, raised: '$45,000', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop' },
    { id: 2, name: 'Green Links Trust', category: 'Environment', donors: 2100, raised: '$22,500', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop' },
    { id: 3, name: 'Fairway Seniors', category: 'Elderly', donors: 1850, raised: '$19,200', image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=600&auto=format&fit=crop' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Charity Management</h1>
          <p className="text-slate-400 text-sm mt-1">Onboard and manage vetted partner organizations.</p>
        </div>
        <button className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2">
          <Plus size={18} /> Add New Partner
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {charities.map(charity => (
           <div key={charity.id} className="glass-card overflow-hidden group border border-white/5 hover:border-brand-500/30">
             <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10"></div>
                <img src={charity.image} alt={charity.name} className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                  <button className="h-8 w-8 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-colors">
                    <Edit2 size={14} />
                  </button>
                  <button className="h-8 w-8 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
             </div>
             <div className="p-5 bg-[#111]">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <p className="text-xs font-bold text-charity-400 uppercase tracking-wider mb-1">{charity.category}</p>
                     <h3 className="text-lg font-bold text-white">{charity.name}</h3>
                   </div>
                   <button className="text-slate-500 hover:text-white" title="View Public Profile">
                     <ExternalLink size={16} />
                   </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                   <div>
                     <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5"><Heart size={12} className="text-rose-500"/> Active Donors</p>
                     <p className="text-lg font-bold text-slate-300">{charity.donors}</p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">Total Raised</p>
                     <p className="text-lg font-bold text-emerald-400 tracking-tight">{charity.raised}</p>
                   </div>
                </div>
             </div>
           </div>
         ))}
         
         <div className="glass-card border-2 border-dashed border-white/10 flex flex-col items-center justify-center h-full min-h-[320px] bg-[#0a0a0a] hover:bg-[#111] hover:border-brand-500/30 transition-all cursor-pointer group">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-500/10 group-hover:text-brand-400 text-slate-500 transition-colors">
              <Plus size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-300 group-hover:text-brand-400 mb-1">Onboard Charity</h3>
            <p className="text-sm text-slate-500 text-center max-w-[200px]">Add a 501(c)(3) organization to the platform pool.</p>
         </div>
      </div>
    </div>
  );
};

export default CharityManager;
