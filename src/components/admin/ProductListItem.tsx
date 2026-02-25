import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { formatCurrency } from '../../utils/helpers';

interface ProductListItemProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Text style={styles.stock}>Stock: {product.stock}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: spacing.md,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.grayLight,
  },
  info: {
    flex: 1,
  },
  brand: {
    ...typography.small,
    color: colors.gray,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.bodyBold,
    color: colors.black,
    marginVertical: 2,
  },
  price: {
    ...typography.captionBold,
    color: colors.primary,
  },
  stock: {
    ...typography.small,
    color: colors.gray,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductListItem;
