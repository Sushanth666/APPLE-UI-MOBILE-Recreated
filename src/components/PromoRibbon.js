import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getTheme } from '../theme';
import { PROMO_RIBBON } from '../productData';

export default function PromoRibbon({ onPress, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? '#121214' : '#f5f5f7',
          borderBottomColor: colors.cardBorder,
        },
      ]}
    >
      <Text style={[styles.text, { color: isDarkMode ? '#d1d1d6' : '#1d1d1f' }]}>
        {PROMO_RIBBON.text}
      </Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.linkWrap}>
        <Text style={[styles.linkText, { color: colors.appleBlue }]}>
          {PROMO_RIBBON.linkText} <Text style={styles.chevron}>›</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 12.5,
    textAlign: 'center',
    lineHeight: 16,
  },
  linkWrap: {
    marginTop: 3,
  },
  linkText: {
    fontSize: 12.5,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 14,
    fontWeight: '400',
  },
});
