import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, AlertCircle, User, Mail, Lock } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    const res = await signup({ name, email, password });
    setIsSubmitting(false);
    
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-black">
      {/* Right Panel - Image/Brand */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0a0a0a] overflow-hidden items-center justify-center order-2 border-l border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-charity-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 text-center px-12 text-white max-w-lg">
          <h2 className="text-4xl font-display font-bold mb-6">Join the Movement</h2>
          <p className="text-lg text-slate-400">Start logging your scores and supporting incredible causes today.</p>
        </div>
      </div>

      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black order-1">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-white">Create Account</h2>
            <p className="text-slate-400 mt-2">Sign up to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-950/50 border border-rose-500/50 text-rose-400 flex items-center gap-3 rounded-xl">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors focus:bg-[#1a1a1a]"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors focus:bg-[#1a1a1a]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-3 bg-[#111] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors focus:bg-[#1a1a1a]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] text-sm font-bold text-black bg-white hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-colors disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 text-black" /> : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-400 hover:text-brand-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
