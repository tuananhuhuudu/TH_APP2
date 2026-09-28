import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert} from 'react-native';
import StudentFormView from '../components/StudentFormView';
import {useStudents} from '../data/StudentContext';
import {RootStackParamList} from '../navigation/types';
import {Student} from '../types/student';
import {EMPTY_FORM} from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'AddStudent'>;

function AddStudentScreen({navigation}: Props) {
  const {students, addStudent} = useStudents();

  const handleSubmit = (student: Student) => {
    addStudent(student);
    Alert.alert('Thành công', `Đã thêm sinh viên ${student.fullName}.`, [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  return (
    <StudentFormView
      initialForm={EMPTY_FORM}
      existingIds={students.map(item => item.id)}
      submitLabel="Thêm sinh viên"
      onSubmit={handleSubmit}
      onCancel={() => navigation.goBack()}
    />
  );
}

export default AddStudentScreen;
