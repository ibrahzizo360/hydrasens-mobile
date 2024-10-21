import { Image, Pressable, SafeAreaView, Text, View, TextInput, Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function Step1() {
  const { width } = Dimensions.get("window");
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [city, setCity] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get current position
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Perform reverse geocoding to get address information
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // Set the city from the reverse geocode results
      if (reverseGeocode.length > 0) {
        const { city } = reverseGeocode[0]; // Destructure to get the city
        setCity(city || "City not found");
      }
    })();
  }, []);


  console.log(city)

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <Text className="text-xl font-semibold">General Information</Text>
        </View>

        <Stepper />

        <View className="mt-10">
          <Image
            source={require("../../assets/images/globe.png")}
            className="mx-auto h-[148px] w-[138px]"
          />
          <Text className="font-bold text-center text-xl mb-4 mt-20">
            What’s the local name of this water resource?
          </Text>
          <TextInput
            placeholder="Name"
            className="border-gray-300 bg-[#c7dcfc] rounded-lg p-3 w-11/12 mx-auto mb-4"
          />

          <Text className="font-bold text-center text-xl mb-4 mt-10">
            Please provide the exact location of this water source.
          </Text>
          <TextInput
          value={city ?? "location loading..."}
            placeholder="Location"
            className="border-gray-300 bg-[#c7dcfc] rounded-lg p-3 w-11/12 mx-auto mb-4"
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
    </TouchableWithoutFeedback>
  );
}
