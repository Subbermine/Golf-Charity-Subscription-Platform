import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export const Footer = () => (
  <footer className="bg-black text-slate-400 py-12 mt-16 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <span className="font-display font-bold text-2xl text-white tracking-tight">CharitySwing</span>
          <p className="mt-4 text-sm max-w-sm">
            Empowering golfers to give back with every round. Subscribe, upload scores, and win while making a difference.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-brand-400 transition-colors">How it Works</a></li>
            <li><a href="/charities" className="hover:text-brand-400 transition-colors">Our Charities</a></li>
            <li><a href="/draws" className="hover:text-brand-400 transition-colors">Recent Winners</a></li>
            <li><a href="/subscription" className="hover:text-brand-400 transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} CharitySwing. All rights reserved.</p>
        <p className="mt-2 md:mt-0 flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </p>
      </div>
    </div>
  </footer>
);

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black relative selection:bg-brand-500 selection:text-white">
      {/* Abstract Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-charity-600/10 blur-[120px] pointer-events-none" />
      
      <Navbar />
      <main className="flex-grow z-10 w-full relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
