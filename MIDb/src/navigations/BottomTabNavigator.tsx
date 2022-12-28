import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { StyleSheet } from "react-native";
import CastStackNavigator from "./CastStackNavigator";
import MovieStackNavigator from "./MovieStackNavigator";
import { RootTabParamList } from "../../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoviesListScreen from "../screens/MoviesListScreen";
import CastsListScreen from "../screens/CastsListScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

type Props = {};

const BottomTabNavigator = (props: Props) => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MoviesList" component={MoviesListScreen} />
      <Tab.Screen name="CastsList" component={CastsListScreen} />
    </Tab.Navigator>
    // <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    //   <Tab.Screen name="Home" component={HomeScreen} />
    //   <Tab.Screen name="MovieStackNavigator" component={MovieStackNavigator} />
    //   <Tab.Screen name="CastStackNavigator" component={CastStackNavigator} />
    // </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
