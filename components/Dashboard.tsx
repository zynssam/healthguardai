import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Activity, MapPin, AlertCircle, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { MOCK_QUERY_STATS, MOCK_RISK_DISTRIBUTION, LOCAL_OUTBREAKS } from '../constants';

const COLORS = ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4']; // Teal Palette
const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444']; // Green, Yellow, Red for Risk

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Public Health Dashboard</h2>
            <p className="mt-1 text-slate-500">Real-time surveillance and query analytics.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center bg-white rounded-lg shadow-sm border border-slate-200 px-3 py-2">
            <Calendar className="w-4 h-4 text-slate-400 mr-2" />
            <span className="text-sm text-slate-600 font-medium">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: 'Active Alerts', value: '12', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
          { label: 'Total Queries', value: '1,284', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
          { label: 'Risk Factor', value: 'High', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Regions', value: '8', icon: MapPin, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
        ].map((stat) => (
          <div key={stat.label} className={`bg-white overflow-hidden shadow-sm rounded-xl border ${stat.border}`}>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <dt className="text-sm font-medium text-slate-500 truncate">{stat.label}</dt>
                  <dd className="mt-1 text-3xl font-bold text-slate-900">{stat.value}</dd>
                </div>
                <div className={`rounded-lg p-3 ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Local Outbreak Tracker (NEW WIDGET) */}
      <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
           <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <MapPin className="w-5 h-5 text-teal-600 mr-2" />
              Local Outbreak Intelligence
           </h3>
           <span className="text-xs font-semibold px-2 py-1 bg-teal-100 text-teal-800 rounded">Live Data</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
           {LOCAL_OUTBREAKS.map((outbreak, idx) => (
             <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-bold text-slate-400 uppercase">{outbreak.city}</span>
                   {outbreak.trend === 'rising' ? <ArrowUpRight className="w-4 h-4 text-red-500"/> : 
                    outbreak.trend === 'falling' ? <ArrowDownRight className="w-4 h-4 text-green-500"/> :
                    <Minus className="w-4 h-4 text-slate-400"/>}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{outbreak.diseaseName}</h4>
                <div className="flex justify-between items-end">
                   <span className="text-2xl font-semibold text-slate-700">{outbreak.activeCases}</span>
                   <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                       outbreak.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                       outbreak.riskLevel === 'moderate' ? 'bg-amber-100 text-amber-700' :
                       'bg-green-100 text-green-700'
                   }`}>
                       {outbreak.riskLevel.toUpperCase()}
                   </span>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-slate-900">Disease Query Trends</h3>
             <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">Last 7 Days</span>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_QUERY_STATS}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#0d9488" radius={[6, 6, 0, 0]}>
                  {MOCK_QUERY_STATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-slate-900">User Risk Assessment</h3>
             <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">Real-time</span>
          </div>
          <div className="h-80 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-slate-600 font-medium ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Prevention Guidelines Panel */}
      <div className="mt-8 bg-gradient-to-r from-teal-50 to-white rounded-xl border border-teal-100 p-8 shadow-sm">
        <div className="flex items-start">
            <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Priority Health Alert: Seasonal Influenza</h3>
                <p className="text-slate-600 mb-4 max-w-3xl">
                    Health officials have reported a 15% increase in influenza cases in your monitoring region. 
                    Please disseminate the following prevention guidelines to users making respiratory inquiries.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-white rounded-lg border border-teal-50 shadow-sm">
                        <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs mr-3">1</span>
                        <span className="text-slate-700 font-medium">Promote Annual Vaccination</span>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg border border-teal-50 shadow-sm">
                        <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs mr-3">2</span>
                        <span className="text-slate-700 font-medium">Hygiene Protocols (Handwashing)</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
