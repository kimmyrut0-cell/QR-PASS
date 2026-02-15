
import React, { useState } from 'react';
import { Folder, ChevronRight, Edit3, Plus, Search, ChevronLeft, Save, X, Files, Users, ClipboardList, Filter, MoreVertical } from 'lucide-react';
import { GradeLevel, User, Folder as SectionFolder, Severity, Violation } from '../types';

// Mock violations for the drill-down view
const MOCK_VIOLATIONS: Violation[] = [
  { id: '1', studentName: 'Jordan Rivera', studentId: 'ST-9942', type: 'Tardiness', severity: Severity.LOW, date: 'May 15, 2024', description: 'Late for 1st period', location: 'Gate A' },
  { id: '2', studentName: 'Alex Smith', studentId: 'ST-1022', type: 'Behavior', severity: Severity.MEDIUM, date: 'May 14, 2024', description: 'Disruptive in class', location: 'Room 102' },
];

const INITIAL_GRADES: GradeLevel[] = [
  {
    id: 'g7',
    name: 'Grade 7',
    sections: [
      { id: 'g7a', name: 'Section Alpha', itemCount: 12 },
      { id: 'g7b', name: 'Section Beta', itemCount: 8 }
    ]
  },
  {
    id: 'g11',
    name: 'Grade 11',
    sections: [
      { id: 'g11a', name: 'STEM-A', itemCount: 30 },
      { id: 'g11b', name: 'HUMSS-B', itemCount: 25 }
    ]
  }
];

interface DirectoryProps {
  user: User;
}

type ViewState = 'grades' | 'sections' | 'records';

