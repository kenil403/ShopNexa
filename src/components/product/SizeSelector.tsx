import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <View style={styles.container}>
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <TouchableOpacity
            key={size}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelectSize(size)}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.pillText, isSelected && styles.pillTextSelected]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  pill: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  pillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    ...typography.bodyBold,
    color: colors.black,
  },
  pillTextSelected: {
    color: colors.white,
  },
});

export default SizeSelector;
