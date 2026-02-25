import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme';

interface WelcomeBannerProps {
  userName: string;
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  wishlistCount?: number;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName,
  onSearchPress,
  onWishlistPress,
  wishlistCount = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>{userName}</Text>
      </View>

      <View style={styles.right}>
        {/* Search icon */}
        <TouchableOpacity
          onPress={onSearchPress}
          activeOpacity={0.7}
          style={styles.iconBtn}
        >
          <Ionicons name="search-outline" size={22} color={colors.black} />
        </TouchableOpacity>

        {/* Wishlist icon */}
        <TouchableOpacity
          onPress={onWishlistPress}
          activeOpacity={0.7}
          style={styles.iconBtn}
        >
          <Ionicons name="heart-outline" size={22} color={colors.black} />
          {wishlistCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  left: {
    flex: 1,
  },
  greeting: {
    ...typography.caption,
    color: colors.gray,
  },
  name: {
    ...typography.h2,
    color: colors.black,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '700',
  },
});

export default WelcomeBanner;
