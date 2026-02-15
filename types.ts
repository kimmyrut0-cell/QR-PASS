
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatarUrl?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  photoUrl: string;
}

export interface Violation {
  id: string;
  studentName: string;
  studentId: string;
  type: string;
  severity: Severity;
  date: string;
  description: string;
  location: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export interface Folder {
  id: string;
  name: string;
  itemCount: number;
}

export interface GradeLevel {
  id: string;
  name: string;
  sections: Folder[];
}

export type AppSection = 'dashboard' | 'scan' | 'notes' | 'settings' | 'directory';
