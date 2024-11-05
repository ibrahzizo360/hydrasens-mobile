import { Image, Pressable, SafeAreaView, Text, View, TextInput, Dimensions, Keyboard, TouchableWithoutFeedback, Alert, Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import useAuthStore from "@/hooks/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, setOnBoardingCompleted } = useAuthStore();

  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
        const response = await login({ email, password });

        if (response?.status === 200) {
            await setOnBoardingCompleted(true);
            Alert.alert("Success", "Logged in successfully");
            router.push("/");
          } else {
            console.log(response);
            Alert.alert("Login Failed", response?.data?.message || "An error occured. Please try again later");
          }
      } catch (error: any) {
        console.log(error.response);
        Alert.alert("Login Failed", error.response?.data?.message || "An error occured. Try again later");
      }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1"  style={{
          paddingTop: Platform.OS === 'android' ? 28 : 0
        }}>
        <View className="flex flex-row justify-center items-center">
          <Text className="text-xl font-semibold">Login</Text>
        </View>

        <View className="mt-10">
          
          <Text className="font-semibold text-center text-[#072C7C] text-xl mb-4 mt-12">
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
            className="border-gray-300 bg-[#c7dcfc] rounded-[15px] p-3 w-11/12 h-[45px] mx-auto"
          />

          <Pressable onPress={() => (router.push("/register"))}>
          <Text className="mx-auto mt-10 text-blue-700 font-bold">Sign Up here</Text>
          </Pressable>
        </View>

        <View className="bottom-7 absolute w-full">
          <CustomButton
            title="Login"
            onPress={loginHandler}
            loading={loading}
            className="mx-3 mt-7"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
