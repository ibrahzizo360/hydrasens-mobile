import { Image, Platform, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { height } from "@/utils";
import { CustomBottomSheet } from "./customSheet";

export default function Forum() {
  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? height * 0.05 : 0 }}>
      <View className="flex flex-row justify-center items-center">
        <Image
          source={require("../../assets/images/app-logo.png")}
          className="h-[30px] w-[146px]"
        />
      </View>
      <View className="mt-10">
        <Text className="font-bold text-center text-xl mb-4">Forum Discussion</Text>
        <Image
          source={require("../../assets/images/discussion.png")}
          className="mx-auto h-[270px] w-[368px]"
        />
      </View>
      <Text className="text-center w-11/12 font-medium text-[13px] mx-auto mt-6">This is your space to connect, discuss, and collaborate with others who are passionate about improving water and sanitation across Africa.</Text>
      <Text className="mt-4 text-orange-400 font-bold text-center">Available in the Beta Version</Text>
      <CustomBottomSheet />
    </SafeAreaView>
  );
}
