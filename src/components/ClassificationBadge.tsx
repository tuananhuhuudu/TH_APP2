import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Classification} from '../types/student';
import {CLASSIFICATION_COLORS} from '../utils/classification';
import {radius, spacing} from '../utils/theme';

type Props = {
  value: Classification;
};

function ClassificationBadge({value}: Props) {
  const palette = CLASSIFICATION_COLORS[value];
  return (
    <View style={[styles.badge, {backgroundColor: palette.bg}]}>
      <Text style={[styles.label, {color: palette.text}]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ClassificationBadge;
