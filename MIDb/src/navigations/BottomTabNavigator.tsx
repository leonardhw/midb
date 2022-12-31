import React from "react";
import { StyleSheet } from "react-native";
import { RootTabParamList } from "../../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoviesListScreen from "../screens/MoviesListScreen";
import CastsListScreen from "../screens/CastsListScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "native-base";
import { COLORS } from "../constants";

const Tab = createBottomTabNavigator<RootTabParamList>();

type Props = {};

const BottomTabNavigator = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="MoviesList"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            color = "white";
            if (route.name === "MoviesList") {
              iconName = "movie";
              color = focused ? COLORS.primary : COLORS.dark_gray;
            } else if (route.name === "CastsList") {
              iconName = "account-multiple";
              color = focused ? COLORS.primary : COLORS.dark_gray;
            }
            return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
          },
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        };
      }}
    >
      <Tab.Screen name="MoviesList" component={MoviesListScreen} options={{ title: "Movies" }} />
      <Tab.Screen name="CastsList" component={CastsListScreen} options={{ title: "Stars" }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    backgroundColor: COLORS.dark,
    position: "absolute",
    bottom: 5,
    left: 10,
    right: 10,
    elevation: 0,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
