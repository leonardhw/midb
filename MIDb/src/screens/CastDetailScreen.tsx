import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CastStackScreenProps } from "../../types";

type Props = {};

const CastDetailScreen = ({ navigation, route }: CastStackScreenProps<"Casts">) => {
  return (
    <View>
      <Text>CastDetailScreen</Text>
    </View>
  );
};

export default CastDetailScreen;

const styles = StyleSheet.create({});
