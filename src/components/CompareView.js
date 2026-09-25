import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { getTheme } from '../theme';
import { IPHONE_MODELS } from '../productData';

export default function CompareView({ onSelectModel, isDarkMode = true }) {
  const [modelAIndex, setModelAIndex] = useState(0); // iPhone 14 Pro
  const [modelBIndex, setModelBIndex] = useState(1); // iPhone 14
  const fadeA = useRef(new Animated.Value(1)).current;
  const fadeB = useRef(new Animated.Value(1)).current;

  const currentTheme = getTheme(isDarkMode);
  const colors = currentTheme.colors;

  const phoneA = IPHONE_MODELS[modelAIndex] || IPHONE_MODELS[0] || {};
  const phoneB = IPHONE_MODELS[modelBIndex] || IPHONE_MODELS[1] || {};

  const handleSelectModelA = (idx) => {
    if (idx === modelAIndex) return;
    Animated.sequence([
      Animated.timing(fadeA, { toValue: 0.35, duration: 80, useNativeDriver: true }),
      Animated.timing(fadeA, { toValue: 1, duration: 160, useNativeDriver: true }),
    ]).start();
    setModelAIndex(idx);
  };

  const handleSelectModelB = (idx) => {
    if (idx === modelBIndex) return;
    Animated.sequence([
      Animated.timing(fadeB, { toValue: 0.35, duration: 80, useNativeDriver: true }),
      Animated.timing(fadeB, { toValue: 1, duration: 160, useNativeDriver: true }),
    ]).start();
    setModelBIndex(idx);
  };

  const getDeviceImage = (phone) => {
    if (!phone) return null;
    const colorObj = phone.colors && phone.colors[0];
    const rawImg = (colorObj && colorObj.image) || phone.heroImage;
    if (typeof rawImg === 'string') return { uri: rawImg };
    return rawImg;
  };

  const getSpecValue = (phone, key) => {
    if (!phone) return '—';
    if (key === 'island') {
      return phone.island || (phone.specs?.dynamicIsland ? 'Dynamic Island' : 'Classic Notch') || '—';
    }
    return phone[key] || phone.specs?.[key] || '—';
  };

  const specRows = [
    { key: 'display', title: 'Display' },
    { key: 'island', title: 'Front Design' },
    { key: 'chip', title: 'Processor' },
    { key: 'camera', title: 'Camera System' },
    { key: 'battery', title: 'Battery Life' },
    { key: 'safety', title: 'Safety Features' },
    { key: 'biometrics', title: 'Biometrics' },
    { key: 'connectivity', title: 'Cellular' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.systemBackground }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.label }]}>Compare iPhone Models</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryLabel }]}>
          Select two devices to inspect their display, cameras, battery, and chips.
        </Text>
      </View>

      {/* Side-by-side Selectors & Images */}
      <View style={styles.dualHeaderRow}>
        {/* Model A */}
        <View style={styles.compareCol}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerRow}>
            {IPHONE_MODELS.map((m, idx) => (
              <TouchableOpacity
                key={`a-${m.id}`}
                style={[
                  styles.smallPill,
                  {
                    backgroundColor: modelAIndex === idx
                      ? colors.appleBlue
                      : (isDarkMode ? '#2c2c2e' : '#f2f2f7'),
                  },
                ]}
                onPress={() => handleSelectModelA(idx)}
              >
                <Text
                  style={[
                    styles.smallPillText,
                    { color: modelAIndex === idx ? '#ffffff' : colors.label },
                  ]}
                >
                  {m.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {getDeviceImage(phoneA) && (
            <Animated.View style={{ opacity: fadeA }}>
              <Image
                source={getDeviceImage(phoneA)}
                style={styles.compareImg}
                resizeMode="contain"
              />
            </Animated.View>
          )}
          <Text style={[styles.compareName, { color: colors.label }]}>{phoneA.name}</Text>
          <Text style={[styles.comparePrice, { color: colors.secondaryLabel }]}>From ${phoneA.price}</Text>

          <TouchableOpacity
            style={[styles.miniBuyBtn, { backgroundColor: colors.appleBlue }]}
            onPress={() => onSelectModel && onSelectModel(phoneA)}
          >
            <Text style={styles.miniBuyText}>Buy</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.verticalDivider, { backgroundColor: colors.cardBorder }]} />

        {/* Model B */}
        <View style={styles.compareCol}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerRow}>
            {IPHONE_MODELS.map((m, idx) => (
              <TouchableOpacity
                key={`b-${m.id}`}
                style={[
                  styles.smallPill,
                  {
                    backgroundColor: modelBIndex === idx
                      ? colors.appleBlue
                      : (isDarkMode ? '#2c2c2e' : '#f2f2f7'),
                  },
                ]}
                onPress={() => handleSelectModelB(idx)}
              >
                <Text
                  style={[
                    styles.smallPillText,
                    { color: modelBIndex === idx ? '#ffffff' : colors.label },
                  ]}
                >
                  {m.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {getDeviceImage(phoneB) && (
            <Animated.View style={{ opacity: fadeB }}>
              <Image
                source={getDeviceImage(phoneB)}
                style={styles.compareImg}
                resizeMode="contain"
              />
            </Animated.View>
          )}
          <Text style={[styles.compareName, { color: colors.label }]}>{phoneB.name}</Text>
          <Text style={[styles.comparePrice, { color: colors.secondaryLabel }]}>From ${phoneB.price}</Text>

          <TouchableOpacity
            style={[styles.miniBuyBtn, { backgroundColor: colors.appleBlue }]}
            onPress={() => onSelectModel && onSelectModel(phoneB)}
          >
            <Text style={styles.miniBuyText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comparison Spec Table */}
      <View
        style={[
          styles.specTable,
          {
            backgroundColor: colors.elevatedCard,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        {specRows.map((spec, index) => {
          const isLast = index === specRows.length - 1;
          return (
            <View
              key={spec.key}
              style={[
                styles.specSection,
                {
                  borderBottomColor: isLast ? 'transparent' : colors.cardBorder,
                  paddingBottom: isLast ? 0 : 14,
                },
              ]}
            >
              <Text style={[styles.specSectionTitle, { color: colors.secondaryLabel }]}>
                {spec.title}
              </Text>
              <View style={styles.specDualRow}>
                <Text style={[styles.specCellText, { color: colors.label }]}>
                  {getSpecValue(phoneA, spec.key)}
                </Text>
                <View style={[styles.specCellDivider, { backgroundColor: colors.cardBorder }]} />
                <Text style={[styles.specCellText, { color: colors.label }]}>
                  {getSpecValue(phoneB, spec.key)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  dualHeaderRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    width: '100%',
  },
  compareCol: {
    flex: 1,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    marginHorizontal: 6,
    height: '100%',
  },
  pickerRow: {
    maxHeight: 34,
    marginBottom: 8,
  },
  smallPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
  },
  smallPillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  compareImg: {
    width: 110,
    height: 140,
    marginVertical: 6,
  },
  compareName: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
  },
  comparePrice: {
    fontSize: 13,
    marginTop: 2,
    textAlign: 'center',
    width: '100%',
  },
  miniBuyBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  miniBuyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  specTable: {
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  specSection: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 14,
  },
  specSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  specDualRow: {
    flexDirection: 'row',
  },
  specCellText: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  specCellDivider: {
    width: 1,
    marginHorizontal: 8,
  },
});
