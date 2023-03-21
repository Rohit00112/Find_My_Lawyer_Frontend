import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import { Button, Card, Title } from "react-native-paper";
import { useFonts, Comfortaa_400Regular } from "@expo-google-fonts/comfortaa";
import AppLoading from "expo-app-loading";
import { AirbnbRating } from "react-native-ratings";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import axios from "axios";
import { API_URL } from "../constants/Api";

const SearchScreen = ({ navigation }: any) => {
  let [fontsLoaded] = useFonts({ Comfortaa_400Regular });

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const [search, setSearch] = React.useState("");
  const [filteredLawyers, setFilteredLawyers] = React.useState([]);
  const [lawyers, setLawyers] = React.useState([]);

  const fetchLawyers = async (searchParams?: string) => {
    let url = "/lawyers";
    if (searchParams) {
      url += `?search=${searchParams}`;
    }
    const response = await api.get(url);
    for (let i = 0; i < response.data.length; i++) {
      const rating = await api.get(
        `/lawyers/${response.data[i].lawyer_id}/rating`
      );
      const speciality = response.data[i].Specialization.name;
      const image = response.data[i].user.profileImageURL;
      response.data[i].rating = rating.data;
      response.data[i].speciality = speciality;
      response.data[i].image = image;
      console.log(response.data[i].image);
    }
    setLawyers(response.data);
    console.log(response.data);
  };

  React.useEffect(() => {
    fetchLawyers();
  }, []);

  React.useEffect(() => {
    if (search) {
      const filtered = lawyers.filter(
        (lawyer: any) =>
          lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
          lawyer.speciality.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredLawyers(filtered);
    } else {
      setFilteredLawyers([]);
    }
  }, [search, lawyers]);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

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
              <AirbnbRating
                count={5}
                defaultRating={item.rating}
                size={15}
                isDisabled={true}
                showRating={false}
                selectedColor="#FFD700"
              />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Search</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for lawyers"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View style={styles.lawyerContainer}>
          <FlatList
            data={filteredLawyers.length ? filteredLawyers : lawyers}
            renderItem={({ item }) => renderLawyers(item)}
            keyExtractor={(item: any) => item.lawyer_id}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Comfortaa_400Regular",
  },
  searchContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: "90%",
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingLeft: 10,
  },
  lawyerContainer: {
    flex: 1,
    marginTop: 10,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardDetails: {
    marginLeft: 10,
    justifyContent: "center",
  },
  cardName: {
    fontSize: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  cardSpecialty: {
    fontSize: 15,
    fontFamily: "Comfortaa_400Regular",
  },
  cardExperience: {
    fontSize: 15,
    fontFamily: "Comfortaa_400Regular",
  },
});

export default SearchScreen;
