import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AntDesign, FontAwesome, Foundation, MaterialIcons } from "@expo/vector-icons";

export default function Notifications() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center items-center">
        <Pressable onPress={()=>router.back()} className="rounded-lg p-2 bg-[#0258D3] flex  absolute left-4">
        <View>
          <Feather name="chevron-left" size={24} color="white" />
        </View>
        </Pressable>
        <Text className="text-xl font-semibold">Notifications</Text>
        <View className="bg-red-500 ml-4 px-2.5 py-1.5 rounded-full">
            <Text className="text-white font-bold">1</Text>
          </View>
      </View>
      
      <View className="h-[1px] mt-7 mx-auto w-[90%] bg-gray-500" />


      <View className="mt-10">
        <View className="flex flex-row px-0 pb-2 gap-3 bg-gray-200 w-[94%] mx-auto rounded-lg items-center">
            <View className="bg-red-200 flex items-center justify-center px-2 py-1.5 rounded-full">
                <Foundation name="alert" size={20} color="red" />
            </View>
            <View className="w-11/12">
                <Text className="font-semibold text-[11px]"><Text className="text-red-600">Urgent Alert:</Text> Critical Water Quality Condition Detected</Text>
                <Text className="font-medium text-[10px] mt-2 w-11/12 text-gray-500">Water quality in your area has reached critical levels. Immediate action may be required for safety and health.</Text>
            </View>
        </View>
      </View>


      <View className="bottom-7 absolute w-full">
        <CustomButton
                  title="Back To Home"
                  onPress={() => router.push('/contribution/step1')}
                  textStyle={{ fontSize: 18 }}
                  className="mx-3 mt-4"
                />
      </View>
    </SafeAreaView>
  );
}
