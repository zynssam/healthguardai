import React from 'react';
import { SessionSummary } from '../types';
import { FileText, AlertTriangle, User, Stethoscope } from 'lucide-react';

interface Props {
  data: SessionSummary;
}

const HealthSummaryCard: React.FC<Props> = ({ data }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-teal-50 text-teal-800 border-teal-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mt-4 transition-all duration-300">
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-bold text-sm flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Session Summary Card
        </h3>
        <span className="text-xs text-slate-400">Live Updates</span>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Demographics */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 pb-2 border-b border-slate-100">
          <User className="w-3 h-3" />
          <span>Patient Profile: {data.gender || 'Not specified'}, {data.age || 'Age Unknown'}</span>
        </div>

        {/* Diagnosis */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Potential Condition</span>
          <div className="flex items-start mt-1">
            <Stethoscope className="w-5 h-5 text-teal-600 mr-2 mt-0.5" />
            <p className="font-bold text-slate-900 text-lg leading-tight">
              {data.likelyCondition || "Analysis in progress..."}
            </p>
          </div>
        </div>

        {/* Risk Level */}
        <div>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Assessment</span>
           <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskColor(data.riskLevel)}`}>
              {data.riskLevel === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
              {data.riskLevel.toUpperCase()} RISK
           </div>
        </div>

        {/* Symptoms */}
        {data.keySymptoms.length > 0 && (
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reported Symptoms</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.keySymptoms.map((sym, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md border border-slate-200">
                  {sym}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-slate-50 p-2 rounded text-[10px] text-slate-400 italic">
          This is an automated summary. Not an official medical record.
        </div>
      </div>
    </div>
  );
};

export default HealthSummaryCard;
