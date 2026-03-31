import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';
import { Plus, Trophy, Calendar, Ticket, ArrowRight, Activity, Crown } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { scores, subscription, fetchScores, fetchSubscription, addScore, isLoading } = useStore();
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [newScore, setNewScore] = useState({ value: '', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    fetchScores();
    fetchSubscription();
  }, [fetchScores, fetchSubscription]);

  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    const scoreVal = parseInt(newScore.value);
    if (scoreVal >= 1 && scoreVal <= 45) {
      await addScore({ value: scoreVal });
      setShowScoreModal(false);
      setNewScore({ value: '', date: new Date().toISOString().split('T')[0] });
    }
  };

  const avgScore = scores.length > 0 
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) 
    : '0.0';

  const userCharity = user?.charityId;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-primary rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-2xl shadow-brand-500/10 border border-brand-500/20">
        <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] bg-white/10 rotate-12 blur-2xl pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-brand-100 mb-4 md:mb-0">You're making a difference. Supporting {userCharity?.name || 'your chosen cause'}!</p>
        </div>
        <div className="relative z-10 flex gap-4">
          <button 
            onClick={() => setShowScoreModal(true)}
            className="bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-black/50"
          >
            <Plus size={20} /> Add Score
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Left Col) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Activity size={18} />
                <span className="text-sm font-medium">Avg Score</span>
              </div>
              <p className="text-3xl font-bold text-white">{avgScore}</p>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Ticket size={18} />
                <span className="text-sm font-medium">Draw Entries</span>
              </div>
              <p className="text-3xl font-bold text-white">{scores.length}</p>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2 text-slate-400">
                <Trophy size={18} />
                <span className="text-sm font-medium">Winnings</span>
              </div>
              <p className="text-3xl font-bold text-white">$0</p>
            </div>
            <div className="glass-card p-5 bg-gradient-to-br from-charity-900/50 to-[#111] border-charity-500/30">
              <div className="flex items-center gap-3 mb-2 text-charity-400">
                <Crown size={18} />
                <span className="text-sm font-medium">Rank</span>
              </div>
              <p className="text-3xl font-bold text-white">Pro</p>
            </div>
          </div>

          {/* Recent Scores */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Scores</h2>
              <span className="text-sm text-slate-400">Last 5 rounds</span>
            </div>
            
            {isLoading && !scores.length ? (
              <div className="animate-pulse flex flex-col gap-4">
                {[1,2,3].map(i => <div key={i} className="h-16 bg-[#1a1a1a] rounded-xl w-full"></div>)}
              </div>
            ) : !scores || scores.length === 0 ? (
               <div className="text-center py-8 text-slate-500">
                 No scores uploaded yet. Start playing and log your first round!
               </div>
            ) : (
              <div className="space-y-4">
                {[...scores].reverse().map((scoreValue, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-brand-500/30 transition-colors bg-[#111]">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 flex items-center justify-center font-bold text-lg">
                        {scoreValue}
                      </div>
                      <div>
                        <p className="font-bold text-white flex items-center gap-2">
                          Stableford Points
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2 py-0.5 rounded-md font-medium">Verified</span>
                        </p>
                        <p className="text-sm text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar size={14} /> Recent Round
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Right Col) */}
        <div className="space-y-8">
          
          {/* Subscription Status */}
          <div className="glass-card overflow-hidden">
            <div className="h-1 w-full bg-brand-500 shadow-[0_0_10px_var(--tw-shadow-color)] shadow-brand-500"></div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">Subscription</h2>
              {subscription?.status === 'active' || user?.subscriptionId ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">Plan</span>
                    <span className="font-bold text-black bg-brand-400 px-3 py-1 rounded-md text-xs">{(subscription?.plan || user?.subscriptionId?.plan || 'PRO').toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-6">
                    <span className="text-slate-400">Status</span>
                    <span className="text-white capitalize">{subscription?.status || 'Active'}</span>
                  </div>
                  <Link to="/subscription" className="w-full text-center block text-sm font-medium text-brand-400 hover:text-brand-300">Manage Subscription</Link>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-slate-400 mb-4 text-sm">You are currently on the free tier. Upgrade to enter draws.</p>
                  <Link to="/subscription" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] text-sm font-medium text-black bg-white hover:bg-slate-200">
                    Upgrade Now
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Active Charity */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-white mb-4">Your Charity</h2>
            {userCharity ? (
              <div>
                <img src={userCharity.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop"} alt={userCharity.name} className="w-full h-32 object-cover rounded-xl mb-4 filter brightness-90" />
                <h3 className="font-bold text-white">{userCharity.name}</h3>
                <p className="text-sm text-slate-400 mt-1 mb-4">{userCharity.description?.substring(0, 60)}...</p>
                <Link to="/charities" className="text-sm font-medium text-brand-400 flex items-center gap-1 hover:text-brand-300">
                  Change Charity <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="text-center border-2 border-dashed border-white/10 rounded-xl p-6">
                <p className="text-slate-500 mb-4 text-sm">You haven't selected a charity to support yet.</p>
                <Link to="/charities" className="w-full flex justify-center py-2 px-4 border border-white/20 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1a1a1a]">
                  Select Charity
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Score Modal */}
      {showScoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl shadow-brand-500/20">
            <h2 className="text-2xl font-display font-bold mb-6 text-white">Log New Score</h2>
            <form onSubmit={handleScoreSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">Stableford Points</label>
                <input 
                  type="number" 
                  min="1" 
                  max="45"
                  required
                  value={newScore.value}
                  onChange={(e) => setNewScore({...newScore, value: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500 text-white"
                  placeholder="e.g. 36"
                />
                <p className="text-xs text-slate-500 mt-2">Enter points between 1 and 45.</p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-1">Date Played</label>
                <input 
                  type="date"
                  required
                  value={newScore.date}
                  onChange={(e) => setNewScore({...newScore, date: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500 text-white style-color-scheme-dark"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowScoreModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-[#1a1a1a]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-bold hover:bg-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  Save Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
