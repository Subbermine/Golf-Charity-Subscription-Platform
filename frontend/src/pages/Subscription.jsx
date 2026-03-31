import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, Loader2 } from 'lucide-react';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const { user } = useAuth();
  const { subscribe } = useStore();
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleSubscribe = async (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoadingPlan(plan);
    const success = await subscribe(plan);
    setLoadingPlan(null);
    if (success) {
      // Mock Stripe redirect or success
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6 tracking-tight">Simple Pricing, Maximum Impact</h1>
        <p className="text-xl text-slate-600 mb-10">Support charities with every round you play and win premium gear.</p>
        
        {/* Toggle */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-full mx-auto relative z-10">
          <button 
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              !isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              isAnnual ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Annual <span className="text-brand-400 ml-1">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Basic Tier */}
        <div className="glass-card p-10 flex flex-col">
          <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Weekend Warrior</h3>
          <p className="text-slate-500 mb-6">Perfect for occasional golfers looking to make a small impact.</p>
          <div className="mb-8 flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tight text-slate-900">${isAnnual ? '9' : '12'}</span>
            <span className="text-slate-500 font-medium">/mo</span>
          </div>
          
          <ul className="space-y-4 mb-10 flex-grow">
            {['1 Score Upload Per Week', 'Standard Charity Selection', 'Basic Weekly Draws', 'Direct Impact Transparency'].map((feature, i) => (
              <li key={i} className="flex flex-start gap-3">
                <Check className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={() => handleSubscribe('basic')}
            disabled={loadingPlan === 'basic'}
            className="w-full py-4 px-6 rounded-xl font-bold bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {loadingPlan === 'basic' ? <Loader2 className="animate-spin h-5 w-5" /> : 'Choose Basic'}
          </button>
        </div>

        {/* Pro Tier (Recommended) */}
        <div className="glass-card p-10 flex flex-col border-2 border-brand-500 relative transform md:-translate-y-4 shadow-xl shadow-brand-500/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Most Popular
          </div>
          
          <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Tour Pro Level</h3>
          <p className="text-slate-500 mb-6">Maximize your giving impact and dramatically increase win odds.</p>
          <div className="mb-8 flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tight text-brand-600">${isAnnual ? '19' : '25'}</span>
            <span className="text-slate-500 font-medium">/mo</span>
          </div>
          
          <ul className="space-y-4 mb-10 flex-grow">
            {[
              'Unlimited Score Uploads', 
              'Premium Charity Selection (up to 3)', 
              'All Weekly & Grand Prize Draws', 
              'High-Impact Monthly Reports',
              'Access to Private Events'
            ].map((feature, i) => (
              <li key={i} className="flex flex-start gap-3">
                <Check className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button 
             onClick={() => handleSubscribe('pro')}
             disabled={loadingPlan === 'pro'}
             className="w-full py-4 px-6 rounded-xl font-bold bg-gradient-primary text-white hover:shadow-lg hover:shadow-brand-500/30 transition-all flex items-center justify-center disabled:opacity-70"
          >
            {loadingPlan === 'pro' ? <Loader2 className="animate-spin h-5 w-5" /> : 'Subscribe Now'}
          </button>
        </div>
      </div>
      
      <div className="mt-20 text-center flex flex-col items-center justify-center border-t border-slate-200 pt-10">
        <p className="text-sm text-slate-500 max-w-lg mb-4">Secured by Stripe. Cancel anytime. 5% of all subscription fees cover strictly platform costs, the rest guarantees charity distribution and prize fulfillment.</p>
      </div>
    </div>
  );
};

export default Subscription;
