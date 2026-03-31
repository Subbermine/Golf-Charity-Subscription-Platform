import React from 'react';
import { Trophy, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Draws = () => {
  const latestDraw = {
    date: 'Oct 15, 2026',
    winningScore: 38,
    totalPrize: '$5,000 Equipment Bundle',
    match3: 145,
    match4: 12,
    match5: 2
  };

  const recentWinners = [
    { name: 'Sarah J.', prize: 'Titleist Pro V1 Dozen', location: 'Florida' },
    { name: 'Mike T.', prize: 'Taylormade Stealth Driver', location: 'California' },
    { name: 'David W.', prize: 'Garmin Approach S62', location: 'Texas' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-500 rounded-full mix-blend-multiply blur-3xl opacity-30 pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-4 relative z-10">Weekly Rewards</h1>
        <p className="text-lg text-slate-600 relative z-10">Turn your best rounds into premium gear. Every verified score is a ticket to win.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Latest Results */}
        <div className="glass-card overflow-hidden border border-brand-200">
          <div className="bg-gradient-primary p-8 text-white relative">
            <Trophy className="absolute right-6 top-6 h-24 w-24 opacity-10" />
            <h2 className="text-2xl font-bold mb-2 relative z-10">Latest Draw Results</h2>
            <p className="text-brand-100 flex items-center gap-2 relative z-10">
              <span className="font-medium bg-brand-800 px-2 py-0.5 rounded text-xs">Draw #42</span> 
              {latestDraw.date}
            </p>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Winning Score</p>
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-brand-500 text-6xl font-black text-brand-600 shadow-[0_0_40px_-5px_var(--tw-shadow-color)] shadow-brand-500 bg-brand-50">
                {latestDraw.winningScore}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Prize Breakdown</h3>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                <span className="font-medium text-slate-700">Perfect Match (5/5 rounds avg)</span>
                <span className="font-bold text-brand-600">{latestDraw.match5} Winners</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                <span className="font-medium text-slate-700">Close Match</span>
                <span className="font-bold text-slate-900">{latestDraw.match4} Winners</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                <span className="font-medium text-slate-700">Participation Draw</span>
                <span className="font-bold text-slate-900">{latestDraw.match3} Winners</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <Link to="/dashboard" className="text-brand-600 font-bold hover:text-brand-700 inline-flex items-center gap-2">
                Check My Tickets <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Info & Recent Winners */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-charity-500 rounded-full blur-3xl opacity-40"></div>
             <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
               <Gift className="text-charity-400" /> Grand Prize This Week
             </h2>
             <p className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-charity-300 to-brand-300 mb-2">
               {latestDraw.totalPrize}
             </p>
             <p className="text-slate-400">Play and upload at least one verified score this week to enter.</p>
          </div>

          <div>
             <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Recent Winners
             </h3>
             <div className="space-y-4">
               {recentWinners.map((winner, i) => (
                 <div key={i} className="glass-card p-5 flex items-center justify-between group cursor-pointer hover:border-brand-200">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-secondary flex flex-col items-center justify-center text-white shrink-0">
                         <Trophy size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{winner.name}</p>
                        <p className="text-sm text-slate-500">{winner.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-semibold text-charity-600 bg-charity-50 px-2 py-1 rounded-md">{winner.prize}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Draws;
