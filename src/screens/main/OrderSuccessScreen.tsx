import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { CartStackParamList } from '../../types';
import { ScreenBackground } from '../../components/common';

type Props = NativeStackScreenProps<CartStackParamList, 'OrderSuccess'>;

const OrderSuccessScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenBackground>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconOuter}>
          <View style={styles.iconInner}>
            <Ionicons name="checkmark" size={48} color={colors.white} />
          </View>
        </View>

        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        <Text style={styles.message}>
          Your order has been placed successfully. You will receive a
          confirmation shortly.
        </Text>

        {/* Order Info Cards */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={20} color={colors.primary} />
            <Text style={styles.infoLabel}>Estimated</Text>
            <Text style={styles.infoValue}>3-5 Days</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
            <Text style={styles.infoLabel}>Payment</Text>
            <Text style={styles.infoValue}>Confirmed</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({ name: 'HomeTab' })
            )
          }
          activeOpacity={0.8}
        >
          <Text style={styles.continueBtnText}>Continue Shopping</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewCartBtn}
          onPress={() => navigation.popToTop()}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={18} color={colors.primary} />
          <Text style={styles.viewCartBtnText}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </ScreenBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  iconOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  iconInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  orderId: {
    ...typography.bodyBold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  message: {
    ...typography.body,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxxl,
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: spacing.xs,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.gray,
  },
  infoValue: {
    ...typography.bodyBold,
    color: colors.black,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    paddingHorizontal: spacing.xxxl,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    gap: spacing.sm,
  },
  continueBtnText: {
    ...typography.button,
    color: colors.white,
  },
  viewCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    paddingHorizontal: spacing.xxxl,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  viewCartBtnText: {
    ...typography.button,
    color: colors.primary,
  },
});

export default OrderSuccessScreen;
