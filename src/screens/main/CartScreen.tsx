import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { CartItemType, CartStackParamList } from '../../types';
import { Header, Button, EmptyState, ScreenBackground } from '../../components/common';
import { CartItemComponent, CouponInput, CartSummary } from '../../components/cart';
import { formatCurrency } from '../../utils/helpers';

const CartScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CartStackParamList>>();
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [appliedDiscount, setAppliedDiscount] = useState<number | undefined>(
    undefined
  );

  const discountedTotal = appliedDiscount
    ? cartTotal * (1 - appliedDiscount / 100)
    : cartTotal;

  const handleApplyCoupon = (code: string) => {
    // Mock: any coupon gives 10% off
    if (code.length > 0) {
      setAppliedDiscount(10);
      Alert.alert('Coupon Applied', '10% discount applied!');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Add some products to your cart first.');
      return;
    }
    navigation.navigate('Checkout');
  };

  const renderCartItem = ({ item }: { item: CartItemType }) => (
    <CartItemComponent
      item={item}
      onIncrement={() =>
        updateQuantity(item.product._id, item.quantity + 1)
      }
      onDecrement={() =>
        updateQuantity(item.product._id, item.quantity - 1)
      }
      onRemove={() => removeFromCart(item.product._id)}
    />
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScreenBackground variant="default">
        <Header title="Shopping Cart" />
        <EmptyState
          icon="bag-outline"
          title="Your cart is empty"
          message="Browse our products and add items to your cart"
          actionLabel="Shop Now"
          onAction={() =>
            navigation.dispatch(
              CommonActions.navigate({ name: 'HomeTab' })
            )
          }
        />
      </ScreenBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenBackground variant="default">
      <Header title="Shopping Cart" />

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product._id}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <View style={styles.footerSection}>
            <CouponInput
              onApply={handleApplyCoupon}
              appliedDiscount={appliedDiscount}
            />
            <CartSummary itemCount={cartCount} total={discountedTotal} />
          </View>
        }
      />
      </ScreenBackground>

      {/* Sticky Checkout Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{formatCurrency(discountedTotal)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  footerSection: {
    paddingBottom: spacing.md,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: 100,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    gap: spacing.md,
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    ...typography.caption,
    color: colors.gray,
  },
  totalAmount: {
    ...typography.h2,
    color: colors.black,
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: spacing.xxl,
    borderRadius: 14,
    backgroundColor: colors.primary,
    gap: spacing.sm,
  },
  checkoutText: {
    ...typography.button,
    color: colors.white,
    fontSize: 15,
  },
});

export default CartScreen;
