import {Student} from '../types/student';

export type RootStackParamList = {
  StudentList: undefined;
  StudentDetail: {studentId: string};
  AddStudent: undefined;
  EditStudent: {student: Student};
};
