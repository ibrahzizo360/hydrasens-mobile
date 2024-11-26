import { Image, Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import useAuthStore from "@/hooks/useAuthStore";
import { height } from "@/utils";
import useNotificationStore from "@/hooks/useNotification";
import { useEffect } from "react";

export default function Profile() {
  const {user, logout} = useAuthStore();
  const { notifications, fetchNotifications, loading } = useNotificationStore();

  // Fetch notifications when the component is mounted
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? height * 0.05  : 0 }}>
      <View className="flex flex-row justify-center items-center">
        <Pressable onPress={()=>router.back()} className="rounded-lg p-2 bg-[#0258D3] flex  absolute left-4">
        <View>
          <Feather name="chevron-left" size={24} color="white" />
        </View>
        </Pressable>
        <Text className="text-xl font-semibold">Notifications & Settings</Text>
      </View>

      <View className="flex flex-row gap-2 py-1 items-center mx-6 mt-10">
          <Pressable onPress={()=> router.push('/profile')}>
          <Image source={{ uri: user?.profile }} className="h-11 w-11" />
          </Pressable>

          <View className="flex-col pt-1">
            <Text className="text-md">{user?.name || user?.username}</Text>
            <Text className="text-sn text-gray-600">{user?.email}</Text>
          </View>
        </View>

      <Text className="text-gray-600 mt-8 ml-6">Account</Text>

      <View className="ml-10 mt-4">
        <View className="flex flex-row gap-4 items-center mb-5">
          <FontAwesome5 name="user-circle" size={28} color="#11458E" />
          <Text className="text-[#11458E] text-[16px]">Personal Settings</Text>
        </View>
        <Pressable className="flex flex-row items-center mb-5" onPress={()=>router.push('/notifications')}>
        <View className="flex flex-row gap-4 items-center -mt-1">
        <MaterialCommunityIcons name="bell-outline" size={28} color="#11458E" />
          <Text className="text-[#11458E] text-[16px]">Notifications</Text>
          <View className="bg-red-500 px-[7px] py-0.5 rounded-full">
            <Text className="text-white font-bold">{notifications.length}</Text>
          </View>
        </View>
        </Pressable>
        <View className="flex flex-row gap-4 items-center mb-7">
        <FontAwesome name="language" size={28} color="#11458E" />
          <Text className="text-[#11458E] text-[16px]">Languages</Text>
        </View>
        <View className="h-[1px] mb-5 w-[90%] bg-gray-500" />
        <View className="flex flex-row gap-4 items-center mb-5">
          <Ionicons name="shield-checkmark-outline" size={24} color="#11458E" />
          <Text className="text-[#11458E] text-[16px]">Privacy Notice</Text>
        </View>
        <View className="flex flex-row gap-4 items-center mb-5">
        <MaterialCommunityIcons name="file-document-multiple-outline" size={28} color="#11458E" />
          <Text className="text-[#11458E] text-[16px]">Terms and Conditions</Text>
        </View>
        <View className="flex flex-row gap-4 items-center mb-5">
        <MaterialCommunityIcons name="folder-check-outline" size={28} color="#11458E" />
          <Text className="text-[#11458E] text-[16px]">Data Security</Text>
        </View>
        <View className="flex flex-row gap-4 items-center mb-5">
        <AntDesign name="questioncircleo" size={24} color="#11458E" />
          <Text className="text-[#11458E] text-[16px]">FAQ</Text>
        </View>
      </View>

      <View className="bottom-7 absolute w-full">
      <CustomButton
                  title="Log Out"
                  onPress={() => {logout(); router.push('/sign-in')}}
                  textStyle={{ color: '#E3290F' }}
                  className="mx-3 mt-7"
                  style={{backgroundColor: '#ffcbc5'}}
                />
        <CustomButton
                  title="Back To Home"
                  onPress={() => router.push('/')}
                  className="mx-3 mt-4"
                />
      </View>
    </SafeAreaView>
  );
}
