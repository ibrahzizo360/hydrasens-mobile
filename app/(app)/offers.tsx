import { Image, Platform, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";

export default function Offers() {
  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? 28 : 0 }}>
      <View className="flex flex-row justify-center items-center">
        <Image
          source={require("../../assets/images/app-logo.png")}
          className="h-[30px] w-[146px]"
        />
      </View>
      <View className="mt-10">
        <Text className="font-bold text-center text-xl mb-4">Gifts and Offers</Text>
        <Image
          source={require("../../assets/images/gifts.png")}
          className="mx-auto h-[270px] w-[368px]"
        />
      </View>
      <Text className="text-center w-11/12 font-medium text-[13px] mx-auto mt-6">Earn exclusive rewards for your contributions! Participate in water and sanitation activities, gather data, and collect HydraCoins. Redeem your coins for exclusive benefits, discounts, and event access.</Text>
      <Text className="mt-4 text-orange-400 font-bold text-center">Available in the Beta Version</Text>
    </SafeAreaView>
  );
}
