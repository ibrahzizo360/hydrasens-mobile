import React, { useEffect } from 'react';
import { Image, Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from 'expo-router';
import { AntDesign, FontAwesome, Foundation, MaterialIcons } from "@expo/vector-icons";
import { height } from "@/utils";
import useNotificationStore from '@/hooks/useNotification';

export default function Notifications() {
  const { notifications, fetchNotifications, loading } = useNotificationStore();

  // Fetch notifications when the component is mounted
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Function to determine the background color based on the notification type
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-200'; // Urgent notifications (red)
      case 'warning':
        return 'bg-yellow-100'; // Warning notifications (yellow)
      default:
        return 'bg-gray-200'; // Default color for other notifications
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? height * 0.05 : 0 }}>
      <View className="flex flex-row justify-center items-center">
        <Pressable onPress={() => router.back()} className="rounded-lg p-2 bg-[#0258D3] flex absolute left-4">
          <View>
            <Feather name="chevron-left" size={24} color="white" />
          </View>
        </Pressable>
        <Text className="text-xl font-semibold">Notifications</Text>
        <View className="bg-red-500 ml-4 px-2.5 py-1.5 rounded-full">
          <Text className="text-white font-bold">{notifications.length}</Text>
        </View>
      </View>
      
      <View className="h-[1px] mt-7 mx-auto w-[90%] bg-gray-500" />

      <View className="mt-10 space-y-5">
        {loading ? (
          <Text>Loading notifications...</Text>
        ) : (
          notifications.map((notification) => (
            <View
              key={notification._id}
              className={`flex flex-row px-0 pb-2 gap-3 w-[94%] mx-auto rounded-lg items-center ${getNotificationColor(notification.type)}`}
            >
              <View className="flex items-center justify-center px-2 py-1.5 rounded-full">
                <Foundation name="alert" size={20} color={notification.type === 'urgent' ? 'red' : 'orange'} />
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

      <View className="bottom-7 absolute w-full">
        <CustomButton
          title="Back To Home"
          onPress={() => router.push('/(app)/')}
          textStyle={{ fontSize: 18 }}
          className="mx-3 mt-4"
        />
      </View>
    </SafeAreaView>
  );
}
