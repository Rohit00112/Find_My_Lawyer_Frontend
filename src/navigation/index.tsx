import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-ionicons";
import CameraScreen from "../components/Camera";
import ChatScreen from "../screens/ChatScreen";
import AuthStackScreen from "./AuthStack";
import BottomTabs from "./Tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-paper";
import LawyerProfile from "../screens/LawyerProfile";
import HireLawyer from "../screens/HireLawyer";

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
              headerShown: true,
              headerTitle: "Chat",
              headerRight: () => {
                return (
                  <>
                    <MaterialCommunityIcons
                      name="phone"
                      size={24}
                      color="black"
                      style={{ marginRight: 10 }}
                    />

                    <MaterialCommunityIcons
                      name="video-plus"
                      size={24}
                      color="black"
                      style={{ marginRight: 10 }}
                    />
                  </>
                );
              },
              headerLeft: () => {
                return (
                  <Avatar.Image
                    source={{
                      uri: "https://picsum.photos/700",
                    }}
                    size={36}
                  />
                );
              },
              headerBackVisible: true,
            }}
          />
          <RootStack.Screen name="LawyerProfile" component={LawyerProfile} />
          <RootStack.Screen name="HireLawyer" component={HireLawyer} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}
