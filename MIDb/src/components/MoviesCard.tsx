import { StyleSheet } from "react-native";
import React from "react";
import { HStack, Image, Pressable, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, States } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { getDate, getPoster, getRating } from "../utils";

interface Props {
  item: States["movie"];
}

const MoviesCard = ({ item }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.push("MovieDetail", { id: item.id })}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: getPoster(item.poster_path) }} alt={item.title} style={styles.image} resizeMode="cover" />
        </View>

        <HStack style={styles.ratingContainer}>
          <AntDesign name="star" size={10} color={COLORS.rating} />
          <Text style={styles.rating}>{getRating(item.vote_average)}</Text>
        </HStack>

        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={styles.subTitle}>{getDate(item.release_date?.toString())}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MoviesCard;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    marginVertical: 15,
    flexWrap: "wrap",
    width: 500 / 3,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    borderRadius: 15,
    width: 500 / 3,
    height: 750 / 3,
  },
  ratingContainer: {
    position: "absolute",
    zIndex: 3,
    top: 5,
    right: 5,
    backgroundColor: COLORS.dark,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.rating,
    marginLeft: 5,
  },
  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.white,
    marginTop: 20,
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 12,
    color: COLORS.dark_gray,
  },
});
