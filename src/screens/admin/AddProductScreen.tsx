import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AdminStackScreenProps, Product } from '../../types';
import { colors, spacing } from '../../theme';
import { Header } from '../../components/common';
import ProductForm from '../../components/admin/ProductForm';
import { mockProducts } from '../../data/mockData';

type Props = AdminStackScreenProps<'AddProduct'>;

const AddProductScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: Partial<Product>) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newProduct: Product = {
        _id: Date.now().toString(),
        title: data.title || '',
        brand: data.brand || '',
        price: data.price || 0,
        originalPrice: data.originalPrice || data.price || 0,
        discount: data.discount || 0,
        images: data.images || [
          'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
        ],
        category: data.category || 'Skincare',
        sizes: data.sizes || [],
        description: data.description || '',
        stock: data.stock || 0,
        rating: 0,
        reviewCount: 0,
      };

      // Add to mock data array
      mockProducts.push(newProduct);

      setLoading(false);
      Alert.alert('Success', 'Product created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Header title="Add Product" showBack onBack={() => navigation.goBack()} />
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
        loading={loading}
        submitLabel="Create Product"
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

export default AddProductScreen;
