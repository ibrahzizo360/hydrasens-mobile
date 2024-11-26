import React, { useEffect } from 'react';
import { ActivityIndicator, Image, Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from 'expo-router';
import { AntDesign, FontAwesome, Foundation, MaterialIcons } from "@expo/vector-icons";
import { height } from "@/utils";
import useNotificationStore from '@/hooks/useNotification';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export default function Notifications() {
  const { notifications, fetchNotifications, loading } = useNotificationStore();

  // Fetch notifications when the component is mounted
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Function to determine the background color based on the notification type
  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-[#F5DCDC]';
      case 'warning':
        return 'bg-[#FFF6DA]';
      default:
        return 'bg-transparent';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'alert':
        return '#F5DCDC';
      case 'warning':
        return '#FFC107';
      default:
        return 'transparent';
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? height * 0.05 : 0 }}>
      <View className="flex flex-row justify-center items-center">
        <Pressable onPress={() => router.back()} className="rounded-lg p-2 bg-[#0258D3] flex absolute left-4">
          <View>
            <Feather name="chevron-left" size={24} color="white" />
          </View>
        </Pressable>
        <Text className="text-xl font-semibold">Notifications</Text>
        <View className="bg-red-500 ml-4 justify-center items-center h-6 w-6 rounded-full">
          <Text className="text-white font-bold">{notifications.length}</Text>
        </View>
      </View>
      
      <View className="h-[1px] mt-7 mx-auto w-[90%] bg-gray-500" />
      <ScrollView>
      <View className="mt-10 space-y-5">
        {loading ? (
          <ActivityIndicator />
        ) : (
          notifications.map((notification) => (
            <View
              key={notification._id}
              className={`flex flex-row mb-5 px-4 pb-2 gap-3 w-[94%] h-24 mx-auto rounded-lg items-center ${notification.status === 'read' ? 'bg-white' : 'bg-gray-100'}`}
            >
              <View className={`flex items-center justify-center px-2 py-1.5 rounded-full ${getNotificationBgColor(notification.type)}`}>
                <Foundation name="alert" size={20} color={getNotificationColor(notification.type)} />
              </View>
              <View className="w-11/12">
                <Text className="font-semibold text-[11px]">
                  <Text className={notification.type === 'urgent' ? 'text-red-600' : 'text-yellow-600'}>
                    {notification.type === 'urgent' ? 'Urgent Alert:' : 'Warning:'}
                  </Text>
                  {` ${notification.title}`}
                </Text>
                <Text className="font-medium text-[10px] mt-2 w-11/12 text-gray-500">
                  {notification.description}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}
