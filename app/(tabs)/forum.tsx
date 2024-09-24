import { Image, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function Forum() {
  return (
    <SafeAreaView>
      <View className="flex flex-row justify-center items-center">
        <View className="rounded-lg p-2 bg-[#0258D3] flex  absolute left-4">
          <Feather name="chevron-left" size={24} color="white" />
        </View>
        <Image
          source={require("../../assets/images/app-logo.png")}
          className="h-[30px] w-[146px]"
        />
      </View>
    </SafeAreaView>
  );
}
