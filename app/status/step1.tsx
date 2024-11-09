import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import useProjectStatusStore from "@/hooks/projectStatusStore";
import { height } from "@/utils";
import DatePicker from "react-native-date-picker";

export default function Step1() {
  const { width } = Dimensions.get("window");
  const [currentStep, setCurrentStep] = useState(5);
  const [phase, setPhase] = useState<string>("");
  const [incompleteReason, setIncompleteReason] = useState<string>("");
  const [completionDate, setCompletionDate] = useState<string>("");
  const { loading, setLoading, addProjectStatus, setProjectStatusField } =
    useProjectStatusStore();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const phases: string[] = ["Planning", "Construction", "Testing", "Other"];

  const selectPhase = (phase: string) => {
    setPhase(phase);
    setProjectStatusField("phase", phase);
  };

  const Stepper = () => {
    return (
      <View
        className="flex flex-row justify-between items-center mt-4 mb-8"
        style={{ width: width * 0.25 }}
      >
        {[1, 2, 3, 4].map((step, index) => (
          <View key={step} className="flex flex-row items-center">
            <View
              className={`h-1 w-1 ${
                currentStep >= step ? "bg-[#0258D3]" : "bg-gray-300"
              }`}
            />
            {index < 4 && (
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addProjectStatus();
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

  const handleTapOutside = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    // Cleanup listeners on unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <SafeAreaView
        className="flex-1"
        style={{ paddingTop: Platform.OS === "android" ? height * 0.05 : 0 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 0 }}>
            <View className="flex flex-row justify-center items-center mt-2 mb-1">
              <Pressable
                onPress={() => router.back()}
                className="rounded-lg p-2 bg-[#0258D3] flex absolute left-4"
              >
                <Feather name="chevron-left" size={24} color="white" />
              </Pressable>
              <Text
                className="text-[15px] font-semibold"
                style={{ fontSize: height * 0.022 }}
              >
                Incomplete Projects Details
              </Text>
            </View>

            <Stepper />

            <View className="mt-8">
              <Text className="font-bold text-center text-xl text-[#072C7C] mb-0">
                Why is the project incomplete?
              </Text>
              <Text className="font-semibold text-gray-500 text-center text-sm mb-4">
                (e.g., funding issues, delays)
              </Text>
              <TextInput
                placeholder="Type here"
                className="border-gray-300 bg-[#c7dcfc] h-[100px] rounded-lg p-2 w-11/12 mx-auto mb-4 mt-4"
                multiline={true}
                style={{ textAlignVertical: "top", paddingTop: 10 }}
                onChangeText={setIncompleteReason}
              />

              <Text className="font-bold text-center text-[#072C7C] text-xl mx-3 mb-4 mt-10">
                What’s the current phase of the project?
              </Text>

              <View className="flex flex-row flex-wrap py-2 justify-evenly items-center w-11/12 mx-auto">
                {phases.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => selectPhase(item)}
                    className={`rounded-lg p-2 w-[45%] mx-1 my-1 ${
                      phase === item ? "bg-[#0258D3]" : "bg-white"
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

              <Text className="font-bold text-center text-xl mx-3 mb-4 mt-10 text-[#072C7C]">
                Estimated completion date{" "}
                <Text className="text-sm text-gray-600">(if available)</Text>
              </Text>
              <Pressable onPress={() => setOpen(true)}>
                <TextInput
                  placeholder="DD/MM/YYYY"
                  value={completionDate} // Display the selected date
                  editable={false} // Make the TextInput read-only
                  className="border-gray-300 bg-[#c7dcfc] rounded-[15px] h-[45px] p-3 w-11/12 mx-auto mb-4"
                />
              </Pressable>

              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(selectedDate) => {
                  setOpen(false);
                  setDate(selectedDate);
                  const formattedDate = selectedDate.toLocaleDateString("en-GB");
                  setCompletionDate(formattedDate);
                  setProjectStatusField("completionDate", formattedDate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                mode="date"
              />
            </View>

            {/* Conditionally render the submit button based on keyboard visibility */}
            {!keyboardVisible && (
              <View className="absolute bottom-7 w-full">
                <CustomButton
                  title="Submit"
                  onPress={handleSubmit}
                  loading={loading}
                  className="mx-3"
                />
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
