import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegisterScreen";
import { AuthStackParamList } from "./types";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="Home" component={HomeScreen} />
    </AuthStack.Navigator>
  );
}
