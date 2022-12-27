import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootTabScreenProps } from "../../types";

const MoviesListScreen = ({ navigation, route }: RootTabScreenProps<"Movies">) => {
  return (
    <View>
      <Text>MoviesListScreen</Text>
    </View>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({});
