import React, { useState } from 'react';
import { Users, Filter as FilterIcon, Search, CheckCircle, XCircle, Settings, Play } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('scores');

  // Multi-tab Layout
  const [scores] = useState([
    { id: 1, user: 'Jake M.', score: 40, date: '2026-03-31', status: 'pending' },
    { id: 2, user: 'Sarah L.', score: 38, date: '2026-03-30', status: 'verified' },
    { id: 3, user: 'Tom B.', score: 42, date: '2026-03-29', status: 'rejected' },
  ]);

  const runDraw = () => {
    alert("Algorithm running... Selecting random user tickets based on criteria.");
    setTimeout(() => alert("Draw Complete! 1 Grand Prize winner selected. Notifications dispatched."), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-2">
            <Settings className="text-brand-500" /> Admin Control Center
          </h1>
          <p className="text-slate-500 mt-1">Manage platform operations and verifications</p>
        </div>
        <button 
          onClick={runDraw}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-brand-500/20 flex items-center gap-2"
        >
          <Play size={18} fill="currentColor" /> Initialize Draw Algorithm
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        {/* Nav Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 relative">
           {['scores', 'users', 'charities'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-6 py-4 text-sm font-medium capitalize outline-none transition-colors border-b-2 ${
                 activeTab === tab ? 'border-brand-500 text-brand-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
               }`}
             >
               Manage {tab}
             </button>
           ))}
        </div>

        <div className="p-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-72">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
               <input type="text" placeholder={`Search ${activeTab}...`} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
               <FilterIcon size={16} /> Filter Status
            </button>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            {activeTab === 'scores' && (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-semibold">Player</th>
                    <th className="pb-3 px-4 font-semibold">Points</th>
                    <th className="pb-3 px-4 font-semibold">Date</th>
                    <th className="pb-3 px-4 font-semibold text-center">Status</th>
                    <th className="pb-3 pl-4 font-semibold text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {scores.map(s => (
                    <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 pr-4 font-medium text-slate-900">{s.user}</td>
                      <td className="py-4 px-4 font-bold text-brand-600">{s.score}</td>
                      <td className="py-4 px-4 text-slate-500">{s.date}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                          s.status === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                          s.status === 'pending'  ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-4 pl-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Approve">
                            <CheckCircle size={18} />
                          </button>
                          <button className="p-1 text-rose-600 hover:bg-rose-50 rounded" title="Reject">
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'users' && (
              <div className="py-12 text-center text-slate-500">
                 <Users className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                 <p>User management table would render here.</p>
              </div>
            )}

            {activeTab === 'charities' && (
              <div className="py-12 text-center text-slate-500">
                 <p>Charity CMS dashboard to manage onboarding and platform percentages.</p>
                 <button className="mt-4 px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:border-brand-500 hover:text-brand-600">
                   + Add New Partner
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
