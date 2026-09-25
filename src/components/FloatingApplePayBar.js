import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import AppleLogo from './AppleLogo';
import { theme } from '../theme';

export default function FloatingApplePayBar({ selectedItem, onApplePayPress, onClear }) {
  const slideAnim = useRef(new Animated.Value(120)).current;
  const payButtonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selectedItem) {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 70,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedItem]);

  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: 140,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (onClear) {
        onClear();
      }
    });
  };

  const handlePressIn = () => {
    Animated.spring(payButtonScale, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(payButtonScale, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  if (!selectedItem) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.inner}>
        <View style={styles.info}>
          <Text style={styles.itemName} numberOfLines={1}>{selectedItem.name}</Text>
          <Text style={styles.itemPrice}>
            ${selectedItem.netPrice || selectedItem.price}
            {selectedItem.selectedColor ? ` • ${selectedItem.selectedColor.name}` : ''}
          </Text>
        </View>

        <View style={styles.actions}>
          <Animated.View style={{ transform: [{ scale: payButtonScale }] }}>
            <TouchableOpacity
              style={styles.applePayButton}
              onPress={onApplePayPress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.9}
            >
              <View style={styles.applePayInner}>
                <AppleLogo size={13} color="#000000" />
                <Text style={styles.applePayLogo}>Pay</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={handleDismiss}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#000000',
    borderRadius: theme.radius.pill,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 999,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  itemPrice: {
    color: '#a1a1a6',
    fontSize: 12,
    marginTop: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  applePayButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: theme.radius.pill,
  },
  applePayInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  applePayLogo: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
});
