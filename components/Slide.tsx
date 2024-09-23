import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingSwiper() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <Swiper
        loop={false}  // Disable loop for onboarding
        showsPagination={true}  // Show pagination dots
        dotStyle={styles.dot}  // Customize inactive dot
        activeDotStyle={styles.activeDot}  // Customize active dot to be elongated
      >
        {/* First Slide with Background Image */}
        <ImageBackground
          source={require("../assets/images/slide1.png")}  // Replace with your image
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Welcome to the App</Text>
          </View>
        </ImageBackground>

        {/* Second Slide with Background Image */}
        <ImageBackground
          source={require("../assets/images/slide2.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Easily track your progress</Text>
          </View>
        </ImageBackground>

        {/* Third Slide with Background Image */}
        <ImageBackground
          source={require("../assets/images/slide3.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Get Started Now</Text>
          </View>
        </ImageBackground>
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",  // Optional overlay for text readability
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  dot: {
    backgroundColor: "#ddd",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#007aff",
    width: 24,  // Elongate the dot by increasing the width
    height: 8,  // Keep the height the same as the dot for oval shape
    borderRadius: 4,  // Keep the borderRadius for rounded corners
    margin: 3,
  },
});
