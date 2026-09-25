import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { IMAGES } from '../assets';
import { getTheme } from '../theme';

export default function MagSafeShowcaseMobile({ onShopPress, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  return (
    <View style={styles.section}>
      <Text style={[styles.heading, { color: colors.label }]}>Featured accessories</Text>

      {/* MagSafe Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.elevatedCard,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.label }]}>MagSafe</Text>
        <Text style={[styles.cardDesc, { color: colors.secondaryLabel }]}>
          Snap on a magnetic case, wallet, or both. And get faster wireless charging.
        </Text>
        <TouchableOpacity onPress={onShopPress} style={styles.linkWrap}>
          <Text style={[styles.linkText, { color: colors.appleBlue }]}>Shop MagSafe accessories ›</Text>
        </TouchableOpacity>
        <Image
          source={IMAGES.magsafeAccessories}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      {/* AirTag Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.elevatedCard,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.label }]}>AirTag</Text>
        <Text style={[styles.cardDesc, { color: colors.secondaryLabel }]}>
          Attach one to your keys. Put another in your backpack. If they’re misplaced, just use the Find My app.
        </Text>
        <View style={styles.dualLinks}>
          <TouchableOpacity onPress={onShopPress}>
            <Text style={[styles.linkText, { color: colors.appleBlue }]}>Buy ›</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onShopPress}>
            <Text style={[styles.linkText, { color: colors.appleBlue }]}>Learn more ›</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={IMAGES.airtagAccessories}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      {/* AirPods Family Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.elevatedCard,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.label }]}>Magic runs in the family.</Text>
        <Text style={[styles.cardDesc, { color: colors.secondaryLabel }]}>
          Explore all AirPods models and find the best one for you.
        </Text>
        <TouchableOpacity onPress={onShopPress} style={styles.linkWrap}>
          <Text style={[styles.linkText, { color: colors.appleBlue }]}>Shop all iPhone accessories ›</Text>
        </TouchableOpacity>
        <Image
          source={IMAGES.airpodsFamily}
          style={styles.airpodsImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 8,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  cardDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
    maxWidth: 290,
  },
  linkWrap: {
    marginBottom: 18,
  },
  dualLinks: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 18,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardImage: {
    width: '100%',
    height: 180,
    maxWidth: 320,
  },
  airpodsImage: {
    width: '100%',
    height: 160,
    maxWidth: 320,
  },
});
