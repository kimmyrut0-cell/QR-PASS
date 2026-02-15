
import React, { useState } from 'react';
import { Search, Sparkles, Filter, ChevronRight, Calendar, Plus, Lock } from 'lucide-react';
import { Note, User } from '../types';

const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'Discipline Committee Meeting',
    content: 'Discussed behavioral patterns for Grade 10 section B. Noticed a spike in absenteeism.',
    date: 'May 14, 2024',
    tags: ['meeting', 'behavior']
  },
  {
    id: '2',
    title: 'Incident Report #204',
    content: 'Student was found smoking behind the gym. Intervention scheduled with parents for Friday.',
    date: 'May 12, 2024',
    tags: ['urgent', 'smoking']
  },
  {
    id: '3',
    title: 'Follow-up: Sarah Miller',
    content: 'Sarah has shown improvement in arrival times after the counseling session last week.',
    date: 'May 10, 2024',
    tags: ['positive', 'follow-up']
  }
];

interface NotesProps {
  user: User;
}

export const Notes: React.FC<NotesProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isTeacher = user.role === 'teacher';

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Observation Log</h2>
          {!isTeacher && (
            <div className="flex items-center gap-1.5 text-slate-400 mt-1">
              <Lock size={10} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Public Observations Only</span>
            </div>
          )}
        </div>
        {isTeacher ? (
          <div className="flex gap-2">
            <button className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-md">
              <Plus size={20} />
            </button>
            <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-indigo-100 transition-colors shadow-sm">
              <Sparkles size={20} />
              <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">AI Helper</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 text-slate-400 px-4 py-2 rounded-xl flex items-center gap-2">
             <span className="text-[10px] font-black uppercase tracking-widest">Read Only</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search reports, students..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm font-bold text-slate-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
          <Filter size={18} />
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {MOCK_NOTES.map(note => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </div>

      <div className="py-8 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Institutional Records Office</p>
      </div>
    </div>
  );
};

const NoteListItem: React.FC<{ note: Note }> = ({ note }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{note.title}</h4>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
          <Calendar size={10} />
          {note.date}
        </span>
      </div>
      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
        {note.content}
      </p>
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          {note.tags.map(tag => (
            <span key={tag} className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>
        <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};
