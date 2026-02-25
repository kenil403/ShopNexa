import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import Button from '../common/Button';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
}

const CATEGORY_OPTIONS = ['Mobiles', 'Laptops', 'Audio', 'TV', 'Wearables', 'Cameras'];

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = 'Save Product',
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [brand, setBrand] = useState(initialData?.brand || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [originalPrice, setOriginalPrice] = useState(
    initialData?.originalPrice?.toString() || ''
  );
  const [category, setCategory] = useState(initialData?.category || '');
  const [description, setDescription] = useState(
    initialData?.description || ''
  );
  const [stock, setStock] = useState(initialData?.stock?.toString() || '');
  const [sizes, setSizes] = useState(initialData?.sizes?.join(', ') || '');

  const handleSubmit = () => {
    const priceNum = parseFloat(price);
    const origPriceNum = parseFloat(originalPrice) || priceNum;
    const discount =
      origPriceNum > priceNum
        ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)
        : 0;

    onSubmit({
      title,
      brand,
      price: priceNum,
      originalPrice: origPriceNum,
      discount,
      category,
      description,
      stock: parseInt(stock) || 0,
      sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
      images: initialData?.images || [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
      ],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.field}>
        <Text style={styles.label}>Product Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter product title"
          placeholderTextColor={colors.gray}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          value={brand}
          onChangeText={setBrand}
          placeholder="Enter brand name"
          placeholderTextColor={colors.gray}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, styles.halfField]}>
          <Text style={styles.label}>Price (₹)</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.field, styles.halfField]}>
          <Text style={styles.label}>Original Price (₹)</Text>
          <TextInput
            style={styles.input}
            value={originalPrice}
            onChangeText={setOriginalPrice}
            placeholder="0.00"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {CATEGORY_OPTIONS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                category === cat && styles.categoryChipSelected,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Sizes (comma-separated)</Text>
        <TextInput
          style={styles.input}
          value={sizes}
          onChangeText={setSizes}
          placeholder="e.g. 30ml, 50ml, 100ml"
          placeholderTextColor={colors.gray}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Stock</Text>
        <TextInput
          style={styles.input}
          value={stock}
          onChangeText={setStock}
          placeholder="0"
          placeholderTextColor={colors.gray}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter product description"
          placeholderTextColor={colors.gray}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.actions}>
        <Button
          title={submitLabel}
          onPress={handleSubmit}
          loading={loading}
        />
        <Button
          title="Cancel"
          onPress={onCancel}
          variant="outline"
          style={{ marginTop: spacing.md }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  field: {
    marginBottom: spacing.lg,
  },
  halfField: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  label: {
    ...typography.bodyBold,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.black,
    height: 48,
  },
  textArea: {
    height: 100,
    paddingTop: spacing.md,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  categoryChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    ...typography.body,
    color: colors.black,
  },
  categoryTextSelected: {
    color: colors.white,
  },
  actions: {
    marginTop: spacing.lg,
  },
});

export default ProductForm;
