import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartItemType } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { formatCurrency, truncateText } from '../../utils/helpers';

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Product Details */}
      <View style={styles.info}>
        <View style={styles.topRow}>
          <View style={styles.titleWrap}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.name} numberOfLines={2}>
              {product.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onRemove}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.removeBtn}
          >
            <Ionicons name="trash-outline" size={18} color={colors.error} />
          </TouchableOpacity>
        </View>

        {/* Size if available */}
        {product.sizes?.length > 0 && (
          <Text style={styles.size}>Size: {product.sizes[0]}</Text>
        )}

        {/* Price Row */}
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.pricePerUnit}>
              {formatCurrency(product.price)} each
            </Text>
            <Text style={styles.totalPrice}>{formatCurrency(itemTotal)}</Text>
          </View>

          {/* Quantity Controls */}
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={onDecrement}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={16} color={colors.grayDark} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              style={[styles.qtyButton, styles.qtyButtonPlus]}
              onPress={onIncrement}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.grayLight,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleWrap: {
    flex: 1,
    marginRight: spacing.sm,
  },
  brand: {
    ...typography.caption,
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 10,
    marginBottom: 2,
  },
  name: {
    ...typography.bodyBold,
    color: colors.black,
    fontSize: 13,
    lineHeight: 18,
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  size: {
    ...typography.caption,
    color: colors.grayDark,
    fontSize: 11,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  pricePerUnit: {
    ...typography.caption,
    color: colors.gray,
    fontSize: 11,
  },
  totalPrice: {
    ...typography.h3,
    color: colors.black,
    fontSize: 16,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.grayLight,
    borderRadius: 10,
    padding: 2,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyButtonPlus: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  qtyText: {
    ...typography.bodyBold,
    color: colors.black,
    minWidth: 22,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default CartItemComponent;
