import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { Image } from 'react-native';
import Home from '.';
import Forum from './forum';
import { Redirect } from 'expo-router';
import Offers from './offers';
import Data from './data';
import useAuthStore from '@/hooks/useAuthStore';
import useBottomSheetStore from '@/hooks/useBottomSheet';
import { Ionicons } from '@expo/vector-icons';
import InsetShadow from 'react-native-inset-shadow'

const HomeScreen = () => {
  return <Home />;
};

const ForumScreen = () => {
  return <Forum />;
};

const DataScreen = () => {
  return <Data />;
};

const OffersScreen = () => {
  return <Offers />;
};

const TabIcon = ({ name, focused }: any) => {
  let imagePath;

  switch (name) {
    case 'home':
      imagePath = focused
        ? require('../../assets/images/home-icon.png')
        : require('../../assets/images/home-light.png');
      break;
    case 'forum':
      imagePath = focused
        ? require('../../assets/images/forum.png')
        : require('../../assets/images/forum-light.png');
      break;
    case 'data':
      imagePath = focused
        ? require('../../assets/images/data.png')
        : require('../../assets/images/data-light.png');
      break;
    case 'offers':
      imagePath = focused
        ? require('../../assets/images/offers.png')
        : require('../../assets/images/offers-light.png');
      break;
  }

  return <Image source={imagePath} style={styles.icon} />;
};

export default function App() {
  const { isAuthenticated, onBoardingCompleted } = useAuthStore();
  const { isVisible, toggleVisibility } = useBottomSheetStore();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const HandleToggleVisibility = () => {
    Animated.timing(rotateAnim, {
      toValue: isVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    toggleVisibility(!isVisible);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  if (!onBoardingCompleted) return <Redirect href="/onBoarding" />;
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        <TabIcon name={routeName} focused={routeName === selectedTab} />
        <Text style={styles.tabLabel}>{routeName.charAt(0).toUpperCase() + routeName.slice(1)}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
        <CurvedBottomBarExpo.Navigator
          type="DOWN"
          shadowStyle={styles.shawdow}
          circleWidth={53}
          bgColor="white"
          initialRouteName="home"
          borderTopLeftRight
          renderCircle={() => (
            <Animated.View style={styles.btnCircleUp}>
            <InsetShadow  
            shadowRadius={4}
            shadowOpacity={0.15}
            shadowColor="#000000"
            elevation={5}
            shadowOffset={2}
            top
            left
            right
            bottom={false}
            containerStyle={styles.button}>
            <TouchableOpacity style={[styles.button, { backgroundColor: isVisible ? 'white' : '#0258D3' }]} onPress={HandleToggleVisibility}>
              <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                <Ionicons 
                  name={isVisible ? "close" : "add"} 
                  size={24} 
                  color={isVisible ? "#0258D3" : "white"} 
                />
              </Animated.View>
            </TouchableOpacity>
            </InsetShadow>
          </Animated.View>
          )}
          tabBar={renderTabBar}
          screenOptions={{ headerShown: false, tabBarShowLabel: true, }}
          style={styles.bottomBar}
        >
          <CurvedBottomBarExpo.Screen
            name="home"
            component={HomeScreen}
            position="LEFT"
          />
          <CurvedBottomBarExpo.Screen
            name="forum"
            component={ForumScreen}
            position="LEFT"
          />
          <CurvedBottomBarExpo.Screen
            name="data"
            component={DataScreen}
            position="RIGHT"
          />
          <CurvedBottomBarExpo.Screen
            name="offers"
            component={OffersScreen}
            position="RIGHT"
          />
        </CurvedBottomBarExpo.Navigator>
      </>
  );
}

const styles = StyleSheet.create({
  shawdow: {
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, 
    shadowRadius: 4,
    elevation: 5, 
  },
  btnCircleUp: {
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
  },
  circleIcon: {
    width: 30,
    height: 30,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '600',
    color: '#333',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
    elevation: 5,
  },
});
