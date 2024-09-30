import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";

export default function ContributionPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
         <View className="flex flex-row justify-center items-center">
        <Text className="text-xl font-semibold">My Contributions</Text>
      </View>
      <View className="mt-20">
        <Image
          source={require("../../assets/images/contribution.png")}
          className="mx-auto h-[200px] w-[328px]"
        />
      </View>
      <Text className="text-center w-11/12 font-medium text-[13px] mx-auto mt-6">Make your first contribution or report to take a meaningful step toward improving global water and sanitation.</Text>
      <Text className="text-center w-11/12 font-medium text-[13px] mx-auto mt-6">Stay updated, view real-time insights, and join the conversation to help make a meaningful difference.</Text>
    </SafeAreaView>
  );
}
