import { StyleSheet, ListRenderItemInfo } from "react-native";
import React from "react";
import { HStack, Image, Pressable, Text, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MovieStackScreenProps, RootNavigationProps, States } from "../../types";

interface Props {
  item: States["movies"];
}

const MoviesCard = ({ item }: Props) => {
  const navigation = useNavigation();

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
