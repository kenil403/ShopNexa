import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { formatCurrency } from '../../utils/helpers';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.title}>{product.title}</Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color={colors.rating} />
        <Text style={styles.rating}>{product.rating}</Text>
        <Text style={styles.reviewCount}>
          ({product.reviewCount} Reviews)
        </Text>
      </View>

      {/* Price */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        {product.discount > 0 && (
          <>
            <Text style={styles.originalPrice}>
              {formatCurrency(product.originalPrice)}
            </Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{product.discount}%</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  brand: {
    ...typography.caption,
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  rating: {
    ...typography.bodyBold,
    color: colors.black,
  },
  reviewCount: {
    ...typography.caption,
    color: colors.gray,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  price: {
    ...typography.price,
    color: colors.black,
    fontSize: 20,
  },
  originalPrice: {
    ...typography.body,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    ...typography.captionBold,
    color: colors.primary,
  },
});

export default ProductInfo;
