import { StyleSheet, ListRenderItemInfo } from "react-native";
import React, { useEffect, useState } from "react";
import type { RootTabScreenProps } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View } from "native-base";
import MoviesCard from "../components/MoviesCard";

const HomeScreen = ({ navigation, route }: RootTabScreenProps<"Home">) => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
