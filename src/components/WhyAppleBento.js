import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BENTO_PERKS } from '../productData';
import { getTheme } from '../theme';

export default function WhyAppleBento({ onPerkPress, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  return (
    <View style={styles.section}>
      <Text style={[styles.heading, { color: colors.label }]}>
        Why Apple is the best place to buy iPhone.
      </Text>

      <View style={styles.grid}>
        {BENTO_PERKS.map((perk) => (
          <TouchableOpacity
            key={perk.id}
            style={[
              styles.card,
              {
                backgroundColor: colors.elevatedCard,
                borderColor: colors.cardBorder,
              },
            ]}
            onPress={() => onPerkPress(perk)}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>{perk.icon}</Text>
            <Text style={[styles.badge, { color: colors.secondaryLabel }]}>{perk.badge}</Text>
            <Text style={[styles.title, { color: colors.label }]}>{perk.title}</Text>
            <Text style={[styles.subtitle, { color: colors.secondaryLabel }]}>{perk.subtitle}</Text>
            <Text style={[styles.linkText, { color: colors.appleBlue }]}>
              {perk.linkText} <Text style={styles.chevron}>›</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 18,
    textAlign: 'center',
  },
  grid: {
    gap: 14,
  },
  card: {
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 2,
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 16,
  },
});
