import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colours } from '@/theme/colours';
import { spacing } from '@/theme/spacing';

interface DocWrapperProps extends ViewProps {
  children: React.ReactNode;
}

export function DocWrapper({ children, style, ...rest }: DocWrapperProps) {
  return (
    <View style={[styles.wrapper, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colours.paper,
    borderTopWidth: 4,
    borderTopColor: colours.ink,
    paddingHorizontal: spacing[32],
    paddingVertical: spacing[36],
    flex: 1,
  },
});