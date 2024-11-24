import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import useAuthStore from "@/hooks/useAuthStore";
import { CustomBottomSheet } from "./customSheet";
import { height } from "@/utils";
import { stores } from "@/constants";
import { useEffect } from "react";
import useNotificationStore from "@/hooks/useNotification";

export default function Home() {
  const { user, refetchUser } = useAuthStore();
  const { notifications, fetchNotifications, loading } = useNotificationStore();

  useEffect(() => {
    const fetchUserData = async () => {
      await refetchUser();
    };

    fetchUserData();
    fetchNotifications();
  }, []);

  return (
    <SafeAreaView
      className="flex-1 bg-[#f0f0f0]"
      style={{ paddingTop: Platform.OS === "android" ? height * 0.04 : 0 }}
    >
      <ScrollView stickyHeaderIndices={[0]}>
        <View className="flex-row justify-between items-center px-4 bg-[#f0f0f0]">
          <View className="flex flex-row gap-2 py-1 items-center">
            <Pressable
              onPress={() => router.push("/profile")}
              className="relative"
            >
              <Image source={{ uri: user?.profile }} className="h-9 mt-1 w-9" />

              {/* Notifications Badge */}
              {notifications.length > 0 && (
                <View className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-5 w-5 justify-center items-center">
                  <Text className="text-xs text-white font-semibold">
                    {notifications.length}
                  </Text>
                </View>
              )}
            </Pressable>

            <View className="flex-col pt-1">
              <Text className="text-xs text-gray-600">Hello 👋</Text>
              <Text className="text-sm">{user?.name || user?.username}</Text>
            </View>
          </View>

          <View className="bg-[#E4EDFB] rounded-xl py-1 px-2">
            <View className="flex-row gap-2 items-center justify-center">
              <Image
                source={require("../../assets/images/point.png")}
                className="h-[18px] w-[20px]"
              />
              <Text className="text-sm font-bold text-[#3B4E6A]">{`${
                user?.points || 0
              }.00`}</Text>
            </View>
          </View>
        </View>

        <ImageBackground
          source={require("../../assets/images/home-screen.png")}
          className="w-full h-full"
        >
          <View className="flex flex-row justify-between px-4 pt-2.5">
            <Text className="text-white text-lg font-semibold">
              Our donor of the week
            </Text>

            <View
              className="bg-white rounded-[10px] h-5 px-2 pt-[2.5px] mb-0"
              style={{
                marginTop: Platform.select({ ios: 5, android: 6 }),
              }}
            >
              <View className="flex flex-row justify-center items-center gap-1">
                <Text
                  className="font-semibold text-[#1c5dc5]"
                  style={{
                    fontSize: Platform.select({ ios: 11, android: 10 }),
                    lineHeight: Platform.select({ ios: 13, android: 12 }),
                  }}
                >
                  Explore All
                </Text>
                <Image
                  source={require("../../assets/images/arrow.png")}
                  style={{ width: 10, height: 10, resizeMode: "contain" }}
                />
              </View>
            </View>
          </View>
          <View className="mt-1 rounded-md  bg-white w-[95%] mx-auto flex justify-center items-center">
            <Image
              source={require("../../assets/images/donor.png")}
              className="w-full mt-2"
              resizeMode="cover"
              style={styles.donorImage}
            />
            <View
              className="flex flex-row justify-evenly gap-4 items-center py-1"
              style={{ width: width * 1.02 }}
            >
              <Text className=" text-[14px] font-semibold">
                James Coffee Co,
              </Text>
              <View className="">
                <View className="flex flex-row items-center">
                  <Entypo name="location-pin" size={14} color="#494D51" />
                  <Text className="text-[10px] ">San Diego</Text>
                </View>
              </View>
              <View className="">
                <View className="flex flex-row items-center gap-1">
                  <Foundation name="web" size={20} color="#0E87CC" />
                  <Text className="text-[9px] text-[#0E87CC]">
                    Visit their website now
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="mt-3 px-3">
            <Text className="text-white text-lg  font-bold mb-40 ">
              New Partnerships/Stores
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.carrousel}
              data={stores}
              renderItem={({ item }) => (
                <View style={styles.child}>
                  <Image
                    source={item.image}
                    style={styles.image}
                    className=""
                  />
                  <View className="bg-white absolute bottom-0 w-full">
                    <Text style={styles.text}>{item.name}</Text>
                    <View className="mx-auto">
                      <View className="flex flex-row items-center">
                        <Entypo name="location-pin" size={14} color="#494D51" />
                        <Text className="text-[9px]">{item.location}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          <Pressable
            onPress={() => router.push("/contribution/start")}
            style={{ marginTop: height * 0.03 }}
          >
            <View className="mx-3 rounded-lg overflow-hidden mb-1.5">
              <ImageBackground
                source={require("../../assets/images/card1.png")}
                className="pt-2 px-6 flex flex-row justify-between"
                style={{ height: height * 0.135 }}
              >
                <View className="w-4/5">
                  <Text className="text-white font-bold text-[16px]">
                    Contribute Now, Earn Rewards!
                  </Text>
                  <Text className="text-white mt-1 text-[11px]">
                    Make clean and safe water accessible to many communities in
                    Ghana.
                  </Text>
                </View>
                <Image
                  source={require("../../assets/images/card-right.png")}
                  className="mt-5"
                />
              </ImageBackground>
            </View>
          </Pressable>

          <View className="flex flex-row justify-between gap-2 px-3 mt-1 mb-20">
            <View
              className="rounded-lg overflow-hidden flex-1"
              style={{ height: height * 0.135 }}
            >
              <ImageBackground
                source={require("../../assets/images/card2.png")}
                style={{ paddingTop: 8, paddingHorizontal: 8 }}
                className="h-full"
                imageStyle={{ borderRadius: 10 }}
              >
                <View className="flex flex-row justify-between items-start">
                  <Image source={require("../../assets/images/invite.png")} />
                  <Image
                    source={require("../../assets/images/15.png")}
                    className="h-[25px] w-[73px] mt-1"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex flex-row justify-between items-center mt-2">
                  <Text className="text-white font-bold text-[13px] w-[70%]">
                    Invite friends and relatives
                  </Text>
                  <Image
                    source={require("../../assets/images/card-right.png")}
                    className="h-5 w-5"
                  />
                </View>
              </ImageBackground>
            </View>
            <View
              className="rounded-lg overflow-hidden flex-1"
              style={{ height: height * 0.135 }}
            >
              <ImageBackground
                source={require("../../assets/images/card3.png")}
                style={{ paddingTop: 8, paddingHorizontal: 8 }}
                className="h-full"
                imageStyle={{ borderRadius: 10 }}
                resizeMode="cover"
              >
                <View className="flex flex-row justify-between items-start">
                  <Image source={require("../../assets/images/drop.png")} />
                  <Image
                    source={require("../../assets/images/rewards.png")}
                    className="h-[15px] w-[96px] mt-2"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex flex-row justify-between items-center mt-2">
                  <Text className="text-white font-bold text-[13px] w-[70%]">
                    Make Donations
                  </Text>
                  <Image
                    source={require("../../assets/images/card-right.png")}
                    className="h-5 w-5"
                  />
                </View>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      <CustomBottomSheet />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: {
    width: "auto",
    height: height * 0.165,
    justifyContent: "center",
    marginRight: 10,
  },
  text: { fontSize: 12, textAlign: "center" },
  donorImage: {
    height: height * 0.235,
  },
  carrousel: {
    position: "absolute",
    top: 37,
    width: width,
    paddingLeft: 12,
  },
  image: {
    height: height * 0.160,
    width: 157,
  },
});
