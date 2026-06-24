import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colours } from '@/theme/colours';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { Avatar } from './Avatar';

interface PersonCardProps {
  name: string;
  role: string;
  bio?: string;
  avatarColour: string;
}

export function PersonCard({ name, role, bio, avatarColour }: PersonCardProps) {
  const initial = name.charAt(0);
  return (
    <View style={styles.card}>
      <Avatar initial={initial} colour={avatarColour} size={spacing[48]} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        {bio ? <Text style={styles.bio}>{bio}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[12],
    paddingVertical: spacing[8],
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colours.ink,
  },
  role: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    color: colours.inkFaint,
    marginTop: spacing[4],
  },
  bio: {
    fontFamily: typography.sans,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
    color: colours.inkMid,
    marginTop: spacing[8],
    lineHeight: typography.sizes.base * 1.6,
  },
});