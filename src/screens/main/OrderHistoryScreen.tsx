import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useOrders } from '../../hooks/useOrders';
import { Header, ScreenBackground, EmptyState } from '../../components/common';
import { Invoice } from '../../types';
import { formatCurrency } from '../../utils/helpers';

const OrderHistoryScreen: React.FC = () => {
  const { orders } = useOrders();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleShareInvoice = async (invoice: Invoice) => {
    const itemLines = invoice.items
      .map(
        (item, i) =>
          `${i + 1}. ${item.title} (${item.brand})\n   Qty: ${item.quantity} × ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.total)}`
      )
      .join('\n');

    const text = `
━━━━━━━━━━━━━━━━━━━━━
   SHOPNEXA INVOICE
━━━━━━━━━━━━━━━━━━━━━

Order: #${invoice.orderId}
Date: ${formatDate(invoice.date)}
Time: ${formatTime(invoice.date)}

Customer: ${invoice.customerName}
Email: ${invoice.customerEmail}

─────────────────────
ITEMS
─────────────────────
${itemLines}

─────────────────────
Subtotal: ${formatCurrency(invoice.subtotal)}
Delivery: ${invoice.delivery === 0 ? 'FREE' : formatCurrency(invoice.delivery)}
─────────────────────
TOTAL: ${formatCurrency(invoice.totalAmount)}
─────────────────────

Payment: ${invoice.paymentMethod}
Status: Confirmed ✓

Thank you for shopping with ShopNexa!
━━━━━━━━━━━━━━━━━━━━━
`.trim();

    try {
      await Share.share({ message: text, title: `Invoice #${invoice.orderId}` });
    } catch (error) {
      Alert.alert('Error', 'Failed to share invoice');
    }
  };

  const renderOrder = ({ item }: { item: Invoice }) => (
    <TouchableOpacity
      style={styles.orderCard}
      activeOpacity={0.8}
      onPress={() => setSelectedInvoice(item)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderIconBg}>
          <Ionicons name="receipt-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{item.orderId}</Text>
          <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.orderAmountContainer}>
          <Text style={styles.orderAmount}>
            {formatCurrency(item.totalAmount)}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Confirmed</Text>
          </View>
        </View>
      </View>
      <View style={styles.orderItems}>
        <Text style={styles.orderItemsText} numberOfLines={1}>
          {item.items.map((i) => `${i.title} ×${i.quantity}`).join(', ')}
        </Text>
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.itemCount}>
          {item.items.length} item{item.items.length > 1 ? 's' : ''}
        </Text>
        <View style={styles.viewInvoice}>
          <Text style={styles.viewInvoiceText}>View Invoice</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenBackground>
        <Header title="Order History" showBack />
        {orders.length === 0 ? (
          <EmptyState
            icon="receipt-outline"
            title="No orders yet"
            message="Your order history and invoices will appear here after your first purchase."
          />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.orderId}
            renderItem={renderOrder}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScreenBackground>

      {/* Invoice Detail Modal */}
      <Modal
        visible={!!selectedInvoice}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedInvoice(null)}
      >
        {selectedInvoice && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedInvoice(null)}>
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Invoice</Text>
              <TouchableOpacity onPress={() => handleShareInvoice(selectedInvoice)}>
                <Ionicons name="share-outline" size={22} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.invoiceScroll}
              contentContainerStyle={styles.invoiceContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Invoice Header */}
              <View style={styles.invoiceHeader}>
                <View style={styles.invoiceBrandRow}>
                  <Ionicons name="leaf" size={24} color={colors.primary} />
                  <Text style={styles.invoiceBrand}>ShopNexa</Text>
                </View>
                <Text style={styles.invoiceLabel}>TAX INVOICE</Text>
              </View>

              {/* Order Details Card */}
              <View style={styles.invoiceCard}>
                <View style={styles.invoiceDetailRow}>
                  <Text style={styles.detailLabel}>Order ID</Text>
                  <Text style={styles.detailValue}>#{selectedInvoice.orderId}</Text>
                </View>
                <View style={styles.invoiceDetailRow}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>{formatDate(selectedInvoice.date)}</Text>
                </View>
                <View style={styles.invoiceDetailRow}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>{formatTime(selectedInvoice.date)}</Text>
                </View>
                <View style={styles.invoiceDetailRow}>
                  <Text style={styles.detailLabel}>Payment</Text>
                  <Text style={styles.detailValue}>{selectedInvoice.paymentMethod}</Text>
                </View>
              </View>

              {/* Customer Info */}
              <View style={styles.invoiceCard}>
                <Text style={styles.cardTitle}>Bill To</Text>
                <Text style={styles.customerName}>{selectedInvoice.customerName}</Text>
                <Text style={styles.customerEmail}>{selectedInvoice.customerEmail}</Text>
              </View>

              {/* Items Table */}
              <View style={styles.invoiceCard}>
                <Text style={styles.cardTitle}>Items</Text>
                <View style={styles.tableHeader}>
                  <Text style={[styles.thText, { flex: 1 }]}>Item</Text>
                  <Text style={[styles.thText, { width: 40, textAlign: 'center' }]}>Qty</Text>
                  <Text style={[styles.thText, { width: 70, textAlign: 'right' }]}>Price</Text>
                  <Text style={[styles.thText, { width: 80, textAlign: 'right' }]}>Total</Text>
                </View>
                {selectedInvoice.items.map((item, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tdItemTitle} numberOfLines={1}>{item.title}</Text>
                      <Text style={styles.tdBrand}>{item.brand}</Text>
                    </View>
                    <Text style={[styles.tdText, { width: 40, textAlign: 'center' }]}>
                      {item.quantity}
                    </Text>
                    <Text style={[styles.tdText, { width: 70, textAlign: 'right' }]}>
                      {formatCurrency(item.unitPrice)}
                    </Text>
                    <Text style={[styles.tdTextBold, { width: 80, textAlign: 'right' }]}>
                      {formatCurrency(item.total)}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Totals */}
              <View style={styles.invoiceCard}>
                <View style={styles.invoiceDetailRow}>
                  <Text style={styles.detailLabel}>Subtotal</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(selectedInvoice.subtotal)}
                  </Text>
                </View>
                <View style={styles.invoiceDetailRow}>
                  <Text style={styles.detailLabel}>Delivery</Text>
                  <Text style={[styles.detailValue, { color: colors.primary }]}>
                    {selectedInvoice.delivery === 0 ? 'FREE' : formatCurrency(selectedInvoice.delivery)}
                  </Text>
                </View>
                <View style={styles.totalDivider} />
                <View style={styles.invoiceDetailRow}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalValue}>
                    {formatCurrency(selectedInvoice.totalAmount)}
                  </Text>
                </View>
              </View>

              {/* Footer */}
              <View style={styles.invoiceFooter}>
                <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                <Text style={styles.footerText}>Payment Confirmed</Text>
              </View>

              {/* Share Button */}
              <TouchableOpacity
                style={styles.shareBtn}
                onPress={() => handleShareInvoice(selectedInvoice)}
                activeOpacity={0.8}
              >
                <Ionicons name="download-outline" size={18} color={colors.white} />
                <Text style={styles.shareBtnText}>Download / Share Invoice</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: 120,
    gap: spacing.md,
  },
  // Order Card
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  orderIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    ...typography.bodyBold,
    color: colors.black,
  },
  orderDate: {
    ...typography.caption,
    color: colors.gray,
    marginTop: 2,
  },
  orderAmountContainer: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    ...typography.bodyBold,
    color: colors.black,
    fontSize: 15,
  },
  statusBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  orderItems: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  orderItemsText: {
    ...typography.caption,
    color: colors.gray,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  itemCount: {
    ...typography.caption,
    color: colors.grayDark,
  },
  viewInvoice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewInvoiceText: {
    ...typography.captionBold,
    color: colors.primary,
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.black,
  },
  invoiceScroll: {
    flex: 1,
  },
  invoiceContent: {
    padding: spacing.lg,
    paddingBottom: 40,
    gap: spacing.md,
  },
  invoiceHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  invoiceBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  invoiceBrand: {
    ...typography.h1,
    color: colors.primary,
  },
  invoiceLabel: {
    ...typography.captionBold,
    color: colors.gray,
    letterSpacing: 2,
    marginTop: spacing.xs,
  },

  // Invoice Cards
  invoiceCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  cardTitle: {
    ...typography.bodyBold,
    color: colors.black,
    marginBottom: spacing.md,
  },
  invoiceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  detailLabel: {
    ...typography.body,
    color: colors.gray,
  },
  detailValue: {
    ...typography.bodyBold,
    color: colors.black,
  },
  customerName: {
    ...typography.bodyBold,
    color: colors.black,
  },
  customerEmail: {
    ...typography.caption,
    color: colors.gray,
    marginTop: 2,
  },

  // Items Table
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    marginBottom: spacing.sm,
  },
  thText: {
    ...typography.captionBold,
    color: colors.grayDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  tdItemTitle: {
    ...typography.body,
    color: colors.black,
  },
  tdBrand: {
    ...typography.caption,
    color: colors.gray,
  },
  tdText: {
    ...typography.body,
    color: colors.black,
  },
  tdTextBold: {
    ...typography.bodyBold,
    color: colors.black,
  },

  // Totals
  totalDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.black,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primary,
  },

  // Footer
  invoiceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  footerText: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  shareBtnText: {
    ...typography.button,
    color: colors.white,
    fontSize: 15,
  },
});

export default OrderHistoryScreen;
