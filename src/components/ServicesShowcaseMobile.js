import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
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
                /* Multi-cover carousel matching Apple Web: Pure Throwback, Chill Mix, Good Vibes */
                <View style={styles.musicCoversRow}>
                  <Image
                    source={IMAGES.musicThrowback}
                    style={styles.flankCover}
                    resizeMode="cover"
                  />
                  <View style={styles.chillMixCard}>
                    <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%">
                      <Defs>
                        <LinearGradient id="chillGradMobile" x1="0" y1="0" x2="1" y2="1">
                          <Stop offset="0%" stopColor="#104366" />
                          <Stop offset="45%" stopColor="#09597c" />
                          <Stop offset="75%" stopColor="#0093a8" />
                          <Stop offset="100%" stopColor="#18bb6b" />
                        </LinearGradient>
                      </Defs>
                      <Rect width="100%" height="100%" rx={20} fill="url(#chillGradMobile)" />
                    </Svg>
                    <View style={styles.chillBrand}>
                      <AppleLogo size={14} color="#ffffff" style={{ marginRight: 4 }} />
                      <Text style={styles.chillBrandText}>Music</Text>
                    </View>
                    <Text style={styles.chillTitle}>Chill{'\n'}Mix</Text>
                  </View>
                  <Image
                    source={IMAGES.musicGoodVibes}
                    style={styles.flankCover}
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
  musicCoversRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    overflow: 'hidden',
    marginTop: 10,
    paddingBottom: 22,
  },
  flankCover: {
    width: 150,
    height: 150,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  chillMixCard: {
    width: 165,
    height: 165,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  chillBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chillBrandText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  chillTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 28,
    letterSpacing: -0.5,
  },
});
