import { StyleSheet, Text, View } from "react-native";
import React from "react";
import type { RootTabScreenProps } from "../../types";

const HomeScreen = ({ navigation, route }: RootTabScreenProps<"Home">) => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
