import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { TextInput, Button, RadioButton, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../constants/Api";
import * as Animatable from "react-native-animatable";

const HireLawyer = ({ visible, onClose, lawyer_id }: any) => {
  const [data, setData] = useState({
    date: new Date(),
    caseDescription: "",
    caseTitle: "",
    AppointmentType: "",
    status: "Pending",
  });
  const [fadeAnim] = useState(new Animated.Value(0));

  const [showDatePicker, setShowDatePicker] = useState(false);

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const handleHire = async () => {
    try {
      const response = await api.post("/appointments", {
        ...data,
        lawyer_id,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate !== undefined) {
      setData({ ...data, date: selectedDate });
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent
      hardwareAccelerated
      statusBarTranslucent
    >
      <Animated.View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <ScrollView>
            <Animatable.View
              animation="fadeIn"
              delay={300}
              style={styles.inputContainer}
            >
              <TextInput
                label="Case Description"
                value={data.caseDescription}
                onChangeText={(text) =>
                  setData({ ...data, caseDescription: text })
                }
                style={styles.input}
              />
            </Animatable.View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Case Title"
                value={data.caseTitle}
                onChangeText={(text) => setData({ ...data, caseTitle: text })}
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dateInput}
                >
                  <MaterialIcons name="date-range" size={20} />
                  <Text style={styles.dateButtonText}>
                    {data.date.toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={data.date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.radioLabel}>Appointment Method</Text>
              <View style={styles.radioContainer}>
                <View style={styles.radioRow}>
                  <RadioButton
                    value="in-person"
                    status={
                      data.AppointmentType === "in-person"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() =>
                      setData({ ...data, AppointmentType: "PHYSICAL" })
                    }
                  />
                  <Text>In-Person</Text>
                </View>
                <View style={styles.radioRow}>
                  <RadioButton
                    value="video-call"
                    status={
                      data.AppointmentType === "video-call"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() =>
                      setData({ ...data, AppointmentType: "VIRTUAL" })
                    }
                  />
                  <Text>Video Call</Text>
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Button mode="contained" onPress={handleHire}>
                Submit
              </Button>
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  dateButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#333",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10,
    textAlign: "center",
  },
});

export default HireLawyer;
