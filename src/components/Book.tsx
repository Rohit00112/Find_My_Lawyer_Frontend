import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Modal from "react-native-modal";

const BookingModal = ({ isVisible, onBook, onCancel }: any) => {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    // Call onBook function with input values
    onBook(name, contactInfo, reason);
    // Reset input values
    setName("");
    setContactInfo("");
    setReason("");
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.container}>
        <TextInput
          label="Your Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Contact Information"
          value={contactInfo}
          onChangeText={setContactInfo}
          style={styles.input}
        />
        <TextInput
          label="Reason for Appointment"
          value={reason}
          onChangeText={setReason}
          style={styles.input}
        />
        <View style={styles.buttonsContainer}>
          <Button mode="outlined" onPress={onCancel} style={styles.button}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Book Appointment
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: 10,
  },
});

export default BookingModal;
