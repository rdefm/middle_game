import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { colours } from '@/theme/colours';

interface ScreenScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

export function ScreenScrollView({
  children,
  style,
  contentContainerStyle,
  ...rest
}: ScreenScrollViewProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.ScrollView
      style={[styles.scroll, { opacity }, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colours.appBg,
  },
  content: {
    flexGrow: 1,
  },
});