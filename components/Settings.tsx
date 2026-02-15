
import React from 'react';
import { User as UserIcon, Bell, Lock, Eye, Smartphone, LogOut, ChevronRight, Moon, ShieldCheck, Key, Fingerprint, Mail } from 'lucide-react';
import { User } from '../types';

interface SettingsProps {
  user: User;
  onLogout: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onLogout }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="text-center py-6">
        <div className="relative inline-block">
          <img 
            src={user.avatarUrl} 
            alt="Profile" 
            className="w-28 h-28 rounded-[2.5rem] border-4 border-white shadow-2xl mx-auto ring-8 ring-indigo-50/50 object-cover"
          />
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
            <ShieldCheck size={14} className="text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-800 mt-6 tracking-tight">{user.name}</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <Mail size={12} className="text-slate-400" />
          <p className="text-xs text-slate-400 font-bold">{user.email}</p>
        </div>
        <div className="mt-4 inline-flex px-4 py-1.5 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200">
           <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">{user.role} Access</span>
        </div>
      </div>

      <div className="space-y-6">
        <SettingGroup title="Security & Confidentiality">
          <SettingItem icon={<Fingerprint size={20} />} label="Biometric Sign In" toggle active={true} />
          <SettingItem icon={<Lock size={20} />} label="Encryption Mode" badge="AES-256" />
          <SettingItem icon={<Key size={20} />} label="Access Token" badge="Validated" />
        </SettingGroup>

        <SettingGroup title="System Preferences">
          <SettingItem icon={<Smartphone size={20} />} label="Haptic Scan Feedback" toggle active={true} />
          <SettingItem icon={<Eye size={20} />} label="Incident Visibility" badge={user.role === 'teacher' ? 'Full' : 'Restricted'} />
          <SettingItem icon={<Bell size={20} />} label="Push Notifications" toggle active={true} />
        </SettingGroup>

        <SettingGroup title="Interface">
          <SettingItem icon={<Moon size={20} />} label="Dark Mode" toggle />
          <SettingItem icon={<UserIcon size={20} />} label="Edit Personal Data" />
        </SettingGroup>

        <div className="pt-4">
          <button 
            onClick={onLogout}
            className="w-full bg-red-50 text-red-600 font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-red-100 transition-all shadow-sm active:scale-95 border border-red-100"
          >
            <LogOut size={20} />
            SIGN OUT OF PORTAL
          </button>
          
          <div className="mt-10 flex flex-col items-center gap-2 opacity-30">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white mb-2">
              <ShieldCheck size={20} />
            </div>
            <p className="text-center text-slate-500 text-[9px] font-black uppercase tracking-[0.5em]">
              QR PASS GLOBAL SECURITY V2.5
            </p>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">ISO 27001 Certified System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">{title}</h3>
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
      {children}
    </div>
  </div>
);

const SettingItem: React.FC<{ icon: React.ReactNode; label: string; toggle?: boolean; active?: boolean; badge?: string }> = ({ icon, label, toggle, active, badge }) => (
  <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-none group">
    <div className="flex items-center gap-4">
      <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
        {icon}
      </div>
      <span className="font-bold text-slate-700 text-sm tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      {badge && (
        <span className="text-[9px] font-black px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl uppercase tracking-wider border border-slate-200">
          {badge}
        </span>
      )}
      {toggle ? (
        <div className={`w-12 h-6.5 rounded-full relative transition-colors ${active ? 'bg-indigo-600' : 'bg-slate-200'}`}>
          <div className={`absolute top-1 w-4.5 h-4.5 bg-white rounded-full shadow-md transition-all ${active ? 'left-6.5' : 'left-1'}`}></div>
        </div>
      ) : (
        <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transition-all group-hover:translate-x-1" />
      )}
    </div>
  </div>
);
