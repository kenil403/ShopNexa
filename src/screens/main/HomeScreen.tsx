import React, { useState, useMemo, useCallback } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product, HomeStackScreenProps } from '../../types';
import { colors, spacing } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { WelcomeBanner, PromoBanner, CategoryList, NewArrivals } from '../../components/home';
import { ScreenBackground } from '../../components/common';
import {
  mockProducts,
  mockPromoBanners,
  mockCategories,
  getProductsByCategory,
} from '../../data/mockData';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC<HomeStackScreenProps<'Home'>> = ({ navigation }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = useMemo(() => {
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleSearchPress = () => {
    // Navigate to catalog tab which has search
    (navigation as any).getParent()?.navigate('CatalogTab');
  };

  const handleWishlistPress = () => {
    Alert.alert('Wishlist', 'Check your wishlist from the Profile tab.');
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

  const handleBannerPress = useCallback((bannerId: string) => {
    const banner = mockPromoBanners.find((b) => b.id === bannerId);
    if (banner) {
      navigation.navigate('ProductDetail', { productId: banner.productId });
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WelcomeBanner
          userName={user?.name || 'Guest'}
          onSearchPress={handleSearchPress}
          onWishlistPress={handleWishlistPress}
          wishlistCount={wishlistCount}
        />

        <PromoBanner banners={mockPromoBanners} onBannerPress={handleBannerPress} />

        <CategoryList
          categories={[{ id: '0', name: 'All' }, ...mockCategories]}
          selectedCategory={selectedCategory || 'All'}
          onSelectCategory={(cat) =>
            setSelectedCategory(cat === 'All' ? '' : cat)
          }
        />

        <NewArrivals
          products={filteredProducts.slice(0, 8)}
          onProductPress={handleProductPress}
          onAddToCart={handleAddToCart}
        />
      </ScrollView>
      </ScreenBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },
});

export default HomeScreen;
