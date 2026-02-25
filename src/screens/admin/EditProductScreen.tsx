import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AdminStackScreenProps, Product } from '../../types';
import { colors, spacing } from '../../theme';
import { Header, EmptyState } from '../../components/common';
import ProductForm from '../../components/admin/ProductForm';
import { mockProducts, getProductById } from '../../data/mockData';

type Props = AdminStackScreenProps<'EditProduct'>;

const EditProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const product = getProductById(productId);
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <View style={styles.container}>
        <Header title="Edit Product" showBack onBack={() => navigation.goBack()} />
        <EmptyState icon="alert-circle-outline" title="Product not found" message="This product may have been deleted" />
      </View>
    );
  }

  const handleSubmit = (data: Partial<Product>) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update mock data in place
      const index = mockProducts.findIndex((p) => p._id === productId);
      if (index !== -1) {
        mockProducts[index] = {
          ...mockProducts[index],
          ...data,
        };
      }

      setLoading(false);
      Alert.alert('Success', 'Product updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Header title="Edit Product" showBack onBack={() => navigation.goBack()} />
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
        loading={loading}
        submitLabel="Update Product"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default EditProductScreen;
