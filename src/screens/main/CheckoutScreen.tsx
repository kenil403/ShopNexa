import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';
import { CartStackParamList, Invoice } from '../../types';
import { Header, ScreenBackground } from '../../components/common';
import { formatCurrency } from '../../utils/helpers';

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CartStackParamList>>();
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();

  const handlePayNow = () => {
    // Mock Razorpay payment — will integrate real payment when server is ready
    const orderId = 'ORD_' + Date.now();

    // Generate invoice
    const invoice: Invoice = {
      orderId,
      items: cartItems.map((item) => ({
        title: item.product.title,
        brand: item.product.brand,
        quantity: item.quantity,
        unitPrice: item.product.price,
        total: item.product.price * item.quantity,
      })),
      subtotal: cartTotal,
      delivery: 0,
      totalAmount: cartTotal,
      paymentMethod: 'Razorpay',
      date: new Date().toISOString(),
      customerName: user?.name || 'Guest',
      customerEmail: user?.email || '',
    };

    // Save invoice to order history
    addOrder(invoice);

    clearCart();
    navigation.navigate('OrderSuccess', { orderId });
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScreenBackground>
          <Header title="Checkout" showBack />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.sectionTitle}>Order Summary</Text>

            <View style={styles.itemsCard}>
              {cartItems.map((item) => (
                <View key={item.product._id} style={styles.itemRow}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.product.title}
                  </Text>
                  <Text style={styles.itemQty}>x{item.quantity}</Text>
                  <Text style={styles.itemPrice}>
                    {formatCurrency(item.product.price * item.quantity)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal ({cartCount} items)</Text>
                <Text style={styles.summaryValue}>{formatCurrency(cartTotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={[styles.summaryValue, { color: colors.primary }]}>FREE</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(cartTotal)}</Text>
              </View>
            </View>

            <View style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <Ionicons name="card-outline" size={20} color={colors.primary} />
                <Text style={styles.paymentTitle}>Payment Method</Text>
              </View>
              <Text style={styles.paymentText}>
                Razorpay (will be integrated with server)
              </Text>
            </View>
          </ScrollView>
        </ScreenBackground>
      </SafeAreaView>

      {/* Sticky Pay Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.payTotal}>
          <Text style={styles.payLabel}>Total</Text>
          <Text style={styles.payAmount}>{formatCurrency(cartTotal)}</Text>
        </View>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={handlePayNow}
          activeOpacity={0.8}
        >
          <Ionicons name="lock-closed" size={16} color={colors.white} />
          <Text style={styles.payBtnText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.black,
    marginBottom: spacing.lg,
  },
  itemsCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  itemName: {
    ...typography.body,
    color: colors.black,
    flex: 1,
  },
  itemQty: {
    ...typography.body,
    color: colors.gray,
    marginHorizontal: spacing.md,
  },
  itemPrice: {
    ...typography.bodyBold,
    color: colors.black,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.gray,
  },
  summaryValue: {
    ...typography.body,
    color: colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.black,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary,
  },
  paymentCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  paymentTitle: {
    ...typography.bodyBold,
    color: colors.black,
  },
  paymentText: {
    ...typography.caption,
    color: colors.gray,
  },
  /* ---- Sticky Bottom ---- */
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    gap: spacing.md,
  },
  payTotal: {
    flex: 1,
  },
  payLabel: {
    ...typography.caption,
    color: colors.gray,
  },
  payAmount: {
    ...typography.h2,
    color: colors.black,
  },
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: spacing.xxl,
    borderRadius: 14,
    backgroundColor: colors.primary,
    gap: spacing.sm,
  },
  payBtnText: {
    ...typography.button,
    color: colors.white,
    fontSize: 15,
  },
});

export default CheckoutScreen;
