import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/helpers';

interface CartSummaryProps {
  itemCount: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ itemCount, total }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.itemCount}>
            selected {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...typography.bodyBold,
    color: colors.black,
  },
  itemCount: {
    ...typography.caption,
    color: colors.gray,
    marginTop: 2,
  },
  total: {
    ...typography.h2,
    color: colors.black,
  },
});

export default CartSummary;
