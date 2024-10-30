import useBottomSheetStore from '@/hooks/useBottomSheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const CustomBottomSheet = () => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const router = useRouter();
  const { isVisible, toggleVisibility } = useBottomSheetStore();

  useEffect(() => {
    animateSheet(isVisible ? screenHeight * 0.0001 : screenHeight);
  }, [isVisible]);

  const animateSheet = (toValue: any) => {
    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(screenHeight * 0.3 + gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        toggleVisibility(false);
      } else {
        animateSheet(screenHeight * 0.3);
      }
    },
  });

  return (
    <Animated.View
      style={[
        styles.bottomSheet,
        { transform: [{ translateY }] },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.sheetText}>
        How would you like to contribute to clean water and sanitation in your community?
      </Text>
      <Image source={require('../../assets/images/home-drop.png')} style={styles.largeImage} />
      
      <View style={styles.buttonRow}>
        <Pressable onPress={() => router.push('/status')}>
          <Image source={require('../../assets/images/tab-card-1.png')} style={styles.tabImage} />
        </Pressable>
        <Pressable onPress={() => router.push('/contribution/start')}>
          <Image source={require('../../assets/images/tab-card-2.png')} style={styles.tabImage} />
        </Pressable>
      </View>
      
      <View style={styles.buttonRow}>
        <Pressable onPress={() => console.log("")}>
          <Image source={require('../../assets/images/tab-card-3.png')} style={styles.tabImage} />
        </Pressable>
        <Pressable onPress={() => console.log("")}>
          <Image source={require('../../assets/images/tab-card-4.png')} style={styles.tabImage} />
        </Pressable>
      </View>
      
      {/* <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/home-icon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Home</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/forum.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Forum</Text>
        </View>
        <View style={styles.closeIconContainer}>
          <Pressable onPress={() => toggleVisibility(false)}>
            <Image source={require('../../assets/images/close-circle.png')} style={styles.closeIcon} />
          </Pressable>
        </View>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/data.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Data</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/offers.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Offers</Text>
        </View>
      </View> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: screenHeight * 0.7,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 55,
    zIndex: 1,
    padding: 20,
  },
  sheetText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  largeImage: {
    height: 211,
    width: 283,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  tabImage: {
    height: 91,
    width: 168,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconImage: {
    height: 24,
    width: 24,
  },
  iconText: {
    fontWeight: 'bold',
    marginTop: 2,
  },
  closeIconContainer: {
    marginBottom: 10,
  },
  closeIcon: {
    height: 60,
    width: 60,
  },
});

