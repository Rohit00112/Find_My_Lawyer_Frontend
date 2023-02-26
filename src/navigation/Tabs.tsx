import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { BottomTabParamList } from "./types";
import { Ionicons } from "@expo/vector-icons";
import ChatList from "../screens/ChatList";
import { useRoute } from "@react-navigation/native";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationSCreen from "../screens/NotificationScreen";

export default function BottomTabs() {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  const TabArr = [
    { name: "Home", component: HomeScreen, icon: "home" },
    { name: "Chat", component: ChatList, icon: "chatbox" },
    {
      name: "Notifications",
      component: NotificationSCreen,
      icon: "notifications",
    },
    { name: "Settings", component: SettingsScreen, icon: "settings" },
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
            headerShown: false,
            tabBarBadge:
              tab.name === "Notifications"
                ? 3
                : tab.name === "Chat"
                ? 1
                : undefined,
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
