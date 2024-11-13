import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
  Animated, Easing,
  Pressable, 
} from "react-native";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import ConfettiCannon from 'react-native-confetti-cannon';
import { height } from "@/utils";
import useProjectStatusStore from "@/hooks/projectStatusStore";

export default function Step5() {
  const { width } = Dimensions.get("window");

  const {setBonusActive} = useProjectStatusStore();

  const [currentStep, setCurrentStep] = useState<number>(3);

  const scaleAnim = useRef(new Animated.Value(1)).current; 

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

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.06,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000, 
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FD]" style={{ paddingTop: Platform.OS === 'android' ? height * 0.05  : 0 }}>
      <View className="flex flex-row justify-center items-center">
        <Text className="text-xl font-semibold">Successful</Text>
      </View>

      <Stepper />

      <View className="mx-auto rounded-2xl w-11/12 bg-white p-4 mt-4">
    <Text className="font-bold text-[16px] mb-2">Submission Complete!</Text>
    <Text className="text-[12px] text-sm font-medium">
        You have made your first contribution. You can now join the exclusive HydraSens Club!
    </Text>
    </View>

    <View className="mx-auto rounded-2xl w-11/12 bg-white p-4 mt-4">
    <Image
          source={require("../../assets/images/moon.png")}
          className="mx-auto h-[168px] w-[168px] mt-6"
        />
        <Text className="text-center font-semibold">You earned 15 HydraCoins</Text>

        <Text className="text-center font-medium text-[12px] mt-2">Congratulations on your efforts to saving Africa’s water resources! Thank you! 🌍💧</Text>

        <Animated.Text
      style={{
        fontSize: 14,
        fontWeight: '500',
        color: 'green',
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 10,
        transform: [{ scale: scaleAnim }],
      }}
    >
      Want to earn 3x your coins? Add a water project status now!
    </Animated.Text>
        
      <Pressable onPress={()=>{ setBonusActive(true); router.push('/status')}}>
        <View className="rounded-xl bg-[#D4E5FF] mt-3">
            <Text className="text-center font-bold text-blue-600 py-3">Add Project Status</Text>
        </View>
      </Pressable>


    </View>


      <View className="absolute bottom-7 w-full">
        <CustomButton
          title="Back To Home"
          onPress={() =>
            router.push({
              pathname: '/',
            })
          }
          className="mx-3 mt-7"
        />
      </View>
      <ConfettiCannon count={200} origin={{x: 0, y: 0}} />
    </SafeAreaView>
  );
}
