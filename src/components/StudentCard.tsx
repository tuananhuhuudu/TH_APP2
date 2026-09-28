import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Student} from '../types/student';
import {getClassification} from '../utils/classification';
import {colors, radius, spacing} from '../utils/theme';
import ClassificationBadge from './ClassificationBadge';

type Props = {
  student: Student;
  onPress: (student: Student) => void;
};

function StudentCard({student, onPress}: Props) {
  const initials = student.fullName.trim().split(' ').slice(-1)[0]?.[0] ?? '?';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => onPress(student)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials.toUpperCase()}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {student.fullName}
        </Text>
        <Text style={styles.meta}>
          {student.id} · Lớp {student.className}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.gpa}>GPA {student.gpa.toFixed(2)}</Text>
          <ClassificationBadge value={getClassification(student.gpa)} />
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  gpa: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  chevron: {
    fontSize: 28,
    color: colors.placeholder,
    marginLeft: spacing.sm,
  },
});

export default StudentCard;
