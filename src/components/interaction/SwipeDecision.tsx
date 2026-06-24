import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  interpolateColor,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { colours } from '@/theme/colours';
import { spacing } from '@/theme/spacing';

interface SwipeDecisionProps {
  onApprove: () => void;
  onDeny: () => void;
  children: React.ReactNode;
}

const SWIPE_THRESHOLD = 80;
const TRAIL_MAX = 120;

type GestureContext = { startX: number };

export function SwipeDecision({ onApprove, onDeny, children }: SwipeDecisionProps) {
  const translateX = useSharedValue(0);

  const triggerHaptic = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  }, []);

  const handleApprove = useCallback(() => {
    triggerHaptic();
    onApprove();
  }, [onApprove, triggerHaptic]);

  const handleDeny = useCallback(() => {
    triggerHaptic();
    onDeny();
  }, [onDeny, triggerHaptic]);

  const gestureHandler = useAnimatedGestureHandler
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      if (translateX.value > SWIPE_THRESHOLD) {
        runOnJS(handleApprove)();
        translateX.value = withSpring(0);
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        runOnJS(handleDeny)();
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Green trail on right, red trail on left
  const trailStyle = useAnimatedStyle(() => {
    const absX = translateX.value;
    const trailOpacity = interpolate(
      Math.abs(absX),
      [0, SWIPE_THRESHOLD],
      [0, 0.3],
      Extrapolate.CLAMP,
    );
    const bgColor = interpolateColor(
      absX,
      [-TRAIL_MAX, 0, TRAIL_MAX],
      [colours.stampDeny, colours.paper, colours.stampApprove],
    );
    return {
      backgroundColor: bgColor,
      opacity: trailOpacity,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, trailStyle]} />
      <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetX={[-10, 10]}>
        <Animated.View style={[styles.card, cardStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginVertical: spacing[8],
  },
  card: {
    width: '100%',
  },
});