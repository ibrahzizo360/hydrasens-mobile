// CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  style?: ViewStyle; // Optional styles for the button
  textStyle?: TextStyle; // Optional styles for the button text
  disabled?: boolean; // Optional disabled state
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  className
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && styles.disabled]}
      disabled={disabled}
      className={className}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0258D3', // Default button color
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Default text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#aaa', // Color for disabled state
  },
});

export default CustomButton;
