import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import { getTheme } from '../theme';
import { TRADE_IN_DEVICES } from '../productData';

export default function TradeInCalculator({ selectedDevice, onSelectDevice, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;
  const scrollRef = useRef(null);

  const [scrollX, setScrollX] = useState(0);
  const [contentWidth, setContentWidth] = useState(850);
  const [containerWidth, setContainerWidth] = useState(340);
  const bannerAnim = useRef(new Animated.Value(selectedDevice?.value > 0 ? 1 : 0)).current;

  useEffect(() => {
    if (selectedDevice?.value > 0) {
      bannerAnim.setValue(0);
      Animated.spring(bannerAnim, {
        toValue: 1,
        tension: 100,
        friction: 6,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedDevice?.model]);

  const maxScroll = Math.max(0, contentWidth - containerWidth);
  const canScrollLeft = scrollX > 10;
  const canScrollRight = maxScroll > 15 && scrollX < maxScroll - 10;

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      const nextX = Math.max(0, Math.min(maxScroll, scrollX + offset));
      scrollRef.current.scrollTo({ x: nextX, animated: true });
      setScrollX(nextX);
    }
  };

  // Web mouse wheel & mouse drag-to-scroll support
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = scrollRef.current?.getScrollableNode?.() || scrollRef.current;
    if (!node || !node.addEventListener) return;

    // Convert mouse wheel deltaY to horizontal scroll
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        e.preventDefault();
        node.scrollLeft += e.deltaY * 0.85;
        setScrollX(node.scrollLeft);
      }
    };

    // Mouse drag-to-scroll
    let isDown = false;
    let startX = 0;
    let initialScroll = 0;

    const handleMouseDown = (e) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX;
      initialScroll = node.scrollLeft;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      const delta = e.pageX - startX;
      node.scrollLeft = initialScroll - delta;
      setScrollX(node.scrollLeft);
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    node.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      node.removeEventListener('wheel', handleWheel);
      node.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [contentWidth, containerWidth]);

  const handleDevicePress = (item, index) => {
    onSelectDevice(item);
    // Smoothly scroll the tapped chip toward center
    const itemEstimate = index * 125;
    const targetX = Math.max(0, Math.min(maxScroll, itemEstimate - containerWidth / 2 + 60));
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
    setScrollX(targetX);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.elevatedCard,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>♻️</Text>
        <View style={styles.headerTexts}>
          <Text style={[styles.badge, { color: colors.appleGreen }]}>Apple Trade In</Text>
          <Text style={[styles.title, { color: colors.label }]}>Estimate your trade-in credit</Text>
        </View>
      </View>

      <Text style={[styles.subtext, { color: colors.secondaryLabel }]}>
        Select your current phone to apply estimated credit toward any iPhone 14 model:
      </Text>

      {/* Swipeable Device Chips with Arrow Controls and Drag */}
      <View style={styles.scrollWrapper}>
        {canScrollLeft && (
          <TouchableOpacity
            style={[
              styles.arrowButton,
              styles.leftArrow,
              {
                backgroundColor: isDarkMode
                  ? 'rgba(28, 28, 30, 0.94)'
                  : 'rgba(255, 255, 255, 0.95)',
                borderColor: colors.cardBorder,
              },
            ]}
            onPress={() => scrollBy(-160)}
            activeOpacity={0.8}
            accessibilityLabel="Scroll left"
          >
            <Text style={[styles.arrowText, { color: colors.label }]}>‹</Text>
          </TouchableOpacity>
        )}

        {canScrollRight && (
          <TouchableOpacity
            style={[
              styles.arrowButton,
              styles.rightArrow,
              {
                backgroundColor: isDarkMode
                  ? 'rgba(28, 28, 30, 0.94)'
                  : 'rgba(255, 255, 255, 0.95)',
                borderColor: colors.cardBorder,
              },
            ]}
            onPress={() => scrollBy(160)}
            activeOpacity={0.8}
            accessibilityLabel="Scroll right"
          >
            <Text style={[styles.arrowText, { color: colors.label }]}>›</Text>
          </TouchableOpacity>
        )}

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          onContentSizeChange={(w) => setContentWidth(w)}
          contentContainerStyle={styles.deviceRow}
        >
          {TRADE_IN_DEVICES.map((item, index) => {
            const isSelected = selectedDevice.model === item.model;
            return (
              <TouchableOpacity
                key={item.model}
                style={[
                  styles.deviceChip,
                  {
                    backgroundColor: isSelected
                      ? colors.appleBlue
                      : (isDarkMode ? '#1c1c1e' : '#f5f5f7'),
                    borderColor: isSelected ? colors.appleBlue : colors.cardBorder,
                  },
                ]}
                onPress={() => handleDevicePress(item, index)}
                activeOpacity={0.7}
                delayPressIn={30}
              >
                <Text
                  style={[
                    styles.deviceModel,
                    {
                      color: isSelected ? '#ffffff' : colors.label,
                    },
                  ]}
                >
                  {item.model}
                </Text>
                <Text
                  style={[
                    styles.deviceCredit,
                    {
                      color: isSelected ? '#ffffff' : colors.appleBlue,
                    },
                  ]}
                >
                  {item.value > 0 ? `-$${item.value}` : '$0'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {selectedDevice.value > 0 && (
        <Animated.View
          style={[
            styles.activeDiscountBanner,
            {
              backgroundColor: isDarkMode ? '#112918' : '#e8f7ec',
              opacity: bannerAnim,
              transform: [
                {
                  translateY: bannerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.activeDiscountText,
              { color: isDarkMode ? '#30d158' : '#1e7b34' },
            ]}
          >
            🎉 Applied ${selectedDevice.value} credit from your {selectedDevice.model}!
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    padding: 18,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  headerTexts: {
    flex: 1,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  subtext: {
    fontSize: 13,
    marginBottom: 14,
    lineHeight: 18,
  },
  scrollWrapper: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  deviceChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    minWidth: 110,
  },
  deviceModel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  deviceCredit: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
  activeDiscountBanner: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeDiscountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -14 }],
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  leftArrow: {
    left: 2,
  },
  rightArrow: {
    right: 2,
  },
  arrowText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
