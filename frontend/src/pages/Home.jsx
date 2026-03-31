import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Heart, ShieldCheck, ChevronRight, PlayCircle, Star } from 'lucide-react';
import useStore from '../store/useStore';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { charities, fetchCharities } = useStore();

  useEffect(() => {
    fetchCharities();
  }, [fetchCharities]);

  const featuredCharities = charities.slice(0, 3);
  const { user } = useAuth();

  if (user) {
    return (
      <div className="w-full bg-black text-slate-300 min-h-[calc(100vh-64px)]">
        {/* Logged In Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-[100%] rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-500/5 mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Welcome back, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mb-8">
                Ready to hit the links? You have full access to log scores, participate in draws, and track your charitable impact from your dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard" className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl text-md font-bold transition-all shadow-lg shadow-brand-500/20">
                  <PlayCircle size={20} /> Go to Dashboard
                </Link>
                <Link to="/draws" className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-white/10 hover:border-white/30 text-white px-6 py-3 rounded-xl text-md font-medium transition-all">
                  <Trophy size={20} /> View Latest Draws
                </Link>
              </div>
            </div>

            {/* Quick Stats or Updates */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 group hover:border-brand-500/30 transition-colors">
                 <div className="h-12 w-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 text-brand-400">
                    <Star size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Weekly Draw Live</h3>
                 <p className="text-sm text-slate-400 mb-4">Submit your scores before Friday directly to earn this week's tickets.</p>
                 <Link to="/draws" className="text-brand-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Check Prizes <ArrowRight size={16} /></Link>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 group hover:border-rose-500/30 transition-colors">
                 <div className="h-12 w-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 text-rose-400">
                    <Heart size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Global Impact</h3>
                 <p className="text-sm text-slate-400 mb-4">Our community just passed $100k raised for various non-profit organizations.</p>
                 <Link to="/charities" className="text-rose-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Explore Charities <ArrowRight size={16} /></Link>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 group hover:border-emerald-500/30 transition-colors">
                 <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
                    <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Manage Subscription</h3>
                 <p className="text-sm text-slate-400 mb-4">Ensure your membership is active to qualify for the ultimate Grand Prize draw.</p>
                 <Link to="/subscription" className="text-emerald-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Subscription Settings <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-slate-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 font-medium text-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_10px_var(--tw-shadow-color)] shadow-brand-500"></span>
              Join 10,000+ golfers making a difference
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-white mb-8 leading-tight">
              Subscribe & Win <br className="hidden md:block"/> While <span className="text-gradient">Giving Back.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Elevate your game. Every score you upload enters you into premium draws while directly funding charities close to your heart.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="group flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-black px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-white/10">
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/subscription" className="group flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-medium transition-all">
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-[#0a0a0a] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">Three simple steps to combine your passion for the game with the power of giving.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step Connectors (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-brand-900 via-brand-500 to-charity-900 -translate-y-1/2 z-0 opacity-50"></div>
            
            {[
              { icon: ShieldCheck, title: "1. Subscribe", desc: "Choose a tier and select your preferred charity. A portion of your fee goes directly to them." },
              { icon: Trophy, title: "2. Play & Score", desc: "Hit the fairway and securely log your scores (1-45 points) on your personalized dashboard." },
              { icon: Gift, title: "3. Win Rewards", desc: "Your scores act as tickets. Match the winning numbers in our weekly draws to earn premium gear." }
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-8 z-10 relative hover:border-brand-500/50 transition-colors shadow-xl shadow-black">
                  <div className="h-14 w-14 rounded-2xl bg-brand-500/20 flex justify-center items-center mb-6 shadow-inner border border-brand-500/30">
                    <Icon className="text-brand-400 h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Charities */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Supported Causes</h2>
              <p className="text-slate-400 max-w-xl text-lg">We proudly partner with vetted organizations to ensure your contribution makes a real impact.</p>
            </div>
            <Link to="/charities" className="hidden sm:flex text-brand-400 font-medium items-center gap-1 hover:text-brand-300 transition-colors">
              View all <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCharities.map(charity => (
              <div key={charity._id} className="group rounded-2xl overflow-hidden bg-[#111] shadow-lg shadow-black/50 border border-white/5 hover:border-brand-500/50 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={charity.image} alt={charity.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-110" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-charity-400 mb-2 block">{charity.category || 'General'}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{charity.name}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2">{charity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden bg-[#0a0a0a] border-t border-white/5">
        <div className="absolute top-0 right-[-10%] w-[50%] h-full rounded-full bg-brand-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-full rounded-full bg-charity-600/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Heart className="mx-auto h-16 w-16 text-rose-500 mb-8 filter drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Make Your Mark?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join the platform that turns your regular rounds into extraordinary opportunities.
          </p>
          <Link to="/signup" className="inline-flex items-center justify-center bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

const Gift = ({ className }) => <Trophy className={className} />;

export default Home;
