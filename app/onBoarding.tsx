import React, { useRef } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Swiper from "react-native-swiper";
import CustomButton from "@/components/Button";
import { router } from 'expo-router';

const slides = [
  {
    key: "slide1",
    text: "Add your voice to Improving Water and Sanitation, Earn Rewards.",
    image: require("../assets/images/slide1.png"),
  },
  {
    key: "slide2",
    text: "Explore up-to-date data on water quality and project statuses.",
    image: require("../assets/images/slide2.png"),
  },
  {
    key: "slide3",
    text: "",
    image: require("../assets/images/slide3.png"),
    overlay: true,
    subText: "Collaborate to enhance water quality and sanitation.",
  },
];

export default function OnboardingSwiper() {
  const swiperRef = useRef<Swiper | null>(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleGetStarted = () => {
    router.push("/sign-in");
  };

  const handleContinueAsGuest = () => {
    return;
    // router.push("/");
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        renderPagination={(index, total) => (
          <View style={styles.paginationContainer}>
            {Array.from({ length: total }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  index === i && styles.activeDot,
                  index === slides.length - 1 && styles.whiteDot, // Change to white on the last slide
                  index === i && index === slides.length - 1 && styles.whiteActiveDot // Active dot also changes to white
                ]}
              />
            ))}
          </View>
        )}
      >
        {slides.map((slide, index) => (
          <ImageBackground
            key={slide.key}
            source={slide.image}
            style={[
              styles.backgroundImage,
              index !== slides.length - 1 ? { height: "50%", width: "100%" } : null,
            ]}
            resizeMode="cover"
          >
            <View style={slide.overlay ? styles.overlayLast : styles.overlay}>
              <Text style={styles.text}>{slide.text}</Text>
              {slide.subText && (
                <Text className="text-sm text-center text-white w-3/4" style={{ fontFamily: 'Lora' }}>
                  {slide.subText}
                </Text>
              )}
              {index < slides.length - 1 ? (
                <CustomButton
                  title="Next"
                  onPress={handleNext}
                  style={styles.button}
                  textStyle={{ fontSize: 18 }}
                />
              ) : (
                <>
                  <Text className="text-[27px] absolute -top-60 text-center text-white mb-80 w-[300px]"
                  style={{fontFamily: 'Lora'}}>
                    Revitalize our water sources for a healthier planet
                  </Text>
                  <CustomButton
                    title="Get Started"
                    onPress={handleGetStarted}
                    style={styles.buttonGetStarted}
                    textStyle={{ fontSize: 18 }}
                  />
                  <CustomButton
                    title="Continue as Guest"
                    onPress={handleContinueAsGuest}
                    style={styles.buttonGuest}
                    textStyle={{ fontSize: 18, color: '#0258D3' }}
                  />
                </>
              )}
            </View>
          </ImageBackground>
        ))}
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#06276E",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'Lora',
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
  whiteDot: {
    backgroundColor: "#fff", // White dots on the last slide
  },
  whiteActiveDot: {
    backgroundColor: "#fff", // White active dot on the last slide
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
  },
});
