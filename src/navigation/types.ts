import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Chat: undefined;
};

export type BottomTabNavProp = NativeStackNavigationProp<BottomTabParamList>;

export type AuthStackNavProp = NativeStackNavigationProp<AuthStackParamList>;
