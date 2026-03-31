import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Heart, ExternalLink, X, Loader2 } from 'lucide-react';
import useStore from '../../store/useStore';

const CharityManager = () => {
  const { charities, fetchCharities, addCharity, updateCharity, isLoading } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingCharity, setEditingCharity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    category: 'General',
    isFeatured: true
  });

  useEffect(() => {
    fetchCharities();
  }, [fetchCharities]);

  const handleOpenAddModal = () => {
    setEditingCharity(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      category: 'General',
      isFeatured: true
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (charity) => {
    setEditingCharity(charity);
    setFormData({
      name: charity.name,
      description: charity.description,
      image: charity.image,
      category: charity.category || 'General',
      isFeatured: charity.isFeatured ?? true
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success;
    if (editingCharity) {
      success = await updateCharity(editingCharity._id, formData);
    } else {
      success = await addCharity(formData);
    }

    if (success) {
      setShowModal(false);
      setFormData({
        name: '',
        description: '',
        image: '',
        category: 'General',
        isFeatured: true
      });
      setEditingCharity(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Charity Management</h1>
          <p className="text-slate-400 text-sm mt-1">Onboard and manage vetted partner organizations.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add New Partner
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
         {isLoading && charities.length === 0 && (
           <div className="col-span-full py-20 flex justify-center">
             <Loader2 className="animate-spin text-brand-500 h-10 w-10" />
           </div>
         )}

         {charities.map(charity => (
           <div key={charity._id} className="glass-card overflow-hidden group border border-white/5 hover:border-brand-500/30">
             <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10"></div>
                <img src={charity.image} alt={charity.name} className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                  <button 
                    onClick={() => handleOpenEditModal(charity)}
                    className="h-8 w-8 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-colors"
                  >
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
                     <p className="text-xs font-bold text-charity-400 uppercase tracking-wider mb-1">{charity.category || 'General'}</p>
                     <h3 className="text-lg font-bold text-white">{charity.name}</h3>
                   </div>
                   <button className="text-slate-500 hover:text-white" title="View Public Profile">
                     <ExternalLink size={16} />
                   </button>
                </div>
                
                <p className="text-sm text-slate-400 line-clamp-2 mb-4 h-10">{charity.description}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                   <div>
                     <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5"><Heart size={12} className="text-rose-500"/> Impact</p>
                     <p className="text-sm font-bold text-slate-300">Active</p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">Total Raised</p>
                     <p className="text-sm font-bold text-emerald-400 tracking-tight">${charity.totalDonations || 0}</p>
                   </div>
                </div>
             </div>
           </div>
         ))}
         
         <div 
           onClick={handleOpenAddModal}
           className="glass-card border-2 border-dashed border-white/10 flex flex-col items-center justify-center h-full min-h-[320px] bg-[#0a0a0a] hover:bg-[#111] hover:border-brand-500/30 transition-all cursor-pointer group"
         >
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-500/10 group-hover:text-brand-400 text-slate-500 transition-colors">
              <Plus size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-300 group-hover:text-brand-400 mb-1">Onboard Charity</h3>
            <p className="text-sm text-slate-500 text-center max-w-[200px]">Add a 501(c)(3) organization to the platform pool.</p>
         </div>
      </div>

      {/* Charity Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-white">
                {editingCharity ? 'Edit Partner' : 'Add Partner'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Organization Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500 text-white outline-none"
                  placeholder="e.g. Save the Fairways"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500 text-white outline-none"
                >
                  <option value="Children">Children</option>
                  <option value="Environment">Environment</option>
                  <option value="Elderly">Elderly</option>
                  <option value="Medical">Medical</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500 text-white outline-none h-24"
                  placeholder="What is their mission?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Cover Image URL</label>
                <input 
                  type="url" 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500 text-white outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-[#1a1a1a] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors flex justify-center items-center"
                >
                  {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (editingCharity ? 'Update Partner' : 'Onboard Partner')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharityManager;
