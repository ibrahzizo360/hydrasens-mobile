import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import ConfettiCannon from 'react-native-confetti-cannon';

export default function Step2() {
  const { width } = Dimensions.get("window");

  // Define the types for state
  const [currentStep, setCurrentStep] = useState<number>(2);

  const Stepper: React.FC = () => {
    return (
      <View
        className="flex flex-row justify-between items-center mt-4"
        style={{
          width: width * 0.25,
        }}
      >
        {[1, 2, 3, 4].map((step, index) => (
          <View key={step} className="flex flex-row items-center">
            <View
              className={`h-1 w-1 ${
                currentStep >= step ? "bg-[#0258D3]" : "bg-gray-300"
              }`}
            />
            {index < 3 && (
              <View
                className={`flex-grow h-1 ${
                  currentStep > step ? "bg-[#0258D3]" : "bg-gray-300"
                }`}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FD]">
      <View className="flex flex-row justify-center items-center">
        <Text className="text-xl font-semibold">Successful</Text>
      </View>

      {/* <Stepper /> */}

    <View className="mx-auto rounded-2xl w-11/12 bg-white p-4 mt-24">
    <Image
          source={require("../../assets/images/status-done.png")}
          className="mx-auto h-[168px] w-[168px] mt-6"
        />
        <Text className="text-center font-semibold mt-3 text-xl">Project status uploaded</Text>

        <Text className="text-center font-medium text-[12px] mt-2">Thank you for helping to revitalize water projects across Africa!</Text>

        <Text className="font-medium text-[14px] text-center mt-8">Tap below to explore more ways you can make an impact!</Text>
        
        <View className="rounded-xl bg-[#D4E5FF] mt-3">
            <Text className="text-center font-bold text-blue-600 py-3">Add another report </Text>
        </View>
    </View>


      <View className="absolute bottom-7 w-full">
        <CustomButton
          title="Back To Home"
          onPress={() =>
            router.push("/")
          }
          textStyle={{ fontSize: 18 }}
          className="mx-3 mt-7"
        />
      </View>
      <ConfettiCannon count={200} origin={{x: 0, y: 0}} />
    </SafeAreaView>
  );
}
