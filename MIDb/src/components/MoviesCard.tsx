import { StyleSheet, ListRenderItemInfo } from "react-native";
import React from "react";
import { HStack, Image, Pressable, Text, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps, RootStackParamList, States } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  item: States["movie"];
}

const MoviesCard = ({ item }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.push("MovieDetail", { id: item.id })}>
      <View>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} height={100} width={100} alt="Test" />
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
        <Text>{item.vote_average}</Text>
      </View>
    </Pressable>
  );
};

export default MoviesCard;

const styles = StyleSheet.create({});
