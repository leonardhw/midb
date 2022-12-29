import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, Pressable } from "native-base";
import { RootNavigationProps, States } from "../../types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  item: States["casts"];
}

const CastsCard = ({ item }: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("CastDetail", { id: item.id })}>
      <View>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}` }} height={100} width={100} alt="Test" />
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
        <Text>{item.popularity}</Text>
      </View>
    </Pressable>
  );
};

export default CastsCard;

const styles = StyleSheet.create({});
