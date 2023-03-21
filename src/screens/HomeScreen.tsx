import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button, Card, Title } from "react-native-paper";
import { useFonts, Comfortaa_400Regular } from "@expo-google-fonts/comfortaa";
import AppLoading from "expo-app-loading";
import { AirbnbRating } from "react-native-ratings";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import axios from "axios";
import { API_URL } from "../constants/Api";

const HomeScreen = ({ navigation }: any) => {
  let [fontsLoaded] = useFonts({ Comfortaa_400Regular });

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const fetchLawyers = async () => {
    const response = await api.get("/lawyers");
    for (let i = 0; i < response.data.length; i++) {
      const rating = await api.get(
        `/lawyers/${response.data[i].lawyer_id}/rating`
      );
      const speciality = response.data[i].Specialization.name;
      const image = response.data[i].user.profileImageURL;
      response.data[i].rating = rating.data;
      response.data[i].speciality = speciality;
      response.data[i].image = image;
    }
    setLawyers(response.data);
  };

  const [lawyers, setLawyers] = React.useState([
    {
      id: "",
      name: "",
      speciality: "",
      experience: "",
      image: "",
      rating: 0,
    },
  ]);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    fadeIn();
    fetchLawyers();
  }, []);

  const [width] = React.useState(
    new Animated.Value(Dimensions.get("window").width)
  );

  const renderLawyers = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("LawyerProfile", { lawyer: item })}
      >
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardSpecialty}>{item.speciality}</Text>
              <Text style={styles.cardExperience}>
                {item.Experience} years of experience
              </Text>
              <View style={styles.cardRating}>
                <AirbnbRating
                  count={5}
                  defaultRating={item.rating}
                  size={15}
                  isDisabled
                  showRating={false}
                />
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const onGestureEvent = React.useMemo(
    () =>
      Animated.event([{ nativeEvent: { translationX: width } }], {
        useNativeDriver: true,
      }),
    []
  );

  const onHandlerStateChange = (e: any) => {
    if (e.nativeEvent.oldState === State.ACTIVE) {
      let offsetX = e.nativeEvent.translationX;
      let x = offsetX - Dimensions.get("window").width;
      if (x > -50 && x < 0) {
        x = 0;
      }
      if (x < -50) {
        x = -Dimensions.get("window").width;
      }
      Animated.timing(width, {
        toValue: x,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
        <ImageBackground
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1661559051049-f9e147c7a90b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
          }}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.intro,
                { opacity: fadeAnim },
                {
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [150, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.title}>Find the Right Lawyer for You</Text>
              <Text style={styles.subtitle}>
                Get Legal Advice from Expert Lawyers in Your Area
              </Text>

              <Button
                mode="contained"
                style={styles.ctaButton}
                onPress={() => navigation.navigate("Search")}
              >
                Find a Lawyer
              </Button>
            </Animated.View>
          </View>
        </ImageBackground>

        <View style={styles.sectionContainer}>
          <Title style={styles.sectionTitle}>Top Lawyers</Title>
          <Animated.View
            style={[
              styles.swipeContainer,
              {
                width: width.interpolate({
                  inputRange: [-Dimensions.get("window").width, 0],
                  outputRange: [Dimensions.get("window").width, 0],
                }),
              },
            ]}
          >
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}
            >
              <View style={styles.swipeContent}>
                {lawyers.map((item) => renderLawyers(item))}
              </View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: 400,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  intro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Comfortaa_400Regular",
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  ctaButton: {
    backgroundColor: "#009387",
    color: "#000",
  },
  sectionContainer: {
    padding: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  card: {
    width: Dimensions.get("window").width - 40,
    marginBottom: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  cardContent: {
    flexDirection: "row",
    fontFamily: "Comfortaa_400Regular",
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 20,
    alignSelf: "center",
    fontFamily: "Comfortaa_400Regular",
  },
  cardDetails: {
    flex: 1,
    fontFamily: "Comfortaa_400Regular",
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Comfortaa_400Regular",
  },
  cardSpecialty: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Comfortaa_400Regular",
  },
  cardExperience: {
    fontSize: 14,
    color: "#999",
    fontFamily: "Comfortaa_400Regular",
  },
  cardRating: {
    marginTop: 10,
    fontFamily: "Comfortaa_400Regular",
    alignItems: "flex-start",
  },
  swipeContainer: {
    overflow: "hidden",
    fontFamily: "Comfortaa_400Regular",
  },
  swipeContent: {
    width: Dimensions.get("window").width,
    fontFamily: "Comfortaa_400Regular",
  },
  textInput: {
    backgroundColor: "#fff",
    width: "100%",
    fontFamily: "Comfortaa_400Regular",
  },
});

export default HomeScreen;
