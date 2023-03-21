import React, { useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { Card, Title, List, IconButton, Modal } from "react-native-paper";
import { useFonts, Comfortaa_400Regular } from "@expo-google-fonts/comfortaa";
import AppLoading from "expo-app-loading";
import { AirbnbRating } from "react-native-ratings";
import axios from "axios";
import { API_URL } from "../constants/Api";
import HireLawyer from "./HireLawyer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LawyerProfile = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { lawyer_id } = route.params.lawyer;
  console.log(lawyer_id);

  let [fontsLoaded] = useFonts({ Comfortaa_400Regular });

  console.log(route.params);

  const lawyer = route.params.lawyer;

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const [practiceAreas, setPracticeAreas] = React.useState([]);

  const practiceArea = async () => {
    try {
      const response = await api.get(
        `/lawyers/${lawyer.lawyer_id}/practice-areas`
      );
      setPracticeAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrUser();
  }, []);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
        <View style={styles.heroImageContainer}>
          <Image
            source={{ uri: lawyer.image }}
            style={styles.heroImage}
          ></Image>
        </View>
        <View style={styles.detailsContainer}>
          <Title style={styles.name}>{lawyer.name}</Title>
          <Text style={styles.specialty}>{lawyer.speciality}</Text>
          <Text style={styles.experience}>
            {lawyer.Experience} years of experience
          </Text>
          <View style={styles.rating}>
            <AirbnbRating
              count={5}
              defaultRating={lawyer.rating}
              size={20}
              isDisabled
              showRating={false}
            />
          </View>
        </View>
        <View style={styles.contactContainer}>
          <Title style={styles.contactHeader}>Contact {lawyer.name}</Title>
          <View style={styles.contactRow}>
            <IconButton
              icon="phone"
              size={20}
              onPress={() => Linking.openURL(`tel:${lawyer.phone}`)}
            />
            <Text style={styles.contactText}>{lawyer.phone}</Text>
            <IconButton
              icon="email"
              size={20}
              onPress={() => Linking.openURL(`mailto:${lawyer.email}`)}
            />
            <Text style={styles.contactText}></Text>
            <IconButton
              icon="web"
              size={20}
              onPress={() => Linking.openURL(`${lawyer.website}`)}
            />
            <Text style={styles.contactText}>{lawyer.website}</Text>
            <IconButton
              icon="map-marker"
              size={20}
              onPress={() => Linking.openURL(`${lawyer.address}`)}
            />
            <Text style={styles.contactText}>{lawyer.address}</Text>
            <IconButton
              icon="chat"
              size={20}
              onPress={() => {
                navigation.navigate("ChatScreen", { lawyer: lawyer });
              }}
            />
            <IconButton
              icon="account-plus"
              size={20}
              onPress={() => setIsModalVisible(true)}
            />
            <Modal
              visible={isModalVisible}
              onDismiss={handleModalClose}
              style={styles.modal}
            >
              <HireLawyer
                visible={isModalVisible}
                onClose={handleModalClose}
                lawyer_id={lawyer_id}
              />
            </Modal>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Title style={styles.descriptionHeader}>About {lawyer.name}</Title>
          <Text style={styles.descriptionText}>{lawyer.Bio}</Text>
        </View>
        <View style={styles.caseContainer}>
          <Title style={styles.caseHeader}>Recent Cases</Title>
          <Card style={styles.caseCard}>
            <Card.Title title="John Doe vs. Jane Doe" />
            <Card.Content>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                tempor, justo nec fringilla imperdiet, sem ex mattis diam, eget
                aliquet tellus est at leo. Donec consectetur, quam at porta
                elementum, sapien neque blandit risus, vitae varius enim est sed
                sapien. Nam sed fringilla sapien. Duis at maximus velit, vel
                aliquet mauris.
              </Text>
              <Card.Title title="Outcome" />
              <Text>
                Status: Won <Text style={styles.outcomeWon}>✓</Text>
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.caseCard}>
            <Card.Title title="John Doe vs. Jane Doe" />
            <Card.Content>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                tempor, justo nec fringilla imperdiet, sem ex mattis diam, eget
                aliquet tellus est at leo. Donec consectetur, quam at porta
                elementum, sapien neque blandit risus, vitae varius enim est sed
                sapien. Nam sed fringilla sapien. Duis at maximus velit, vel
                aliquet mauris.
              </Text>
              <Card.Title title="Outcome" />
              <Text>
                Status: Lost <Text style={styles.outcomeLost}>✗</Text>
              </Text>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.listContainer}>
          <Title style={styles.listHeader}>Areas of Practice</Title>
          <List.Section>
            <List.Accordion
              title="Criminal Law"
              left={(props) => <List.Icon {...props} icon="gavel" />}
            >
              <List.Item title="Murder" />
              <List.Item title="Theft" />
              <List.Item title="Drugs" />
              <List.Item title="Fraud" />
            </List.Accordion>
            <List.Accordion
              title="Family Law"
              left={(props) => <List.Icon {...props} icon="account-multiple" />}
            >
              <List.Item title="Divorce" />
              <List.Item title="Custody" />
              <List.Item title="Adoption" />
              <List.Item title="Child Support" />
            </List.Accordion>
            <List.Accordion
              title="Immigration Law"
              left={(props) => <List.Icon {...props} icon="airplane" />}
            >
              <List.Item title="Visa Applications" />
              <List.Item title="Green Cards" />
              <List.Item title="Asylum" />
              <List.Item title="Citizenship" />
            </List.Accordion>
            <List.Accordion
              title="Tax Law"
              left={(props) => <List.Icon {...props} icon="cash-multiple" />}
            >
              <List.Item title="Tax Preparation" />
              <List.Item title="Audits" />
              <List.Item title="Tax Evasion" />
              <List.Item title="IRS Disputes" />
            </List.Accordion>
          </List.Section>
          {/* map the response from the server from above function practiceAreas() */}
          {/* <List.Section>
            {practiceAreas.map((item) => (
              <List.Accordion
                title={item.name}
                left={(props) => <List.Icon {...props} icon="gavel" />}
              >
                {item.subAreas.map((subItem) => (
                  <List.Item title={subItem.name} />
                ))}
              </List.Accordion>
            ))}
          </List.Section> */}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  heroImageContainer: {
    width: "100%",
    height: 200,
    fontFamily: "Comfortaa_400Regular",
  },
  heroImage: {
    flex: 1,
    resizeMode: "cover",
    fontFamily: "Comfortaa_400Regular",
  },
  detailsContainer: {
    padding: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Comfortaa_400Regular",
  },
  specialty: {
    fontSize: 16,
    color: "#999",
    fontFamily: "Comfortaa_400Regular",
  },
  experience: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Comfortaa_400Regular",
  },
  rating: {
    marginBottom: 10,
    fontFamily: "Comfortaa_400Regular",
  },
  contactContainer: {
    padding: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  contactHeader: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Comfortaa_400Regular",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Comfortaa_400Regular",
  },
  contactText: {
    fontSize: 14,
    fontFamily: "Comfortaa_400Regular",
  },

  descriptionContainer: {
    padding: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  descriptionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Comfortaa_400Regular",
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Comfortaa_400Regular",
  },
  caseContainer: {
    padding: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  caseHeader: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Comfortaa_400Regular",
  },
  caseCard: {
    marginBottom: 10,
    fontFamily: "Comfortaa_400Regular",
  },
  outcomeWon: {
    color: "green",
    fontFamily: "Comfortaa_400Regular",
  },
  outcomeLost: {
    color: "red",
    fontFamily: "Comfortaa_400Regular",
  },
  listContainer: {
    padding: 20,
    fontFamily: "Comfortaa_400Regular",
  },
  listHeader: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Comfortaa_400Regular",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    fontFamily: "Comfortaa_400Regular",
  },
});

export default LawyerProfile;
