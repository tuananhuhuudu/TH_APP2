import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert} from 'react-native';
import StudentFormView from '../components/StudentFormView';
import {useStudents} from '../data/StudentContext';
import {RootStackParamList} from '../navigation/types';
import {Student} from '../types/student';
import {studentToForm} from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'EditStudent'>;

function EditStudentScreen({navigation, route}: Props) {
  const {student} = route.params;
  const {students, updateStudent} = useStudents();

  const handleSubmit = (updated: Student) => {
    updateStudent(student.id, updated);
    Alert.alert('Thành công', 'Đã cập nhật thông tin sinh viên.', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('StudentDetail', {studentId: updated.id});
        },
      },
    ]);
  };

  return (
    <StudentFormView
      initialForm={studentToForm(student)}
      existingIds={students.map(item => item.id)}
      currentId={student.id}
      submitLabel="Lưu thay đổi"
      onSubmit={handleSubmit}
      onCancel={() => navigation.goBack()}
    />
  );
}

export default EditStudentScreen;
