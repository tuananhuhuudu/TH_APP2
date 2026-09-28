import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppButton from '../components/AppButton';
import ClassificationBadge from '../components/ClassificationBadge';
import EmptyState from '../components/EmptyState';
import InfoRow from '../components/InfoRow';
import {useStudents} from '../data/StudentContext';
import {RootStackParamList} from '../navigation/types';
import {getClassification} from '../utils/classification';
import {colors, radius, spacing} from '../utils/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentDetail'>;

function StudentDetailScreen({navigation, route}: Props) {
  const {studentId} = route.params;
  const {getStudentById, deleteStudent} = useStudents();
  const student = getStudentById(studentId);

  if (!student) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Không tìm thấy sinh viên"
          description="Sinh viên này có thể đã bị xoá."
        />
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert(
      'Xác nhận xoá',
      `Bạn có chắc muốn xoá sinh viên ${student.fullName} (${student.id})?`,
      [
        {text: 'Huỷ', style: 'cancel'},
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: () => {
            deleteStudent(student.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(student.fullName.trim().split(' ').slice(-1)[0]?.[0] ?? '?').toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{student.fullName}</Text>
        <Text style={styles.code}>{student.id}</Text>
        <View style={styles.heroFooter}>
          <Text style={styles.gpa}>GPA {student.gpa.toFixed(2)}</Text>
          <ClassificationBadge value={getClassification(student.gpa)} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <InfoRow label="Họ tên" value={student.fullName} />
        <InfoRow label="Ngày sinh" value={student.birthday} />
        <InfoRow label="Giới tính" value={student.gender} />
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Số điện thoại" value={student.phone} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin học tập</Text>
        <InfoRow label="Mã sinh viên" value={student.id} />
        <InfoRow label="Lớp" value={student.className} />
        <InfoRow label="Khoa" value={student.faculty} />
        <InfoRow label="GPA" value={student.gpa.toFixed(2)} />
        <InfoRow label="Xếp loại" value={getClassification(student.gpa)} />
      </View>

      <View style={styles.actions}>
        <AppButton
          title="Chỉnh sửa"
          style={styles.actionButton}
          onPress={() => navigation.navigate('EditStudent', {student})}
        />
        <AppButton
          title="Xoá sinh viên"
          variant="danger"
          style={styles.actionButton}
          onPress={confirmDelete}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  name: {
    marginTop: spacing.md,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  code: {
    marginTop: 2,
    fontSize: 14,
    color: colors.textMuted,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  gpa: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xs,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});

export default StudentDetailScreen;
