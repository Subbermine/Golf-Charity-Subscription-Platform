import React, { useEffect, useState } from 'react';
import { Search, Filter, MoreVertical, Shield, Loader2 } from 'lucide-react';
import useStore from '../../store/useStore';

const Users = () => {
  const { adminUsers, fetchAdminUsers, isLoading } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAdminUsers();
  }, [fetchAdminUsers]);

  const filteredUsers = adminUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Users & Subscriptions</h1>
        <p className="text-slate-400 text-sm mt-1">Manage user accounts, view histories, and update subscription status.</p>
      </div>

      <div className="glass-card flex-1 flex flex-col overflow-hidden min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-[#111]">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-sm text-white focus:ring-1 focus:ring-brand-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-slate-300 hover:bg-white/5 text-sm font-medium transition-colors">
               <Filter size={16} /> Filter
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors">
               Export CSV
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto relative">
          {isLoading && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-brand-500 h-8 w-8" />
            </div>
          )}
          
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#0a0a0a]">
              <tr>
                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">User</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">Plan</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">Joined</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">Scores</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map(u => (
                <tr key={u._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3 px-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-white flex items-center gap-2">
                        {u.name}
                        {u.role === 'admin' && <Shield size={14} className="text-rose-500" />}
                      </span>
                      <span className="text-sm text-slate-500">{u.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                      u.subscriptionId?.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {u.subscriptionId?.status || 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <span className="capitalize text-sm text-slate-300 font-medium">
                      {u.role === 'admin' ? 'Admin' : (u.subscriptionId?.plan || 'Free')}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-sm text-slate-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-sm text-brand-400 font-medium">
                    {u.scores?.length || 0} logged
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button className="text-slate-500 hover:text-white p-1 rounded transition-colors focus:ring-2 focus:ring-brand-500 outline-none">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {!isLoading && filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-20 text-center text-slate-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination footer */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-slate-400 bg-[#111]">
          <span>Showing {filteredUsers.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
