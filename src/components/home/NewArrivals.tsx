import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../../types';
import { colors, typography, spacing } from '../../theme';
import Card from '../common/Card';

interface NewArrivalsProps {
  products: Product[];
  onProductPress: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSeeAll?: () => void;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onProductPress,
  onAddToCart,
  onSeeAll,
}) => {
  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <Card
      product={item}
      onPress={() => onProductPress(item._id)}
      onAddToCart={() => onAddToCart(item)}
      showBadge={index === 0 ? 'LIMITED EDITION' : undefined}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New arrivals</Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.black,
  },
  seeAll: {
    ...typography.body,
    color: colors.gray,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  listContainer: {
    paddingBottom: spacing.lg,
  },
});

export default NewArrivals;
