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
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, Redirect } from 'expo-router';
import Offers from './offers';
import Data from './data';
import useAuthStore from '@/hooks/useAuthStore';

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
  const bottomSheetRef = useRef<BottomSheet>(null);
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

  const toggleBottomSheet = () => {
    if (isSheetOpen) {
      bottomSheetRef.current?.close(); // Close the sheet
    } else {
      bottomSheetRef.current?.expand(); // Open the sheet
    }
    setIsSheetOpen(!isSheetOpen); // Toggle the state
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent>
        <CurvedBottomBarExpo.Navigator
          type="DOWN"
          shadowStyle={styles.shawdow}
          height={65}
          circleWidth={51}
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
          style={{ width: '100%', alignSelf: 'center', marginBottom: 0 }}
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

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['78%']}
          enablePanDownToClose
          onClose={() => setIsSheetOpen(false)}
          style={styles.bottomSheet}
          animateOnMount={false}
        >
          <BottomSheetView style={styles.sheetContent}>
            <Text className='text-center'>How would you like to contribute to clean water and sanitation in your community?</Text>
            <Image source={require('../../assets/images/home-drop.png')} className='h-[211px] w-[283px]' />
            <View className='flex flex-row justify-between w-full mt-6'>
              <Pressable onPress={()=>router.push('/status')}>
              <Image source={require('../../assets/images/tab-card-1.png')} className='h-[91px] w-[168px]' />
              </Pressable>
              <Pressable onPress={()=>router.push('/contribution/start')}>
              <Image source={require('../../assets/images/tab-card-2.png')} className='h-[91px] w-[168px]' />
              </Pressable>
            </View>
            <View className='flex flex-row justify-between w-full mt-6'>
              <Pressable onPress={()=>console.log("")}>
              <Image source={require('../../assets/images/tab-card-3.png')} className='h-[91px] w-[168px]' />
              </Pressable>
              <Pressable onPress={()=>console.log("")}>
              <Image source={require('../../assets/images/tab-card-4.png')} className='h-[91px] w-[168px]' />
              </Pressable>
            </View>
            <View className='flex flex-row justify-evenly gap-6 mt-6'>
              <View className='flex items-center justify-center'>
                <Image source={require('../../assets/images/home-icon.png')} className='h-[24px] w-[24px]' />
                <Text className='font-bold mt-0.5'>Home</Text>
              </View>
              <View className='flex items-center justify-center'>
                <Image source={require('../../assets/images/forum.png')} className='h-[24px] w-[24px]' />
                <Text className='font-bold mt-0.5'>Forum</Text>
              </View>
              <View className='flex items-center justify-center mb-8'>
                <Pressable onPress={()=>bottomSheetRef.current?.close()}>
                <Image source={require('../../assets/images/close-circle.png')} className='h-[60px] w-[60px]' />
                </Pressable>
              </View>
              <View className='flex items-center justify-center'>
                <Image source={require('../../assets/images/data.png')} className='h-[24px] w-[24px]' />
                <Text className='font-bold mt-0.5'>Data</Text>
              </View>
              <View className='flex items-center justify-center'>
                <Image source={require('../../assets/images/offers.png')} className='h-[24px] w-[24px]' />
                <Text className='font-bold mt-0.5'>Offers</Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
  bottomBar: {
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
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
  sheetContent: {
    alignItems: 'center',
    padding: 20,
  },
  tabLabel: {
    fontSize: 12, // Adjust font size as needed
    textAlign: 'center',
    marginTop: 2, // Space between icon and label
    fontWeight: 'semibold',
    color: '#333', // Default color
  },
  bottomSheet: {
    height: 'auto',
  },
   bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: '50%', // Center horizontally
    transform: [{ translateX: -150 }], // Half of the desired width to center
    width: '80%', // Adjust the width as needed
    alignItems: 'center', // Center contents
  },
});
