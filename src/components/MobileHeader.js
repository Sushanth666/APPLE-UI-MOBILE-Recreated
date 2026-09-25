import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import AppleLogo from './AppleLogo';
import { getTheme } from '../theme';

function MoonIcon({ size = 16, color = '#ffd60a' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
      <Path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </Svg>
  );
}

function SunIcon({ size = 17, color = '#ff9f0a' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="10" r="3.8" fill={color} />
      <Line x1="10" y1="1.5" x2="10" y2="4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="10" y1="16" x2="10" y2="18.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="1.5" y1="10" x2="4" y2="10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="16" y1="10" x2="18.5" y2="10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="4" y1="4" x2="5.8" y2="5.8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="14.2" y1="14.2" x2="16" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="4" y1="16" x2="5.8" y2="14.2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="14.2" y1="5.8" x2="16" y2="4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

function SearchIcon({ size = 18, color = '#ffffff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Circle cx="7.5" cy="7.5" r="5" stroke={color} strokeWidth="1.6" />
      <Line x1="11.5" y1="11.5" x2="16" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

function BagIcon({ size = 18, color = '#ffffff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M5.5 6V4.5a3.5 3.5 0 0 1 7 0V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Rect x="2.5" y="5.5" width="13" height="11" rx="2" stroke={color} strokeWidth="1.5" />
    </Svg>
  );
}

export default function MobileHeader({
  bagCount = 0,
  onBagPress,
  onSearchPress,
  isDarkMode = true,
  onToggleTheme,
  topInset = 0,
}) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  const bagScale = useRef(new Animated.Value(1)).current;
  const themeRotate = useRef(new Animated.Value(0)).current;
  const themeScale = useRef(new Animated.Value(1)).current;
  const logoPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoPulse, {
          toValue: 1.08,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(logoPulse, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (bagCount > 0) {
      Animated.sequence([
        Animated.spring(bagScale, {
          toValue: 1.45,
          tension: 180,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(bagScale, {
          toValue: 1,
          tension: 120,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [bagCount]);

  const handleToggle = () => {
    Animated.parallel([
      Animated.timing(themeRotate, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(themeScale, {
          toValue: 0.72,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.spring(themeScale, {
          toValue: 1,
          tension: 120,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      themeRotate.setValue(0);
    });

    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  const rotateDeg = themeRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: colors.headerBg,
          borderBottomColor: colors.cardBorder,
          paddingTop: topInset,
        },
      ]}
    >
      <View style={styles.headerInner}>
        {/* Left: Apple Brand Logo */}
        <View style={styles.left}>
          <Animated.View style={{ transform: [{ scale: logoPulse }] }}>
            <AppleLogo size={20} color={colors.label} />
          </Animated.View>
        </View>

        {/* Right: Theme Toggle, Search Icon, Bag Icon */}
        <View style={styles.right}>
          {/* Animated Theme Toggle Button */}
          <TouchableOpacity
            style={[
              styles.themePill,
              {
                backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7',
                borderColor: colors.cardBorder,
              },
            ]}
            onPress={handleToggle}
            accessibilityLabel="Toggle Theme"
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Animated.View
              style={{
                transform: [{ rotate: rotateDeg }, { scale: themeScale }],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isDarkMode ? (
                <MoonIcon size={16} color="#ffd60a" />
              ) : (
                <SunIcon size={17} color="#ff9f0a" />
              )}
            </Animated.View>
          </TouchableOpacity>

          {/* Vector Search Icon */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSearchPress}
            accessibilityLabel="Search"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <SearchIcon size={19} color={colors.label} />
          </TouchableOpacity>

          {/* Animated Shopping Bag Icon */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBagPress}
            accessibilityLabel="Shopping Bag"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <BagIcon size={19} color={colors.label} />
            {bagCount > 0 && (
              <Animated.View
                style={[
                  styles.bagBadge,
                  {
                    backgroundColor: colors.appleBlue,
                    transform: [{ scale: bagScale }],
                  },
                ]}
              >
                <Text style={styles.bagBadgeText}>{bagCount}</Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 100,
  },
  headerInner: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 52,
  },
  themePill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 4,
  },
  bagBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  bagBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
