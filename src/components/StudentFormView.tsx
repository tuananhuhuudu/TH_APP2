import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Gender, Student, StudentFormErrors, StudentForm} from '../types/student';
import {getClassification} from '../utils/classification';
import {colors, radius, spacing} from '../utils/theme';
import {
  formToStudent,
  hasErrors,
  validateStudentForm,
} from '../utils/validation';
import AppButton from './AppButton';
import ClassificationBadge from './ClassificationBadge';
import FormInput from './FormInput';
import GenderPicker from './GenderPicker';

type Props = {
  initialForm: StudentForm;
  existingIds: string[];
  currentId?: string;
  submitLabel: string;
  onSubmit: (student: Student) => void;
  onCancel: () => void;
};

function StudentFormView({
  initialForm,
  existingIds,
  currentId,
  submitLabel,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<StudentForm>(initialForm);
  const [errors, setErrors] = useState<StudentFormErrors>({});

  const setField = (key: keyof StudentForm) => (value: string) => {
    setForm(prev => ({...prev, [key]: value}));
    setErrors(prev => {
      if (!prev[key]) {
        return prev;
      }
      const next = {...prev};
      delete next[key];
      return next;
    });
  };

  const handleSubmit = () => {
    const nextErrors = validateStudentForm(form, existingIds, currentId);
    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    onSubmit(formToStudent(form));
  };

  const parsedGpa = Number(form.gpa.trim().replace(',', '.'));
  const showPreview =
    form.gpa.trim() !== '' && !Number.isNaN(parsedGpa) && parsedGpa >= 0 && parsedGpa <= 10;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <FormInput
            label="Họ và tên *"
            value={form.fullName}
            onChangeText={setField('fullName')}
            placeholder="Nguyễn Văn A"
            autoCapitalize="words"
            error={errors.fullName}
          />
          <FormInput
            label="Ngày sinh *"
            value={form.birthday}
            onChangeText={setField('birthday')}
            placeholder="dd/MM/yyyy"
            keyboardType="numbers-and-punctuation"
            error={errors.birthday}
          />
          <GenderPicker
            label="Giới tính *"
            value={form.gender}
            onChange={(value: Gender) => setField('gender')(value)}
            error={errors.gender}
          />
          <FormInput
            label="Email *"
            value={form.email}
            onChangeText={setField('email')}
            placeholder="email@stu.ptit.edu.vn"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <FormInput
            label="Số điện thoại *"
            value={form.phone}
            onChangeText={setField('phone')}
            placeholder="0912345678"
            keyboardType="phone-pad"
            error={errors.phone}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Thông tin học tập</Text>
          <FormInput
            label="Mã sinh viên *"
            value={form.id}
            onChangeText={setField('id')}
            placeholder="B23CC004"
            autoCapitalize="characters"
            error={errors.id}
          />
          <FormInput
            label="Lớp *"
            value={form.className}
            onChangeText={setField('className')}
            placeholder="D23CQCC04-B"
            autoCapitalize="characters"
            error={errors.className}
          />
          <FormInput
            label="Khoa *"
            value={form.faculty}
            onChangeText={setField('faculty')}
            placeholder="Công nghệ thông tin"
            autoCapitalize="words"
            error={errors.faculty}
          />
          <FormInput
            label="GPA (0 - 10) *"
            value={form.gpa}
            onChangeText={setField('gpa')}
            placeholder="8.5"
            keyboardType="decimal-pad"
            error={errors.gpa}
          />

          {showPreview && (
            <View style={styles.preview}>
              <Text style={styles.previewLabel}>Xếp loại dự kiến</Text>
              <ClassificationBadge value={getClassification(parsedGpa)} />
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <AppButton title={submitLabel} onPress={handleSubmit} />
          <AppButton title="Huỷ" variant="outline" onPress={onCancel} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.xs,
  },
  previewLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  actions: {
    gap: spacing.md,
  },
});

export default StudentFormView;
