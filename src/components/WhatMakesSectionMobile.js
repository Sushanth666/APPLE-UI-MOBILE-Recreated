import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { IMAGES } from '../assets';
import { getTheme } from '../theme';

export default function WhatMakesSectionMobile({ onLearnMore, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  const handleLearnIOS16 = () => {
    if (onLearnMore) {
      onLearnMore('ios16');
    } else {
      Alert.alert(
        'iOS 16',
        'Personal is powerful. Explore lock screen customization, Focus filters, iCloud Shared Photo Library, and smarter intelligence.'
      );
    }
  };

  const handleLearnSwitch = () => {
    if (onLearnMore) {
      onLearnMore('switch');
    } else {
      Alert.alert(
        'Switching to iPhone',
        'Switching is super simple. Transfer your photos, contacts, WhatsApp chats, and apps seamlessly with the Move to iOS app.'
      );
    }
  };

  return (
    <View style={styles.section}>
      {/* Section Title */}
      <Text style={[styles.heading, { color: colors.label }]}>
        What makes an iPhone an iPhone?
      </Text>

      {/* Card 1: iOS 16 */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDarkMode ? colors.elevatedCard : '#ffffff',
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.label }]}>iOS 16</Text>
          <Text style={[styles.cardSub, { color: colors.secondaryLabel }]}>
            Personal is powerful.
          </Text>
          <TouchableOpacity onPress={handleLearnIOS16} activeOpacity={0.7} style={styles.linkWrap}>
            <Text style={[styles.linkText, { color: colors.appleBlue }]}>
              Learn more <Text style={styles.chevron}>›</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mediaContainer}>
          <Image
            source={IMAGES.ios16Phones}
            style={styles.ios16Image}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Card 2: Switching to iPhone */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDarkMode ? colors.elevatedCard : '#ffffff',
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.label }]}>
            Switching to iPhone{'\n'}is super simple.
          </Text>
          <TouchableOpacity onPress={handleLearnSwitch} activeOpacity={0.7} style={styles.linkWrap}>
            <Text style={[styles.linkText, { color: colors.appleBlue }]}>
              Learn more <Text style={styles.chevron}>›</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mediaContainer}>
          <Image
            source={IMAGES.switchPhones}
            style={styles.switchImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  cardHeader: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 34,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 2,
  },
  linkWrap: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 16,
    fontWeight: '600',
  },
  mediaContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ios16Image: {
    width: '100%',
    aspectRatio: 870 / 428,
    maxHeight: 240,
  },
  switchImage: {
    width: '100%',
    aspectRatio: 675 / 357,
    maxHeight: 240,
  },
});
