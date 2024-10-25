import { Image, Pressable, SafeAreaView, Text, View, TextInput, Dimensions, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/url";
import useAuthStore from "@/hooks/useAuthStore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, loading } = useAuthStore();

  const signUpHandler = async () => {
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await register({ username, email, password });

      console.log(response?.data);

      if (response?.status === 201) {
        Alert.alert("Success", "User registered successfully");
        router.push("/login");
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
      <SafeAreaView className="flex-1">
        <View className="flex flex-row justify-center items-center">
          <Pressable
            onPress={() => router.back()}
            className="rounded-lg p-2 bg-[#0258D3] flex absolute left-4"
          >
            <Feather name="chevron-left" size={24} color="white" />
          </Pressable>
          <Text className="text-xl font-semibold">Sign Up</Text>
        </View>

        <View className="mt-10">
          <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-12">
            Username
          </Text>
          <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            className="border-gray-300 bg-[#c7dcfc] rounded-[15px] h-[45px] p-3 w-11/12 mx-auto mb-4"
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
            className="border-gray-300 bg-[#c7dcfc] rounded-[15px] h-[45px] p-3 w-11/12 mx-auto mb-4"
          />

          <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-7">
            Password
          </Text>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border-gray-300 bg-[#c7dcfc] rounded-[15px] p-3 w-11/12 h-[45px] mx-auto mb-4"
          />

          <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-7">
            Confirm Password
          </Text>
          <TextInput
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="border-gray-300 bg-[#c7dcfc] rounded-[15px] p-3 w-11/12 h-[45px] mx-auto"
          />
        </View>

        <View className="bottom-7 absolute w-full">
          <CustomButton
            title="Sign Up"
            loading={loading}
            onPress={signUpHandler}
            textStyle={{ fontSize: 18 }}
            className="mx-3 mt-7"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
