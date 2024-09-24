import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './home';
import Forum from './forum';

const Screen1 = () => {
  return <Home />;
};

const Screen2 = () => {
  return <Forum />;
};

const TabIcon = ({ name, focused }: any) => {
  let imagePath;

  switch (name) {
    case 'home':
      imagePath = focused
        ? require('../../assets/images/home-icon.png')
        : require('../../assets/images/home-icon.png');
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
  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        <TabIcon name={routeName} focused={routeName === selectedTab} />
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer independent>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={70}
        circleWidth={60}
        bgColor="white"
        initialRouteName="home"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Click Action')}
            >
              <Image source={require('../../assets/images/plus.png')} style={styles.circleIcon} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
        screenOptions={{ headerShown: false }} // Hides headers
      >
        <CurvedBottomBarExpo.Screen
          name="home"
          component={Screen1}
          position="LEFT"
        />
        <CurvedBottomBarExpo.Screen
          name="forum"
          component={Screen2}
          position="LEFT"
        />
        <CurvedBottomBarExpo.Screen
          name="data"
          component={Screen2}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="offers"
          component={Screen2}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: 'transparent', // Remove shadow
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
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: 'transparent', // Remove shadow
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
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
  screen1: {
    flex: 1,
  },
  screen2: {
    flex: 1,
  },
});
