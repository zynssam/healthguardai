import React from 'react';
import { ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ 
          backgroundImage: 'radial-gradient(#0f766e 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative z-10 pb-8 bg-white/90 backdrop-blur-sm sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 px-4 sm:px-6 lg:px-8 rounded-br-[4rem]">
          <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-teal-100 bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wide mb-6">
                <ShieldCheck className="w-4 h-4 mr-1" />
                Trusted Health Intelligence
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">AI-Driven</span>{' '}
                <span className="block text-teal-600 xl:inline">Disease Awareness</span>
              </h1>
              <p className="mt-4 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                A specialized public health chatbot designed to bridge the gap between curiosity and verified medical data. Instant, accurate, and accessible to all.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate(ViewState.CHAT)}
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 md:text-lg transition-all shadow-lg shadow-teal-600/30"
                >
                  Start Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => onNavigate(ViewState.DASHBOARD)}
                  className="w-full flex items-center justify-center px-8 py-4 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 md:text-lg transition-all shadow-sm"
                >
                  View Public Data
                  <Activity className="ml-2 h-5 w-5 text-teal-600" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Right side visual */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-teal-50 flex items-center justify-center border-l border-teal-100">
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-12">
           {/* Decorative elements */}
           <div className="absolute top-10 right-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
           <div className="absolute top-10 left-10 w-32 h-32 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
           <div className="absolute bottom-10 left-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
           
           <div className="relative bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50 max-w-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                   <ShieldCheck className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-800">Verified Database</h3>
                   <p className="text-xs text-slate-500">Updated daily by health officials</p>
                </div>
              </div>
              <div className="space-y-2">
                 <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                 <div className="h-2 bg-slate-200 rounded w-full"></div>
                 <div className="h-2 bg-slate-200 rounded w-5/6"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
