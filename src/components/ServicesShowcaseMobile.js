import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppleLogo from './AppleLogo';
import { SERVICES_ITEMS } from '../productData';
import { getTheme } from '../theme';

const { width } = Dimensions.get('window');

export default function ServicesShowcaseMobile({ onServicePress, isDarkMode = true }) {
  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  return (
    <View style={styles.section}>
      <Text style={[styles.heading, { color: colors.label }]}>Get more out of your iPhone.</Text>

      <View style={styles.cardList}>
        {SERVICES_ITEMS.map((service) => {
          const isItemDark = isDarkMode || service.theme === 'dark';
          const isResearch = service.id === 'research';

          return (
            <View
              key={service.id}
              style={[
                styles.card,
                {
                  backgroundColor: isItemDark
                    ? (service.theme === 'dark' ? '#000000' : colors.elevatedCard)
                    : '#ffffff',
                  borderColor: isItemDark ? colors.cardBorder : '#e5e5ea',
                },
                isResearch && styles.researchCard,
              ]}
            >
              <View style={styles.headerRow}>
                {service.id !== 'research' && (
                  <AppleLogo
                    size={28}
                    color={isItemDark ? '#ffffff' : '#000000'}
                    style={{ marginRight: 6 }}
                  />
                )}
                <Text
                  style={[
                    styles.cardTitle,
                    { color: isItemDark ? '#ffffff' : '#1d1d1f' },
                    isResearch && styles.researchTitle,
                  ]}
                >
                  {service.title}
                </Text>
              </View>

              <Text
                style={[
                  styles.headline,
                  { color: isItemDark ? '#f5f5f7' : '#1d1d1f' },
                  isResearch && styles.researchHeadline,
                ]}
              >
                {service.headline}
              </Text>

              {/* Media Preview */}
              {service.image && (
                <View
                  style={[
                    styles.mediaContainer,
                    service.id === 'arcade' && styles.arcadeMediaContainer,
                  ]}
                >
                  <Image
                    source={service.image}
                    style={[
                      styles.serviceImage,
                      service.id === 'one' && styles.oneImage,
                      service.id === 'arcade' && styles.arcadeImage,
                      isResearch && styles.researchImage,
                    ]}
                    resizeMode="contain"
                  />
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.actionLink}
                  onPress={() => onServicePress && onServicePress(service)}
                >
                  <Text style={[styles.actionText, { color: colors.appleBlue }]}>
                    Learn more <Text style={styles.chevron}>›</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 32,
  },
  cardList: {
    gap: 16,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  researchCard: {
    paddingBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  researchTitle: {
    fontSize: 26,
    textAlign: 'center',
  },
  headline: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    maxWidth: 290,
  },
  researchHeadline: {
    fontSize: 14,
    fontWeight: '400',
  },
  mediaContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    minHeight: 180,
  },
  serviceImage: {
    width: '100%',
    height: 180,
    maxHeight: 200,
  },
  oneImage: {
    height: 160,
  },
  arcadeMediaContainer: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  arcadeImage: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  researchImage: {
    height: 200,
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    paddingBottom: 8,
  },
  actionLink: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 15,
  },
});
