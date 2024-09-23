import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';

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
    case 'profile':
      imagePath = focused
        ? require('../../assets/images/offers.png')
        : require('../../assets/images/offers-light.png');
      break;
  }

  return <Image source={imagePath} style={styles.icon} />;
};

export default function TabLayout() {
  return (
    <View style={styles.tabContainer}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            title: 'Forum',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="data"
          options={{
            title: 'Data',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="offera"
          options={{
            title: 'Offers',
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 30,
    left: '15%',
    right: '15%',
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: -30,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
