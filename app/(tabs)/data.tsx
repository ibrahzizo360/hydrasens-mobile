import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SensorsPage from './sensors';
import DashboardPage from './dashboard';
import ContributionPage from './contribution';

// Define components for each screen
function Sensors() {
  return (
   <SensorsPage />
  );
}

function Dashboard() {
  return (
    <DashboardPage />
  );
}

function Contribution() {
  return (
    <ContributionPage />
  );
}

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export default function Data() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            top: 110,  // Position the tabs higher
            marginBottom: 0,
            borderRadius: 20,  // Rounded edges for tab bar
            paddingHorizontal: 10,  // Padding for spacing
            height: 60,  // Adjust height
            borderTopWidth: 0,  // Remove the top border of the tab bar
          },
          tabBarItemStyle: {
            borderRadius: 10,  // Rounded edges for each tab
            marginHorizontal: 5, // Spacing between tabs
            backgroundColor: '#f0f0f0', // Background for each tab
            justifyContent: 'center',  // Center the labels
            alignItems: 'center',
          },
          tabBarLabelStyle: {
            fontSize: 14,  // Adjust font size as necessary
            position: 'absolute',  // Ensure label is centered
            top: '50%',
            transform: [{ translateY: -8 }],  // Adjust vertical positioning of label
          },
          tabBarActiveTintColor: '#0258D3',  // Color when tab is active
          tabBarInactiveTintColor: '#808080',  // Color for inactive tabs
          tabBarShowLabel: true, 
          tabBarIcon: () => null,  // Remove the icon explicitly
        }}
      >
        <Tab.Screen name="Sensors" component={Sensors} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Contribution" component={Contribution} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
