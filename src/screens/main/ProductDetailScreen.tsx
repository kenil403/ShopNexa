import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { getProductById } from '../../data/mockData';
import { ImageCarousel, SizeSelector, ProductInfo, DeliveryInfo } from '../../components/product';
import { ScreenBackground } from '../../components/common';

// Accept any navigation props — works with both HomeStack and CatalogStack
interface Props {
  route: { params: { productId: string } };
  navigation: any;
}

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const product = getProductById(productId);
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] || ''
  );

  const isFavorite = product ? isInWishlist(product._id) : false;

  // Get current quantity in cart
  const cartItem = product
    ? cartItems.find((item) => item.product._id === product._id)
    : null;
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
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
  };

  const handleBuyNow = () => {
    addToCart(product);
    (navigation as any).getParent()?.navigate('CartTab');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScreenBackground>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButton}
            >
              <Ionicons name="arrow-back" size={22} color={colors.black} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleToggleWishlist}
              >
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={22}
                  color={isFavorite ? colors.error : colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="share-outline" size={22} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <ImageCarousel images={product.images} />
            <ProductInfo product={product} />

            <View style={styles.sizeContainer}>
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />
            </View>

            <DeliveryInfo />

            <View style={styles.descriptionContainer}>
              <Text style={styles.descTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </ScrollView>
        </ScreenBackground>
      </SafeAreaView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={handleToggleWishlist}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? colors.error : colors.grayDark}
          />
        </TouchableOpacity>

        {quantityInCart > 0 ? (
          /* ---- Quantity Controls ---- */
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => {
                if (quantityInCart <= 1) {
                  removeFromCart(product._id);
                } else {
                  updateQuantity(product._id, quantityInCart - 1);
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name={quantityInCart <= 1 ? 'trash-outline' : 'remove'}
                size={20}
                color={quantityInCart <= 1 ? colors.error : colors.primary}
              />
            </TouchableOpacity>
            <View style={styles.qtyDisplay}>
              <Text style={styles.qtyText}>{quantityInCart}</Text>
            </View>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => updateQuantity(product._id, quantityInCart + 1)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          /* ---- Add to Cart Button ---- */
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="cart-outline" size={20} color={colors.primary} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.buyNowBtn}
          onPress={handleBuyNow}
          activeOpacity={0.8}
        >
          <Ionicons name="flash" size={20} color={colors.white} />
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  headerRight: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  sizeContainer: {
    paddingHorizontal: spacing.lg,
  },
  descriptionContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  descTitle: {
    ...typography.bodyBold,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.grayDark,
    lineHeight: 22,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  /* ---- Sticky Bottom Bar ---- */
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    gap: spacing.sm,
  },
  wishlistBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grayLight,
  },
  addToCartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    gap: spacing.xs,
  },
  addToCartText: {
    ...typography.button,
    color: colors.primary,
    fontSize: 14,
  },
  buyNowBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    gap: spacing.xs,
  },
  buyNowText: {
    ...typography.button,
    color: colors.white,
    fontSize: 14,
  },
  /* ---- Quantity Controls ---- */
  quantityRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 44,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: colors.white,
  },
  qtyText: {
    ...typography.bodyBold,
    color: colors.black,
    fontSize: 16,
  },
});

export default ProductDetailScreen;
