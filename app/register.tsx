import { Image, Pressable, SafeAreaView, Text, View, TextInput, Dimensions, Keyboard, TouchableWithoutFeedback, Alert, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";
import useAuthStore from "@/hooks/useAuthStore";
import { height } from "@/utils";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const { register, loading } = useAuthStore();

  const signUpHandler = async () => {
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await register({ name, email, password });

      if (response?.status === 201) {
        Alert.alert("Success", "User registered successfully");
        router.push("/sign-in");
      } else {
        Alert.alert("Registration Failed", response?.data?.message || "An unexpected error occurred.");
      }
    } catch (error: any) {
      console.log("Error", error);
      Alert.alert("Registration Failed", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1" style={{ paddingTop: Platform.OS === 'android' ? 28 : 0 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingBottom: 20 }}>
            <View className="flex flex-row justify-center items-center mt-2">
              <Pressable
                onPress={() => router.back()}
                className="rounded-lg p-2 bg-[#0258D3] flex absolute left-0"
              >
                <Feather name="chevron-left" size={24} color="white" />
              </Pressable>
              <Text className="text-xl font-semibold">Sign Up</Text>
            </View>

            <View className="mt-10">
              <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-12">
                Full Name
              </Text>
              <TextInput
                placeholder="Enter your Name"
                value={name}
                onChangeText={setName}
                className="border-gray-300 bg-[#c7dcfc] rounded-[15px] h-[45px] p-3 w-full mx-auto mb-4"
              />

              <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-7">
                Email
              </Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="border-gray-300 bg-[#c7dcfc] rounded-[15px] h-[45px] p-3 w-full mx-auto mb-4"
              />

              <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-7">
                Password
              </Text>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="border-gray-300 bg-[#c7dcfc] rounded-[15px] p-3 w-full h-[45px] mx-auto mb-4"
              />

              <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-7">
                Confirm Password
              </Text>
              <TextInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                className="border-gray-300 bg-[#c7dcfc] rounded-[15px] p-3 w-full h-[45px] mx-auto"
              />

              <Pressable onPress={() => router.push("/sign-in")}>
                <Text className="mx-auto mt-10 text-blue-700 font-bold">Login here</Text>
              </Pressable>
            </View>

            <View style={{ marginTop: height * 0.03 }}>
              <CustomButton
                title="Sign Up"
                loading={loading}
                onPress={signUpHandler}
                className="w-full"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
