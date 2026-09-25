import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { CHAPTER_NAV_ITEMS } from '../productData';
import { getTheme } from '../theme';

export default function ChapterSubnav({ selectedId, onSelect, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;
  const scrollRef = useRef(null);

  const [scrollX, setScrollX] = useState(0);
  const [contentWidth, setContentWidth] = useState(680); // sensible initial width for 9 items
  const [containerWidth, setContainerWidth] = useState(380);

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

  // Web mouse wheel & mouse click-and-drag horizontal swiping
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = scrollRef.current?.getScrollableNode?.() || scrollRef.current;
    if (!node || !node.addEventListener) return;

    // Convert vertical mouse wheel into horizontal scroll
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        e.preventDefault();
        node.scrollLeft += e.deltaY * 0.85;
        setScrollX(node.scrollLeft);
      }
    };

    // Mouse drag-to-scroll support for laptop / desktop users
    let isDown = false;
    let startX = 0;
    let initialScroll = 0;

    const handleMouseDown = (e) => {
      // Only drag with primary left mouse button
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

  const handleItemPress = (id, index) => {
    onSelect(id);
    // Smoothly center the tapped item into view
    const itemEstimate = index * 75;
    const targetX = Math.max(0, Math.min(maxScroll, itemEstimate - containerWidth / 2 + 40));
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
    setScrollX(targetX);
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: colors.subnavBg,
          borderBottomColor: colors.cardBorder,
        },
      ]}
    >
      {/* Left Chevron Button */}
      {canScrollLeft && (
        <TouchableOpacity
          style={[
            styles.arrowButton,
            styles.leftArrow,
            {
              backgroundColor: isDarkMode
                ? 'rgba(28, 28, 30, 0.92)'
                : 'rgba(255, 255, 255, 0.94)',
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

      {/* Right Chevron Button */}
      {canScrollRight && (
        <TouchableOpacity
          style={[
            styles.arrowButton,
            styles.rightArrow,
            {
              backgroundColor: isDarkMode
                ? 'rgba(28, 28, 30, 0.92)'
                : 'rgba(255, 255, 255, 0.94)',
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
        onScroll={(e) => {
          setScrollX(e.nativeEvent.contentOffset.x);
        }}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        onContentSizeChange={(w) => setContentWidth(w)}
        contentContainerStyle={styles.scrollContent}
      >
        {CHAPTER_NAV_ITEMS.map((item, index) => {
          const isActive = selectedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                isActive && {
                  backgroundColor: isDarkMode
                    ? 'rgba(41, 151, 255, 0.16)'
                    : 'rgba(0, 113, 227, 0.08)',
                },
              ]}
              onPress={() => handleItemPress(item.id, index)}
              activeOpacity={0.7}
              delayPressIn={30}
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>
              <Text
                style={[
                  styles.name,
                  {
                    color: isActive
                      ? colors.appleBlue
                      : (isDarkMode ? '#a1a1a6' : '#1d1d1f'),
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {item.name}
              </Text>
              {item.tag ? <Text style={styles.tag}>{item.tag}</Text> : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 54,
  },
  iconBox: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  name: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  tag: {
    fontSize: 9,
    color: '#ff9500',
    fontWeight: '700',
    marginTop: 1,
    textAlign: 'center',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -15 }],
    width: 30,
    height: 30,
    borderRadius: 15,
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
    left: 6,
  },
  rightArrow: {
    right: 6,
  },
  arrowText: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
