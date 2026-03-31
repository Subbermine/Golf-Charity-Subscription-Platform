import React, { useEffect } from 'react';
import { Trophy, Gift, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const Draws = () => {
  const { latestDraw, fetchLatestDraw, drawHistory, fetchDrawHistory, isLoading } = useStore();

  useEffect(() => {
    fetchLatestDraw();
    fetchDrawHistory();
  }, [fetchLatestDraw, fetchDrawHistory]);

  const recentWinners = drawHistory.slice(0, 3).map(draw => ({
    name: 'Lucky Entrant',
    prize: `$${(draw.prizePool * 0.4).toFixed(0)} Jackpot`,
    location: draw.month
  }));

  if (isLoading && !latestDraw) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-500 h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-500 rounded-full mix-blend-screen blur-[120px] opacity-20 pointer-events-none"></div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 relative z-10 tracking-tight">The Winner's Circle</h1>
          <p className="text-lg md:text-xl text-slate-400 relative z-10 leading-relaxed">Every swing counts. Log your verified scores to unlock exclusive gear drops, premium bundles, and once-in-a-lifetime golf experiences while giving back.</p>
        </div>

        {latestDraw ? (
          <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
            
            {/* Latest Results */}
            <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-primary p-8 text-black relative overflow-hidden">
                <Trophy className="absolute -right-4 -top-4 h-32 w-32 opacity-20 mix-blend-overlay rotate-12" />
                <h2 className="text-3xl font-black mb-2 relative z-10">Official Draw Results</h2>
                <p className="font-bold flex items-center gap-2 relative z-10 opacity-90">
                  <span className="bg-black/20 px-3 py-1 rounded-md text-sm">Draw {latestDraw.month}</span> 
                  {new Date(latestDraw.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="p-8 md:p-10">
                <div className="text-center mb-12">
                  <p className="text-sm font-black text-brand-400 uppercase tracking-widest mb-6 drop-shadow-md">The Winning Combination</p>
                  <div className="flex justify-center gap-4">
                    {latestDraw.numbers.map((num, i) => (
                      <div key={i} className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-brand-500 text-3xl font-black text-white shadow-[0_0_30px_rgba(14,165,233,0.3)] bg-[#0a0a0a]">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-white border-b border-white/10 pb-3 mb-4 text-lg">Payout Breakdown</h3>
                  <div className="flex justify-between items-center bg-[#1a1a1a] border border-white/5 p-4 rounded-xl hover:border-brand-500/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-300">Flawless Predictors (5/5)</span>
                      <span className="text-xs text-slate-500">40% of Pool</span>
                    </div>
                    <span className="font-black text-brand-400">${(latestDraw.prizePool * 0.40).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#1a1a1a] border border-white/5 p-4 rounded-xl hover:border-brand-500/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-400">Hot Streak (4/5 Matches)</span>
                      <span className="text-xs text-slate-500">35% of Pool</span>
                    </div>
                    <span className="font-bold text-white">${(latestDraw.prizePool * 0.35).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0a0a0a] border border-white/5 p-4 rounded-xl hover:border-brand-500/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-500">Lucky Draw Entrants (3/5)</span>
                      <span className="text-xs text-slate-500">25% of Pool</span>
                    </div>
                    <span className="font-bold text-slate-400">${(latestDraw.prizePool * 0.25).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 text-center">
                  <Link to="/dashboard" className="text-brand-400 font-bold hover:text-brand-300 inline-flex items-center gap-2 transition-colors">
                    Check My Entries <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Info & Recent Winners */}
            <div className="space-y-8">
              <div className="bg-[#111] border border-brand-500/20 shadow-[0_0_30px_rgba(14,165,233,0.1)] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden group hover:border-brand-500/40 transition-colors">
                 <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-charity-500 rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity"></div>
                 <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-300 uppercase tracking-wider">
                   <Gift className="text-charity-400" /> Total Prize Pool
                 </h2>
                 <p className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-charity-300 to-brand-300 mb-4 leading-tight drop-shadow-lg">
                   ${latestDraw.prizePool.toFixed(2)}
                 </p>
                 {latestDraw.rolloverFromPrevious > 0 && (
                   <p className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                     <Plus size={18} /> Includes ${latestDraw.rolloverFromPrevious.toFixed(2)} Rollover!
                   </p>
                 )}
                 <p className="text-slate-400 leading-relaxed font-medium">Your next round could be the one. Upload a verified scorecard this week to instantly secure your entry into the mega draw.</p>
              </div>

              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-10">
                 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    Recent Draws
                 </h3>
                 <div className="space-y-4">
                   {drawHistory.slice(1, 4).map((draw, i) => (
                     <div key={i} className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl flex items-center justify-between group cursor-pointer hover:border-brand-500/30 transition-all shadow-lg shadow-black/50">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-secondary flex flex-col items-center justify-center text-white shrink-0 shadow-inner">
                             <Trophy size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-white">{draw.month}</p>
                            <p className="text-sm text-slate-500">{draw.winners?.length || 0} Winners</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold text-charity-300 bg-charity-500/10 border border-charity-500/20 px-3 py-1.5 rounded-lg shadow-inner">${draw.prizePool.toFixed(0)} Pool</p>
                        </div>
                     </div>
                   ))}
                   {drawHistory.length <= 1 && (
                     <p className="text-slate-500 text-center py-4">No previous draws yet.</p>
                   )}
                 </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <Trophy size={48} className="text-slate-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">No Draws Published Yet</h2>
            <p className="text-slate-500 mt-2">The first draw will be announced soon. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Draws;
