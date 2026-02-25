import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ScreenBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'warm' | 'cool';
}

const gradients = {
  default: ['#F7F7F9', '#FAFAFB', '#FCFCFD', '#FFFFFF'],
  warm: ['#FAF8F5', '#FCFAF8', '#FDFCFB', '#FFFFFF'],
  cool: ['#F5F3F9', '#F8F7FB', '#FBFAFD', '#FFFFFF'],
};

const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
  style,
  variant = 'default',
}) => {
  return (
    <LinearGradient
      colors={gradients[variant]}
      locations={[0, 0.3, 0.7, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default ScreenBackground;
