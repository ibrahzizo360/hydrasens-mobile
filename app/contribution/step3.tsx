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

interface Rating {
  rate: string;
  color: string;
}

export default function Step3() {
  const { width } = Dimensions.get("window");

  // Define the types for state
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [rating, setRating] = useState<string>("");
  const [comment, setComment] = useState<string>(""); // Added state for comment

  const ratings: Rating[] = [
    { rate: "1", color: "#FF4C4C" },
    { rate: "2", color: "#FF8C42" },
    { rate: "3", color: "#FFD700" },
    { rate: "4", color: "#9ACD32" },
    { rate: "5", color: "#4CAF50" },
  ];

  // Rating selection logic
  const selectRating = (rate: string) => {
    setRating(rate);
  };

  const Stepper: React.FC = () => {
    return (
      <View
        className="flex flex-row justify-between items-center mt-4"
        style={{
          width: width * 0.5,
        }}
      >
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
        <Text className="text-xl font-semibold">Sentiment & Perception</Text>
      </View>

      <Stepper />

      <Image
          source={require("../../assets/images/sentiment.png")}
          className="mx-auto h-[168px] w-[168px] mt-6"
        />

      <Text className="font-bold text-center text-xl mb-4 mt-6 w-11/12">
        How do you feel about the water quality?
      </Text>

      <Text className="text-xs text-center">
        Rate your mood based on how you perceive the water quality.
      </Text>

      <View className="flex flex-row justify-center mt-4">
        {ratings.map(({ rate, color }) => (
          <Pressable
            key={rate}
            onPress={() => selectRating(rate)}
            className={`rounded-lg py-1 px-4 mx-2 ${
              rating === rate ? "border-2 border-[#0258D3]" : ""
            }`}
            style={{ backgroundColor: color }}
          >
            <Text className="text-white text-lg">{rate}</Text>
          </Pressable>
        ))}
      </View>
      <View className="flex flex-row justify-between w-[70%] mt-1 mx-auto">
            <Text className="text-xs">Poor</Text>
            <Text className="text-xs">Excellent</Text>
        </View>

      <Text className="text-center mt-10 mx-4 text-xs">
        What do you think is causing the pollution, and how is the water quality
        affecting the local community? Suggest any possible solutions to help
        improve the situation.
      </Text>

      <TextInput
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
        className="border-gray-300 bg-[#c7dcfc] h-[100px] rounded-lg p-2 w-11/12 mx-auto mb-4 mt-4"
        multiline={true}
      />

      <View className="absolute bottom-7 w-full">
        <CustomButton
          title="Next"
          onPress={() =>
            setCurrentStep((prevStep) => Math.min(prevStep + 1, 4)) // Logic to go to the next step
          }
          textStyle={{ fontSize: 18 }}
          className="mx-3 mt-7"
        />
      </View>
    </SafeAreaView>
  );
}
