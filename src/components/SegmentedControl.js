import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { getTheme } from '../theme';

export default function SegmentedControl({ tabs, activeTab, onTabPress, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;
  const [barWidth, setBarWidth] = useState(0);

  const tabIcons = {
    explore: '✨',
    models: '📱',
    compare: '⚖️',
    magsafe: '⚡',
  };

  const activeIndex = Math.max(0, tabs.findIndex((t) => t.id === activeTab));
  const slideAnim = useRef(new Animated.Value(activeIndex)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: activeIndex,
      tension: 180,
      friction: 14,
      useNativeDriver: false,
    }).start();
  }, [activeIndex]);

  const numTabs = tabs.length || 1;
  const segmentWidth = barWidth > 0 ? (barWidth - 6) / numTabs : 0;

  const leftPosition = slideAnim.interpolate({
    inputRange: tabs.map((_, i) => i),
    outputRange: tabs.map((_, i) => i * segmentWidth + 3),
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.systemBackground }]}>
      <View
        style={[
          styles.segmentedBar,
          {
            backgroundColor: isDarkMode ? '#1c1c1e' : '#e5e5ea',
            borderColor: colors.cardBorder,
          },
        ]}
        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
      >
        {barWidth > 0 && (
          <Animated.View
            style={[
              styles.animatedPill,
              {
                width: segmentWidth,
                left: leftPosition,
                backgroundColor: isDarkMode ? '#2c2c2e' : '#ffffff',
                shadowColor: isDarkMode ? '#000000' : '#8e8e93',
              },
            ]}
          />
        )}
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.75}
            >
              <Text style={styles.tabIcon}>{tabIcons[tab.id] || '•'}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.tabText,
                  {
                    color: isActive
                      ? (isDarkMode ? '#ffffff' : '#000000')
                      : (isDarkMode ? '#8e8e93' : '#636366'),
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
  },
  segmentedBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    padding: 3,
    borderWidth: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 18,
    zIndex: 2,
  },
  animatedPill: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  tabIcon: {
    fontSize: 12,
  },
  tabText: {
    fontSize: 12,
    letterSpacing: -0.2,
  },
});
