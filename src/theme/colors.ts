export const colors = {
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#E3F2FD',

  background: '#F7F7F9',
  white: '#FFFFFF',
  black: '#1A1A1A',

  gray: '#9E9E9E',
  grayDark: '#616161',
  grayLight: '#F3F3F6',

  border: '#E5E5EA',
  divider: '#EDEDF0',

  discount: '#2196F3',
  rating: '#FFC107',
  error: '#F44336',
  success: '#4CAF50',
  blue: '#2196F3',

  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;
