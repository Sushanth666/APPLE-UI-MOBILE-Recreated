import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Animated } from 'react-native';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

function DiscoverIcon({ size = 22, color = '#8e8e93' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <Path
        d="M15.5 8.5L13.8 13.8L8.5 15.5L10.2 10.2L15.5 8.5Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="12" r="1.5" fill={color} />
    </Svg>
  );
}

function PhoneIcon({ size = 22, color = '#8e8e93' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="6.5" y="2.5" width="11" height="19" rx="3.5" stroke={color} strokeWidth="1.8" />
      <Line x1="10.5" y1="5.5" x2="13.5" y2="5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line x1="10.5" y1="18.5" x2="13.5" y2="18.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

function CompareIcon({ size = 22, color = '#8e8e93' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="4" width="7" height="16" rx="2" stroke={color} strokeWidth="1.6" />
      <Rect x="13" y="4" width="7" height="16" rx="2" stroke={color} strokeWidth="1.6" strokeDasharray="3 2" />
      <Path d="M9.5 12h5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

function BagNavIcon({ size = 22, color = '#8e8e93' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 8V6a5 5 0 0 1 10 0V8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Rect x="3.5" y="7.5" width="17" height="13.5" rx="3" stroke={color} strokeWidth="1.8" />
    </Svg>
  );
}

function AnimatedTabItem({ tab, isActive, activeColor, inactiveColor, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.88, duration: 90, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 200, friction: 6, useNativeDriver: true }),
    ]).start();
    onPress(tab.id);
  };

  const TabIcon = tab.Icon;
  const color = isActive ? activeColor : inactiveColor;

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={tab.label}
    >
      <Animated.View style={[styles.iconWrap, { transform: [{ scale: scaleAnim }] }]}>
        <TabIcon size={23} color={color} />
        {tab.badgeComponent}
      </Animated.View>
      <Text
        style={[
          styles.tabLabel,
          {
            color,
            fontWeight: isActive ? '600' : '400',
          },
        ]}
      >
        {tab.label}
      </Text>
      {isActive && <View style={[styles.activeDot, { backgroundColor: activeColor }]} />}
    </TouchableOpacity>
  );
}

export default function BottomTabBar({
  activeTab,
  onTabPress,
  bagCount = 0,
  isDarkMode = true,
  bottomInset = 0,
}) {
  const badgeAnim = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(bagCount);

  useEffect(() => {
    if (bagCount > 0 && bagCount !== prevCount.current) {
      Animated.sequence([
        Animated.spring(badgeAnim, { toValue: 1.4, tension: 220, friction: 4, useNativeDriver: true }),
        Animated.spring(badgeAnim, { toValue: 1, tension: 160, friction: 6, useNativeDriver: true }),
      ]).start();
    }
    prevCount.current = bagCount;
  }, [bagCount]);

  const badgeComponent = bagCount > 0 ? (
    <Animated.View style={[styles.badge, { transform: [{ scale: badgeAnim }] }]}>
      <Text style={styles.badgeText}>
        {bagCount > 99 ? '99+' : bagCount}
      </Text>
    </Animated.View>
  ) : null;

  const tabs = [
    { id: 'discover', label: 'Discover', Icon: DiscoverIcon },
    { id: 'lineup', label: 'iPhone', Icon: PhoneIcon },
    { id: 'compare', label: 'Compare', Icon: CompareIcon },
    { id: 'bag', label: 'Bag', Icon: BagNavIcon, badgeComponent },
  ];

  const bgColor = isDarkMode ? 'rgba(28, 28, 30, 0.96)' : 'rgba(255, 255, 255, 0.96)';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
  const activeColor = '#0071e3';
  const inactiveColor = isDarkMode ? '#8e8e93' : '#86868b';
  const effectiveBottomPad = Math.max(bottomInset, Platform.OS === 'ios' ? 22 : 12);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderTopColor: borderColor,
          paddingBottom: effectiveBottomPad,
        },
      ]}
    >
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <AnimatedTabItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            onPress={onTabPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    minHeight: 46,
  },
  iconWrap: {
    position: 'relative',
    height: 26,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#ff3b30',
    borderRadius: 9,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
});
