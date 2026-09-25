import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { IMAGES } from '../assets';
import { getTheme } from '../theme';

export default function GuidedTourCard({ onWatchPress, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;
  const radarAnim = useRef(new Animated.Value(1)).current;
  const radarOpacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.timing(radarAnim, {
          toValue: 1.5,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(radarOpacity, {
          toValue: 0,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View
      style={[
        styles.cardContainer,
        {
          borderColor: colors.cardBorder,
          backgroundColor: '#0c1b2f',
        },
      ]}
    >
      {/* Top Header Content */}
      <View style={styles.headerContent}>
        <Text style={styles.eyebrow}>Guided Tour</Text>
        <Text style={styles.title}>
          A Guided Tour of{'\n'}iPhone 14 & iPhone 14 Pro
        </Text>
        <View style={styles.btnWrapper}>
          <Animated.View
            style={[
              styles.radarRing,
              {
                transform: [{ scale: radarAnim }],
                opacity: radarOpacity,
              },
            ]}
          />
          <TouchableOpacity
            style={styles.watchBtn}
            onPress={onWatchPress}
            activeOpacity={0.85}
          >
            <Text style={styles.watchBtnText}>Watch the film ▶</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Media Photo: Presenter cleanly framed without text collision */}
      <View style={styles.mediaWrap}>
        <Image
          source={IMAGES.guidedTourNyc}
          style={styles.presenterImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 14,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 5,
  },
  headerContent: {
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  eyebrow: {
    color: '#8ab4f8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
    textAlign: 'center',
    width: '100%',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: -0.4,
    textAlign: 'center',
    marginBottom: 16,
    width: '100%',
  },
  btnWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing: {
    position: 'absolute',
    top: -4,
    bottom: -4,
    left: -4,
    right: -4,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  watchBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  watchBtnText: {
    color: '#1d1d1f',
    fontSize: 13,
    fontWeight: '700',
  },
  mediaWrap: {
    width: '100%',
    height: 220,
    overflow: 'hidden',
    backgroundColor: '#0c1b2f',
  },
  presenterImage: {
    width: '100%',
    height: '100%',
  },
});
