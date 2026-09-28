import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import StudentCard from '../components/StudentCard';
import {useStudents} from '../data/StudentContext';
import {RootStackParamList} from '../navigation/types';
import {Student} from '../types/student';
import {colors, radius, spacing} from '../utils/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentList'>;

function StudentListScreen({navigation}: Props) {
  const {students} = useStudents();
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) {
      return students;
    }
    return students.filter(
      student =>
        student.id.toLowerCase().includes(query) ||
        student.fullName.toLowerCase().includes(query),
    );
  }, [students, keyword]);

  const averageGpa = useMemo(() => {
    if (students.length === 0) {
      return 0;
    }
    const total = students.reduce((sum, item) => sum + item.gpa, 0);
    return total / students.length;
  }, [students]);

  const openDetail = (student: Student) => {
    navigation.navigate('StudentDetail', {studentId: student.id});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{students.length}</Text>
          <Text style={styles.statLabel}>Sinh viên</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{averageGpa.toFixed(2)}</Text>
          <Text style={styles.statLabel}>GPA trung bình</Text>
        </View>
      </View>

      <View style={styles.searchWrapper}>
        <SearchBar value={keyword} onChangeText={setKeyword} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <StudentCard student={item} onPress={openDetail} />
        )}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            {keyword.trim()
              ? `Tìm thấy ${filtered.length} kết quả`
              : `Danh sách ${filtered.length} sinh viên`}
          </Text>
        }
        ListEmptyComponent={
          <EmptyState
            title={
              keyword.trim() ? 'Không tìm thấy sinh viên' : 'Chưa có sinh viên'
            }
            description={
              keyword.trim()
                ? 'Thử lại với mã sinh viên hoặc họ tên khác.'
                : 'Nhấn nút + để thêm sinh viên đầu tiên.'
            }
          />
        }
      />

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.fab}
        onPress={() => navigation.navigate('AddStudent')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textMuted,
  },
  searchWrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: 96,
  },
  resultCount: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: spacing.xl,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '300',
  },
});

export default StudentListScreen;
