import useProjectStatusStore from '@/hooks/projectStatusStore';
import useBottomSheetStore from '@/hooks/useBottomSheet';
import { useRouter } from 'expo-router';
import React, { useRef, useEffect } from 'react';
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

const screenHeight = Dimensions.get('window').height + 600;

export const CustomBottomSheet = () => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const router = useRouter();
  const { isVisible, toggleVisibility } = useBottomSheetStore();
  const {setBonusActive} = useProjectStatusStore();

  useEffect(() => {
    animateSheet(isVisible ? screenHeight * 0.3: screenHeight);
  }, [isVisible]);

  const animateSheet = (toValue: number) => {
    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState) => {
      const newTranslateY = screenHeight * 0.3 + gestureState.dy;
      if (gestureState.dy > 0) {
        translateY.setValue(newTranslateY);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        toggleVisibility(false);
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
        <Pressable onPress={() => {toggleVisibility(false); setBonusActive(false); router.push('/status')}}>
          <Image source={require('../../assets/images/tab-card-1.png')} style={styles.tabImage} />
        </Pressable>
        <Pressable onPress={() => {toggleVisibility(false); router.push('/contribution/start')}}>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: screenHeight * 0.71,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    zIndex: 1,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  sheetText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 10,
    fontWeight: 'medium',
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
