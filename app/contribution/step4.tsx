import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from 'expo-image-picker';
import useContributionStore from "@/hooks/useContributionStore";
import { height, uploadImageToCloudinary } from "@/utils";

export default function Step4() {
  const { width } = Dimensions.get("window");

  const [currentStep, setCurrentStep] = useState<number>(5);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const { setContributionField, contribution, loading, setLoading, addContribution, resetContributionFields } = useContributionStore();

  const pickImage = async () => {
    if (selectedImages.length >= 3) {
      alert("You can only select up to 3 images.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && selectedImages.length < 3) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    if (selectedImages.length >= 3) {
      alert("You can only select up to 3 images.");
      return;
    }

    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && selectedImages.length < 3) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const handleTapOutside = () => {
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


const handleSubmit = async () => {
  setLoading(true); // Start loading
  try {
    const uploadedUrls = await Promise.all(
      selectedImages.map(async (imageUri) => {
        return await uploadImageToCloudinary(imageUri);
      })
    );
    
    setContributionField('photos', uploadedUrls);

    await addContribution(); 

    resetContributionFields();

    router.push("/contribution/step5");
  } catch (error) {
    console.error("Error uploading images:", error);
    alert("An error occurred while uploading images. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? height * 0.05  : 0 }}>
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

        <View className="">
          <Text className="font-bold text-center text-xl mt-6 w-11/12 mx-auto text-[#072C7C]">
            Add a photo to support your report 
          </Text>
          <Text className="text-center text-[#717888]">(max 3)</Text>
        </View>

        <View className="flex items-center w-full mt-5">
          <Pressable
            onPress={takePhoto}
            className="rounded-lg flex flex-row justify-center pb-3 pt-1 items-center gap-2 border border-blue-500 w-11/12"
          >
            <Feather name="camera" size={18} color="#3b82f6" />
            <Text className="font-bold text-blue-500">Take Photo</Text>
          </Pressable>
        </View>

        <View className="flex items-center w-full mt-5">
          <Pressable
            onPress={pickImage}
            className="rounded-lg flex bg-[#0E87CC] flex-row justify-center pb-3 pt-1 items-center gap-2 border border-blue-500 w-11/12"
          >
            <AntDesign name="picture" size={18} color="white" />
            <Text className="font-bold text-white">Select Photos</Text>
          </Pressable>
          <Text className="text-[10px] font-medium mx-2.5 text-[#717888] mt-2 text-center">
            Tip: Share a clear picture of the water resource to give us a better look at its current condition. Try to focus on areas that show pollution, damage, or other concerns. Well-lit, close-up shots work best!
          </Text>
        </View>

        <View className="flex flex-row justify-evenly mt-6 mr-1">
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              className="bg-[#EBF3FF] border rounded-lg border-blue-500 border-dashed h-[76px] w-[109px] flex justify-center items-center"
            >
              {selectedImages[index] && (
                <Image
                  source={{ uri: selectedImages[index] }}
                  className="h-full w-full rounded-lg"
                  resizeMode="cover"
                />
              )}
            </View>
          ))}
        </View>

        <View className="absolute bottom-7 w-full">
          <CustomButton
            title="Submit"
            onPress={() => handleSubmit()}
            loading={loading}
            className="mx-3 mt-7"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
