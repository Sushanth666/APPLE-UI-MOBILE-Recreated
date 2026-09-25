import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { theme } from '../theme';
import DynamicIslandPreview from './DynamicIslandPreview';

export default function ProductHeroCard({
  model,
  onBuyPress,
  onLearnMorePress,
  tradeInDiscount = 0,
  isDarkMode = true,
}) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const imageAnim = useRef(new Animated.Value(1)).current;
  const buyButtonScale = useRef(new Animated.Value(1)).current;
  const floatY = useRef(new Animated.Value(0)).current;
  const swatchScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, {
          toValue: -6,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatY, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const isDark = isDarkMode || model.theme === 'dark';
  const currentColor = model.colors[selectedColorIndex] || model.colors[0];

  const handleSelectColor = (idx) => {
    if (idx === selectedColorIndex) return;
    Animated.sequence([
      Animated.timing(imageAnim, {
        toValue: 0.35,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.spring(swatchScale, { toValue: 1.28, tension: 240, friction: 4, useNativeDriver: true }),
      Animated.spring(swatchScale, { toValue: 1, tension: 180, friction: 6, useNativeDriver: true }),
    ]).start();

    setSelectedColorIndex(idx);
  };

  const handleBuyPressIn = () => {
    Animated.spring(buyButtonScale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handleBuyPressOut = () => {
    Animated.spring(buyButtonScale, { toValue: 1, tension: 100, friction: 4, useNativeDriver: true }).start();
  };

  const netPrice = Math.max(0, model.price - tradeInDiscount);
  const netMonthly = (netPrice / 24).toFixed(2);

  const imageSource =
    typeof currentColor.image === 'string'
      ? { uri: currentColor.image }
      : currentColor.image || model.heroImage;

  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      {/* Top Header */}
      <View style={styles.header}>
        {model.badge ? (
          <Text style={styles.badge}>{model.badge}</Text>
        ) : (
          <View style={{ height: 16 }} />
        )}
        <Text style={[styles.name, isDark ? styles.textDark : styles.textLight]}>
          {model.name}
        </Text>
        <Text style={[styles.headline, isDark ? styles.headlineDark : styles.headlineLight]}>
          {model.headline}
        </Text>
        <Text style={[styles.tagline, isDark ? styles.subtextDark : styles.subtextLight]}>
          {model.tagline}
        </Text>
      </View>

      {/* Pricing with Trade-in */}
      <View style={styles.priceContainer}>
        {tradeInDiscount > 0 ? (
          <View style={styles.tradeInPriceBlock}>
            <Text style={styles.strikethroughPrice}>Was ${model.price}</Text>
            <Text style={[styles.priceText, isDark ? styles.textDark : styles.textLight]}>
              From ${netPrice}
            </Text>
            <Text style={styles.tradeInSavingsBadge}>
              Save ${tradeInDiscount} with Trade-in
            </Text>
            <Text style={styles.monthlyText}>or ${netMonthly}/mo. for 24 mo.</Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={[styles.priceText, isDark ? styles.textDark : styles.textLight]}>
              From ${model.price}
            </Text>
            <Text style={styles.monthlyText}>or ${model.monthlyPrice}/mo. for 24 mo.</Text>
          </View>
        )}
      </View>

      {/* Device Image with Floating Breathing & Crossfade Transition */}
      <View style={styles.imageContainer}>
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            opacity: imageAnim,
            transform: [
              { translateY: floatY },
              {
                scale: imageAnim.interpolate({
                  inputRange: [0.35, 1],
                  outputRange: [0.96, 1],
                }),
              },
            ],
          }}
        >
          <Image
            source={imageSource}
            style={styles.deviceImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Color Swatches with Spring Pop */}
      <View style={styles.swatchContainer}>
        <Text style={[styles.colorNameText, isDark ? styles.subtextDark : styles.subtextLight]}>
          {currentColor.name}
        </Text>
        <View style={styles.swatchRow}>
          {model.colors.map((c, idx) => {
            const isSelected = selectedColorIndex === idx;
            return (
              <TouchableOpacity
                key={c.name}
                onPress={() => handleSelectColor(idx)}
                activeOpacity={0.8}
                accessibilityLabel={c.name}
              >
                <Animated.View
                  style={[
                    styles.swatchDot,
                    { backgroundColor: c.hex },
                    isSelected && styles.swatchDotActive,
                    isSelected && { transform: [{ scale: swatchScale }] },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Dynamic Island Showcase for 14 Pro */}
      {model.id === '14pro' && <DynamicIslandPreview />}

      {/* Spec Highlights */}
      <View style={[styles.specsBox, isDark ? styles.specsBoxDark : styles.specsBoxLight]}>
        <View style={styles.specItem}>
          <Text style={styles.specIcon}>📱</Text>
          <Text style={[styles.specText, isDark ? styles.textDark : styles.textLight]}>
            {model.display}
          </Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specIcon}>📷</Text>
          <Text style={[styles.specText, isDark ? styles.textDark : styles.textLight]}>
            {model.camera}
          </Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specIcon}>⚡</Text>
          <Text style={[styles.specText, isDark ? styles.textDark : styles.textLight]}>
            {model.chip}
          </Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specIcon}>🔋</Text>
          <Text style={[styles.specText, isDark ? styles.textDark : styles.textLight]}>
            {model.battery}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <Animated.View style={{ width: '100%', transform: [{ scale: buyButtonScale }] }}>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => onBuyPress({ ...model, selectedColor: currentColor, netPrice })}
            onPressIn={handleBuyPressIn}
            onPressOut={handleBuyPressOut}
            activeOpacity={0.88}
          >
            <Text style={styles.buyButtonText}>Buy {model.name}</Text>
          </TouchableOpacity>
        </Animated.View>

        {onLearnMorePress && (
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => onLearnMorePress(model)}
            activeOpacity={0.7}
          >
            <Text style={styles.learnMoreText}>Learn more ›</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    padding: 22,
    marginHorizontal: 16,
    marginVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardDark: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  cardLight: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.systemGray5,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#bf4800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'stretch',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'stretch',
  },
  headline: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginTop: 2,
    marginBottom: 4,
    textAlign: 'center',
    lineHeight: 40,
    width: '100%',
    alignSelf: 'stretch',
  },
  headlineDark: {
    color: '#ffffff',
  },
  headlineLight: {
    color: '#1d1d1f',
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'stretch',
  },
  textDark: {
    color: '#ffffff',
  },
  textLight: {
    color: '#1d1d1f',
  },
  subtextDark: {
    color: '#86868b',
  },
  subtextLight: {
    color: '#86868b',
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
    alignSelf: 'stretch',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
  },
  monthlyText: {
    fontSize: 13,
    color: '#86868b',
    marginTop: 2,
    textAlign: 'center',
    width: '100%',
  },
  strikethroughPrice: {
    fontSize: 14,
    color: '#86868b',
    textDecorationLine: 'line-through',
    textAlign: 'center',
    width: '100%',
  },
  tradeInPriceBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'stretch',
  },
  tradeInSavingsBadge: {
    backgroundColor: '#34c759',
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginVertical: 4,
    textAlign: 'center',
    alignSelf: 'center',
  },
  imageContainer: {
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  deviceImage: {
    width: '100%',
    height: '100%',
  },
  swatchContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  colorNameText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  swatchDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  swatchDotActive: {
    transform: [{ scale: 1.25 }],
    borderColor: theme.colors.appleBlue,
    borderWidth: 2,
  },
  specsBox: {
    borderRadius: theme.radius.md,
    padding: 14,
    marginVertical: 12,
    gap: 10,
  },
  specsBoxDark: {
    backgroundColor: '#1c1c1e',
  },
  specsBoxLight: {
    backgroundColor: '#f5f5f7',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  specIcon: {
    fontSize: 16,
  },
  specText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  actionRow: {
    alignItems: 'center',
    marginTop: 6,
    gap: 10,
  },
  buyButton: {
    backgroundColor: theme.colors.appleBlue,
    borderRadius: theme.radius.pill,
    paddingVertical: 13,
    width: '100%',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  learnMoreButton: {
    paddingVertical: 6,
  },
  learnMoreText: {
    color: theme.colors.appleBlue,
    fontSize: 14,
    fontWeight: '500',
  },
});
