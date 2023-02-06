import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./AuthStack";
import BottomTabs from "./Tabs";

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      {/* <AuthStackScreen /> */}
      <BottomTabs />
    </NavigationContainer>
  );
};
