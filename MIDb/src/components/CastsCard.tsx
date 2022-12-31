import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HStack, Image, Pressable, VStack } from "native-base";
import { RootStackParamList, States } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  item: States["cast"];
  page: string;
}

const CastsCard = ({ item, page }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getAvatar = (image: States["cast"]["profile_path"]) => {
    if (image == null) return "https://dummyimage.com/185x185/181818/878787&text=avatar_img";
    return `https://image.tmdb.org/t/p/w185/${image}`;
  };

  return (
    <Pressable onPress={() => navigation.push("CastDetail", { id: item.id })}>
      <HStack style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: getAvatar(item.profile_path) }} style={styles.avatar} alt={item.name} resizeMode="cover" />
        </View>
        <VStack style={styles.informartion}>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.popularity}>{page === "credit" ? `as ${item.character}` : `Popularity: ${item.popularity}`}</Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default CastsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    borderRadius: 30,
    // backgroundColor: "tomato",
    backgroundColor: "#111",
    marginHorizontal: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    overflow: "hidden",
  },
  avatar: {
    flex: 1,
  },
  informartion: {
    justifyContent: "center",
    paddingLeft: 20,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: "#f3f3f3",
    marginBottom: 10,
  },
  popularity: {
    fontWeight: "700",
    fontSize: 12,
    color: "#878787",
  },
});
