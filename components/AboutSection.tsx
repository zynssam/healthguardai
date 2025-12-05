import React from 'react';
import { FEATURES_LIST } from '../constants';
import * as LucideIcons from 'lucide-react';
import Flowchart from './Flowchart';

const AboutSection: React.FC = () => {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold tracking-wide uppercase mb-4">
            System Overview
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Reliable Health Intelligence
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Addressing the critical need for accurate, accessible public health information through advanced AI analysis and verified medical databases.
          </p>
        </div>

        {/* Flowchart Integration */}
        <div className="mb-24">
           <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                <LucideIcons.GitMerge className="w-5 h-5 mr-2 text-teal-600"/> 
                Process Workflow
              </h3>
              <Flowchart />
           </div>
        </div>

        {/* Problem/Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                    <LucideIcons.AlertOctagon className="w-5 h-5 mr-2" />
                    The Challenge
                </h3>
                <ul className="space-y-3 text-red-800">
                    <li className="flex items-start">
                        <span className="mr-2">•</span>
                        Manual searching for symptoms is slow and error-prone.
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2">•</span>
                        Misinformation spreads faster than verified medical data.
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2">•</span>
                        Health officials struggle to disseminate updates instantly.
                    </li>
                </ul>
            </div>
            <div className="bg-teal-50 p-8 rounded-2xl border border-teal-100">
                <h3 className="text-xl font-bold text-teal-900 mb-4 flex items-center">
                    <LucideIcons.CheckCircle2 className="w-5 h-5 mr-2" />
                    Our Solution
                </h3>
                <ul className="space-y-3 text-teal-800">
                    <li className="flex items-start">
                        <span className="mr-2">•</span>
                        Automated delivery of verified health protocols.
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2">•</span>
                        Instant symptom analysis and simple risk assessment.
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2">•</span>
                        Visual dashboards for prevention guidelines.
                    </li>
                </ul>
            </div>
        </div>

        {/* Features Grid */}
        <div>
           <h3 className="text-2xl font-bold text-slate-900 mb-10 text-center">Core Capabilities</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES_LIST.map((feature) => {
              const IconComponent = (LucideIcons as any)[feature.icon];
              return (
                <div key={feature.title} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-teal-600 text-white mb-4 shadow-lg shadow-teal-600/20">
                    {IconComponent && <IconComponent className="h-6 w-6" aria-hidden="true" />}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
