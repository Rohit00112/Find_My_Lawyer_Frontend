import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Button,
  TextInput,
  Divider,
} from "react-native-paper";

const HireLawyer = ({ navigation, route }: any) => {
  const [lawyer, setLawyers] = useState<any>({});
  const [caseTitle, setCaseTitle] = useState("");
  const [caseDescription, setCaseDescription] = useState("");

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

  const handleSubmit = () => {
    console.log(
      `Lawyer ${lawyer.name} has been hired for case "${caseTitle}" with description "${caseDescription}"`
    );
    setLawyers((prevLawyers: any) =>
      prevLawyers.filter((l: any) => l.id !== lawyer.id)
    );
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Avatar.Image size={100} source={{ uri: lawyer.image }} />
        <Title style={{ marginTop: 20 }}>{lawyer.name}</Title>
        <Paragraph>Specialization: {lawyer.specialization}</Paragraph>
        <Paragraph>Experience: {lawyer.experience}</Paragraph>
        <Divider style={{ marginVertical: 20 }} />
        <Title>Case Information</Title>
        <TextInput
          label="Case Title"
          value={caseTitle}
          onChangeText={setCaseTitle}
          style={{ marginVertical: 20 }}
        />
        <TextInput
          label="Case Description"
          value={caseDescription}
          onChangeText={setCaseDescription}
          style={{ marginVertical: 20 }}
          multiline={true}
          numberOfLines={4}
        />
        <Button
          mode="contained"
          style={{ marginVertical: 20 }}
          onPress={handleSubmit}
        >
          Hire Lawyer
        </Button>
      </ScrollView>
    </View>
  );
};

export default HireLawyer;
