
import React from 'react';
import { CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, XAxis } from 'recharts';
import { Users, ClipboardList, ScanLine, Clock, Zap, Info, Edit3, Lock } from 'lucide-react';
import { Severity, Violation, User } from '../types';

interface DashboardProps {
  user: User;
  onScanRequest?: () => void;
}

const MOCK_DATA = [
  { name: 'Mon', count: 4 },
  { name: 'Tue', count: 7 },
  { name: 'Wed', count: 5 },
  { name: 'Thu', count: 12 },
  { name: 'Fri', count: 8 },
];

const RECENT_VIOLATIONS: Violation[] = [
  {
    id: '1',
    studentName: 'Alex Johnson',
    studentId: 'ST-1029',
    type: 'Academic Dishonesty',
    severity: Severity.HIGH,
    date: 'Today, 10:30 AM',
    description: 'Caught using phone during Math midterm.',
    location: 'Room 304'
  },
  {
    id: '2',
    studentName: 'Sarah Miller',
    studentId: 'ST-2931',
    type: 'Tardiness',
    severity: Severity.LOW,
    date: 'Today, 08:45 AM',
    description: 'Arrived 20 minutes late to first period.',
    location: 'Main Gate'
  },
  {
    id: '3',
    studentName: 'Michael Chen',
    studentId: 'ST-9902',
    type: 'Bullying',
    severity: Severity.CRITICAL,
    date: 'Yesterday, 01:15 PM',
    description: 'Verbal altercation in the hallway.',
    location: 'Corridor B'
  },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, onScanRequest }) => {
  const isTeacher = user.role === 'teacher';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome & Quick Action */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Hi, {user.name.split(' ')[0]}
          </h2>
          <p className="text-slate-500 text-sm">
            Access Level: <span className="text-indigo-600 font-bold uppercase text-[10px] tracking-widest">{user.role}</span>
          </p>
        </div>
        {isTeacher && (
          <button 
            onClick={onScanRequest}
            className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center gap-2 group"
          >
            <ScanLine size={24} />
            <span className="font-bold text-sm hidden sm:inline">QUICK SCAN</span>
          </button>
        )}
      </div>

      {/* System Quick Guide */}
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-3xl flex gap-4 items-start">
        <div className="bg-white p-2 rounded-xl text-indigo-600 shadow-sm">
          <Info size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-indigo-900">{isTeacher ? 'Teacher Instructions' : 'Student Notice'}</h4>
          <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
            {isTeacher 
              ? "Tap Quick Scan to log violations. You have full permissions to edit and authenticate student records."
              : "You are in Read-Only mode. Student records are encrypted and cannot be edited by students."}
          </p>
        </div>
      </div>

      {/* Performance & Capability Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard 
          label="Verification" 
          value="100%" 
          trend="Secure" 
          color="bg-blue-50 text-blue-600" 
          icon={<Zap size={18} />} 
        />
        <StatCard 
          label="Avg. Time" 
          value="2.4s" 
          trend="Syncing" 
          color="bg-green-50 text-green-600" 
          icon={<Clock size={18} />} 
        />
        <StatCard 
          label="Logs" 
          value="1,204" 
          trend="+42 today" 
          color="bg-indigo-50 text-indigo-600" 
          icon={<ClipboardList size={18} />} 
        />
        <StatCard 
          label="Nodes" 
          value="12" 
          trend="Encrypted" 
          color="bg-slate-100 text-slate-600" 
          icon={<Users size={18} />} 
        />
      </div>

      {/* Charts Section */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Institutional Conduct Activity</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '12px'}} 
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#4f46e5" 
                strokeWidth={4} 
                dot={{ r: 5, fill: '#4f46e5', strokeWidth: 3, stroke: '#fff' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
            Verified Incident Logs
          </h3>
          <button className="text-indigo-600 text-xs font-bold tracking-tight">HISTORY</button>
        </div>
        <div className="space-y-3">
          {RECENT_VIOLATIONS.map((v) => (
            <ViolationCard key={v.id} violation={v} isTeacher={isTeacher} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; trend: string; color: string; icon: React.ReactNode }> = ({ label, value, trend, color, icon }) => (
  <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center transition-transform hover:scale-[1.02]">
    <div className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center mb-3`}>
      {icon}
    </div>
    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">{label}</p>
    <h4 className="text-lg font-extrabold text-slate-800">{value}</h4>
    <p className="text-[9px] font-bold text-indigo-500 mt-1">{trend}</p>
  </div>
);

const ViolationCard: React.FC<{ violation: Violation, isTeacher: boolean }> = ({ violation, isTeacher }) => {
  const getSeverityStyles = (sev: Severity) => {
    switch (sev) {
      case Severity.CRITICAL: return 'bg-red-50 text-red-600 border-red-100';
      case Severity.HIGH: return 'bg-orange-50 text-orange-600 border-orange-100';
      case Severity.MEDIUM: return 'bg-amber-50 text-amber-600 border-amber-100';
      case Severity.LOW: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center group transition-all">
      <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-lg text-slate-400 bg-slate-50 border-2 border-slate-100">
        {violation.studentName.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="min-w-0">
            <h5 className="font-bold text-slate-800 text-sm truncate">{violation.studentName}</h5>
            <p className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase">{violation.studentId} • {violation.type}</p>
          </div>
          <span className={`text-[8px] font-extrabold px-2 py-1 rounded-lg border uppercase tracking-wider flex-shrink-0 ${getSeverityStyles(violation.severity)}`}>
            {violation.severity}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Clock size={10} className="text-slate-300" />
          <p className="text-[10px] text-slate-400 font-medium">{violation.date}</p>
          <span className="text-slate-200 text-[10px]">|</span>
          <p className="text-[10px] text-slate-500 font-bold truncate">{violation.location}</p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-2">
        {isTeacher ? (
          <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Edit3 size={18} />
          </button>
        ) : (
          <div className="p-2 text-slate-200" title="Read Only Access">
            <Lock size={16} />
          </div>
        )}
      </div>
    </div>
  );
};
