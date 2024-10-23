import { Image, Pressable, SafeAreaView, Text, View, TextInput, Dimensions, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Step1() {
  const { width } = Dimensions.get("window");
  const [currentStep, setCurrentStep] = useState(2);
  const [city, setCity] = useState<string | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);

  useEffect(() => {
    if (useCurrentLocation) {
      (async () => {
        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Permission to access location was denied");
          return;
        }

        // Get current position
        try {
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
          } else {
            Alert.alert("Location Error", "Could not retrieve the city name.");
          }
        } catch (error) {
          Alert.alert("Location Error", "Failed to retrieve location. Please try again.");
          console.error(error);
        }
      })();
    }
  }, [useCurrentLocation]);

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
          <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-12">
            What’s the local name of this water resource?
          </Text>
          <TextInput
            placeholder="Name"
            className="border-gray-300 bg-[#c7dcfc] rounded-[15px] h-[45px] p-3 w-11/12 mx-auto mb-4"
          />

          <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-7">
            Please provide the exact location of this water source.
          </Text>
          <TextInput
            value={useCurrentLocation ? city ?? "Location loading..." : ""}
            placeholder="Location"
            className="border-gray-300 bg-[#c7dcfc] rounded-[15px] p-3 w-11/12 h-[45px] mx-auto"
            editable={!useCurrentLocation} // Disable input if using current location
          />
          <View className="flex-row w-11/12 mx-auto justify-between mb-4 mt-1">
            <Text />
            <View className="flex-row justify-center">
              <BouncyCheckbox 
                style={{ borderRadius: 2 }} 
                iconStyle={{ borderRadius: 2 }} 
                innerIconStyle={{ borderRadius: 2 }} 
                size={15}
                fillColor="green" 
                onPress={(isChecked: boolean) => {
                  setUseCurrentLocation(isChecked); // Use checkbox value to set current location
                  if (isChecked) {
                    setCity(null); // Clear city if checkbox is checked
                  }
                }} 
              />
              <Text className="text-xs tracking-tighter mt-0.5 -ml-3 font-semibold text-[11px] text-gray-500">Use current Location</Text>
            </View>
          </View>
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
