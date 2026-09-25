import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import AppleLogo from './AppleLogo';
import { getTheme } from '../theme';

function EmptyBagIcon({ size = 56, color = '#8e8e93' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 8V6a5 5 0 0 1 10 0V8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Rect x="3.5" y="7.5" width="17" height="13.5" rx="3" stroke={color} strokeWidth="1.6" />
    </Svg>
  );
}

export default function BagScreen({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onExplorePress,
  tradeInCredit = 0,
  isDarkMode = true,
}) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  // Compute Subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const effectiveTradeIn = cartItems.length > 0 ? tradeInCredit : 0;
  const total = Math.max(0, subtotal - effectiveTradeIn);

  if (cartItems.length === 0) {
    return (
      <View
        style={[
          styles.emptyContainer,
          { backgroundColor: colors.systemBackground },
        ]}
      >
        <View style={styles.emptyIconCircle}>
          <EmptyBagIcon size={48} color={colors.secondaryLabel} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.label }]}>
          Your Bag is Empty
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.secondaryLabel }]}>
          Items you add from the iPhone lineup or accessories will appear here. Free delivery on all orders.
        </Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={onExplorePress}
          activeOpacity={0.85}
        >
          <Text style={styles.exploreButtonText}>Shop iPhone</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.systemBackground }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* iOS App Large Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.label }]}>Bag</Text>
        <Text style={[styles.itemCountText, { color: colors.secondaryLabel }]}>
          {cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0)} items • Free delivery
        </Text>
      </View>

      {/* Free Delivery Notification Banner */}
      <View
        style={[
          styles.shippingBanner,
          {
            backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7',
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.shippingBannerText, { color: colors.label }]}>
          🚀 Free standard delivery on all orders. Pick up at Apple Store available.
        </Text>
      </View>

      {/* List of Cart Items */}
      <View style={styles.itemsList}>
        {cartItems.map((item, index) => {
          const qty = item.quantity || 1;
          const itemTotal = (item.price || 0) * qty;

          return (
            <View
              key={`${item.id}-${index}`}
              style={[
                styles.itemCard,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              {/* Top Row: Thumbnail + Info */}
              <View style={styles.itemTopRow}>
                {item.image ? (
                  <Image
                    source={
                      typeof item.image === 'string'
                        ? { uri: item.image }
                        : item.image
                    }
                    style={styles.itemThumbnail}
                    resizeMode="contain"
                  />
                ) : (
                  <View
                    style={[
                      styles.itemThumbnailPlaceholder,
                      { backgroundColor: isDarkMode ? '#2c2c2e' : '#e5e5ea' },
                    ]}
                  >
                    <Text style={{ fontSize: 24 }}>📱</Text>
                  </View>
                )}

                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, { color: colors.label }]}>
                    {item.name}
                  </Text>
                  {item.selectedColor && (
                    <View style={styles.colorRow}>
                      <View
                        style={[
                          styles.colorDot,
                          { backgroundColor: item.selectedColor.hex || '#333' },
                        ]}
                      />
                      <Text
                        style={[
                          styles.colorName,
                          { color: colors.secondaryLabel },
                        ]}
                      >
                        {item.selectedColor.name}
                      </Text>
                    </View>
                  )}
                  {item.specs?.storage && (
                    <Text
                      style={[
                        styles.storageText,
                        { color: colors.secondaryLabel },
                      ]}
                    >
                      {item.specs.storage} storage
                    </Text>
                  )}
                  <Text style={[styles.itemPrice, { color: colors.label }]}>
                    ${itemTotal}
                  </Text>
                </View>
              </View>

              {/* Bottom Row: Quantity Stepper & Remove */}
              <View
                style={[
                  styles.itemBottomRow,
                  { borderTopColor: colors.cardBorder },
                ]}
              >
                <View style={styles.stepperWrap}>
                  <TouchableOpacity
                    style={[
                      styles.stepperBtn,
                      { backgroundColor: isDarkMode ? '#2c2c2e' : '#e5e5ea' },
                    ]}
                    onPress={() => onUpdateQuantity(item.id, qty - 1)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.stepperBtnText, { color: colors.label }]}>
                      −
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.qtyText, { color: colors.label }]}>
                    {qty}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.stepperBtn,
                      { backgroundColor: isDarkMode ? '#2c2c2e' : '#e5e5ea' },
                    ]}
                    onPress={() => onUpdateQuantity(item.id, qty + 1)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.stepperBtnText, { color: colors.label }]}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => onRemoveItem(item.id)}
                  activeOpacity={0.7}
                  style={styles.removeBtn}
                >
                  <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      {/* Summary Card */}
      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.summaryTitle, { color: colors.label }]}>
          Order Summary
        </Text>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.secondaryLabel }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: colors.label }]}>
            ${subtotal}
          </Text>
        </View>

        {effectiveTradeIn > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: '#34c759' }]}>
              Estimated Trade-in Credit
            </Text>
            <Text style={[styles.summaryValue, { color: '#34c759' }]}>
              -${effectiveTradeIn}
            </Text>
          </View>
        )}

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.secondaryLabel }]}>
            Shipping
          </Text>
          <Text style={[styles.summaryValue, { color: '#34c759' }]}>
            FREE
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.secondaryLabel }]}>
            Estimated Tax
          </Text>
          <Text style={[styles.summaryValue, { color: colors.label }]}>
            $0.00
          </Text>
        </View>

        <View
          style={[
            styles.totalDivider,
            { backgroundColor: colors.cardBorder },
          ]}
        />

        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: colors.label }]}>
            Total Due Today
          </Text>
          <Text style={[styles.totalValue, { color: colors.label }]}>
            ${total}
          </Text>
        </View>
      </View>

      {/* Native Apple Pay & Alternative Checkout */}
      <View style={styles.checkoutActions}>
        <TouchableOpacity
          style={styles.applePayButton}
          onPress={() => onCheckout('apple-pay')}
          activeOpacity={0.9}
        >
          <View style={styles.applePayContent}>
            <Text style={styles.applePayText}>Check out with </Text>
            <AppleLogo size={16} color="#000000" />
            <Text style={styles.applePayBold}>Pay</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.creditCardButton,
            {
              borderColor: colors.cardBorder,
              backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7',
            },
          ]}
          onPress={() => onCheckout('credit-card')}
          activeOpacity={0.8}
        >
          <Text style={[styles.creditCardText, { color: colors.label }]}>
            Check Out with Credit Card
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  itemCountText: {
    fontSize: 14,
    marginTop: 4,
  },
  shippingBanner: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 18,
  },
  shippingBannerText: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  itemsList: {
    gap: 14,
    marginBottom: 20,
  },
  itemCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemThumbnail: {
    width: 72,
    height: 90,
    marginRight: 14,
  },
  itemThumbnailPlaceholder: {
    width: 72,
    height: 90,
    borderRadius: 12,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  colorName: {
    fontSize: 12,
  },
  storageText: {
    fontSize: 12,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  itemBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  stepperWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 16,
    textAlign: 'center',
  },
  removeBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  removeBtnText: {
    color: '#ff3b30',
    fontSize: 13,
    fontWeight: '500',
  },
  summaryCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13.5,
  },
  summaryValue: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  totalDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  checkoutActions: {
    gap: 10,
    marginTop: 4,
  },
  applePayButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  applePayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applePayText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '500',
  },
  applePayBold: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 2,
  },
  creditCardButton: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditCardText: {
    fontSize: 15,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(142, 142, 147, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 280,
  },
  exploreButton: {
    backgroundColor: '#0071e3',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
