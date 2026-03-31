import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Gift, User, LogOut } from 'lucide-react';
import { cn } from '../utils/cn';


const NavLink = ({ to, children, setIsOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      onClick={() => setIsOpen(false)}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "text-white font-bold" : "text-slate-400 hover:text-white",
        "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-500 after:origin-bottom-right after:transition-transform after:duration-300",
        isActive ? "after:scale-x-100 after:origin-bottom-left" : "hover:after:scale-x-100 hover:after:origin-bottom-left"
      )}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {user.role="admin"}, [user]); // Re-render when user state changes
  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <Gift className="h-8 w-8 text-brand-500 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-gradient transition-all duration-300">
                  CharitySwing
                </span>
              </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {!user&& (
            <NavLink to="/" setIsOpen={setIsOpen}>Home</NavLink>
            )}
            <NavLink to="/charities" setIsOpen={setIsOpen}>Charities</NavLink>
            <NavLink to="/draws" setIsOpen={setIsOpen}>Draw Results</NavLink>
            
            <div className="pl-4 border-l border-slate-700 flex items-center gap-4">
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? "/admin" : "/dashboard"} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    <User size={16} />
                    {user.name}
                  </Link>
                  <button onClick={logout} className="text-slate-400 hover:text-rose-500 transition-colors">
                    <LogOut size={18} />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Log In</Link>
                <Link to="/signup" className="ml-4 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-md text-sm font-bold transition-colors shadow-lg shadow-brand-500/20">Sign Up</Link>
                <div className="h-6 w-px bg-white/10 mx-2"></div>
                <Link to="/admin-login" className="text-brand-400 hover:text-brand-300 px-3 py-2 text-sm font-medium transition-colors group flex items-center gap-1">
                  Admin Portal
                </Link>
              </>
              )}
            </div>
          </nav>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900">Home</Link>
            <Link to="/charities" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900">Charities</Link>
            <Link to="/draws" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900">Draw Results</Link>
            
            <div className="pt-4 mt-4 border-t border-slate-800">
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? "/admin" : "/dashboard"} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-800">Dashboard ({user.name})</Link>
                  <button onClick={logout} className="w-full text-left mt-2 block px-3 py-2 rounded-md text-base font-medium text-rose-500 hover:bg-slate-900/50">Sign Out</button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2 px-3">
                  <Link to="/login" className="w-full text-center px-4 py-2 border border-slate-700 rounded-lg text-slate-300 font-medium">Log In</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center mt-4 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-md text-base font-bold transition-colors">
                  Sign Up
                </Link>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link to="/admin-login" onClick={() => setIsOpen(false)} className="block w-full text-center text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors">
                    Admin Portal Login
                  </Link>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
