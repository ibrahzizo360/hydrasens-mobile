import React, { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from 'expo-router';
import CircularProgress from 'react-native-circular-progress-indicator';

const getTemperatureColor = (temp: number) => {
  // Normalize temperature to a color value
  const minTemp = 0; // Coldest temp
  const maxTemp = 40; // Hottest temp
  const normalizedTemp = Math.max(minTemp, Math.min(temp, maxTemp));
  const ratio = (normalizedTemp - minTemp) / (maxTemp - minTemp);

  // Interpolate color between blue (cold) and red (hot)
  const r = Math.floor(255 * ratio);
  const g = 0; // Fixed green
  const b = Math.floor(255 * (1 - ratio));
  
  return `rgb(${r}, ${g}, ${b})`;
};

const getTurbidityColor = (turbidity: number) => {
  // Normalize turbidity to a color value
  const minTurbidity = 0; // Cleanest
  const maxTurbidity = 100; // Highest turbidity
  const normalizedTurbidity = Math.max(minTurbidity, Math.min(turbidity, maxTurbidity));
  const ratio = (normalizedTurbidity - minTurbidity) / (maxTurbidity - minTurbidity);

  // Interpolate color between light blue (clean) and brown (dirty)
  const r = Math.floor(165 * ratio); // Brown color
  const g = Math.floor(42 * ratio); // Brown color
  const b = Math.floor(42 * (1 - ratio)); // Light blue
  
  return `rgb(${r}, ${g}, ${b})`;
};

export default function SensorsPage() {
  const [temperature, setTemperature] = useState(0);
  const [turbidity, setTurbidity] = useState(0);
  const [waterQualityPercentage, setWaterQualityPercentage] = useState(0);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        // const response = await fetch('YOUR_API_URL_HERE'); // Replace with your API URL
        // const data = await response.json();
        const data = {
          temperature: 95,
          turbidity: 20,
          waterQuality: 75,
        };

        setTemperature(data.temperature); // Adjust based on your API response
        setTurbidity(data.turbidity); // Adjust based on your API response

        // Assuming a simple calculation for water quality percentage
        const quality = (data.waterQuality || 0);
        setWaterQualityPercentage(quality);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-center items-center">
        <Pressable onPress={()=>router.back()} className="rounded-lg p-2 bg-[#0258D3] flex absolute left-4">
          <View>
            <Feather name="chevron-left" size={24} color="white" />
          </View>
        </Pressable>
        <Text className="text-xl font-semibold">Water Quality Monitor</Text>
      </View>

      <View className="mt-20 mb-10 mx-auto">
        <CircularProgress
          value={waterQualityPercentage}
          radius={120}
          inActiveStrokeOpacity={0.5}
          activeStrokeWidth={15}
          title={'Water Quality'}
          valueSuffix={'%'}
          titleColor={'gray'}
          titleStyle={{ fontSize: 20, fontWeight: '200' }}
          inActiveStrokeWidth={20}
          progressValueStyle={{ fontWeight: '100', color: 'gray' }}
          activeStrokeSecondaryColor="yellow"
          inActiveStrokeColor="black"
          duration={5000}
          dashedStrokeConfig={{
            count: 50,
            width: 4,
          }}
          // Overlay text showing the water quality percentage
          // children={<Text style={{ color: 'white', fontSize: 20 }}>{waterQualityPercentage}%</Text>}
        />
      </View>

      <View className="gap-2 justify-center flex flex-row">
        <View style={{ backgroundColor: getTemperatureColor(temperature) }} className="rounded-xl h-[200px] w-[180px] p-3">
          <Image source={require("../../assets/images/temp.png")} className="h-[40px] w-[40px] mb-20" />
          <Text className="text-left text-xl font-semibold text-gray-600">Temperature</Text>
          <Text className="text-left text-[14px] font-bold text-xl">{temperature}°C</Text>
        </View>
        <View style={{ backgroundColor: getTurbidityColor(turbidity) }} className="rounded-xl h-[200px] w-[180px] p-3">
          <Image source={require("../../assets/images/turb.png")} className="h-[40px] w-[40px] mb-20" />
          <Text className="text-left text-xl font-semibold text-gray-600">Turbidity</Text>
          <Text className="text-left text-[14px] font-bold text-xl">{turbidity} NTU</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
