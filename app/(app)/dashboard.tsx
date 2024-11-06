import { Image, Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";

export default function DashboardPage() {
  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? 28 : 0 }}>
         <View className="flex flex-row justify-center items-center">
        <Text className="text-xl font-semibold">Dashboard</Text>
      </View>
      <View className="mt-10">
        <Text className="font-bold text-center text-xl mb-4">Gifts and Offers</Text>
        <Image
          source={require("../../assets/images/dashboard.png")}
          className="mx-auto h-[270px] w-[368px]"
        />
      </View>
      <Text className="text-center w-11/12 font-medium text-[13px] mx-auto mt-6">This is your space to explore, monitor, and interact with essential water and sanitation data across Africa.

Stay updated, view real-time insights, and join the conversation to help make a meaningful difference.</Text>
      <Text className="mt-4 text-orange-400 font-bold text-center">Available in the Beta Version</Text>
    </SafeAreaView>
  );
}
