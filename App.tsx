import React, { useEffect, useCallback } from 'react';
import { Platform, AppState, AppStateStatus } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { OrderProvider } from './src/context/OrderContext';
import AppNavigator from './src/navigation/AppNavigator';

const hideAndroidNavBar = async () => {
  if (Platform.OS !== 'android') return;
  try {
    await NavigationBar.setBackgroundColorAsync('#00000000');
    await NavigationBar.setPositionAsync('absolute');
    await NavigationBar.setBehaviorAsync('overlay-swipe');
    await NavigationBar.setVisibilityAsync('hidden');
  } catch (error) {
    // silently ignore on unsupported devices
  }
};

export default function App() {
  const onAppStateChange = useCallback((state: AppStateStatus) => {
    if (state === 'active') {
      hideAndroidNavBar();
    }
  }, []);

  useEffect(() => {
    hideAndroidNavBar();
    const sub = AppState.addEventListener('change', onAppStateChange);
    return () => sub.remove();
  }, [onAppStateChange]);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <StatusBar style="dark" translucent backgroundColor="transparent" />
              <AppNavigator />
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
