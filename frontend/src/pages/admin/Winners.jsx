import React, { useEffect, useState } from 'react';
import { Search, Filter, CheckCircle2, XCircle, FileText, Banknote, Loader2 } from 'lucide-react';
import useStore from '../../store/useStore';

const Winners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { winners, fetchWinners, updateWinnerStatus, isLoading } = useStore();

  useEffect(() => {
    fetchWinners();
  }, [fetchWinners]);

  const handleStatusUpdate = async (id, status) => {
    await updateWinnerStatus(id, status);
  };

  const filteredWinners = winners.filter(w => 
    w.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.drawId?.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Winners & Payouts</h1>
        <p className="text-slate-400 text-sm mt-1">Review verified scores, approve hardware deliveries, and clear payouts.</p>
      </div>

      <div className="glass-card flex-1 flex flex-col overflow-hidden min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-[#111]">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search winners..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-slate-300 hover:bg-white/5 text-sm font-medium transition-colors">
               <Filter size={16} /> Status
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          {isLoading && winners.length === 0 ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-brand-500 h-10 w-10" />
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#0a0a0a]">
                <tr>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">Winner</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">Prize Amount</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">Requirements</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5 text-center">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredWinners.map(w => (
                  <tr key={w._id} className="hover:bg-white/[0.02] transition-colors group bg-[#111]">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{w.userId?.name || 'Unknown User'}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><FileText size={12}/> Draw {w.drawId?.month}  •  {new Date(w.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded text-sm">${w.prizeAmount.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-300 font-medium">
                      {w.matchCount}/5 Match
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        w.status === 'paid' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 
                        w.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        w.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                         {w.status === 'pending' && (
                           <>
                             <button 
                               onClick={() => handleStatusUpdate(w._id, 'approved')}
                               className="h-8 w-8 flex items-center justify-center text-emerald-500 hover:bg-emerald-500/10 rounded border border-emerald-500/20 transition-colors" title="Approve Verification"
                             >
                               <CheckCircle2 size={16} />
                             </button>
                             <button 
                               onClick={() => handleStatusUpdate(w._id, 'rejected')}
                               className="h-8 w-8 flex items-center justify-center text-rose-500 hover:bg-rose-500/10 rounded border border-rose-500/20 transition-colors" title="Reject Score (Fraud)"
                             >
                               <XCircle size={16} />
                             </button>
                           </>
                         )}
                         {w.status === 'approved' && (
                           <button 
                             onClick={() => handleStatusUpdate(w._id, 'paid')}
                             className="h-8 px-3 flex items-center gap-1.5 justify-center text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded border border-indigo-500/20 transition-colors text-xs font-bold uppercase" title="Mark Paid"
                           >
                              <Banknote size={14} /> Clear
                           </button>
                         )}
                         {w.status === 'paid' && (
                           <span className="text-slate-500 text-sm italic">Fulfilled</span>
                         )}
                         {w.status === 'rejected' && (
                           <span className="text-rose-500 text-sm italic">Revoked</span>
                         )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Winners;
