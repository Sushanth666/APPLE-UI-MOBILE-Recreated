// Apple iOS Design System Theme Tokens (Light & Apple Store Dark Mode)

export const lightColors = {
  black: '#000000',
  white: '#ffffff',
  systemBackground: '#f5f5f7',
  secondarySystemBackground: '#ffffff',
  tertiarySystemBackground: '#e5e5ea',
  elevatedCard: '#ffffff',
  cardBorder: '#e5e5ea',
  systemGray: '#8e8e93',
  systemGray2: '#aeaeb2',
  systemGray3: '#c7c7cc',
  systemGray4: '#d1d1d6',
  systemGray5: '#e5e5ea',
  systemGray6: '#f2f2f7',
  label: '#1d1d1f',
  secondaryLabel: '#86868b',
  tertiaryLabel: '#a1a1a6',
  appleBlue: '#0071e3',
  appleBlueHover: '#0077ed',
  appleOrange: '#ff9500',
  appleGreen: '#34c759',
  appleRed: '#ff3b30',
  applePurple: '#af52de',
  proDarkCard: '#161617',
  proGold: '#fae7cf',
  proPurple: '#594f63',
  headerBg: '#ffffff',
  subnavBg: '#fbfbfd',
  segmentedBg: '#e5e5ea',
  segmentedActive: '#ffffff',
  divider: '#d2d2d7',
};

export const darkColors = {
  black: '#000000',
  white: '#ffffff',
  systemBackground: '#000000',
  secondarySystemBackground: '#121214',
  tertiarySystemBackground: '#1c1c1e',
  elevatedCard: '#161618',
  cardBorder: '#2c2c2e',
  systemGray: '#8e8e93',
  systemGray2: '#636366',
  systemGray3: '#48484a',
  systemGray4: '#3a3a3c',
  systemGray5: '#2c2c2e',
  systemGray6: '#1c1c1e',
  label: '#f5f5f7',
  secondaryLabel: '#a1a1a6',
  tertiaryLabel: '#6e6e73',
  appleBlue: '#2997ff',
  appleBlueHover: '#0077ed',
  appleOrange: '#ff9f0a',
  appleGreen: '#30d158',
  appleRed: '#ff453a',
  applePurple: '#bf5af2',
  proDarkCard: '#161617',
  proGold: '#fae7cf',
  proPurple: '#594f63',
  headerBg: '#000000',
  subnavBg: '#0a0a0c',
  segmentedBg: '#1c1c1e',
  segmentedActive: '#2c2c2e',
  divider: '#38383a',
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  xl: 28,
  pill: 999,
};

export const theme = {
  colors: darkColors, // Default to Apple Store Dark Theme
  radius,
};

export function getTheme(isDark = true) {
  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
    radius,
  };
}
