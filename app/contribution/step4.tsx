import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Step4() {
  const { width } = Dimensions.get("window");

  const [currentStep, setCurrentStep] = useState<number>(5);
  const [editingField, setEditingField] = useState<string | null>(null); // Track which field is being edited
  const [values, setValues] = useState({
    pH: "",
    turbidity: "",
    temperature: "",
  });

  const handleFieldChange = (field: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleTapOutside = () => {
    setEditingField(null); // Exit edit mode when tapped outside
    Keyboard.dismiss();
  };

  const Stepper: React.FC = () => {
    return (
      <View
        className="flex flex-row justify-between items-center mt-4"
        style={{
          width: width * 0.25,
        }}
      >
        {[1, 2, 3, 4].map((step) => (
          <View key={step} className="flex flex-row items-center">
            <View
              className={`h-1 w-1 ${
                currentStep >= step ? "bg-[#0258D3]" : "bg-gray-300"
              }`}
            />
            {step < 5 && (
              <View
                className={`flex-grow h-1 ${
                  currentStep > step ? "bg-[#0258D3]" : "bg-gray-300"
                }`}
              />
            )}
            <View className="bg-gray-300 w-0.5"/>
          </View>
        ))}
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <SafeAreaView className="flex-1">
        <View className="flex flex-row justify-center items-center">
          <Pressable
            onPress={() => router.back()}
            className="rounded-lg p-2 bg-[#0258D3] flex absolute left-4"
          >
            <Feather name="chevron-left" size={24} color="white" />
          </Pressable>
          <Text className="text-xl font-semibold">Evidence & Verification</Text>
        </View>

        <Stepper />

        <Image
          source={require("../../assets/images/gallery.png")}
          className="mx-auto h-[168px] w-[168px] mt-8"
        />

        <Text className="font-bold text-center text-xl mb-4 mt-6 w-11/12 mx-auto">
          Upload chemical test results to assess water quality (optional)
        </Text>

        <View className="flex flex-row justify-evenly">
          {/* Attribute for pH */}
          <Pressable
            onPress={() => setEditingField("pH")}
            className="flex flex-row items-center justify-between py-1 px-3 gap-2 rounded-lg bg-[#bad3f9]"
          >
            {editingField === "pH" ? (
              <TextInput
                autoFocus
                value={values.pH}
                onChangeText={(text) => handleFieldChange("pH", text)}
                className="text-blue-500 w-16 border-b-2 border-blue-500"
                keyboardType="numeric"
              />
            ) : (
              <>
                <AntDesign name="plus" size={16} color="blue" />
                <Text className="text-blue-500">
                  {values.pH || "pH"}
                </Text>
              </>
            )}
          </Pressable>

          {/* Attribute for turbidity */}
          <Pressable
            onPress={() => setEditingField("turbidity")}
            className="flex flex-row items-center justify-between py-1 px-3 gap-2 rounded-lg bg-[#bad3f9]"
          >
            {editingField === "turbidity" ? (
              <TextInput
                autoFocus
                value={values.turbidity}
                onChangeText={(text) => handleFieldChange("turbidity", text)}
                className="text-blue-500 w-16 border-b-2 border-blue-500"
                keyboardType="numeric"
              />
            ) : (
              <>
                <AntDesign name="plus" size={16} color="blue" />
                <Text className="text-blue-500">
                  {values.turbidity || "turbidity"}
                </Text>
              </>
            )}
          </Pressable>

          {/* Attribute for temperature */}
          <Pressable
            onPress={() => setEditingField("temperature")}
            className="flex flex-row items-center justify-between py-1 px-3 gap-2 rounded-lg bg-[#bad3f9]"
          >
            {editingField === "temperature" ? (
              <TextInput
                autoFocus
                value={values.temperature}
                onChangeText={(text) => handleFieldChange("temperature", text)}
                className="text-blue-500 w-16 border-b-2 border-blue-500"
                keyboardType="numeric"
              />
            ) : (
              <>
                <AntDesign name="plus" size={16} color="blue" />
                <Text className="text-blue-500">
                  {values.temperature || "temperature"}
                </Text>
              </>
            )}
          </Pressable>
        </View>

        <View className="">
        <Text className="font-bold text-center text-xl mt-6 w-11/12 mx-auto">
        Add a photo to support your report 
        </Text>
        <Text className="text-center">(max 3)</Text>
        </View>

        <View className="mx-auto w-11/12 mt-5">
        <Pressable className="rounded-lg flex flex-row justify-center pb-3 pt-1 items-center gap-2 border border-blue-500 w-full">
            <AntDesign name="camera" size={17} color="blue" />
            <Text className="font-bold text-blue-500">Take Photo</Text>
        </Pressable>
        </View>

        <View className="mx-auto w-11/12 mt-5">
        <Pressable className="rounded-lg flex bg-[#0E87CC] flex-row justify-center pb-3 pt-1 items-center gap-2 border border-blue-500 w-full">
            <AntDesign name="picture" size={17} color="white" />
            <Text className="font-bold text-white">Select Photos</Text>
        </Pressable>
        <Text className="text-[10px] font-light mt-0.5">Tip: Share a clear picture of the water resource to give us a better look at its current condition. Try to focus on areas that show pollution, damage, or other concerns. Well-lit, close-up shots work best!</Text>
        </View>

        <View className="flex flex-row justify-evenly mt-4">
            <View className="bg-[#EBF3FF] border rounded-lg border-blue-500 border-dashed h-[70px] w-[100px]"></View>
            <View className="bg-[#EBF3FF] border rounded-lg border-blue-500 border-dashed h-[70px] w-[100px]"></View>
            <View className="bg-[#EBF3FF] border rounded-lg border-blue-500 border-dashed h-[70px] w-[100px]"></View>
        </View>


        <View className="absolute bottom-7 w-full">
          <CustomButton
            title="Submit"
            onPress={() => router.push("/contribution/step5")}
            textStyle={{ fontSize: 18 }}
            className="mx-3 mt-7"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
