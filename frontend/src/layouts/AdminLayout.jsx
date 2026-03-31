import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import { 
  LayoutDashboard, Users, Trophy, Heart, 
  Award, BarChart3, LogOut, Menu, X, Bell, Search
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { label: 'Users & Plans', icon: Users, path: '/admin/users' },
    { label: 'Draw Management', icon: Trophy, path: '/admin/draws' },
    { label: 'Charities', icon: Heart, path: '/admin/charities' },
    { label: 'Winners & Payouts', icon: Award, path: '/admin/winners' },
    { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
  ];

  return (
    <div className="min-h-screen bg-black text-slate-300 flex overflow-hidden">
      
      {/* Sidebar Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#111] border-r border-white/5 transform transition-transform duration-300 md:translate-x-0 md:static md:flex md:flex-col",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link to="/admin" className="flex items-center gap-2 group">
            <Trophy className="h-6 w-6 text-brand-500" />
            <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-brand-400 transition-colors">
              CharitySwing Admin
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
                  isActive 
                    ? "bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_10px_rgba(14,165,233,0.1)]" 
                    : "text-slate-400 hover:text-white hover:bg-[#1a1a1a]"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-[#111] glass-dark z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
               <input 
                 type="text" 
                 placeholder="Search admin dashboard..." 
                 className="pl-9 pr-4 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-lg text-sm text-white focus:ring-1 focus:ring-brand-500 focus:outline-none w-64 transition-all"
               />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-slate-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500 border-2 border-[#111]"></span>
              </span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-white leading-tight">{user?.name || 'Admin User'}</span>
                <span className="text-xs text-brand-400 font-medium">System Operator</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold border border-brand-400/30">
                {user?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8 relative">
          <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
