import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from 'expo-router';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function SensorsPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-center items-center">
        <Pressable onPress={()=>router.back()} className="rounded-lg p-2 bg-[#0258D3] flex  absolute left-4">
        <View>
          <Feather name="chevron-left" size={24} color="white" />
        </View>
        </Pressable>
        <Text  className="text-xl font-semibold">Water Quality Monitor</Text>
      </View>
      <View className="mt-20 mb-10 mx-auto">
      <CircularProgress
        value={58}
        radius={120}
        inActiveStrokeOpacity={0.5}
        activeStrokeWidth={15}
        inActiveStrokeWidth={20}
        progressValueStyle={{ fontWeight: '100', color: 'white' }}
        activeStrokeSecondaryColor="yellow"
        inActiveStrokeColor="black"
        duration={5000}
        dashedStrokeConfig={{
            count: 50,
            width: 4,
        }}
        />
        </View>
        <View className="gap-2 justify-center flex flex-row">
            <View className="rounded-xl bg-green-400 h-[200px] w-[180px] p-3">
                <Image  source={require("../../assets/images/temp.png")}
                className="h-[40px] w-[40px] mb-20" />
                <Text className="text-left text-xl font-semibold">Temperature</Text>
                <Text className="text-left text-[14px] font-bold text-xl">13°C</Text>
            </View>
            <View className="rounded-xl bg-green-400 h-[200px] w-[180px] p-3">
                <Image  source={require("../../assets/images/turb.png")}
                className="h-[40px] w-[40px] mb-20" />
                <Text className="text-left text-xl font-semibold">Turbidity</Text>
                <Text className="text-left text-[14px] font-bold text-xl">13°C</Text>
            </View>
        </View>
    </SafeAreaView>
  );
}
