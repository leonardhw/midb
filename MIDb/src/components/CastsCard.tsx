import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, Pressable } from "native-base";
import { RootNavigationProps, RootStackParamList, States } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  item: States["cast"];
}

const CastsCard = ({ item }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.push("CastDetail", { id: item.id })}>
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
