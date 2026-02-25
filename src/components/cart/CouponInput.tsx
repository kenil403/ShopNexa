import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, spacing } from '../../theme';

interface CouponInputProps {
  onApply: (code: string) => void;
  appliedDiscount?: number;
}

const CouponInput: React.FC<CouponInputProps> = ({
  onApply,
  appliedDiscount,
}) => {
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (code.trim()) {
      onApply(code.trim());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add coupon code"
          placeholderTextColor={colors.gray}
          value={code}
          onChangeText={setCode}
        />
        {appliedDiscount ? (
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>-{appliedDiscount}%</Text>
            <Ionicons name="checkmark" size={12} color={colors.primary} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleApply} activeOpacity={0.7}>
            <Ionicons name="arrow-forward-circle" size={28} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.black,
  },
  discountTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  discountText: {
    ...typography.captionBold,
    color: colors.primary,
  },
});

export default CouponInput;
