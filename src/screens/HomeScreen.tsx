import axios from "axios";
import React, { useMemo, useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Button, Card, Title, Paragraph, IconButton } from "react-native-paper";
import { API_URL } from "../constants/Api";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState("");

 
  const lawyers = [
    {
      id: 1,
      name: "Lawyer 1",
      specialization: "Business Law",
      experience: "10 years",
      image: "https://picsum.photos/700",
    },
    {
      id: 2,
      name: "Lawyer 2",
      specialization: "Criminal Law",
      experience: "5 years",
      image: "https://picsum.photos/700",
    },
    {
      id: 3,
      name: "Lawyer 3",
      specialization: "Criminal Law",
      experience: "5 years",
      image: "https://picsum.photos/700",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton icon="magnify" size={24} onPress={() => {}} />
        <TextInput
          style={{
            flex: 1,
            paddingLeft: 10,
            fontSize: 18,
            color: "#333",
          }}
          placeholder="Search for a lawyer"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        {lawyers.map((lawyer) => (
          <Card key={lawyer.id} style={{ marginBottom: 20 }}>
            <Card.Cover source={{ uri: lawyer.image }} />
            <Card.Content>
              <Title>{lawyer.name}</Title>
              <Paragraph>Specialization: {lawyer.specialization}</Paragraph>
              <Paragraph>Experience: {lawyer.experience}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate("LawyerProfile", { lawyerId: lawyer.id })
                }
              >
                View Profile
              </Button>
              <Button mode="outlined">Hire</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
