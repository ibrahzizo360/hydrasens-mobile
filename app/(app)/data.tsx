import React from 'react';
import { SafeAreaView, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SensorsPage from './sensors';
import DashboardPage from './dashboard';
import ContributionPage from './contribution';

// Define components for each screen
function Sensors() {
  return <SensorsPage />;
}

function Dashboard() {
  return <DashboardPage />;
}

function Contribution() {
  return <ContributionPage />;
}

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export default function Data() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            top: Platform.OS === 'ios' ? 110 : 90, // Adjust top position for Android
            marginBottom: 0,
            borderRadius: 20, // Rounded edges for tab bar
            height: 33,
            paddingHorizontal: 10, // Padding for spacing
            borderTopWidth: 0, // Remove the top border of the tab bar
            elevation: 0, // Remove shadow
            backgroundColor: 'transparent', // Set background color to transparent for tab bar
          },
          tabBarItemStyle: {
            borderRadius: 10, // Rounded edges for each tab
            marginHorizontal: 5, // Spacing between tabs
            backgroundColor: '#0258D3', // Blue background for each tab
            justifyContent: 'center', // Center the labels
            alignItems: 'center',
          },
          tabBarLabelStyle: {
            fontSize: 14, // Adjust font size as necessary
            position: 'absolute', // Ensure label is centered
            top: '50%',
            transform: [{ translateY: -9 }], // Adjust vertical positioning of label
          },
          tabBarActiveTintColor: '#ffffff', // White color when tab is active
          tabBarInactiveTintColor: '#d3d3d3', // Light gray color for inactive tabs
          tabBarShowLabel: true,
          tabBarIcon: () => null, // Remove the icon explicitly
        }}
      >
        <Tab.Screen name="Sensors" component={Sensors} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Contribution" component={Contribution} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
