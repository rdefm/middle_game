import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

type StampType = 'approved' | 'denied' | 'neutral';

interface StampOverlayProps {
  text: string;
  type: StampType;
  visible: boolean;
}

const STAMP_COLOURS: Record<StampType, string> = {
  approved: colours.stampApprove,
  denied: colours.stampDeny,
  neutral: colours.ink,
};

export function StampOverlay({ text, type, visible }: StampOverlayProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(-12)).current;
  const scale = useRef(new Animated.Value(1.4)).current;

  useEffect(() => {
    if (visible) {
      Haptics.notificationAsync(
        type === 'approved'
          ? Haptics.NotificationFeedbackType.Success
          : type === 'denied'
          ? Haptics.NotificationFeedbackType.Error
          : Haptics.NotificationFeedbackType.Warning,
      ).catch(() => {});

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          tension: 120,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacity.setValue(0);
      rotate.setValue(-12);
      scale.setValue(1.4);
    }
  }, [visible, type, opacity, rotate, scale]);

  const rotateStr = rotate.interpolate({
    inputRange: [-12, -6],
    outputRange: ['-12deg', '-6deg'],
  });

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.stamp,
        {
          opacity,
          transform: [{ rotate: rotateStr }, { scale }],
          borderColor: STAMP_COLOURS[type],
        },
      ]}
      pointerEvents="none"
    >
      <Text style={[styles.text, { color: STAMP_COLOURS[type] }]}>
        {text.toUpperCase()}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stamp: {
    position: 'absolute',
    top: spacing[16],
    right: spacing[16],
    borderWidth: 3,
    borderRadius: 2,
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[8],
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  text: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.medium,
    letterSpacing: 3,
  },
});