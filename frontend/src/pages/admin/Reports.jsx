import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Download, Filter } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111] border border-white/10 p-3 rounded-xl shadow-xl shadow-black">
        <p className="text-white font-bold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Reports = () => {
  const financeData = [
    { month: 'Jan', subscription: 45000, prizeAllocation: 15000, charity: 25000, operational: 5000 },
    { month: 'Feb', subscription: 52000, prizeAllocation: 18000, charity: 28000, operational: 6000 },
    { month: 'Mar', subscription: 68000, prizeAllocation: 22000, charity: 38000, operational: 8000 },
    { month: 'Apr', subscription: 85000, prizeAllocation: 28000, charity: 48000, operational: 9000 },
  ];

  const charityPieData = [
    { name: 'Swing For Kids', value: 45000 },
    { name: 'Green Links Trust', value: 25000 },
    { name: 'Fairway Seniors', value: 30000 },
    { name: 'Unallocated Pool', value: 10000 },
  ];

  const COLORS = ['#e879f9', '#10b981', '#f59e0b', '#64748b'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-400 text-sm mt-1">Deep dive into financial health, platform growth, and payout ledgers.</p>
        </div>
        <div className="flex gap-2">
           <button className="glass-card px-4 py-2 border border-white/10 text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium">
             <Filter size={16} /> 2026 (YTD)
           </button>
           <button className="bg-white hover:bg-slate-200 text-black px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-white/10 transition-all flex items-center gap-2">
             <Download size={16} /> Export PDF
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
         {/* Financial Distribution Stacked Bar Chart */}
         <div className="glass-card p-6 h-[400px] flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6">Financial Distribution (Platform Wide)</h2>
            <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={financeData} margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                   <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                   <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                   <Tooltip content={<CustomTooltip />} />
                   <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                   <Bar dataKey="charity" name="Charities" stackId="a" fill="#e879f9" />
                   <Bar dataKey="prizeAllocation" name="Prize Pool" stackId="a" fill="#38bdf8" />
                   <Bar dataKey="operational" name="Operational (5%)" stackId="a" fill="#64748b" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Charity Allocation Donut Chart */}
         <div className="glass-card p-6 h-[400px] flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6">Aggregate Charity Allocation Focus</h2>
            <div className="flex-1 w-full min-h-0 flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={charityPieData}
                     cx="50%"
                     cy="50%"
                     innerRadius={80}
                     outerRadius={120}
                     paddingAngle={5}
                     dataKey="value"
                     stroke="none"
                   >
                     {charityPieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                     itemStyle={{ color: '#fff' }}
                     formatter={(value) => `$${value.toLocaleString()}`}
                   />
                   <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: '12px'}} />
                 </PieChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
      
      {/* Transaction Ledger summary purely UI */}
      <div className="glass-card p-6">
         <h2 className="text-lg font-bold text-white border-b border-white/5 pb-4 mb-4">Integrity Summary</h2>
         <div className="grid sm:grid-cols-3 gap-6 divide-x divide-white/5">
            <div className="px-4">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total MRR</p>
              <p className="text-3xl font-bold text-white">$250,000</p>
            </div>
            <div className="px-4">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 text-rose-400">Total Charity Released</p>
              <p className="text-3xl font-bold text-white">$110,000</p>
            </div>
            <div className="px-4">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 text-amber-400">Total Validated Scores</p>
              <p className="text-3xl font-bold text-white">45,920</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;
