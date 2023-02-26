import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const LawyerHome = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://picsum.photos/700" }}
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Find Your Lawyer</Title>
              <Paragraph style={styles.cardParagraph}>
                Search for lawyers based on their practice area, location, and
                availability.
              </Paragraph>
              <Button mode="contained" style={styles.button}>
                Find a Lawyer
              </Button>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Become a Lawyer</Title>
              <Paragraph style={styles.cardParagraph}>
                Join our platform as a lawyer and start getting hired by clients
                in your area.
              </Paragraph>
              <Button mode="contained" style={styles.button}>
                Sign Up as a Lawyer
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  cardParagraph: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#1c313a",
  },
});

export default LawyerHome;
