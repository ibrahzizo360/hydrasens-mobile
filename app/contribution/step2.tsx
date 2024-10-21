import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";

export default function Step2() {
  const { width } = Dimensions.get("window");

  // Define the types for state
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [waterResource, setWaterResource] = useState<string>(""); // Single selection
  const [primaryUse, setPrimaryUse] = useState<string[]>([]); // Multiple selections

  const waterResources: string[] = [
    "River",
    "Well/Borehole",
    "Lake",
    "Pond",
    "Dam/Reservoir",
    "Lagoon",
    "Spring",
    "Other",
  ];

  const primaryUses: string[] = [
    "Drinking",
    "Irrigation",
    "Livestock",
    "Hydropower",
    "Recreation",
    "Industrial",
    "Mining",
    "Other",
  ];

  // Function to toggle primary use for multiple selection
  const togglePrimaryUse = (use: string): void => {
    if (primaryUse.includes(use)) {
      setPrimaryUse(primaryUse.filter((item) => item !== use));
    } else {
      setPrimaryUse([...primaryUse, use]);
    }
  };

  const Stepper: React.FC = () => {
    return (
      <View
        className="flex flex-row justify-between items-center mt-4"
        style={{
          width: width * 0.5,
        }}
      >
        {[1, 2, 3, 4,5,6].map((step, index) => (
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
        <Text className="text-xl font-semibold">Water Resource Details</Text>
      </View>

      <Stepper />

      <View className="bg-[#E4EDFB] py-2">
        <Text className="px-4 text-[10px] text-center">
          Choose the category that best describes the water resource you are
          reporting on (e.g., river, lake, well, pond, etc.) and indicate the
          main purpose(s) for which this water resource is used by the local
          community/company (e.g., drinking, irrigation, livestock,
          hydropower, etc.).
        </Text>
      </View>

      <Text className="font-bold text-center text-xl mb-4 mt-20">
        Select the type of water resource
      </Text>

      <View
        className="mx-auto bg-[#E4EDFB] rounded-md"
      >
        <View className="flex flex-row flex-wrap py-2 justify-evenly items-center w-11/12 mx-2 rounded-lg">
          {waterResources.map((resource: string) => (
            <Pressable
              key={resource}
              onPress={() => setWaterResource(resource)}
              className={`bg-white rounded-lg p-2 w-1/4 mx-1 my-1 ${
                waterResource === resource ? "bg-[#0258D3]" : ""
              }`}
            >
              <Text
                className={`text-center text-[9px] font-bold text-blue-500 ${
                  waterResource === resource ? "text-white" : ""
                }`}
              >
                {resource}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text className="font-bold text-center text-xl mb-4 mt-20">
        Select the primary use of this water resource
      </Text>

      <View
        className="mx-auto bg-[#E4EDFB] rounded-lg"
      >
        <View className="flex flex-row flex-wrap py-2 justify-evenly items-center w-11/12 mx-2 rounded-lg">
          {primaryUses.map((use: string) => (
            <Pressable
              key={use}
              onPress={() => togglePrimaryUse(use)}
              className={`bg-white rounded-lg p-2 w-1/4 mx-1 my-1 ${
                primaryUse.includes(use) ? "bg-[#0258D3]" : ""
              }`}
            >
              <Text
                className={`text-center text-[9px] font-bold text-blue-500 ${
                  primaryUse.includes(use) ? "text-white" : ""
                }`}
              >
                {use}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="absolute bottom-7 w-full">
        <CustomButton
          title="Next"
          onPress={() =>
            // setCurrentStep((prevStep) => Math.min(prevStep + 1, 4))// Logic to go to the next step
            router.push('/contribution/step3')
          }
          textStyle={{ fontSize: 18 }}
          className="mx-3 mt-7"
        />
      </View>
    </SafeAreaView>
  );
}
