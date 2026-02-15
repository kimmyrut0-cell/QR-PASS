
import React from 'react';
import { LayoutDashboard, StickyNote, Settings as SettingsIcon, Bell, ScanLine, FolderTree } from 'lucide-react';
import { AppSection, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
  userRole: UserRole;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeSection, onNavigate, userRole }) => {
  const isTeacher = userRole === 'teacher';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <ScanLine size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent leading-none">
              QR PASS
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Secure Log System</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center md:hidden z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <NavButton 
          active={activeSection === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
          icon={<LayoutDashboard size={20} />} 
          label="Home" 
        />
        <NavButton 
          active={activeSection === 'directory'} 
          onClick={() => onNavigate('directory')} 
          icon={<FolderTree size={20} />} 
          label="Directory" 
        />
        
        {/* Central Scan Action - Only for Teachers */}
        {isTeacher && (
          <div className="relative -top-6">
            <button 
              onClick={() => onNavigate('scan')}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all transform active:scale-90 ${
                activeSection === 'scan' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
              }`}
            >
              <ScanLine size={28} />
            </button>
          </div>
        )}

        <NavButton 
          active={activeSection === 'notes'} 
          onClick={() => onNavigate('notes')} 
          icon={<StickyNote size={20} />} 
          label="Notes" 
        />
        <NavButton 
          active={activeSection === 'settings'} 
          onClick={() => onNavigate('settings')} 
          icon={<SettingsIcon size={20} />} 
          label="Settings" 
        />
      </nav>

      {/* Sidebar Navigation (Desktop Only) */}
      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 flex-col bg-white border-r border-slate-200 pt-24 items-center gap-8">
        <SidebarButton 
          active={activeSection === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
          icon={<LayoutDashboard size={24} />} 
        />
        <SidebarButton 
          active={activeSection === 'directory'} 
          onClick={() => onNavigate('directory')} 
          icon={<FolderTree size={24} />} 
        />
        {isTeacher && (
          <SidebarButton 
            active={activeSection === 'scan'} 
            onClick={() => onNavigate('scan')} 
            icon={<ScanLine size={24} />} 
          />
        )}
        <SidebarButton 
          active={activeSection === 'notes'} 
          onClick={() => onNavigate('notes')} 
          icon={<StickyNote size={24} />} 
        />
        <SidebarButton 
          active={activeSection === 'settings'} 
          onClick={() => onNavigate('settings')} 
          icon={<SettingsIcon size={24} />} 
        />
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 w-16 transition-colors ${active ? 'text-indigo-600' : 'text-slate-400'}`}
  >
    {icon}
    <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

const SidebarButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl transition-all ${active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
  >
    {icon}
  </button>
);
