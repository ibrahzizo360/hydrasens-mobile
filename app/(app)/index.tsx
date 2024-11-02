import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { router } from 'expo-router';
import { Entypo } from "@expo/vector-icons";
import useAuthStore from "@/hooks/useAuthStore";
import { CustomBottomSheet } from "./customSheet";
import { useState } from "react";
import { height } from "@/utils";

export default function Home() {
  const stores = [
    {
      name: "Hill Bill Company",
      location: "Accra Legon",
      image: require("../../assets/images/hb.png"),
    },
    {
      name: "Hub Lot",
      location: "Accra Legon",
      image: require("../../assets/images/hublot.png"),
    },
    {
      name: "Adidas",
      location: "Accra Legon",
      image: require("../../assets/images/addidas.png"),
    },
    {
      name: "King Perfumes",
      location: "Accra Legon",
      image: require("../../assets/images/perfume.png"),
    },
  ];

  const {user} = useAuthStore();
  
  return (
    <SafeAreaView className="-mt-3" style={{ paddingTop: Platform.OS === 'android' ? 28 : 0 }}>
      <View className="flex-row justify-between items-center px-4">
        <View className="flex flex-row gap-2 py-1 items-center">
          <Pressable onPress={()=> router.push('/profile')}>
          <Image source={{ uri: user?.profile }} className="h-9 mt-1 w-9" />
          </Pressable>

          <View className="flex-col pt-1">
            <Text className="text-xs text-gray-600">Hello 👋</Text>
            <Text className="text-sm">{user?.name || user?.username}</Text>
          </View>
        </View>

        <View className=" bg-[#E4EDFB] rounded-xl py-1 px-2">
          <View className="flex-row gap-2 items-center justify-center">
        <Image source={require("../../assets/images/point.png")} className="h-[18px] w-[20px]" />
        <Text className="text-sm font-bold text-[#3B4E6A]">{`${user?.points}.00`}</Text>
        </View>
      </View>

      </View>

      <ImageBackground
        source={require("../../assets/images/home-screen.png")}
        className="w-full h-full"
      >
        <View className="flex flex-row justify-between px-4 pt-1">
          <Text className="text-white text-lg font-semibold">
            Our donor of the week
          </Text>

          <View className="bg-white rounded-[10px] h-5 px-2 pt-[2.5px] mt-1" style={{
        marginTop: Platform.select({ ios: 5, android: 10 }),
      }}>
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
        <View className="mt-1 rounded-md  bg-[#E4EDFB] w-[95%] mx-auto flex justify-center items-center">
          <Image
            source={require("../../assets/images/donor.png")}
            className="w-full mt-2"
            resizeMode="cover"
            style={styles.donorImage}
          />
          <View className="flex flex-row justify-evenly gap-4 items-center py-1" style={{width: width * 1.02}}>
            <Text className=" text-[9px] font-semibold">James Coffee Co,</Text>
            <View className="">
              <View className="flex flex-row items-center">
              <Entypo name="location-pin" size={14} color="#494D51" />
              <Text className="text-[9px] ">San Diego</Text>
              </View>
            </View>
            <View className="">
              <View className="flex flex-row items-center gap-1">
              <Foundation name="web" size={20} color="#0E87CC" />
              <Text className="text-[9px] text-[#0E87CC]">Visit their website now</Text>
              </View>
            </View>
          </View>
          <Text className="text-[7.4px] font-bold text-gray-600 px-2 pb-2">
            We’re thrilled to have James Coffee Co. on board as we work together
            to create a healthier future for all. Thank you, James Coffee Co.,
            for brewing a better tomorrow with us!
          </Text>
        </View>
        <View className="mt-1 px-3">
          <Text className="text-white text-lg  font-bold -mb-0.5">
            New Partnerships/Stores
          </Text>
          <SwiperFlatList
            showPagination={false}
            data={stores}
            renderItem={({ item }) => (
              <View style={[styles.child, {}]}>
                <Image source={item.image} className="rounded-xl" />
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
        <Pressable onPress={() => router.push('/contribution/start')}>
        <View className="mt-2 mx-3 rounded-lg overflow-hidden mb-1.5">
          <ImageBackground
            source={require("../../assets/images/card1.png")}
            className="pt-2 px-6 flex flex-row justify-between h-[110px]"
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

        <View className="flex flex-row justify-between gap-2 px-3">
      <View className="rounded-lg overflow-hidden h-[105px] flex-1">
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
      <View className="rounded-lg overflow-hidden h-[105px] flex-1">
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
      <CustomBottomSheet />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: {
    width: 157,
    height: height * 0.165,
    justifyContent: "center",
    marginRight: 10,
    position: "relative",
  },
  text: { fontSize: 12, textAlign: "center" },
  donorImage: {
    height: height * 0.235,
  }
});
