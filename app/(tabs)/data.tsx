import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Define components for each screen
function Sensors() {
  return (
    <SafeAreaView>
      <Text>Sensors Page</Text>
    </SafeAreaView>
  );
}

function Dashboard() {
  return (
    <SafeAreaView>
      <Text>Dashboard Page</Text>
    </SafeAreaView>
  );
}

function Contribution() {
  return (
    <SafeAreaView>
      <Text>Contribution Page</Text>
    </SafeAreaView>
  );
}

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export default function Data() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            bottom: 70,   // Move tab to the top         // Align tab to the top of the screen
            marginBottom: 0, // Adjust margin to ensure the tabs are at the top
          },
        }}
      >
        <Tab.Screen name="Sensors" component={Sensors} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Contribution" component={Contribution} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
