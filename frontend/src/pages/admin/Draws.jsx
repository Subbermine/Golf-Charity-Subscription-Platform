import React, { useState } from 'react';
import { Play, Settings2, RefreshCcw, Check, AlertCircle, Calendar, Trophy } from 'lucide-react';

const AdminDraws = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [drawMode, setDrawMode] = useState('algorithm'); // 'random' or 'algorithm'

  const runDraw = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setIsSimulated(true);
    }, 2000);
  };

  const publishResults = () => {
    alert("Draw results officially published. Notifications dispatched to 42 winning users.");
    setIsSimulated(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Draw Management</h1>
        <p className="text-slate-400 text-sm mt-1">Configure parameters, run simulations, and publish official weekly results.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-l-4 border-l-brand-500">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Settings2 size={20} className="text-brand-400" /> Draw Configuration
            </h2>
            
            <div className="space-y-4">
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
                <label className="block text-sm font-medium text-slate-300 mb-2">Total Prize Allocation</label>
                <input type="text" defaultValue="$5,000" disabled className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white font-medium opacity-70 cursor-not-allowed" />
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={runDraw}
                  disabled={isRunning || isSimulated}
                  className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] flex justify-center items-center gap-2"
                >
                  {isRunning ? <RefreshCcw className="animate-spin" size={20} /> : <Play size={20} fill="currentColor" />}
                  {isRunning ? 'Simulating Draw...' : 'Simulate Next Draw'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4 flex items-start gap-4 bg-amber-500/5 border-amber-500/20">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-slate-300 leading-relaxed text-amber-100">Simulations do not notify users or affect real budgets. You must manually review and publish the simulated results.</p>
          </div>
        </div>

        {/* Results / Target */}
        <div className="lg:col-span-2 glass-card p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 bg-[#111] flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Simulation Results</h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-[#0a0a0a] px-3 py-1 rounded-full border border-white/5">
              {isSimulated ? 'Pending Publication' : 'Awaiting Run'}
            </span>
          </div>

          <div className="flex-1 p-8 flex flex-col items-center justify-center bg-[#0a0a0a] min-h-[300px]">
             {isRunning ? (
                <div className="flex gap-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="h-20 w-20 rounded-2xl bg-[#111] border border-brand-500/30 flex items-center justify-center animate-pulse">
                      <div className="h-8 w-8 bg-brand-500/50 rounded-full blur-[2px]"></div>
                    </div>
                  ))}
                </div>
             ) : isSimulated ? (
                <div className="w-full max-w-lg animate-fade-in-up">
                  <div className="text-center mb-8">
                    <p className="text-sm text-brand-400 font-bold uppercase tracking-widest mb-4">Winning Combination</p>
                    <div className="flex justify-center gap-3">
                      {[34, 12, 8, 41, 19].map((num, i) => (
                        <div key={i} className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-[#111] border-2 border-brand-500 shadow-[0_0_20px_rgba(14,165,233,0.2)] flex items-center justify-center text-2xl md:text-3xl font-black text-white">
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-[#111] rounded-xl p-4 border border-white/5 mb-8">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400">Perfect Matches (5/5)</span>
                      <span className="font-bold text-white">1 Winner</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400">Close Matches (4/5)</span>
                      <span className="font-bold text-white">12 Winners</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-400">Total Payout Liability</span>
                      <span className="font-bold text-brand-400">$4,850.00</span>
                    </div>
                  </div>

                  <button 
                    onClick={publishResults}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-slate-200 transition-colors flex justify-center items-center gap-2"
                  >
                    <Check size={20} /> Publish Official Results
                  </button>
                  <button 
                    onClick={() => setIsSimulated(false)}
                    className="w-full mt-3 text-slate-500 font-medium py-3 hover:text-white transition-colors"
                  >
                    Discard Simulation
                  </button>
                </div>
             ) : (
                <div className="text-center text-slate-600">
                  <Trophy className="mx-auto h-16 w-16 mb-4 opacity-20" />
                  <p>Run a simulation to generate numbers <br/> and preview payout liability.</p>
                </div>
             )}
          </div>
        </div>
      </div>
      
      {/* Past Draws Table */}
      <div className="glass-card mt-6">
         <div className="p-6 border-b border-white/5 bg-[#111]">
            <h2 className="text-lg font-bold text-white">Recent Payouts</h2>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left bg-[#0a0a0a]">
               <thead>
                 <tr>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider">Draw ID</th>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider">Date Published</th>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider">Algorithm</th>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider">Total Winners</th>
                   <th className="py-4 px-6 text-xs font-semibold text-slate-500 tracking-wider text-right">Prize Pool</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-sm font-medium">
                 {[1,2,3].map(i => (
                   <tr key={i} className="hover:bg-white/[0.02]">
                     <td className="py-4 px-6 text-brand-400">#4{3-i}</td>
                     <td className="py-4 px-6 text-slate-300 flex items-center gap-2"><Calendar size={14} className="text-slate-500"/> Oct {15 - i*7}, 2026</td>
                     <td className="py-4 px-6 text-slate-400">Weighted</td>
                     <td className="py-4 px-6 text-slate-300">{140 + i*13}</td>
                     <td className="py-4 px-6 text-white text-right font-bold tracking-tight">$5,000</td>
                   </tr>
                 ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AdminDraws;
