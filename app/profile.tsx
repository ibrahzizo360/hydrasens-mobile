import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from 'expo-router';

export default function Profile() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center items-center">
        <Pressable onPress={()=>router.back()} className="rounded-lg p-2 bg-[#0258D3] flex  absolute left-4">
        <View>
          <Feather name="chevron-left" size={24} color="white" />
        </View>
        </Pressable>
        <Text className="text-xl font-semibold">Notifications & Settings</Text>
      </View>

      <View className="flex flex-row gap-2 py-1 items-center">
          <Pressable onPress={()=> router.push('/profile')}>
          <Image source={require("../assets/images/avatar.png")} />
          </Pressable>

          <View className="flex-col pt-1">
            <Text className="text-xs text-gray-600">Good morning,</Text>
            <Text className="text-sm">Ohene-Agyekum</Text>
          </View>
        </View>

      <View className="bottom-7 absolute">
        <CustomButton
                  title="Next"
                  onPress={() => router.push('/contribution/step1')}
                  textStyle={{ fontSize: 18 }}
                  className="mx-3 mt-7"
                />
      </View>
    </SafeAreaView>
  );
}
