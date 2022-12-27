import { StyleSheet, ListRenderItemInfo } from "react-native";
import React from "react";
import { HStack, Image, Text, View, VStack } from "native-base";
import { Movie } from "../screens/HomeScreen";

const MoviesCard = ({ item }: ListRenderItemInfo<Movie>) => {
  return (
    <VStack>
      <Text>{item.title}</Text>
      {/* <Text>{item.poster_path}</Text> */}
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} height={100} width={100} alt="Test" />
    </VStack>
  );
};

export default MoviesCard;

const styles = StyleSheet.create({});
