import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/Button";

export default function OnboardingSwiper() {
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        loop={false}
        showsPagination={true} 
        dotStyle={styles.dot} 
        activeDotStyle={styles.activeDot}
        renderPagination={(index, total) => (
          <View style={styles.paginationContainer}>
            {Array.from({ length: total }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  index === i ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>
        )}
      >
        {/* First Slide with Background Image */}
        <ImageBackground
          source={require("../assets/images/slide1.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Add your voice to Improving Water and Sanitation, Earn Rewards.</Text>
            <CustomButton
            title="Next"
            onPress={() => console.log("Button Pressed!")}
            style={styles.button}
            textStyle={{ fontSize: 18 }}
          />
          </View>
        </ImageBackground>

        {/* Second Slide with Background Image */}
        <ImageBackground
          source={require("../assets/images/slide2.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Explore up-to-date data on water quality and project statuses.</Text>
            <CustomButton
            title="Next"
            onPress={() => console.log("Button Pressed!")}
            style={styles.button}
            textStyle={{ fontSize: 18 }}
            />
          </View>
        </ImageBackground>

        {/* Third Slide with Background Image */}
        <ImageBackground
          source={require("../assets/images/slide3.png")}
          style={styles.backgroundImage}
        >
          <Text className="text-[24px] text-center text-white mb-80 w-4/5">Revitalize our water sources for a healthier planet</Text>
          <View style={styles.overlayLast}>
            <Text className="text-sm text-center text-white w-3/4">Collaborate to enhance water quality and sanitation.</Text>
            <CustomButton
            title="Get Started"
            onPress={() => console.log("Button Pressed!")}
            style={styles.buttonGetStarted}
            textStyle={{ fontSize: 18 }}
            />
            <CustomButton
            title="Continue as Guest"
            onPress={() => console.log("Button Pressed!")}
            style={styles.buttonGuest}
            textStyle={{ fontSize: 18, color: 'blue' }}
            />
          </View>
        </ImageBackground>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "white",  // Optional overlay for text readability
    padding: 20,
    borderRadius: 10,
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLast: {
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 10,
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "blue",
    fontSize: 32,
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
    width: 24, 
    height: 8, 
    borderRadius: 4,
    margin: 3,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 400,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: 'absolute',
    bottom: 28,
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonGuest: {
    position: 'absolute',
    bottom: 28,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonGetStarted: {
    position: 'absolute',
    bottom: 88,
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
