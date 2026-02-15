
import React, { useState } from 'react';
import { ShieldCheck, ScanLine, User as UserIcon, Lock, ChevronRight, School, Mail, UserPlus, ArrowRight } from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

type AuthMode = 'login' | 'signup';

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('teacher');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signup') {
      if (!name) return setError('Full name is required');
      if (password !== confirmPassword) return setError('Passwords do not match');
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: id || (role === 'teacher' ? 'T-902' : 'S-441'),
        name: mode === 'signup' ? name : (role === 'teacher' ? 'Prof. Sarah Jenkins' : 'Jordan Rivera'),
        role: role,
        email: id.includes('@') ? id : (role === 'teacher' ? 's.jenkins@school.edu' : 'j.rivera@student.edu'),
        avatarUrl: `https://picsum.photos/seed/${role}-${id}/200/200`
      };
      onLogin(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">
      <div className="w-full max-w-md space-y-8 py-8">
        <div className="text-center space-y-2 animate-in fade-in zoom-in duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 text-white rounded-[2.2rem] shadow-2xl mb-4 transform -rotate-6 transition-transform hover:rotate-0">
            <ScanLine size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">QR PASS</h1>
          <p className="text-slate-500 font-medium">Secure Portal for Academic Conduct</p>
        </div>

        <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-white animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex justify-between items-center mb-8 bg-slate-50 p-1 rounded-2xl">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Access Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-[2rem] border-2 transition-all ${
                    role === 'teacher' 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' 
                    : 'border-slate-50 bg-slate-50 text-slate-400'
                  }`}
                >
                  <School size={20} />
                  <span className="text-[10px] font-black uppercase tracking-wider">Teacher</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-[2rem] border-2 transition-all ${
                    role === 'student' 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' 
                    : 'border-slate-50 bg-slate-50 text-slate-400'
                  }`}
                >
                  <UserIcon size={20} />
                  <span className="text-[10px] font-black uppercase tracking-wider">Student</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[10px] font-bold p-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                {error.toUpperCase()}
              </div>
            )}

            <div className="space-y-4">
              {mode === 'signup' && (
                <div className="relative group animate-in slide-in-from-left-4 duration-300">
                  <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-bold text-slate-700"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={mode === 'signup'}
                  />
                </div>
              )}

              <div className="relative group transition-all">
                {role === 'teacher' ? <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} /> : <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />}
                <input
                  type="text"
                  placeholder={role === 'teacher' ? 'Institutional Email' : 'Student ID Number'}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-bold text-slate-700"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-bold text-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {mode === 'signup' && (
                <div className="relative group animate-in slide-in-from-left-4 duration-500">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-bold text-slate-700"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={mode === 'signup'}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-base shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? 'SECURE SIGN IN' : 'CREATE ACCOUNT'}
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-6 text-center">
              <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                Forgot your password?
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-1000">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Grade Encryption</span>
          </div>
          
          <button 
            onClick={toggleMode}
            className="flex items-center gap-2 text-indigo-600 font-black text-xs tracking-tight hover:gap-3 transition-all"
          >
            {mode === 'login' ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
