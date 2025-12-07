import React from 'react';

const Flowchart: React.FC = () => {
  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <h3 className="text-xl font-bold text-center text-slate-800 mb-8">HealthGuard AI: Detailed System Architecture</h3>
      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 1100 500" className="w-full min-w-[900px] font-sans">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
            <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* NODE 1: USER INPUT */}
          <g transform="translate(20, 200)">
            <rect x="0" y="0" width="160" height="80" rx="10" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" filter="url(#shadow)" />
            <text x="80" y="35" textAnchor="middle" className="font-bold fill-sky-900" style={{ fontSize: '14px' }}>PATIENT INPUT</text>
            <text x="80" y="55" textAnchor="middle" className="fill-sky-700" style={{ fontSize: '10px' }}>Text / Speech</text>
          </g>

          <line x1="180" y1="240" x2="220" y2="240" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* NODE 2: FRONTEND PROCESSING LAYER */}
          <g transform="translate(220, 150)">
            <rect x="0" y="0" width="220" height="180" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4" />
            <text x="110" y="20" textAnchor="middle" className="fill-slate-500 font-bold uppercase" style={{ fontSize: '10px' }}>Frontend Processing Layer</text>

            {/* Sub-node: Demographics */}
            <rect x="20" y="40" width="180" height="30" rx="5" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />
            <text x="110" y="60" textAnchor="middle" className="fill-slate-700" style={{ fontSize: '10px' }}>Extract Demographics (Age/Sex)</text>

            {/* Sub-node: Risk Engine */}
            <polygon points="110,80 190,125 110,170 30,125" fill="#fff" stroke="#f59e0b" strokeWidth="2" />
            <text x="110" y="115" textAnchor="middle" className="fill-amber-700 font-bold" style={{ fontSize: '11px' }}>RISK ENGINE</text>
            <text x="110" y="130" textAnchor="middle" className="fill-slate-500" style={{ fontSize: '9px' }}>Red Flag Scan</text>
            <text x="110" y="140" textAnchor="middle" className="fill-slate-500" style={{ fontSize: '9px' }}>Outbreak Check</text>
          </g>

          {/* Branch: High Risk */}
          <line x1="330" y1="330" x2="330" y2="380" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-red)" />
          <g transform="translate(250, 380)">
             <rect x="0" y="0" width="160" height="60" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
             <text x="80" y="25" textAnchor="middle" className="fill-red-800 font-bold" style={{ fontSize: '12px' }}>⚠️ HIGH RISK DETECTED</text>
             <text x="80" y="45" textAnchor="middle" className="fill-red-600" style={{ fontSize: '10px' }}>Trigger Emergency Warning</text>
          </g>

          <line x1="440" y1="240" x2="500" y2="240" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* NODE 3: CONTEXT BUILDER */}
          <g transform="translate(500, 200)">
            <rect x="0" y="0" width="140" height="80" rx="8" fill="#fff" stroke="#6366f1" strokeWidth="2" filter="url(#shadow)" />
            <text x="70" y="35" textAnchor="middle" className="fill-indigo-900 font-bold" style={{ fontSize: '12px' }}>CONTEXT BUILDER</text>
            <text x="70" y="55" textAnchor="middle" className="fill-slate-500" style={{ fontSize: '10px' }}>Inject System Prompts</text>
          </g>

          <line x1="640" y1="240" x2="680" y2="240" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* NODE 4: AI CORE */}
          <g transform="translate(680, 160)">
            <rect x="0" y="0" width="180" height="160" rx="16" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="90" y="30" textAnchor="middle" className="fill-teal-800 font-bold" style={{ fontSize: '14px' }}>GEMINI 2.5 FLASH</text>
            
            <line x1="20" y1="50" x2="160" y2="50" stroke="#a7f3d0" strokeWidth="1" />
            
            <text x="90" y="70" textAnchor="middle" className="fill-teal-700" style={{ fontSize: '11px' }}>1. Differential Diagnosis</text>
            <text x="90" y="90" textAnchor="middle" className="fill-teal-700" style={{ fontSize: '11px' }}>2. Symptom Correlation</text>
            <text x="90" y="110" textAnchor="middle" className="fill-teal-700" style={{ fontSize: '11px' }}>3. Generate Advice</text>
          </g>

          <line x1="860" y1="240" x2="900" y2="240" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* NODE 5: OUTPUT */}
          <g transform="translate(900, 200)">
            <rect x="0" y="0" width="160" height="80" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" filter="url(#shadow)" />
            <text x="80" y="35" textAnchor="middle" className="font-bold fill-sky-900" style={{ fontSize: '12px' }}>RESPONSE RENDER</text>
            <text x="80" y="55" textAnchor="middle" className="fill-sky-700" style={{ fontSize: '10px' }}>Medical Summary Card</text>
          </g>

        </svg>
      </div>
      <p className="text-center text-xs text-slate-400 mt-4">Figure 1.2: Detailed Interaction & Risk Processing Logic</p>
    </div>
  );
};

export default Flowchart;