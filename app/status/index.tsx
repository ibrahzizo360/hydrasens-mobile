import { Image, Pressable, SafeAreaView, Text, View, TextInput, Dimensions } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";

export default function Status() {
    const { width } = Dimensions.get("window");
  const [currentStep, setCurrentStep] = useState(2); // To track the current step

  const Stepper = () => {
    return (
      <View className="flex flex-row justify-between items-center mt-4 mb-8" style={{
        width: width * 0.5
      }}>
        {[1, 2, 3, 4].map((step, index) => (
          <View key={step} className="flex flex-row items-center">
            <View
              className={`h-1 w-1 ${
                currentStep >= step ? "bg-[#0258D3]" : "bg-gray-300"
              }`}
            />
            {index < 2 && (
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
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center items-center">
        <Pressable
          onPress={() => router.back()}
          className="rounded-lg p-2 bg-[#0258D3] flex absolute left-4"
        >
          <View>
            <Feather name="chevron-left" size={24} color="white" />
          </View>
        </Pressable>
        <Text className="text-xl font-semibold">Project Overview</Text>
      </View>

      <Stepper />

      <View className="mt-10">
        <Image
          source={require("../../assets/images/globe.png")}
          className="mx-auto h-[148px] w-[138px]"
        />
        <Text className="font-bold text-center text-xl mb-4 mt-20">
            Who is the sponsoring organisation? (optional)
        </Text>
        <TextInput
          placeholder="Name"
          className="border-gray-300 bg-[#c7dcfc] rounded-lg p-2 w-11/12 mx-auto mb-0"
        />
        <TextInput
          placeholder="Website"
          className="border-gray-300 bg-[#c7dcfc] rounded-lg p-2 w-11/12 mx-auto mb-4"
        />

        <Text className="font-bold text-center text-xl mb-4 mt-10">
            What’s the current status of the project?
        </Text>

        <Text className="font-bold text-center text-xl mb-4 mt-10">
            Where is the project located?
        </Text>
        <TextInput
          placeholder="Location"
          className="border-gray-300 bg-[#c7dcfc] rounded-lg p-2 w-11/12 mx-auto mb-4"
        />
      </View>

      <View className="bottom-7 absolute w-full">
        <CustomButton
          title="Next"
          onPress={() => router.push("/contribution/step2")}
          textStyle={{ fontSize: 18 }}
          className="mx-3 mt-7"
        />
      </View>
    </SafeAreaView>
  );
}
