import React, { useEffect } from 'react';
import { Users, TrendingUp, Trophy, Heart, Loader2 } from 'lucide-react';
import useStore from '../../store/useStore';
import { Link} from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const Overview = () => {
  const { adminReports, latestDraw, fetchAdminReports, fetchLatestDraw, isLoading } = useStore();

  useEffect(() => {
    fetchAdminReports();
    fetchLatestDraw();
  }, [fetchAdminReports, fetchLatestDraw]);

  const kpiData = [
    { 
      title: 'Total Users', 
      value: adminReports?.totalUsers?.toLocaleString() || '0', 
      trend: '+0%', 
      icon: Users, 
      color: 'text-brand-400', 
      bg: 'bg-brand-500/10' 
    },
    { 
      title: 'Active Subscriptions', 
      value: adminReports?.activeSubs?.toLocaleString() || '0', 
      trend: '+0%', 
      icon: TrendingUp, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10' 
    },
    { 
      title: 'Total Prize Pool', 
      value: `$${adminReports?.totalPrizePool || 0}`, 
      trend: '+0%', 
      icon: Trophy, 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10' 
    },
    { 
      title: 'Charity Contributions', 
      value: `$${adminReports?.totalDonations?.toLocaleString() || '0'}`, 
      trend: '+0%', 
      icon: Heart, 
      color: 'text-rose-400', 
      bg: 'bg-rose-500/10' 
    }
  ];

  // Placeholder charts data (since backend doesn't provide historical yet)
  const revenueData = [
    { name: 'Jan', revenue: 4000, charity: 2400 },
    { name: 'Feb', revenue: 5000, charity: 3000 },
    { name: 'Mar', revenue: 6500, charity: 3800 },
    { name: 'Apr', revenue: 8000, charity: 4800 },
    { name: 'May', revenue: 9500, charity: 6000 },
    { name: 'Jun', revenue: 12000, charity: 8500 },
  ];

  const participationData = [
    { name: 'Week 1', participants: 4000 },
    { name: 'Week 2', participants: 4500 },
    { name: 'Week 3', participants: 5200 },
    { name: 'Week 4', participants: 6000 },
  ];

  if (isLoading && !adminReports) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-brand-500 h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time metrics and platform health.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="glass-card p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-emerald-400 font-medium">{kpi.trend}</span>
                <span className="text-slate-500 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue/Charity Area Chart */}
        <div className="lg:col-span-2 glass-card p-6 h-96 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6">Financial Growth</h2>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCharity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e879f9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e879f9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="charity" stroke="#e879f9" strokeWidth={3} fillOpacity={1} fill="url(#colorCharity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Participation Bar Chart */}
        <div className="glass-card p-6 h-96 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6">Draw Entries (This Month)</h2>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="participants" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
           <h2 className="text-lg font-bold text-white mb-4">Latest Platform Activity</h2>
           <div className="space-y-4">
             {!adminReports?.recentUsers?.length ? (
               <p className="text-slate-500 text-sm italic">No recent activity found.</p>
             ) : (
               adminReports.recentUsers.map((u, i) => (
                 <div key={u._id} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-sm">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{u.name}</p>
                        <p className="text-slate-500 text-xs mt-0.5">Joined {new Date(u.createdAt).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <span className="px-2 py-1 bg-brand-500/10 text-brand-400 rounded text-xs font-medium capitalize">{u.subscriptionId?.plan || 'Free'}</span>
                 </div>
               ))
             )}
           </div>
        </div>

        <div className="glass-card p-6 border-brand-500/20 shadow-lg shadow-brand-500/5">
           <h2 className="text-lg font-bold text-white mb-4">Latest Draw Summary</h2>
           <div className="h-full flex flex-col justify-center items-center text-center py-4">
              {latestDraw ? (
                <>
                  <Trophy className="h-16 w-16 text-brand-400 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">Draw {latestDraw.month}</p>
                  <p className="text-slate-400 mb-6">
                    {latestDraw.isPublished ? 'Published' : 'Draft'} • {latestDraw.winners?.length || 0} Winners
                  </p>
                  <p className="text-brand-400 font-bold mb-6">Prize Pool: ${latestDraw.prizePool}</p>
                </>
              ) : (
                <div className="py-10">
                  <Trophy className="h-12 w-12 text-slate-700 mb-4 mx-auto" />
                  <p className="text-slate-500">No active draw found.</p>
                </div>
              )}
              <Link to="/admin/draws">
                <button className="px-6 py-2 bg-white text-black font-bold rounded-lg text-sm hover:bg-slate-200 transition-colors">
                  Manage Draws
                </button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
