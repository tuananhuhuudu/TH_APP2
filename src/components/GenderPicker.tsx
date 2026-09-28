import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gender} from '../types/student';
import {colors, radius, spacing} from '../utils/theme';

const OPTIONS: Gender[] = ['Nam', 'Nữ', 'Khác'];

type Props = {
  label: string;
  value: string;
  onChange: (value: Gender) => void;
  error?: string;
};

function GenderPicker({label, value, onChange, error}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {OPTIONS.map(option => {
          const selected = option === value;
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.8}
              onPress={() => onChange(option)}
              style={[styles.option, selected && styles.optionSelected]}>
              <Text style={[styles.text, selected && styles.textSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  textSelected: {
    color: '#FFFFFF',
  },
  error: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.danger,
  },
});

export default GenderPicker;
