import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { ActivityIndicator, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface Props {
  baseUrl: string;
}

const SpecializationDropDown = ({ baseUrl }: Props) => {
  const [specialization, setSpecialization] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useMemo(() => {
    return axios.create({
      baseURL: baseUrl,
    });
  }, [baseUrl]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/specialization/all")
      .then((res: any) => {
        setSpecialization(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  if (loading) {
    return <ActivityIndicator style={styles.loadingIndicator} />;
  }

  if (error) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <DropDownPicker
      items={specialization.map((item: any) => ({
        label: item.name,
        value: item.id,
      }))}
      open={open}
      value={value}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setSpecialization}
      placeholder="Select Specialization"
      listMode="SCROLLVIEW"
      containerStyle={{ height: 70 }}
      style={{
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderColor: "#ccc",
      }}
    />
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginVertical: 10,
  },
});

export default SpecializationDropDown;
