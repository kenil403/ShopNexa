import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CatalogStackScreenProps, Product } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { Card, ScreenBackground } from '../../components/common';
import { CategoryList } from '../../components/home';
import {
  mockProducts,
  mockCategories,
  getProductsByCategory,
  searchProducts,
} from '../../data/mockData';

const CatalogScreen: React.FC<CatalogStackScreenProps<'Catalog'>> = ({
  navigation,
}) => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = useMemo(() => {
    let products = getProductsByCategory(selectedCategory);
    if (searchQuery.trim()) {
      products = searchProducts(searchQuery).filter((p) =>
        selectedCategory ? p.category === selectedCategory : true
      );
    }
    return products;
  }, [selectedCategory, searchQuery]);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    Alert.alert(
      'Added to Cart',
      `${product.title} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        {
          text: 'Go to Cart',
          onPress: () => (navigation as any).getParent()?.navigate('CartTab'),
        },
      ]
    );
  }, [addToCart, navigation]);

  const renderProduct = ({ item }: { item: Product }) => (
    <Card
      product={item}
      onPress={() => handleProductPress(item._id)}
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenBackground variant="cool">
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.gray}
              onPress={() => setSearchQuery('')}
            />
          )}
        </View>
      </View>

      {/* Categories */}
      <CategoryList
        categories={[{ id: '0', name: 'All' }, ...mockCategories]}
        selectedCategory={selectedCategory || 'All'}
        onSelectCategory={(cat) =>
          setSelectedCategory(cat === 'All' ? '' : cat)
        }
        showHeader={false}
      />

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ScreenBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    height: 48,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.black,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    paddingBottom: 110,
  },
});

export default CatalogScreen;
