import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';
import { useWishlist } from '../../hooks/useWishlist';
import { ScreenBackground } from '../../components/common';
import { formatCurrency } from '../../utils/helpers';

interface Props {
  navigation: any;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { orderCount, totalSpent } = useOrders();
  const { wishlistCount } = useWishlist();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const quickActions = [
    {
      icon: 'receipt-outline' as const,
      label: 'My Orders',
      color: '#2196F3',
      bg: '#E3F2FD',
      onPress: () => navigation.navigate('OrderHistory'),
    },
    {
      icon: 'heart-outline' as const,
      label: 'Wishlist',
      color: '#E91E63',
      bg: '#FCE4EC',
      onPress: () => navigation.navigate('Wishlist'),
    },
    {
      icon: 'location-outline' as const,
      label: 'Addresses',
      color: '#FF9800',
      bg: '#FFF3E0',
      onPress: () => Alert.alert('Coming Soon', 'Addresses feature coming soon!'),
    },
    {
      icon: 'document-text-outline' as const,
      label: 'Invoices',
      color: '#2196F3',
      bg: '#E3F2FD',
      onPress: () => navigation.navigate('OrderHistory'),
    },
  ];

  const moreOptions = [
    {
      icon: 'location-outline' as const,
      label: 'Delivery Addresses',
      subtitle: 'Manage your saved addresses',
      onPress: () => Alert.alert('Coming Soon', 'Addresses feature coming soon!'),
    },
    {
      icon: 'document-text-outline' as const,
      label: 'Invoice History',
      subtitle: 'View and download invoices',
      onPress: () => navigation.navigate('OrderHistory'),
    },
    {
      icon: 'settings-outline' as const,
      label: 'Settings',
      subtitle: 'App preferences & notifications',
      onPress: () => Alert.alert('Coming Soon', 'Settings feature coming soon!'),
    },
    {
      icon: 'help-circle-outline' as const,
      label: 'Help & Support',
      subtitle: 'FAQs, contact us, feedback',
      onPress: () => Alert.alert('Coming Soon', 'Help & Support feature coming soon!'),
    },
    {
      icon: 'information-circle-outline' as const,
      label: 'About ShopNexa',
      subtitle: 'Version 1.0.0',
      onPress: () => Alert.alert('ShopNexa', 'Version 1.0.0\nMade with ❤️'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenBackground variant="cool">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Dark Gradient Header */}
          <LinearGradient
            colors={['#0D47A1', '#1565C0', '#2196F3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerTop}>
              <Text style={styles.headerTitle}>My Profile</Text>
              <TouchableOpacity style={styles.editIconBtn} activeOpacity={0.7}>
                <Ionicons name="create-outline" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>

            {/* Avatar + Info */}
            <View style={styles.profileRow}>
              <View style={styles.avatarOuter}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
                <Text style={styles.userEmail}>{user?.email || ''}</Text>
                {user?.role === 'admin' && (
                  <View style={styles.adminBadge}>
                    <Ionicons name="shield-checkmark" size={10} color="#fff" />
                    <Text style={styles.adminText}>Admin</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{orderCount}</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  {totalSpent > 0 ? formatCurrency(totalSpent) : '₹0'}
                </Text>
                <Text style={styles.statLabel}>Total Spent</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{wishlistCount}</Text>
                <Text style={styles.statLabel}>Wishlist</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Quick Actions Grid */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.actionCard}
                  activeOpacity={0.75}
                  onPress={action.onPress}
                >
                  <View style={[styles.actionIconBg, { backgroundColor: action.bg }]}>
                    <Ionicons name={action.icon} size={24} color={action.color} />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* More Options */}
          <Text style={styles.sectionTitle}>More Options</Text>
          <View style={styles.optionsList}>
            {moreOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionItem,
                  index === moreOptions.length - 1 && { borderBottomWidth: 0 },
                ]}
                activeOpacity={0.7}
                onPress={option.onPress}
              >
                <View style={styles.optionIconBg}>
                  <Ionicons name={option.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.gray} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={22} color={colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },

  /* ====== GRADIENT HEADER ====== */
  headerGradient: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.white,
  },
  editIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Avatar */
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  avatarOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h2,
    color: colors.white,
  },
  userEmail: {
    ...typography.body,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  adminBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: spacing.xs,
    gap: 4,
  },
  adminText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  statLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  /* ====== QUICK ACTIONS ====== */
  sectionTitle: {
    ...typography.h3,
    color: colors.black,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  actionsContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  actionIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actionLabel: {
    ...typography.captionBold,
    color: colors.black,
  },

  /* ====== MORE OPTIONS ====== */
  optionsList: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: spacing.md,
  },
  optionIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    ...typography.bodyBold,
    color: colors.black,
  },
  optionSubtitle: {
    ...typography.caption,
    color: colors.gray,
    marginTop: 2,
  },

  /* ====== LOGOUT ====== */
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.error + '30',
    gap: spacing.sm,
  },
  logoutText: {
    ...typography.bodyBold,
    color: colors.error,
  },
});

export default ProfileScreen;
