import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../theme';

export default function DynamicIslandPreview() {
  const [mode, setMode] = useState('music'); // 'music' | 'call' | 'timer'

  const islandScale = useRef(new Animated.Value(1)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;

  const handleModeChange = (newMode) => {
    if (newMode === mode) return;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(contentOpacity, { toValue: 0, duration: 70, useNativeDriver: true }),
        Animated.timing(islandScale, { toValue: 0.94, duration: 70, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(islandScale, { toValue: 1, tension: 140, friction: 5, useNativeDriver: true }),
      ]),
    ]).start();

    setMode(newMode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interactive Dynamic Island</Text>
      <View style={styles.pillSelector}>
        <TouchableOpacity
          style={[styles.pillBtn, mode === 'music' && styles.pillBtnActive]}
          onPress={() => handleModeChange('music')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillBtnText, mode === 'music' && styles.pillBtnTextActive]}>
            🎵 Music
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pillBtn, mode === 'call' && styles.pillBtnActive]}
          onPress={() => handleModeChange('call')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillBtnText, mode === 'call' && styles.pillBtnTextActive]}>
            📞 Call
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pillBtn, mode === 'timer' && styles.pillBtnActive]}
          onPress={() => handleModeChange('timer')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pillBtnText, mode === 'timer' && styles.pillBtnTextActive]}>
            ⏱️ Timer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Simulated Fluid Morphing Dynamic Island Pill */}
      <Animated.View
        style={[
          styles.islandPill,
          {
            transform: [{ scale: islandScale }],
          },
        ]}
      >
        <Animated.View style={{ opacity: contentOpacity, width: '100%' }}>
          {mode === 'music' && (
            <View style={styles.islandRow}>
              <View style={styles.albumArtMini} />
              <Text style={styles.islandText}>Anti-Hero • Taylor Swift</Text>
              <Text style={styles.waveText}>📊</Text>
            </View>
          )}

          {mode === 'call' && (
            <View style={styles.islandRow}>
              <View style={styles.avatarMini} />
              <Text style={styles.islandText}>Craig Federighi</Text>
              <View style={styles.callIcons}>
                <Text style={styles.declineIcon}>✕</Text>
                <Text style={styles.acceptIcon}>✓</Text>
              </View>
            </View>
          )}

          {mode === 'timer' && (
            <View style={styles.islandRow}>
              <Text style={styles.timerIcon}>⏳</Text>
              <Text style={styles.islandText}>14:59 remaining</Text>
              <Text style={styles.timerTag}>Cooking</Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    borderRadius: theme.radius.lg,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    width: '100%',
  },
  title: {
    color: '#a1a1a6',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  pillSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
    justifyContent: 'center',
  },
  pillBtn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: theme.radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  pillBtnActive: {
    backgroundColor: '#ffffff',
  },
  pillBtnText: {
    color: '#f5f5f7',
    fontSize: 12,
    fontWeight: '500',
  },
  pillBtnTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
  islandPill: {
    backgroundColor: '#1c1c1e',
    borderRadius: 22,
    paddingVertical: 11,
    paddingHorizontal: 16,
    width: '94%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  islandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  albumArtMini: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#ff375f',
  },
  avatarMini: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#34c759',
  },
  islandText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  waveText: {
    fontSize: 14,
  },
  callIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  declineIcon: {
    color: '#ff3b30',
    fontSize: 12,
    fontWeight: '800',
  },
  acceptIcon: {
    color: '#34c759',
    fontSize: 12,
    fontWeight: '800',
  },
  timerIcon: {
    fontSize: 14,
  },
  timerTag: {
    color: '#ff9f0a',
    fontSize: 12,
    fontWeight: '600',
  },
});
