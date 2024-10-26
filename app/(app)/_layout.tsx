import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from '.';
import Forum from './forum';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, Redirect } from 'expo-router';
import Offers from './offers';
import Data from './data';
import useAuthStore from '@/hooks/useAuthStore';
import { CustomBottomSheet } from './customSheet';

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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { isAuthenticated, onBoardingCompleted } = useAuthStore();

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

  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setIsSheetVisible((prev) => !prev);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent>
        <CurvedBottomBarExpo.Navigator
          type="DOWN"
          shadowStyle={styles.shawdow}
          circleWidth={53}
          bgColor="white"
          initialRouteName="home"
          borderTopLeftRight
          renderCircle={({ selectedTab, navigate }) => (
            <Animated.View style={styles.btnCircleUp}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleBottomSheet}
              >
                <Image
                  source={
                    isSheetOpen
                      ? require('../../assets/images/close.png')
                      : require('../../assets/images/plus.png')
                  }
                  style={styles.circleIcon}
                />
              </TouchableOpacity>
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

        <CustomBottomSheet
        isVisible={isSheetVisible}
        toggleVisibility={setIsSheetVisible}
      />
      </NavigationContainer>
    </GestureHandlerRootView>
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
    backgroundColor: 'blue',
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    display: 'flex',
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
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
    width: 28,
    height: 28,
  },
  tabLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    fontWeight: 'semibold',
    color: '#333',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
    elevation: 5,
  },
});
