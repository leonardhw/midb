import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CastStackScreenProps } from "../../types";

const CastsListScreen = ({ navigation, route }: CastStackScreenProps<"Casts">) => {
  return (
    <View>
      <Text>CastsListScreen</Text>
    </View>
  );
};

export default CastsListScreen;

const styles = StyleSheet.create({});
