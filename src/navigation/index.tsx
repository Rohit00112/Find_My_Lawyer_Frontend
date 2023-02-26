import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "../components/Camera";
import ChatScreen from "../screens/ChatScreen";
import AuthStackScreen from "./AuthStack";
import BottomTabs from "./Tabs";
import { Avatar } from "react-native-paper";
import LawyerProfile from "../screens/LawyerProfile";
import HireLawyer from "../screens/HireLawyer";
import LawyerHome from "../screens/LawyerHome";
import SearchScreen from "../screens/SearchScreen";

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="HomeMain"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Camera"
            component={CameraScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="LawyerProfile"
            component={LawyerProfile}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen name="HireLawyer" component={HireLawyer} />
          <RootStack.Screen name="Search" component={SearchScreen} />
          <RootStack.Screen name="LawyerHome" component={LawyerHome} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}
