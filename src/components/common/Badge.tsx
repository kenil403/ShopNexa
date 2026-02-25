import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

interface BadgeProps {
  count: number;
  size?: 'small' | 'medium';
}

const Badge: React.FC<BadgeProps> = ({ count, size = 'small' }) => {
  if (count <= 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View style={[styles.badge, size === 'medium' && styles.mediumBadge]}>
      <Text style={[styles.text, size === 'medium' && styles.mediumText]}>
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  mediumBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
  },
  text: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '700',
  },
  mediumText: {
    fontSize: 11,
  },
});

export default Badge;
