import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { MainTabParamList } from '../types';
import { colors } from '../theme';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { Badge } from '../components/common';
import HomeStack from './HomeStack';
import CatalogStack from './CatalogStack';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';
import NotificationScreen from '../screens/main/NotificationScreen';
import AdminStack from './AdminStack';

const Tab = createBottomTabNavigator<MainTabParamList>();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* -------- icon helper -------- */
const getTabIcon = (
  routeName: string,
  focused: boolean
): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case 'HomeTab':
      return focused ? 'home' : 'home-outline';
    case 'CatalogTab':
      return focused ? 'grid' : 'grid-outline';
    case 'NotificationsTab':
      return focused ? 'notifications' : 'notifications-outline';
    case 'ProfileTab':
      return focused ? 'person' : 'person-outline';
    case 'AdminTab':
      return focused ? 'settings' : 'settings-outline';
    default:
      return 'ellipse-outline';
  }
};

/* ===== Tab accent colors for each tab ===== */
const tabAccents: Record<string, { active: string; bg: string }> = {
  HomeTab: { active: '#1976D2', bg: '#E3F2FD' },
  CatalogTab: { active: '#7B1FA2', bg: '#F3E5F5' },
  NotificationsTab: { active: '#E65100', bg: '#FFF3E0' },
  ProfileTab: { active: '#00838F', bg: '#E0F7FA' },
};

/* ===== CUSTOM TAB BAR ===== */
const CustomTabBar: React.FC<BottomTabBarProps & { cartCount: number }> = ({
  state,
  descriptors,
  navigation,
  cartCount,
}) => {
  return (
    <View style={tabStyles.wrapper}>
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={tabStyles.bar}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isCart = route.name === 'CartTab';
          const isAdmin = route.name === 'AdminTab';

          // Skip admin from custom render (still accessible via tab)
          // but we want it hidden if present
          if (isAdmin) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          /* ---------- CENTER CART BUTTON ---------- */
          if (isCart) {
            return (
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.85}
                onPress={onPress}
                style={tabStyles.centerButtonWrapper}
              >
                <LinearGradient
                  colors={['#42A5F5', '#1976D2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tabStyles.centerButton}
                >
                  <Ionicons name="cart-outline" size={28} color="#fff" />
                  {cartCount > 0 && (
                    <View style={tabStyles.cartBadge}>
                      <Text style={tabStyles.cartBadgeText}>
                        {cartCount > 99 ? '99+' : cartCount}
                      </Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          /* ---------- REGULAR TAB ICON ---------- */
          const iconName = getTabIcon(route.name, isFocused);
          const accent = tabAccents[route.name] || { active: colors.primary, bg: colors.primaryLight };
          const tintColor = isFocused ? accent.active : colors.gray;

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={onPress}
              style={tabStyles.tabItem}
            >
              <View style={[
                tabStyles.iconWrap,
                isFocused && { backgroundColor: accent.bg },
              ]}>
                <Ionicons name={iconName} size={22} color={tintColor} />
              </View>
              {isFocused && (
                <View style={[tabStyles.activeBar, { backgroundColor: accent.active }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
};

/* ===== helper: hide tab bar on inner stack screens ===== */
const getTabBarVisibility = (route: any): boolean => {
  const routeName = getFocusedRouteNameFromRoute(route);
  // Keep tab bar visible only on root screens of each stack
  const hideOnScreens = ['ProductDetail', 'Checkout', 'OrderSuccess', 'AddProduct', 'EditProduct', 'Wishlist', 'OrderHistory'];
  if (routeName && hideOnScreens.includes(routeName)) {
    return false;
  }
  return true;
};

/* ===== MAIN TABS COMPONENT ===== */
const MainTabs: React.FC = () => {
  const { user } = useAuth();
  const { cartCount } = useCart();

  return (
    <Tab.Navigator
      tabBar={(props) => {
        // Check if any focused stack screen should hide the tab bar
        const focusedRoute = props.state.routes[props.state.index];
        const visible = getTabBarVisibility(focusedRoute);
        if (!visible) return null;
        return <CustomTabBar {...props} cartCount={cartCount} />;
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="CatalogTab" component={CatalogStack} />
      <Tab.Screen name="CartTab" component={CartStack} />
      <Tab.Screen name="NotificationsTab" component={NotificationScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
      {user?.role === 'admin' ? (
        <Tab.Screen name="AdminTab" component={AdminStack} />
      ) : null}
    </Tab.Navigator>
  );
};

/* ===== STYLES ===== */
const TAB_BAR_H = 68;
const CENTER_SIZE = 62;

const tabStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 14,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    height: TAB_BAR_H,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 6,
    // Shadow
    elevation: 16,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 20,
  },

  /* regular tab */
  tabItem: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    height: TAB_BAR_H,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  iconWrapActive: {
    backgroundColor: colors.primaryLight,
  },
  activeBar: {
    width: 18,
    height: 3,
    borderRadius: 1.5,
    marginTop: 2,
  },

  /* center cart button */
  centerButtonWrapper: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginTop: -30,
    width: CENTER_SIZE + 16,
    height: CENTER_SIZE + 16,
  },
  centerButton: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    // glow shadow
    elevation: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  cartBadge: {
    position: 'absolute' as const,
    top: -2,
    right: -2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF5252',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800' as const,
    includeFontPadding: false,
  },
});

export default MainTabs;
