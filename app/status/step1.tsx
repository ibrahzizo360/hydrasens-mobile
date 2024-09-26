import { Image, Pressable, SafeAreaView, Text, View, TextInput, Dimensions } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";

export default function Step1() {
    const { width } = Dimensions.get("window");
  const [currentStep, setCurrentStep] = useState(2); 
  const [phase, setPhase] = useState<string>("");
  const phases: string[] = [
    "Planning",
    "Construction",
    "Testing",
    "Other",
  ];
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
        <Text className="text-xl font-semibold">Incomplete Projects Details</Text>
      </View>

      <Stepper />

      <View className="mt-8">
        <Text className="font-bold text-center text-xl mb-0">
            Why is the project incomplete?
        </Text>
        <Text className="font-semibold text-gray-500 text-center text-sm mb-4">(e.g., funding issues, delays)</Text>
        <TextInput
        placeholder="Type here"
        className="border-gray-300 bg-[#c7dcfc] h-[100px] rounded-lg p-2 w-11/12 mx-auto mb-4 mt-4"
        multiline={true}
      />

<Text className="font-bold text-center text-xl mx-3 mb-4 mt-10">
            What’s the current status of the project?
        </Text>

        <View className="flex flex-row flex-wrap py-2 justify-evenly items-center w-11/12 mx-auto">
            {phases.map((item) => (
              <Pressable
                key={item}
                onPress={() => setPhase(item)}  // Set the clicked status
                className={`rounded-lg p-2 w-[45%] mx-1 my-1 ${
                  phase === item ? "bg-[#FFD700]" : "bg-white"
                }`}
              >
                <Text
                  className={`text-center text-[11px] font-bold ${
                    phase === item ? "text-white" : "text-blue-500"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text className="font-bold text-center text-xl mx-3 mb-4 mt-10">
          Estimated completion date <Text className="text-sm text-gray-600">(if available)</Text> 
        </Text>
        <TextInput
          placeholder="DD/MM/YYYY"
          className="border-gray-300 bg-[#c7dcfc] rounded-lg p-3 w-11/12 mx-auto mb-4"
        />
      </View>

      <View className="bottom-7 absolute w-full">
        <CustomButton
          title="Submit"
          onPress={() => router.push("/status/step2")}
          textStyle={{ fontSize: 18 }}
          className="mx-3 mt-7"
        />
      </View>
    </SafeAreaView>
  );
}
