import React from "react";
import CastsListScreen from "../screens/CastsListScreen";
import CastDetailScreen from "../screens/CastDetailScreen";
import { CastStackParamList } from "../../types";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<CastStackParamList>();

type Props = {};

const CastStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Casts" component={CastsListScreen} />
      <Stack.Screen name="CastDetail" component={CastDetailScreen} />
    </Stack.Navigator>
  );
};

export default CastStackNavigator;

const styles = StyleSheet.create({});
