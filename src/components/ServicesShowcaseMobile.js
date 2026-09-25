import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppleLogo from './AppleLogo';
import { SERVICES_ITEMS } from '../productData';
import { IMAGES } from '../assets';
import { getTheme } from '../theme';

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
          const isMusic = service.id === 'music';
          const isNews = service.id === 'news';

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
                (isMusic || isNews) && styles.bottomMediaCard,
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

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                {isMusic && (
                  <TouchableOpacity
                    style={styles.actionLink}
                    onPress={() => onServicePress && onServicePress({ ...service, action: 'try' })}
                  >
                    <Text style={[styles.actionText, { color: colors.appleBlue }]}>
                      Try it free11 <Text style={styles.chevron}>›</Text>
                    </Text>
                  </TouchableOpacity>
                )}
                {service.id === 'one' && (
                  <TouchableOpacity
                    style={styles.actionLink}
                    onPress={() => onServicePress && onServicePress({ ...service, action: 'try' })}
                  >
                    <Text style={[styles.actionText, { color: colors.appleBlue }]}>
                      Try it free9 <Text style={styles.chevron}>›</Text>
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.actionLink}
                  onPress={() => onServicePress && onServicePress(service)}
                >
                  <Text style={[styles.actionText, { color: colors.appleBlue }]}>
                    Learn more <Text style={styles.chevron}>›</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Media Preview */}
              {isMusic ? (
                <View style={styles.musicMediaContainer}>
                  <Image
                    source={IMAGES.appleMusicCovers}
                    style={styles.musicCoversImage}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                service.image && (
                  <View
                    style={[
                      styles.mediaContainer,
                      service.id === 'arcade' && styles.arcadeMediaContainer,
                      isNews && styles.newsMediaContainer,
                    ]}
                  >
                    <Image
                      source={service.image}
                      style={[
                        styles.serviceImage,
                        service.id === 'one' && styles.oneImage,
                        service.id === 'arcade' && styles.arcadeImage,
                        isNews && styles.newsImage,
                        isResearch && styles.researchImage,
                      ]}
                      resizeMode={isNews ? 'contain' : 'contain'}
                    />
                  </View>
                )
              )}
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
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 22,
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  bottomMediaCard: {
    paddingBottom: 0,
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
    marginBottom: 12,
    maxWidth: 290,
  },
  researchHeadline: {
    fontSize: 14,
    fontWeight: '400',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 14,
  },
  actionLink: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 15,
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
  newsMediaContainer: {
    width: '100%',
    minHeight: 190,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginTop: 6,
    marginBottom: 0,
  },
  newsImage: {
    width: '105%',
    height: 190,
    maxHeight: 210,
    transform: [{ scale: 1.06 }],
  },
  researchImage: {
    height: 200,
    width: '100%',
  },
  /* Apple Music multi-cover showcase matching Apple Web */
  musicMediaContainer: {
    width: '100%',
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 0,
  },
  musicCoversImage: {
    width: '100%',
    aspectRatio: 747 / 377,
    maxHeight: 220,
    borderRadius: 18,
  },
});
