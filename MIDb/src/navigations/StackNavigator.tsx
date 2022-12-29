import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CastDetailScreen from "../screens/CastDetailScreen";
import { RootStackParamList } from "../../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import BottomTabNavigator from "./BottomTabNavigator";

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = (props: Props) => {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigator" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      <Stack.Screen name="CastDetail" component={CastDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
