
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlignLeft, MapPin, QrCode, Shield, IdCard, ShieldCheck, AlertCircle } from 'lucide-react';
import { Student } from '../types';

interface ScannerProps {
  onComplete: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onComplete }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scannedStudent, setScannedStudent] = useState<Student | null>(null);
  const [editableStudentId, setEditableStudentId] = useState('');
  const [vType, setVType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Simulate scanning success
  useEffect(() => {
    const timer = setTimeout(() => {
      const studentData = {
        id: 'ST-9942',
        name: 'Jordan Rivera',
        grade: '11',
        section: 'STEM-A',
        photoUrl: 'https://picsum.photos/seed/jordan/200/200'
      };
      setScannedStudent(studentData);
      setEditableStudentId(studentData.id);
      setIsScanning(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRecord = () => {
    if (!vType || !description || !location) return;
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(onComplete, 1500);
    }, 1200);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-xl border-4 border-white">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">ENTRY SECURED</h3>
        <p className="text-slate-500 mt-2 font-medium">Log finalized in central repository.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">QR PASS SCAN</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Disciplinary Authentication</p>
        </div>
        <button onClick={onComplete} className="p-2.5 bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-2xl transition-all active:scale-90">
          <X size={20} />
        </button>
      </div>

      {isScanning ? (
        <div className="relative aspect-[4/5] w-full bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900/50 to-slate-900">
            <div className="w-64 h-64 border-2 border-indigo-400/20 rounded-[2rem] relative backdrop-blur-[1px]">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-indigo-500 -mt-2 -ml-2 rounded-tl-2xl shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-indigo-500 -mt-2 -mr-2 rounded-tr-2xl shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-indigo-500 -mb-2 -ml-2 rounded-bl-2xl shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-indigo-500 -mb-2 -mr-2 rounded-br-2xl shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>
              
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent absolute top-0 animate-[scan_2s_infinite] shadow-[0_0_10px_rgba(79,70,229,0.8)]"></div>
            </div>
            <div className="mt-12 space-y-2 text-center">
              <p className="text-indigo-400 font-black animate-pulse flex items-center justify-center gap-2 tracking-[0.2em] text-[10px]">
                <QrCode size={16} />
                POINT AT STUDENT QR
              </p>
              <p className="text-white/20 text-[8px] font-bold uppercase tracking-[0.4em]">Engine v2.5.0-Secure</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5 animate-in slide-in-from-bottom-8 duration-500">
          {/* Verified Student Profile Card */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-100/20 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/10"></div>
            <div className="relative">
              <img 
                src={scannedStudent?.photoUrl} 
                className="w-28 h-28 rounded-[2rem] shadow-lg border-4 border-white object-cover transform transition-transform group-hover:scale-105" 
                alt="Student" 
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-2 rounded-full border-4 border-white shadow-lg ring-4 ring-green-50/50">
                <ShieldCheck size={18} />
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1.5">
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">Authenticated Profile</span>
              </div>
              <h3 className="text-2xl font-black text-slate-800 leading-tight tracking-tight">{scannedStudent?.name}</h3>
              <p className="text-sm text-slate-400 font-bold mt-1">
                UID: <span className="text-indigo-600 font-black">{scannedStudent?.id}</span>
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
                <span className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-100 shadow-sm">Grade {scannedStudent?.grade}</span>
                <span className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-100 shadow-sm">{scannedStudent?.section}</span>
              </div>
            </div>
          </div>

          {/* Verification & Entry Form */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-6">
            {/* Student ID Verification */}
            <div className="space-y-2">
              <label htmlFor="studentId" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Confirm ID Integrity
              </label>
              <div className="relative group">
                <IdCard className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  id="studentId"
                  type="text" 
                  value={editableStudentId}
                  onChange={(e) => setEditableStudentId(e.target.value)}
                  placeholder="Student ID"
                  className="w-full pl-14 pr-4 py-4.5 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-black text-slate-700 placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Violation Category */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Incident Classification
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Tardiness', 'Attire', 'Academic', 'Behavior'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setVType(type)}
                    className={`py-4 rounded-[1.25rem] text-[11px] font-black uppercase tracking-widest border-2 transition-all ${
                      vType === type 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' 
                      : 'bg-slate-50 border-slate-50 text-slate-400 hover:bg-slate-100 hover:border-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Details Fields - Only visible after type selection */}
            {vType ? (
              <div className="space-y-6 pt-2 animate-in slide-in-from-top-4 duration-500 fill-mode-both">
                <div className="h-px bg-slate-100 w-full" />
                
                {/* Violation Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Contextual Incident Description
                  </label>
                  <div className="relative group">
                    <AlignLeft className="absolute left-5 top-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <textarea 
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed breakdown of the observed conduct..."
                      rows={4}
                      className="w-full pl-14 pr-5 py-5 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300 resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label htmlFor="location" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Geo-Location Verification
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input 
                      id="location"
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Campus Location (e.g., Auditorium Hall)"
                      className="w-full pl-14 pr-5 py-4.5 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-black text-slate-700 placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleRecord}
                  disabled={status === 'processing' || !vType || !description || !location}
                  className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-base shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 group"
                >
                  {status === 'processing' ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      FINALIZING ARCHIVE...
                    </>
                  ) : (
                    <>
                      AUTHORIZE ACCURATE LOG
                      <Shield size={20} className="group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 justify-center py-6 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
                <AlertCircle size={16} className="text-slate-300" />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Select Incident Class to Proceed</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 justify-center text-indigo-500 bg-indigo-50/30 py-4 rounded-[2rem] px-6 border border-indigo-100/50">
            <ShieldCheck size={16} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Validated by QR PASS Identity Protection</p>
          </div>
        </div>
      )}
    </div>
  );
};
