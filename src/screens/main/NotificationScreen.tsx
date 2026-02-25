import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { Header, ScreenBackground } from '../../components/common';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: keyof typeof Ionicons.glyphMap;
  read: boolean;
  type: 'order' | 'promo' | 'arrival' | 'price' | 'delivery';
}

const notifAccents: Record<string, { color: string; bg: string; gradient: [string, string] }> = {
  order: { color: '#1976D2', bg: '#E3F2FD', gradient: ['#42A5F5', '#1976D2'] },
  promo: { color: '#E65100', bg: '#FFF3E0', gradient: ['#FF9800', '#E65100'] },
  arrival: { color: '#7B1FA2', bg: '#F3E5F5', gradient: ['#AB47BC', '#7B1FA2'] },
  price: { color: '#00838F', bg: '#E0F7FA', gradient: ['#26C6DA', '#00838F'] },
  delivery: { color: '#2E7D32', bg: '#E8F5E9', gradient: ['#66BB6A', '#2E7D32'] },
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Order Confirmed',
    message: 'Your order #ORD_12345 has been confirmed and is being processed.',
    time: '2 min ago',
    icon: 'checkmark-circle',
    read: false,
    type: 'order',
  },
  {
    id: '2',
    title: 'Flash Sale! 🔥',
    message: 'Up to 50% off on skincare products. Limited time offer!',
    time: '1 hour ago',
    icon: 'flash',
    read: false,
    type: 'promo',
  },
  {
    id: '3',
    title: 'New Arrivals',
    message: 'Check out the latest collection of fragrances and makeup.',
    time: '3 hours ago',
    icon: 'gift',
    read: true,
    type: 'arrival',
  },
  {
    id: '4',
    title: 'Price Drop Alert',
    message: 'An item in your wishlist is now on sale!',
    time: '5 hours ago',
    icon: 'pricetag',
    read: true,
    type: 'price',
  },
  {
    id: '5',
    title: 'Delivery Update',
    message: 'Your package is out for delivery today.',
    time: '1 day ago',
    icon: 'bicycle',
    read: true,
    type: 'delivery',
  },
];

const NotificationScreen: React.FC = () => {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const renderNotification = ({ item, index }: { item: Notification; index: number }) => {
    const accent = notifAccents[item.type] || notifAccents.order;

    return (
      <TouchableOpacity activeOpacity={0.7} style={[styles.notifCard, !item.read && styles.unreadCard]}>
        {/* Unread indicator line */}
        {!item.read && <View style={[styles.unreadStripe, { backgroundColor: accent.color }]} />}

        {/* Icon with gradient */}
        <LinearGradient
          colors={!item.read ? accent.gradient : [colors.grayLight, colors.grayLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <Ionicons
            name={item.icon}
            size={20}
            color={!item.read ? '#FFFFFF' : colors.gray}
          />
        </LinearGradient>

        {/* Content */}
        <View style={styles.notifContent}>
          <View style={styles.notifHeader}>
            <View style={styles.titleRow}>
              <Text style={[styles.notifTitle, !item.read && styles.notifTitleUnread]} numberOfLines={1}>
                {item.title}
              </Text>
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.notifTime}>{item.time}</Text>
          </View>
          <Text style={[styles.notifMessage, !item.read && styles.notifMessageUnread]} numberOfLines={2}>
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenBackground variant="cool">
        <Header title="Notifications" />

        {/* Unread count banner */}
        {unreadCount > 0 && (
          <View style={styles.unreadBanner}>
            <View style={styles.unreadBannerLeft}>
              <View style={styles.unreadBannerDot} />
              <Text style={styles.unreadBannerText}>
                {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={mockNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconWrap}>
                <Ionicons name="notifications-off-outline" size={40} color={colors.gray} />
              </View>
              <Text style={styles.emptyTitle}>No notifications yet</Text>
              <Text style={styles.emptySubtitle}>
                When you receive notifications, they'll appear here
              </Text>
            </View>
          }
        />
      </ScreenBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: 110,
  },

  /* Unread banner */
  unreadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.sm,
  },
  unreadBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  unreadBannerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  unreadBannerText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  markAllText: {
    ...typography.caption,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  /* Notification card */
  notifCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
    overflow: 'hidden',
    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  unreadCard: {
    backgroundColor: '#FAFCFF',
    borderWidth: 1,
    borderColor: colors.primary + '18',
  },
  unreadStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
  },

  /* Icon */
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Content */
  notifContent: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  notifTitle: {
    ...typography.body,
    color: colors.grayDark,
    flexShrink: 1,
  },
  notifTitleUnread: {
    ...typography.bodyBold,
    color: colors.black,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  notifTime: {
    ...typography.small,
    color: colors.gray,
    marginLeft: spacing.sm,
    marginTop: 2,
  },
  notifMessage: {
    ...typography.caption,
    color: colors.gray,
    lineHeight: 18,
  },
  notifMessageUnread: {
    color: colors.grayDark,
  },

  /* Empty state */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    gap: spacing.sm,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.black,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.gray,
    textAlign: 'center',
    paddingHorizontal: spacing.xxxl,
  },
});

export default NotificationScreen;
