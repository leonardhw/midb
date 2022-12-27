import React from "react";
import MoviesListScreen from "../screens/MoviesListScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import { MovieStackParamList } from "../../types";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type Props = {};

const Stack = createNativeStackNavigator<MovieStackParamList>();

const MovieStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movies" component={MoviesListScreen} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
};

export default MovieStackNavigator;

const styles = StyleSheet.create({});
