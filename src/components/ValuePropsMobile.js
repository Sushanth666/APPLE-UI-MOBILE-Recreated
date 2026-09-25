import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { VALUE_PROPS } from '../productData';
import { getTheme } from '../theme';

export default function ValuePropsMobile({ onItemPress, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  const getIcon = (type) => {
    switch (type) {
      case 'box':
        return '📦';
      case 'card':
        return '💳';
      case 'specialist':
        return '👥';
      default:
        return '✨';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121214' : '#f5f5f7' }]}>
      {VALUE_PROPS.map((prop, idx) => (
        <View key={prop.title} style={styles.item}>
          <Text style={styles.icon}>{getIcon(prop.icon)}</Text>
          <Text style={[styles.title, { color: colors.label }]}>{prop.title}</Text>
          <Text style={[styles.desc, { color: colors.secondaryLabel }]}>{prop.desc}</Text>
          <TouchableOpacity onPress={() => onItemPress && onItemPress(prop)}>
            <Text style={[styles.link, { color: colors.appleBlue }]}>{prop.link}</Text>
          </TouchableOpacity>
          {idx < VALUE_PROPS.length - 1 && (
            <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  item: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  desc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    width: '60%',
    height: StyleSheet.hairlineWidth,
    marginTop: 20,
  },
});
