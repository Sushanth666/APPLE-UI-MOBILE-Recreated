import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Alert,
  useWindowDimensions,
  Platform,
  LogBox,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTheme } from './src/theme';
import { IPHONE_MODELS, TRADE_IN_DEVICES } from './src/productData';
import MobileHeader from './src/components/MobileHeader';
import PromoRibbon from './src/components/PromoRibbon';
import ProductHeroCard from './src/components/ProductHeroCard';
import TradeInCalculator from './src/components/TradeInCalculator';
import GuidedTourCard from './src/components/GuidedTourCard';
import WhyAppleBento from './src/components/WhyAppleBento';
import MagSafeShowcaseMobile from './src/components/MagSafeShowcaseMobile';
import ValuePropsMobile from './src/components/ValuePropsMobile';
import WhatMakesSectionMobile from './src/components/WhatMakesSectionMobile';
import ServicesShowcaseMobile from './src/components/ServicesShowcaseMobile';
import CompareView from './src/components/CompareView';
import AccessoriesView from './src/components/AccessoriesView';
import SegmentedControl from './src/components/SegmentedControl';
import BottomTabBar from './src/components/BottomTabBar';
import BagScreen from './src/components/BagScreen';

// Suppress deprecated warnings from third-party or residual legacy hooks
LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

