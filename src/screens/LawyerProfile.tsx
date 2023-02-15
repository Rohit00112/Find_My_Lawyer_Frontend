import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Button,
  Card,
  Divider,
} from "react-native-paper";

const LawyerProfile = ({ navigation, route }: any) => {
  const [lawyer, setLawyers] = useState<any>({});
  useEffect(() => {
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
    const selectedLawyer = lawyers.find(
      (lawyer: any) => lawyer.id === route.params.lawyerId
    );
    setLawyers(selectedLawyer);
  }, []);

  const handleHire = () => {
    navigation.navigate("HireLawyer", { lawyerId: route.params.lawyerId });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Avatar.Image size={100} source={{ uri: lawyer.image }} />
        <Title style={{ marginTop: 20 }}>{lawyer.name}</Title>
        <Paragraph>Specialization: {lawyer.specialization}</Paragraph>
        <Paragraph>Experience: {lawyer.experience}</Paragraph>
        <Divider style={{ marginVertical: 20 }} />
        <Title>About Me</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet,
          velit non tincidunt viverra, odio libero commodo odio, vel scelerisque
          sapien nulla id massa. Proin viverra consectetur metus, in malesuada
          elit iaculis quis. Nullam tempor laoreet massa et rutrum.
        </Paragraph>
        <Divider style={{ marginVertical: 20 }} />
        <Title>Education</Title>
        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Title>Law School</Title>
            <Paragraph>University of XYZ</Paragraph>
            <Paragraph>Graduated in 2010</Paragraph>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          style={{ marginVertical: 20 }}
          onPress={handleHire}
        >
          Hire Lawyer
        </Button>
      </ScrollView>
    </View>
  );
};

export default LawyerProfile;
