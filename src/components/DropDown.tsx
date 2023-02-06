import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const SpecializationDropDown = () => {
  const [specialization, setSpecialization] = useState<any>([]);

  const api = useMemo(() => {
    return axios.create({
      baseURL: "http://192.168.100.30:3000",
    });
  }, []);

  useEffect(() => {
    api
      .get("/specialization/all")
      .then((res: any) => {
        setSpecialization(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
      disableBorderRadius={true}
    />
  );
};

export default SpecializationDropDown;
