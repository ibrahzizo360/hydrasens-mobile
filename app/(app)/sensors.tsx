import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from 'expo-router';
import CircularProgress from 'react-native-circular-progress-indicator';
import { height, width } from "@/utils";
import { CustomBottomSheet } from "./customSheet";
import * as Notifications from 'expo-notifications';
import axios from "axios";
import { BASE_URL } from "@/constants/url";


async function notify(title: string, body: string, type: string) {
  try {
    // Schedule the local notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null,
    });

    // Send the notification data to your server endpoint
    await axios.post(`${BASE_URL}/notifications`, {
      title: title,
      description: body,
      type: type
    });
  } catch (error) {
    console.error('Notification failed:', error);
  }
}

// Interpolation function to calculate color for temperature and turbidity
const interpolateColor = (ratio: number, colorRange: string[]) => {
  const index = Math.min(Math.floor(ratio * (colorRange.length - 1)), colorRange.length - 1);
  return colorRange[index];
};

// Function to calculate sub-index for Temperature (Q_T)
const calculateTemperatureSubIndex = (T: number, T_ideal: number, T_max: number): number => {
    if (T <= T_ideal) return 100;
    if (T >= T_max) return 0;

    return 100 - ((T - T_ideal) / (T_max - T_ideal)) * 100;
};

// Function to calculate sub-index for Turbidity (Q_Tb)
const calculateTurbiditySubIndex = (Tb: number, Tb_ideal: number, Tb_max: number): number => {
    if (Tb <= Tb_ideal) return 100;
    if (Tb >= Tb_max) return 0;

    return 100 - ((Tb - Tb_ideal) / (Tb_max - Tb_ideal)) * 100;
};

// Function to calculate final WQI using weighted sum of sub-indices
const calculateWQI = (T: number, Tb: number, T_ideal: number, T_max: number, Tb_ideal: number, Tb_max: number): number => {
    const weight_T = 0.5;  // Weight for Temperature
    const weight_Tb = 0.5; // Weight for Turbidity

    const Q_T = calculateTemperatureSubIndex(T, T_ideal, T_max);
    const Q_Tb = calculateTurbiditySubIndex(Tb, Tb_ideal, Tb_max);

    return (weight_T * Q_T) + (weight_Tb * Q_Tb);
};

// Define the functions to get colors for temperature and turbidity
const getTemperatureColor = (temp: number) => {
  const minTemp = 0;
  const maxTemp = 40;
  const normalizedTemp = Math.max(minTemp, Math.min(temp, maxTemp));
  const ratio = (normalizedTemp - minTemp) / (maxTemp - minTemp);
  const tempColors = ["#E2EBFC", "#BFE0EC", "#D4E2C3", "#FCE773", "#FC9F7F"];
  return interpolateColor(ratio, tempColors);
};

const getTurbidityColor = (turbidity: number) => {
  const minTurbidity = 0;
  const maxTurbidity = 100;
  const normalizedTurbidity = Math.max(minTurbidity, Math.min(turbidity, maxTurbidity));
  const ratio = (normalizedTurbidity - minTurbidity) / (maxTurbidity - minTurbidity);
  const turbidityColors = ["#CFE8F1", "#FCFAE4", "#FCCC73", "#BC977D"];
  return interpolateColor(ratio, turbidityColors);
};

export default function SensorsPage() {
  const [temperature, setTemperature] = useState(0);
  const [turbidity, setTurbidity] = useState(0);
  const [waterQualityPercentage, setWaterQualityPercentage] = useState(0);
  const [lastNotificationTime, setLastNotificationTime] = useState<{ [key: string]: Date }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://shopify-webhook-sigma.vercel.app/test/data');
        const ResponseData = await response.json();

        const data = ResponseData[ResponseData.length - 1];
        const temp = parseFloat(data.temperature);
        const turb = parseFloat(data.turbidity);

        setTemperature(temp);
        setTurbidity(turb);

        // Calculate WQI
        const T_ideal = 25;
        const T_max = 35;
        const Tb_ideal = 0;
        const T_min = 10;
        const Tb_max = 100;
        const WQI = calculateWQI(temp, turb, T_ideal, T_max, Tb_ideal, Tb_max);
        setWaterQualityPercentage(WQI);

        const now = new Date();

        const shouldNotify = (key: string) => {
          return !lastNotificationTime[key] || now.getTime() - lastNotificationTime[key].getTime() >= 30 * 60 * 1000;
        };

       // Notifications for temperature
      if (temp > T_max && shouldNotify("tempHigh")) {
        setLastNotificationTime((prev) => ({ ...prev, tempHigh: now }));
        notify(
          "Temperature Alert",
          "The water temperature has exceeded the safe limit!",
          "warning"
        );
      } else if (temp < T_min && shouldNotify("tempLow")) {
        setLastNotificationTime((prev) => ({ ...prev, tempLow: now }));
        notify(
          "Temperature Alert",
          "The water temperature is too low!",
          "warning"
        );
      }

      // Notifications for turbidity
      if (turb > Tb_max && shouldNotify("turbidity")) {
        setLastNotificationTime((prev) => ({ ...prev, turbidity: now }));
        notify(
          "Turbidity Alert",
          "The water turbidity has exceeded the safe limit, indicating poor water quality.",
          "warning"
        );
      }

      // Notifications for water quality
      if (WQI < 50 && shouldNotify("waterQuality")) {
        setLastNotificationTime((prev) => ({ ...prev, waterQuality: now }));
        notify(
          "Urgent Alert",
          "Water quality in your area has reached critical levels. Immediate action may be required for safety and health.",
          "alert"
        );
      }
      
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [lastNotificationTime]);

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? height * 0.05 : 0 }}>
      <View className="flex flex-row justify-center items-center">
        <Text className="text-xl font-semibold">Water Quality Monitor</Text>
      </View>

      <View className="mt-24 mb-16 mx-auto">
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

      <CustomBottomSheet />
    </SafeAreaView>
  );
}
