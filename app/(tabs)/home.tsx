import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Feather from "@expo/vector-icons/Feather";
import { router } from 'expo-router';

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
  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center px-4">
        <View className="flex flex-row gap-2 py-1 items-center">
          <Image source={require("../../assets/images/avatar.png")} />

          <View className="flex-col pt-1">
            <Text className="text-xs text-gray-600">Good morning,</Text>
            <Text className="text-sm">Ohene-Agyekum</Text>
          </View>
        </View>

        <View className="flex-row gap-2 bg-[#E4EDFB] items-center justify-center rounded-xl flex pb-2 pr-1 mt-1">
          <Image source={require("../../assets/images/point.png")} />
          <Text className="text-sm font-bold">0.00</Text>
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

          <View className="flex flex-row items-center gap-1 bg-white rounded-[10px] px-4 py-0 h-5 mt-1">
            <Text className="text-xs font-semibold text-[#1c5dc5]">
              Explore All
            </Text>
            <Image source={require("../../assets/images/arrow.png")} />
          </View>
        </View>
        <View className="mt-1 rounded-md  bg-[#E4EDFB] w-[95%] mx-auto flex justify-center items-center">
          <Image
            source={require("../../assets/images/donor.png")}
            className="w-full h-[200px] mt-2"
            resizeMode="cover"
          />
          <View className="flex flex-row justify-evenly gap-4 items-center">
            <Text className=" text-xs font-semibold">James Coffee Co,</Text>
            <Text className=" text-xs">San Diego</Text>
            <View className="flex flex-row items-center gap-1">
              <Foundation name="web" size={24} color="blue" />
              <Text className="text-xs">Visit their website now</Text>
            </View>
          </View>
          <Text className="text-[9px] text-gray-600 px-2 pb-2">
            We’re thrilled to have James Coffee Co. on board as we work together
            to create a healthier future for all. Thank you, James Coffee Co.,
            for brewing a better tomorrow with us!
          </Text>
        </View>
        <View className="mt-1 px-3">
          <Text className="text-white text-lg  font-bold">
            New Partnerships/Stores
          </Text>
          <SwiperFlatList
            index={2}
            showPagination={false}
            data={stores}
            renderItem={({ item }) => (
              <View style={[styles.child, {}]}>
                <Image source={item.image} className="rounded-xl" />
                <View className="bg-white absolute bottom-0 w-full">
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.location}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <Pressable onPress={() => router.push('/contribution')}>
        <View className="mt-2 mx-3 rounded-lg overflow-hidden mb-1.5">
          <ImageBackground
            source={require("../../assets/images/card1.png")}
            className="pt-2 px-6 flex flex-row justify-between h-[80px]"
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

        <View className="flex flex-row gap-4 mx-0 w-[90vw]">
        <View className="rounded-lg overflow-hidden">
          <ImageBackground
            source={require("../../assets/images/card2.png")}
            className="mt-2 pt-2 h-[105px] w-[175px] px-4"
          >
            <View className="flex flex-row justify-between">
                <Image source={require("../../assets/images/invite.png")}/>
                <Image source={require("../../assets/images/15.png")}/>
            </View>
            <View className="flex flex-row justify-between gap-2">
                <Text className="text-white font-bold">Invite friends and relatives</Text>
                <Image
                source={require("../../assets/images/card-right.png")}
                className=" h-5 w-5"
                />
            </View>
          </ImageBackground>
        </View>
        <View className="rounded-lg overflow-hidden">
          <ImageBackground
            source={require("../../assets/images/card3.png")}
            className="mt-2 pt-2 h-[105px] w-[175px] px-4"
          >
            <View className="flex flex-row justify-between">
                <Image source={require("../../assets/images/drop.png")}/>
                <Image source={require("../../assets/images/rewards.png")} className="mt-1"/>
            </View>
            <View className="flex flex-row justify-between gap-2">
                <Text className="text-white font-bold">Make Donations</Text>
                <Image
                source={require("../../assets/images/card-right.png")}
                className="h-5 w-5"
                />
            </View>
          </ImageBackground>
        </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: {
    width: 157,
    justifyContent: "center",
    marginRight: 10,
    position: "relative",
  },
  text: { fontSize: 12, textAlign: "center" },
});
