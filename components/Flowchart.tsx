import React from 'react';

const Flowchart: React.FC = () => {
  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <h3 className="text-xl font-bold text-center text-slate-800 mb-8">System Architecture Workflow</h3>
      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 1000 400" className="w-full min-w-[800px] font-sans">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Step 1: User Input */}
          <g transform="translate(50, 150)">
            <rect x="0" y="0" width="180" height="100" rx="12" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" filter="url(#shadow)" />
            <text x="90" y="40" textAnchor="middle" className="text-sm font-bold fill-sky-900" style={{ fontSize: '16px', fontWeight: 'bold' }}>USER QUERY</text>
            <text x="90" y="65" textAnchor="middle" className="fill-sky-700" style={{ fontSize: '12px' }}>Natural Language</text>
            <text x="90" y="80" textAnchor="middle" className="fill-sky-700" style={{ fontSize: '12px' }}>Input via Chat</text>
          </g>

          {/* Arrow 1 */}
          <line x1="230" y1="200" x2="290" y2="200" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

          {/* Step 2: Processing Unit */}
          <g transform="translate(300, 100)">
            <rect x="0" y="0" width="400" height="200" rx="16" fill="#f8fafc" stroke="#475569" strokeWidth="2" strokeDasharray="4,4" />
            <text x="200" y="30" textAnchor="middle" className="fill-slate-500 font-bold tracking-widest" style={{ fontSize: '14px' }}>HEALTHGUARD AI CORE</text>
            
            {/* NLP Node */}
            <g transform="translate(30, 60)">
              <rect x="0" y="0" width="140" height="80" rx="8" fill="#fff" stroke="#6366f1" strokeWidth="2" filter="url(#shadow)" />
              <text x="70" y="35" textAnchor="middle" className="fill-indigo-900 font-bold" style={{ fontSize: '14px' }}>NLP Engine</text>
              <text x="70" y="55" textAnchor="middle" className="fill-slate-500" style={{ fontSize: '10px' }}>Understand Symptoms</text>
            </g>

            {/* Knowledge Base Node */}
            <g transform="translate(230, 60)">
              <rect x="0" y="0" width="140" height="80" rx="8" fill="#fff" stroke="#22c55e" strokeWidth="2" filter="url(#shadow)" />
              <text x="70" y="35" textAnchor="middle" className="fill-green-900 font-bold" style={{ fontSize: '14px' }}>Verified DB</text>
              <text x="70" y="55" textAnchor="middle" className="fill-slate-500" style={{ fontSize: '10px' }}>Secure Backend Data</text>
            </g>

            {/* Connector inside */}
            <line x1="170" y1="100" x2="230" y2="100" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </g>

          {/* Arrow 2 */}
          <line x1="700" y1="200" x2="760" y2="200" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

          {/* Step 3: Output */}
          <g transform="translate(770, 150)">
            <rect x="0" y="0" width="180" height="100" rx="12" fill="#ecfeff" stroke="#0891b2" strokeWidth="2" filter="url(#shadow)" />
            <text x="90" y="40" textAnchor="middle" className="text-sm font-bold fill-cyan-900" style={{ fontSize: '16px', fontWeight: 'bold' }}>RESPONSE</text>
            <text x="90" y="65" textAnchor="middle" className="fill-cyan-700" style={{ fontSize: '12px' }}>Risk Assessment</text>
            <text x="90" y="80" textAnchor="middle" className="fill-cyan-700" style={{ fontSize: '12px' }}>& Prevention Guide</text>
          </g>

          {/* Feedback Loop */}
          <path d="M 860 250 Q 860 350 500 350 Q 140 350 140 250" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
          <text x="500" y="340" textAnchor="middle" className="fill-slate-400 italic" style={{ fontSize: '12px' }}>Continuous Learning & Updates</text>
          <line x1="140" y1="260" x2="140" y2="250" stroke="#e2e8f0" strokeWidth="2" markerEnd="url(#arrowhead)" />

        </svg>
      </div>
      <p className="text-center text-xs text-slate-400 mt-4">Figure 1.1: HealthGuard AI Data Processing Pipeline</p>
    </div>
  );
};

export default Flowchart;
