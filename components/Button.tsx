// CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  style?: ViewStyle; // Optional styles for the button
  textStyle?: TextStyle; // Optional styles for the button text
  disabled?: boolean; // Optional disabled state
  loading?: boolean; // Optional loading state
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  className,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && styles.disabled]}
      disabled={disabled || loading} // Disable the button if loading
      className={className}
    >
      {loading ? (
        <ActivityIndicator color="#fff" /> // Show loading indicator
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0258D3', // Default button color
    borderRadius: 15,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row', // Align items in a row for the loading indicator
    justifyContent: 'center', // Center items
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