export const Directory: React.FC<DirectoryProps> = ({ user }) => {
  const [grades, setGrades] = useState<GradeLevel[]>(INITIAL_GRADES);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [selectedSection, setSelectedSection] = useState<SectionFolder | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const isTeacher = user.role === 'teacher';

  const currentView: ViewState = selectedSection ? 'records' : selectedGrade ? 'sections' : 'grades';

  const handleEditClick = (e: React.MouseEvent, id: string, currentName: string) => {
    e.stopPropagation();
    if (!isTeacher) return;
    setEditingId(id);
    setTempName(currentName);
  };

  const handleSaveEdit = (e: React.MouseEvent, id: string, isGrade: boolean) => {
    e.stopPropagation();
    const updated = grades.map(g => {
      if (isGrade && g.id === id) return { ...g, name: tempName };
      return {
        ...g,
        sections: g.sections.map(s => s.id === id ? { ...s, name: tempName } : s)
      };
    });
    setGrades(updated);
    setEditingId(null);
    if (selectedGrade?.id === id && isGrade) setSelectedGrade({ ...selectedGrade, name: tempName });
    if (selectedSection?.id === id && !isGrade) setSelectedSection({ ...selectedSection, name: tempName });
  };

  const handleAdd = () => {
    if (!isTeacher) return;
    const newId = `new-${Math.random().toString(36).substr(2, 9)}`;
    if (selectedGrade) {
      const updated = grades.map(g => {
        if (g.id === selectedGrade.id) {
          const newSection = { id: newId, name: 'New Section', itemCount: 0 };
          return { ...g, sections: [...g.sections, newSection] };
        }
        return g;
      });
      setGrades(updated);
      setSelectedGrade(updated.find(g => g.id === selectedGrade.id) || null);
    } else {
      const newGrade = { id: newId, name: 'New Grade', sections: [] };
      setGrades([...grades, newGrade]);
    }
    setEditingId(newId);
    setTempName(selectedGrade ? 'New Section' : 'New Grade');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-2 py-0.5 rounded">Directory</span>
              {selectedGrade && (
                <>
                  <ChevronRight size={12} className="text-slate-300" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedGrade.name}</span>
                </>
              )}
              {selectedSection && (
                <>
                  <ChevronRight size={12} className="text-slate-300" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedSection.name}</span>
                </>
              )}
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {selectedSection ? `${selectedSection.name} Records` : selectedGrade ? selectedGrade.name : 'Conduct Archives'}
            </h2>
          </div>
          {isTeacher && currentView !== 'records' && (
            <button 
              onClick={handleAdd}
              className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-90"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>

      {currentView !== 'grades' && (
        <button 
          onClick={() => selectedSection ? setSelectedSection(null) : setSelectedGrade(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-sm"
        >
          <ChevronLeft size={18} />
          Back to {selectedSection ? selectedGrade?.name : 'all Grades'}
        </button>
      )}

      {currentView === 'records' ? (
        <RecordsView sectionName={selectedSection?.name || ''} />
      ) : (
        <>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={`Search in ${selectedGrade ? selectedGrade.name : 'Archive'}...`}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm font-bold text-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentView === 'grades' ? (
              grades.map(grade => (
                <FolderCard 
                  key={grade.id} id={grade.id} name={grade.name} count={grade.sections.length} countLabel="Sections"
                  isEditing={editingId === grade.id} tempName={tempName} setTempName={setTempName}
                  onEdit={(e) => handleEditClick(e, grade.id, grade.name)}
                  onSave={(e) => handleSaveEdit(e, grade.id, true)}
                  onCancel={(e) => { e.stopPropagation(); setEditingId(null); }}
                  onClick={() => setSelectedGrade(grade)}
                  isTeacher={isTeacher}
                />
              ))
            ) : (
              selectedGrade?.sections.map(section => (
                <FolderCard 
                  key={section.id} id={section.id} name={section.name} count={section.itemCount} countLabel="Logs"
                  isEditing={editingId === section.id} tempName={tempName} setTempName={setTempName}
                  onEdit={(e) => handleEditClick(e, section.id, section.name)}
                  onSave={(e) => handleSaveEdit(e, section.id, false)}
                  onCancel={(e) => { e.stopPropagation(); setEditingId(null); }}
                  onClick={() => setSelectedSection(section)}
                  isTeacher={isTeacher}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

const RecordsView: React.FC<{ sectionName: string }> = ({ sectionName }) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
          <ClipboardList size={20} />
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Incident Logs for {sectionName}</p>
      </div>
      <button className="text-indigo-600 p-2 hover:bg-indigo-50 rounded-xl transition-colors">
        <Filter size={18} />
      </button>
    </div>

    {MOCK_VIOLATIONS.map(v => (
      <div key={v.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400">
          {v.studentName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-slate-800 text-sm truncate">{v.studentName}</h4>
            <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-widest ${
              v.severity === Severity.HIGH ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
            }`}>
              {v.severity}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">{v.type} • {v.date}</p>
          <p className="text-xs text-slate-500 mt-2 line-clamp-1">{v.description}</p>
        </div>
        <button className="text-slate-300 hover:text-slate-600">
          <MoreVertical size={20} />
        </button>
      </div>
    ))}

    <div className="flex flex-col items-center justify-center py-10 opacity-30">
      <Users size={48} className="text-slate-300 mb-2" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em]">End of Records</p>
    </div>
  </div>
);

interface FolderCardProps {
  id: string;
  name: string;
  count: number;
  countLabel: string;
  isEditing: boolean;
  tempName: string;
  setTempName: (v: string) => void;
  onEdit: (e: React.MouseEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onClick: () => void;
  isTeacher: boolean;
}

const FolderCard: React.FC<FolderCardProps> = ({ 
  name, count, countLabel, isEditing, tempName, setTempName, onEdit, onSave, onCancel, onClick, isTeacher 
}) => {
  return (
    <div 
      onClick={!isEditing ? onClick : undefined}
      className={`relative bg-white p-5 rounded-[2rem] border-2 transition-all group ${
        isEditing ? 'border-indigo-500 ring-4 ring-indigo-50' : 'border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/30 cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${isEditing ? 'bg-indigo-600 text-white shadow-lg' : 'bg-indigo-50 text-indigo-600'} transition-all transform group-hover:scale-110`}>
          <Folder size={24} />
        </div>
        {!isEditing && isTeacher && (
          <button 
            onClick={onEdit}
            className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
          >
            <Edit3 size={18} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3" onClick={e => e.stopPropagation()}>
          <input 
            autoFocus
            type="text"
            value={tempName}
            onChange={e => setTempName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSave(e as any)}
            className="w-full px-4 py-2 bg-slate-50 border-2 border-indigo-100 rounded-xl focus:outline-none focus:border-indigo-500 font-bold text-slate-800 transition-all"
          />
          <div className="flex gap-2">
            <button 
              onClick={onSave}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200"
            >
              <Save size={14} />
              Save Changes
            </button>
            <button 
              onClick={onCancel}
              className="bg-slate-100 text-slate-500 p-2.5 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-black text-slate-800 mb-1 truncate">{name}</h3>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{count} {countLabel}</p>
          <div className="mt-4 flex justify-end">
            <ChevronRight size={20} className="text-slate-200 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </div>
        </>
      )}
    </div>
  );
};
