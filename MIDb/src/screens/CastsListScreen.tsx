import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootTabScreenProps } from "../../types";

const CastsListScreen = ({ navigation, route }: RootTabScreenProps<"Casts">) => {
  return (
    <View>
      <Text>CastsListScreen</Text>
    </View>
  );
};

export default CastsListScreen;

const styles = StyleSheet.create({});
