import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { BottomTabParamList } from "./types";
import { Ionicons } from "@expo/vector-icons";
import ChatList from "../screens/ChatList";
import { useRoute } from "@react-navigation/native";

export default function BottomTabs() {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  const TabArr = [
    { name: "Home", component: HomeScreen, icon: "home" },
    { name: "Chat", component: ChatList, icon: "chatbox" },
    { name: "Profile", component: ProfileScreen, icon: "person" },
  ];

  const route = useRoute();

  return (
    <Tab.Navigator initialRouteName="Home">
      {TabArr.map((tab: any) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          initialParams={route.params}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? tab.icon : `${tab.icon}-outline`}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