function AppleStoreApp() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Apple Store Light Mode by default
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'lineup' | 'compare' | 'bag'
  const [lineupSubTab, setLineupSubTab] = useState('models'); // 'models' | 'accessories'
  const [selectedTradeIn, setSelectedTradeIn] = useState(TRADE_IN_DEVICES[4]); // iPhone 12 ($300)
  const [cartItems, setCartItems] = useState([]);
  const [toastItem, setToastItem] = useState(null);
  const toastY = useRef(new Animated.Value(-120)).current;

  const insets = useSafeAreaInsets();
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;
  const bagCount = cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0);

  const triggerToast = (item) => {
    setToastItem(item);
    Animated.sequence([
      Animated.spring(toastY, {
        toValue: Math.max(16, insets.top + 8),
        tension: 140,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.delay(2800),
      Animated.timing(toastY, {
        toValue: -120,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start(() => setToastItem(null));
  };

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Apple — iPhone Hub';
    }
  }, []);

  // Add iPhone to Bag
  const handleBuy = (item) => {
    setCartItems((prev) => {
      const matchIndex = prev.findIndex(
        (it) => it.id === item.id && it.selectedColor?.name === item.selectedColor?.name
      );
      if (matchIndex > -1) {
        const next = [...prev];
        next[matchIndex] = {
          ...next[matchIndex],
          quantity: (next[matchIndex].quantity || 1) + 1,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: `${item.id}-${item.selectedColor?.name || 'std'}`,
          name: item.name,
          price: item.netPrice || item.price,
          selectedColor: item.selectedColor,
          specs: { storage: '128GB' },
          image: item.selectedColor?.image || item.heroImage,
          quantity: 1,
        },
      ];
    });

    triggerToast(item);
  };

  // Add Accessory to Bag
  const handleAddToBagAccessory = (item) => {
    setCartItems((prev) => {
      const matchIndex = prev.findIndex((it) => it.id === item.id);
      if (matchIndex > -1) {
        const next = [...prev];
        next[matchIndex] = {
          ...next[matchIndex],
          quantity: (next[matchIndex].quantity || 1) + 1,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          selectedColor: null,
          image: item.image,
          quantity: 1,
        },
      ];
    });

    triggerToast(item);
  };

  // Stepper updates
  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: newQty } : it))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  // Checkout with Apple Pay or Credit Card
  const handleCheckout = (method) => {
    const totalQty = cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0);
    Alert.alert(
      method === 'apple-pay' ? 'Apple Pay Confirmed' : 'Order Placed',
      `Your order for ${totalQty} item(s) has been placed with free next-day delivery! Confirmation sent to your Apple ID.`,
      [
        {
          text: 'Done',
          onPress: () => {
            setCartItems([]);
            setActiveTab('discover');
          },
        },
      ]
    );
  };

  const { width } = useWindowDimensions();
  const isWide = width > 520;

  return (
    <View
      style={[
        styles.rootWrapper,
        {
          backgroundColor: isWide
            ? isDarkMode
              ? '#0a0a0c'
              : '#e5e5ea'
            : colors.headerBg,
        },
      ]}
    >
      <View
        style={[
          styles.appFrame,
          {
            backgroundColor: colors.headerBg,
            maxWidth: isWide ? 460 : '100%',
            borderLeftWidth: isWide ? 1 : 0,
            borderRightWidth: isWide ? 1 : 0,
            borderColor: colors.cardBorder,
            shadowColor: isWide ? '#000000' : 'transparent',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: isWide ? 0.35 : 0,
            shadowRadius: isWide ? 24 : 0,
          },
        ]}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.headerBg}
          translucent={Platform.OS === 'android'}
        />

        {/* 1. Native iOS Top Header (Aligned cleanly with status bar & notch) */}
        <MobileHeader
          bagCount={bagCount}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((prev) => !prev)}
          onSearchPress={() =>
            Alert.alert(
              'Search Apple Store',
              'Search for iPhone 14 Pro, iPhone 14, iPhone SE, MagSafe cases, and AirPods.'
            )
          }
          onBagPress={() => setActiveTab('bag')}
          topInset={insets.top}
        />

        {/* 2. Main Content Screens */}
        <View style={[styles.mainContent, { backgroundColor: colors.systemBackground }]}>
          {/* TAB 1: DISCOVER (Editorial Showcase) */}
          {activeTab === 'discover' && (
            <ScrollView
              style={[styles.screenScrollView, { backgroundColor: colors.systemBackground }]}
              contentContainerStyle={styles.scrollPadding}
              showsVerticalScrollIndicator={false}
            >
              <PromoRibbon
                text="Get $200–$650 in trade-in credit for iPhone 14 or iPhone 14 Pro."
                linkText="Shop iPhone ›"
                onPress={() => setActiveTab('lineup')}
                isDarkMode={isDarkMode}
              />

              {/* iPhone 14 Pro Flagship Hero Card */}
              <ProductHeroCard
                model={IPHONE_MODELS[0]}
                onBuyPress={handleBuy}
                onLearnMorePress={() => setActiveTab('lineup')}
                tradeInDiscount={selectedTradeIn.value}
                isDarkMode={isDarkMode}
              />

              {/* Interactive Trade-In Calculator */}
              <TradeInCalculator
                selectedDevice={selectedTradeIn}
                onSelectDevice={setSelectedTradeIn}
                isDarkMode={isDarkMode}
              />

              {/* iPhone 14 Hero Card */}
              <ProductHeroCard
                model={IPHONE_MODELS[1]}
                onBuyPress={handleBuy}
                onLearnMorePress={() => setActiveTab('lineup')}
                tradeInDiscount={selectedTradeIn.value}
                isDarkMode={isDarkMode}
              />

              {/* iPhone SE Hero Card */}
              <ProductHeroCard
                model={IPHONE_MODELS[3]}
                onBuyPress={handleBuy}
                onLearnMorePress={() => setActiveTab('lineup')}
                tradeInDiscount={selectedTradeIn.value}
                isDarkMode={isDarkMode}
              />

              {/* Guided Tour Banner */}
              <GuidedTourCard
                onWatchPress={() =>
                  Alert.alert(
                    'Guided Tour 🎬',
                    'Streaming the official Apple iPhone 14 & iPhone 14 Pro guided tour.'
                  )
                }
                isDarkMode={isDarkMode}
              />

              {/* Why Apple Bento Grid */}
              <WhyAppleBento
                onPerkPress={(perk) =>
                  Alert.alert(perk.badge, `${perk.title}\n\n${perk.subtitle}`)
                }
                isDarkMode={isDarkMode}
              />

              {/* MagSafe & AirPods Showcase */}
              <MagSafeShowcaseMobile
                onShopPress={() => {
                  setActiveTab('lineup');
                  setLineupSubTab('accessories');
                }}
                isDarkMode={isDarkMode}
              />

              {/* Delivery, Returns & Help Value Propositions */}
              <ValuePropsMobile
                onItemPress={(prop) => Alert.alert(prop.title, prop.desc)}
                isDarkMode={isDarkMode}
              />

              {/* What makes an iPhone an iPhone? (iOS 16 & Switch to iPhone) */}
              <WhatMakesSectionMobile
                isDarkMode={isDarkMode}
              />

              {/* Apple Services Showcase */}
              <ServicesShowcaseMobile
                onServicePress={(svc) => Alert.alert(svc.title, svc.headline)}
                isDarkMode={isDarkMode}
              />
            </ScrollView>
          )}

          {/* TAB 2: iPHONE LINEUP & ACCESSORIES */}
          {activeTab === 'lineup' && (
            <View style={[styles.screenScrollView, { backgroundColor: colors.systemBackground }]}>
              {/* Cupertino Sub-Segment: All iPhones vs. MagSafe Accessories */}
              <View style={styles.subSegmentWrapper}>
                <SegmentedControl
                  tabs={[
                    { id: 'models', title: 'iPhone Models' },
                    { id: 'accessories', title: 'Accessories' },
                  ]}
                  activeTab={lineupSubTab}
                  onTabPress={setLineupSubTab}
                  isDarkMode={isDarkMode}
                />
              </View>

              {lineupSubTab === 'models' ? (
                <ScrollView
                  style={[styles.screenScrollView, { backgroundColor: colors.systemBackground }]}
                  contentContainerStyle={styles.scrollPadding}
                  showsVerticalScrollIndicator={false}
                >
                  <TradeInCalculator
                    selectedDevice={selectedTradeIn}
                    onSelectDevice={setSelectedTradeIn}
                    isDarkMode={isDarkMode}
                  />

                  {IPHONE_MODELS.map((model) => (
                    <ProductHeroCard
                      key={model.id}
                      model={model}
                      onBuyPress={handleBuy}
                      tradeInDiscount={selectedTradeIn.value}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </ScrollView>
              ) : (
                <AccessoriesView onAddToBag={handleAddToBagAccessory} isDarkMode={isDarkMode} />
              )}
            </View>
          )}

          {/* TAB 3: COMPARE (Side-by-side Dual Device Comparator) */}
          {activeTab === 'compare' && (
            <View style={[styles.screenScrollView, { backgroundColor: colors.systemBackground }]}>
              <CompareView onSelectModel={handleBuy} isDarkMode={isDarkMode} />
            </View>
          )}

          {/* TAB 4: BAG (Full Dedicated Cart & Apple Pay Checkout) */}
          {activeTab === 'bag' && (
            <BagScreen
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
              onExplorePress={() => setActiveTab('lineup')}
              tradeInCredit={selectedTradeIn?.value || 0}
              isDarkMode={isDarkMode}
            />
          )}
        </View>

        {/* 3. Native iOS Bottom Tab Bar (Dynamically padded for device navigation bar) */}
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={setActiveTab}
          bagCount={bagCount}
          isDarkMode={isDarkMode}
          bottomInset={insets.bottom}
        />

        {/* Animated Dynamic Island / Cupertino Bag Toast */}
        {toastItem && (
          <Animated.View
            style={[
              styles.floatingToast,
              {
                transform: [{ translateY: toastY }],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.toastCard,
                {
                  backgroundColor: isDarkMode ? '#1c1c1e' : '#ffffff',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                },
              ]}
              onPress={() => {
                setActiveTab('bag');
                setToastItem(null);
              }}
              activeOpacity={0.9}
            >
              <View style={styles.toastCheckCircle}>
                <Text style={styles.toastCheckMark}>✓</Text>
              </View>
              <View style={styles.toastTextWrap}>
                <Text style={[styles.toastTitle, { color: colors.label }]}>Added to Bag</Text>
                <Text
                  style={[styles.toastSubtitle, { color: colors.secondaryLabel }]}
                  numberOfLines={1}
                >
                  {toastItem.name} {toastItem.selectedColor ? `• ${toastItem.selectedColor.name}` : ''}
                </Text>
              </View>
              <Text style={styles.toastViewBagText}>View Bag ›</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppleStoreApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  appFrame: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  mainContent: {
    flex: 1,
    width: '100%',
  },
  screenScrollView: {
    flex: 1,
    width: '100%',
  },
  scrollPadding: {
    paddingBottom: 24,
  },
  subSegmentWrapper: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  floatingToast: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    zIndex: 999,
    alignItems: 'center',
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 8,
  },
  toastCheckCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#34c759',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  toastCheckMark: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  toastTextWrap: {
    flex: 1,
  },
  toastTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  toastSubtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  toastViewBagText: {
    color: '#0071e3',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
});
