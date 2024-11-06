import { Image, Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from 'expo-router';

export default function Contribution() {
  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? 28 : 0 }}>
      <View className="flex flex-row justify-center items-center">
        <Pressable onPress={()=>router.back()} className="rounded-lg p-2 bg-[#0258D3] flex  absolute left-4">
        <View>
          <Feather name="chevron-left" size={24} color="white" />
        </View>
        </Pressable>
        <Image
          source={require("../../assets/images/app-logo.png")}
          className="h-[30px] w-[146px]"
        />
      </View>
      <View className="mt-10">
        <Text className="font-semibold text-center text-xl mb-4">Your Voice Matters</Text>
        <Image
          source={require("../../assets/images/begin.png")}
          className="mx-auto h-[250px] w-[350px]"
        />
      </View>
      <Text className="text-center w-11/12 text-[17px] font-medium italic mx-auto mt-6">Share your thoughts local water resources to help improve water and sanitation conditions in Africa.</Text>
      <View className="bottom-7 absolute w-full">
        <Text className="text-center font-medium text-xs mx-3">*This should take you <Text className="text-blue-600">less that 3 minutes</Text> to complete.
        Ensure that you give us every accurate feedback with picture(s) or video(s) to help us support your report.</Text>
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
