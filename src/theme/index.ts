// Theme configuration for Fitmatch app

export const colors = {
  // Primary colors
  primary: '#FF6B35',
  primaryDark: '#E55A2B',
  primaryLight: '#FF8F66',
  
  // Secondary colors
  secondary: '#00D4AA',
  secondaryDark: '#00B894',
  secondaryLight: '#55EFC4',
  
  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#1A1A2E',
  surface: '#F8F9FA',
  surfaceDark: '#16213E',
  
  // Text colors
  text: '#212529',
  textDark: '#FFFFFF',
  textSecondary: '#6C757D',
  textSecondaryDark: '#ADB5BD',
  
  // Accent colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
  
  // Other
  border: '#DEE2E6',
  borderDark: '#3D5A80',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 16,
  bodySmall: 14,
  caption: 12,
  
  // Font weights
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const isDarkMode = false;

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  isDarkMode,
};

export type Theme = typeof theme;
