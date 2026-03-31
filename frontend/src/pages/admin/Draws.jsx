import React, { useEffect, useState } from 'react';
import { Play, Settings2, RefreshCcw, Check, AlertCircle, Calendar, Trophy, Loader2 } from 'lucide-react';
import useStore from '../../store/useStore';

const AdminDraws = () => {
  const { 
    latestDraw, 
    drawHistory, 
    fetchAdminLatestDraw, 
    fetchDrawHistory, 
    runDraw, 
    publishDrawResults, 
    isLoading,
    error
  } = useStore();

  const [drawMode, setDrawMode] = useState('algorithm'); // 'random' or 'algorithm'
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

  useEffect(() => {
    fetchAdminLatestDraw();
    fetchDrawHistory();
  }, [fetchAdminLatestDraw, fetchDrawHistory]);

  const handleRunDraw = async () => {
    const result = await runDraw({ month: selectedMonth, type: drawMode });
    if (!result) {
      alert("Failed to run draw. As draws have been conducted for this month.");
    } else {
      await fetchAdminLatestDraw();
    }
  };

  const handlePublish = async () => {
    if (latestDraw?._id) {
      const result = await publishDrawResults(latestDraw._id);
      if (!result) {
        alert("Failed to publish results.");
      } else {
        await fetchDrawHistory();
        await fetchAdminLatestDraw();
      }
    }
  };

  const winningNumbers = latestDraw?.numbers || [];
  const isPending = latestDraw && !latestDraw.isPublished;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Draw Management</h1>
        <p className="text-slate-400 text-sm mt-1">Configure parameters, run simulations, and publish official weekly results.</p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}

        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-l-4 border-l-brand-500">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Settings2 size={20} className="text-brand-400" /> Draw Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Month</label>
                <input 
                  type="month" 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white font-medium focus:ring-1 focus:ring-brand-500 outline-none transition-all [color-scheme:dark]" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Algorithm Type</label>
                <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-white/5">
                  <button 
                    onClick={() => setDrawMode('algorithm')}
                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${drawMode === 'algorithm' ? 'bg-[#1a1a1a] text-brand-400 shadow shadow-black' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Weighted
                  </button>
                  <button 
                    onClick={() => setDrawMode('random')}
                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${drawMode === 'random' ? 'bg-[#1a1a1a] text-brand-400 shadow shadow-black' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Pure Random
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Platform Prize Pool</label>
                <div className="flex items-center gap-2 text-brand-400 font-bold text-xl px-1">
                  ${latestDraw?.prizePool || 0}
                </div>
                <p className="text-xs text-slate-500 mt-1 italic">* Calculated from active subscriptions</p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={handleRunDraw}
                  disabled={isLoading || isPending}
                  className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] flex justify-center items-center gap-2"
                >
                  {isLoading ? <RefreshCcw className="animate-spin" size={20} /> : <Play size={20} fill="currentColor" />}
                  {isLoading ? 'Processing Simulation...' : isPending ? 'Draw Already Simulated' : 'Initialize Draw Simulation'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4 flex items-start gap-4 bg-amber-500/10 border-amber-500/20">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-amber-200/90 leading-relaxed">Draw simulations generate a combination but don't finalize winners until published. Publishing triggers prize distribution.</p>
          </div>
        </div>

        {/* Results / Target */}
        <div className="lg:col-span-2 glass-card p-0 overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-6 border-b border-slate-700/50 bg-white/[0.02] flex justify-between items-center bg-gradient-to-r from-transparent to-white/[0.01]">
            <h2 className="text-lg font-bold text-white">Latest Result Pipeline</h2>
            <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
              latestDraw?.isPublished 
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                : latestDraw 
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : 'text-slate-500 bg-[#0a0a0a] border-white/5'
            }`}>
              {latestDraw?.isPublished ? 'Published' : latestDraw ? 'Pending Publication' : 'Awaiting Run'}
            </span>
          </div>

          <div className="flex-1 p-8 flex flex-col items-center justify-center bg-transparent">
             {isLoading && !latestDraw ? (
                <Loader2 className="animate-spin text-brand-500 h-10 w-10" />
             ) : latestDraw ? (
                <div className="w-full max-w-lg animate-fade-in-up">
                  <div className="text-center mb-8">
                    <p className="text-sm text-brand-400 font-bold uppercase tracking-widest mb-4">Winning Combination ({latestDraw.month})</p>
                    <div className="flex justify-center gap-3">
                      {winningNumbers.map((num, i) => (
                        <div key={i} className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white/[0.03] border-2 border-brand-500/50 shadow-[0_0_20px_rgba(14,165,233,0.15)] flex items-center justify-center text-2xl md:text-3xl font-black text-white backdrop-blur-sm">
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 mb-8 backdrop-blur-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400">Prize Pool Liability</span>
                      <span className="font-bold text-white">${latestDraw.prizePool}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400">Total Potential Winners</span>
                      <span className="font-bold text-white">{latestDraw.isPublished ? (latestDraw.winners?.length || 0) : 'Calculated on publish'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-400">Draw Type</span>
                      <span className="font-bold text-brand-400 capitalize">{latestDraw.type}</span>
                    </div>
                  </div>

                  {!latestDraw.isPublished ? (
                    <>
                      <button 
                        onClick={handlePublish}
                        disabled={isLoading}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-slate-200 transition-colors flex justify-center items-center gap-2"
                      >
                        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Check size={20} />}
                        Publish Official Results
                      </button>
                      <p className="text-center text-xs text-slate-500 mt-4 italic">Publishing will process all score cards and assign prizes to winners.</p>
                    </>
                  ) : (
                    <div className="text-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-bold flex items-center justify-center gap-2">
                      <Check size={20} /> Results Published & Prizes Distributed
                    </div>
                  )}
                </div>
             ) : (
                <div className="text-center text-slate-600">
                  <Trophy className="mx-auto h-16 w-16 mb-4 opacity-20" />
                  <p>No draw simulation found for this period. <br/> Initialize a new draw to start.</p>
                </div>
             )}
          </div>
        </div>
      </div>
      
      {/* Past Draws Table */}
      <div className="glass-card mt-6 overflow-hidden">
         <div className="p-6 border-b border-slate-700/50 bg-white/[0.02]">
            <h2 className="text-lg font-bold text-white">Historical Draw Registry</h2>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left bg-transparent">
               <thead>
                 <tr>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider">Month ID</th>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider">Numbers</th>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider">Type</th>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider">Winners</th>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider text-right">Prize Pool</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-sm font-medium">
                 {drawHistory.map(draw => (
                   <tr key={draw._id} className="hover:bg-white/[0.02]">
                     <td className="py-4 px-6 text-brand-400 font-bold">{draw.month}</td>
                     <td className="py-4 px-6 text-slate-300">
                        <div className="flex gap-1">
                          {draw.numbers?.map((n, idx) => (
                            <span key={idx} className="bg-slate-800 px-1.5 py-0.5 rounded text-xs min-w-[24px] text-center border border-white/5">{n}</span>
                          ))}
                        </div>
                     </td>
                     <td className="py-4 px-6 text-slate-400 capitalize text-xs">{draw.type}</td>
                     <td className="py-4 px-6 text-slate-300 flex items-center gap-2">
                        {draw.winners?.length || 0} participants
                     </td>
                     <td className="py-4 px-6 text-white text-right font-bold tracking-tight">${draw.prizePool}</td>
                   </tr>
                 ))}
                 {!isLoading && drawHistory.length === 0 && (
                   <tr>
                     <td colSpan="5" className="py-10 text-center text-slate-600 italic">No historical data available.</td>
                   </tr>
                 )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AdminDraws;
