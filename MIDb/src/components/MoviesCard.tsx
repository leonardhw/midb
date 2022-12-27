import { StyleSheet, ListRenderItemInfo } from "react-native";
import React from "react";
import { HStack, Image, Pressable, Text, View, VStack } from "native-base";
import { Movie } from "../screens/MoviesListScreen";

const MoviesCard = ({ item, navigation }: ListRenderItemInfo<Movie>) => {
  return (
    <Pressable onPress={() => navigation.navigate("MovieDetail", { id: item.id })}>
      <View>
        <Text>{item.title}</Text>
        <Text>{item.id}</Text>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} height={100} width={100} alt="Test" />
      </View>
    </Pressable>
  );
};

export default MoviesCard;

const styles = StyleSheet.create({});
