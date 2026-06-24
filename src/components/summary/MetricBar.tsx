import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface MetricBarProps {
  label: string;
  value: number; // 0–100
}

export function MetricBar({ label, value }: MetricBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: value,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [value, widthAnim]);

  const widthPercent = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: widthPercent }]} />
      </View>
      <Text style={styles.value}>{Math.round(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[12],
    marginVertical: spacing[8],
  },
  label: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.inkFaint,
    letterSpacing: 0.5,
    width: spacing[48] + spacing[24],
  },
  track: {
    flex: 1,
    height: spacing[8],
    backgroundColor: colours.rule,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colours.ink,
  },
  value: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
    width: spacing[24],
    textAlign: 'right',
  },
});