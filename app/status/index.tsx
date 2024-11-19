import { Image, Pressable, SafeAreaView, Text, View, TextInput, Dimensions, Alert, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useProjectStatusStore from "@/hooks/projectStatusStore";
import { height } from "@/utils";

export default function Status() {
    const { width } = Dimensions.get("window");
    const { projectStatus, setProjectStatusField , loading, setLoading, addProjectStatus, bonusActive} = useProjectStatusStore();
    const [currentStep, setCurrentStep] = useState(2);
    const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
    const [isKeyVisible, setIsKeyVisible] = useState<boolean>(false);

    useEffect(()=>{
        if(projectStatus.status === "Project incomplete"){
            setCurrentStep(2)
        } else {
            setCurrentStep(3)
        }
    },[projectStatus])

    const statuses: string[] = [
        "Active",
        "Active but has issues",
        "Inactive",
        "Project incomplete",
    ];

    const handleSubmit = async () => {
        setLoading(true);
        try {
          await addProjectStatus(bonusActive);
          router.push("/status/step2");
        } catch (error) {
          console.error("Error submitting project status:", error);
          alert(
            "An error occurred while submitting the project status. Please try again."
          );
        } finally {
          setLoading(false);
        }
      };

    // Handle keyboard show/hide
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyVisible(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        if (useCurrentLocation) {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert("Permission Denied", "Permission to access location was denied");
                    return;
                }

                try {
                    let location = await Location.getCurrentPositionAsync({});
                    const { latitude, longitude } = location.coords;

                    let reverseGeocode = await Location.reverseGeocodeAsync({
                        latitude,
                        longitude,
                    });

                    if (reverseGeocode.length > 0) {
                        const { city } = reverseGeocode[0];
                        setProjectStatusField('location', city || "City not found");
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

    const Stepper = () => {
        return (
            <View className="flex flex-row justify-between items-center mt-4 mb-8" style={{ width: width * 0.5 }}>
                {[1, 2, 3, 4].map((step, index) => (
                    <View key={step} className="flex flex-row items-center">
                        <View
                            className={`h-1 w-1 ${currentStep >= step ? "bg-[#0258D3]" : "bg-gray-300"}`}
                        />
                        {index < 2 && (
                            <View className={`flex-grow h-1 ${currentStep > step ? "bg-[#0258D3]" : "bg-gray-300"}`} />
                        )}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? height * 0.05 : 0 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 0 }}>
                        <View className="mt-2 flex-row justify-center items-center">
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

                        <View className="mt-2">
                            <Text className="font-bold text-center text-xl text-[#072C7C] mb-0">Who is the sponsoring organisation?</Text>
                            <Text className="font-semibold text-center text-sm mb-4 text-gray-500">(optional)</Text>
                            <TextInput
                                placeholder="Name"
                                value={projectStatus.sponsor}
                                onChangeText={(text) => setProjectStatusField('sponsor', text)}
                                className="border-gray-300 bg-[#c7dcfc] rounded-[15px] h-[45px] p-3 w-11/12 mx-auto mb-4"
                            />
                            <TextInput
                                placeholder="Website"
                                value={projectStatus.sponsorWebsite}
                                onChangeText={(text) => setProjectStatusField('sponsorWebsite', text)}
                                className="border-gray-300 bg-[#c7dcfc] rounded-[15px] h-[45px] p-3 w-11/12 mx-auto mb-4"
                            />

                            <Text className="font-bold text-center text-xl mx-3 mb-4 text-[#072C7C] mt-10">What’s the current status of the project?</Text>

                            <View className="flex flex-row flex-wrap py-2 justify-evenly items-center w-11/12 mx-auto">
                                {statuses.map((item) => {
                                    let backgroundColor;
                                    let textColor;

                                    if (projectStatus.status === item) {
                                        switch (item) {
                                            case 'Active':
                                                backgroundColor = 'bg-green-500';
                                                textColor = 'text-white';
                                                break;
                                            case 'Inactive':
                                                backgroundColor = 'bg-red-500';
                                                textColor = 'text-white';
                                                break;
                                            default:
                                                backgroundColor = 'bg-[#FFD700]';
                                                textColor = 'text-white';
                                                break;
                                        }
                                    } else {
                                        backgroundColor = 'bg-white';
                                        textColor = 'text-blue-500';
                                    }

                                    return (
                                        <Pressable
                                            key={item}
                                            onPress={() => setProjectStatusField('status', item)}
                                            className={`rounded-lg p-2 w-[45%] mx-1 my-1 ${backgroundColor}`}
                                        >
                                            <Text className={`text-center text-[11px] font-bold ${textColor}`}>
                                                {item}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>

                            <Text className="font-bold text-center text-xl mb-4 mt-10 text-[#072C7C]">Where is the project located?</Text>
                            <TextInput
                                value={useCurrentLocation ? projectStatus.location ?? "Location loading..." : projectStatus.location}
                                placeholder="Location"
                                onChangeText={(text) => setProjectStatusField('location', text)}
                                className="border-gray-300 bg-[#c7dcfc] rounded-[15px] p-3 w-11/12 h-[45px] mx-auto"
                                editable={!useCurrentLocation}
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
                                            setUseCurrentLocation(isChecked);
                                        }}
                                    />
                                    <Text className="text-xs tracking-tighter mt-0.5 -ml-3 font-semibold text-[11px] text-gray-500">Use current Location</Text>
                                </View>
                            </View>
                        </View>

                        {!isKeyVisible && (
                            <View className="absolute bottom-7 w-full">
                                {projectStatus.status === "Project incomplete" ? (
                                    <CustomButton
                                        title="Next"
                                        onPress={() => {
                                            router.push("/status/step1");
                                        }}
                                        className="mx-3"
                                    />
                                ) : (
                                    <CustomButton
                                        title="Submit"
                                        loading={loading}
                                        onPress={handleSubmit}
                                        className="mx-3 bg-green-500"
                                    />
                                )}
                            </View>
                        )}
                        
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
