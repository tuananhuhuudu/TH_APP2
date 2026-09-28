import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {Student} from '../types/student';
import {INITIAL_STUDENTS} from './students';

type StudentContextValue = {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (originalId: string, student: Student) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
};

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export function StudentProvider({children}: {children: React.ReactNode}) {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const addStudent = useCallback((student: Student) => {
    setStudents(prev => [student, ...prev]);
  }, []);

  const updateStudent = useCallback((originalId: string, student: Student) => {
    setStudents(prev =>
      prev.map(item => (item.id === originalId ? student : item)),
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents(prev => prev.filter(item => item.id !== id));
  }, []);

  const getStudentById = useCallback(
    (id: string) => students.find(item => item.id === id),
    [students],
  );

  const value = useMemo(
    () => ({students, addStudent, updateStudent, deleteStudent, getStudentById}),
    [students, addStudent, updateStudent, deleteStudent, getStudentById],
  );

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}

export function useStudents(): StudentContextValue {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents phải được dùng bên trong StudentProvider');
  }
  return context;
}
