import { StyleSheet, ListRenderItemInfo, Dimensions } from "react-native";
import React from "react";
import { HStack, Image, Pressable, Text, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps, RootStackParamList, States } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

interface Props {
  item: States["movie"];
}

const MoviesCard = ({ item }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getDate = (date: any) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [year, month, day] = date.split("-");

    return `${months[Number(month) - 1]} ${day}, ${year}`;
  };

  return (
    <Pressable onPress={() => navigation.push("MovieDetail", { id: item.id })}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} alt={item.title} style={styles.image} />
        </View>

        <HStack style={styles.ratingContainer}>
          <AntDesign name="star" size={12} color="#f5b754" />
          <Text style={styles.rating}>{item.vote_average}</Text>
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
    // flex: 1 / 2,
    marginVertical: 15,
    flexWrap: "wrap",
    width: 500 / 3,
    // padding: 5,
    // alignItems: "center",
    // justifyContent: "center",
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
    top: 0,
    right: 0,
    backgroundColor: "#181818",
    padding: 10,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 15,
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f5b754",
    marginLeft: 5,
  },
  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#f3f3f3",
    marginTop: 20,
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 12,
    color: "#878787",
  },
});
