import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing} from '../utils/theme';

type Props = {
  title: string;
  description?: string;
};

function EmptyState({title, description}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  icon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

export default EmptyState;
