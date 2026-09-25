import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { getTheme } from '../theme';
import { ACCESSORIES } from '../productData';

export default function AccessoriesView({ onAddToBag, isDarkMode = true }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Cases', 'Wallets', 'Power', 'AirTag', 'Audio'];
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  const { width } = useWindowDimensions();
  const effectiveWidth = Math.min(width, 480);
  const cardWidth = Math.floor((effectiveWidth - 32 - 12) / 2);

  const items = Array.isArray(ACCESSORIES) ? ACCESSORIES : [];
  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.systemBackground }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.label }]}>MagSafe & Accessories</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryLabel }]}>
          Snap on a magnetic case, wallet, or charge faster with wireless power.
        </Text>
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catPill,
                {
                  backgroundColor: isActive
                    ? colors.appleBlue
                    : (isDarkMode ? '#1c1c1e' : '#ffffff'),
                  borderColor: isActive ? colors.appleBlue : colors.cardBorder,
                },
              ]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.catText,
                  {
                    color: isActive ? '#ffffff' : colors.label,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Product Grid */}
      <View style={styles.grid}>
        {filteredItems.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              {
                width: cardWidth,
                backgroundColor: colors.elevatedCard,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View style={styles.imgWrap}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                style={styles.img}
                resizeMode="contain"
              />
            </View>

            <View style={styles.colorRow}>
              {(item.colors || []).map((c, i) => (
                <View
                  key={i}
                  style={[
                    styles.colorDot,
                    {
                      backgroundColor: c,
                      borderColor: isDarkMode ? '#48484a' : '#e5e5ea',
                    },
                  ]}
                />
              ))}
            </View>

            <Text style={[styles.categoryBadge, { color: colors.secondaryLabel }]}>
              {item.category || 'Accessory'}
            </Text>
            <Text style={[styles.name, { color: colors.label }]} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={[styles.price, { color: colors.label }]}>${item.price}</Text>

            <TouchableOpacity
              style={[styles.addBtn, { backgroundColor: colors.appleBlue }]}
              onPress={() => onAddToBag(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.addBtnText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  catRow: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  catText: {
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    gap: 12,
  },
  card: {
    width: '48%',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  imgWrap: {
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  categoryBadge: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    minHeight: 34,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  addBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
