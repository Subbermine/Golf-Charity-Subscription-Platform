import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, AlertCircle, Shield, Mail, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    const res = await login({ email, password });
    setIsSubmitting(false);
    
    if (res.success) {
      if (res.user?.role !== 'admin') {
        logout();
        setError('Unauthorized access. Your account does not have administrator privileges.');
      } else {
        navigate('/admin', { replace: true });
      }
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-black items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-brand-900 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="mx-auto h-16 w-16 bg-brand-500/10 rounded-full flex items-center justify-center border border-brand-500/30 mb-6 shadow-[0_0_30px_rgba(14,165,233,0.2)]">
            <Shield className="h-8 w-8 text-brand-400" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">System Admin Portal</h2>
          <p className="text-brand-100 mt-2 opacity-80">Restricted access area. Authenticate to proceed.</p>
        </div>

        <div className="bg-[#111] glass-card border-brand-500/20 shadow-2xl p-8 shadow-brand-500/5">
          {error && (
            <div className="mb-6 p-4 bg-rose-950/50 border border-rose-500/50 text-rose-400 flex items-start gap-3 rounded-xl">
              <AlertCircle className="shrink-0 mt-0.5" size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Administrator Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors focus:bg-[#1a1a1a]"
                  placeholder="admin@golfcharity.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-300">Security Passcode</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors focus:bg-[#1a1a1a]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3 px-4 border border-brand-500 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 focus:outline-none transition-colors disabled:opacity-70 mt-4"
            >
              {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : 'Authorize Access'}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center border-t border-white/5 pt-8">
            <p className="text-xs text-slate-600">IP ADDRESS LOGGED. PROSECUTION FOR UNAUTHORIZED ACCESS.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
