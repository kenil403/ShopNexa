import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';

const DeliveryInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="car-outline" size={18} color={colors.primary} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.text}>Free delivery</Text>
          <Text style={styles.subText}>Estimated 3-5 business days</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="storefront-outline" size={18} color={colors.primary} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.text}>Available in store</Text>
          <Text style={styles.subText}>Check nearest location</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="refresh-outline" size={18} color={colors.primary} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.text}>Easy returns</Text>
          <Text style={styles.subText}>7-day return policy</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  text: {
    ...typography.bodyBold,
    color: colors.black,
    fontSize: 13,
  },
  subText: {
    ...typography.caption,
    color: colors.gray,
    fontSize: 11,
    marginTop: 1,
  },
});

export default DeliveryInfo;
