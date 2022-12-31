import { StyleSheet, Text, View, StatusBar, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { RootNavigationProps, States } from "../../types";
import axios from "../apis/axios";
import { FlatList, Image, ScrollView } from "native-base";
import MoviesCard from "../components/MoviesCard";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};
const { width, height } = Dimensions.get("screen");

const CastDetailScreen = ({ navigation, route }: RootNavigationProps<"CastDetail">) => {
  const { id: castId } = route.params;

  const [cast, setCast] = useState<States["cast"]>();
  const [credits, setCredits] = useState<States["movie"][]>();
  const [bookmark, setBookmark] = useState<boolean>(false);

  const bookmarkHandler = () => {
    setBookmark(!bookmark);
  };

  const getAvatar = (image: States["cast"]["profile_path"]) => {
    if (image == null) return "https://dummyimage.com/500x750/181818/878787&text=profile_img";
    return `https://image.tmdb.org/t/p/h632/${image}`;
  };

  const fetchCast = async () => {
    try {
      const { data } = await axios.get(`/3/person/${castId}`);
      setCast(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCredits = async () => {
    try {
      const { data } = await axios.get(`/3/person/${castId}/movie_credits`);
      setCredits(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCast();
    fetchCredits();
  }, []);

  const headerBar = () => {
    return (
      <View style={styles.headerBar}>
        {/* Back */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#f3f3f3" />
        </TouchableOpacity>

        {/* Bookmark */}
        <TouchableOpacity style={styles.backButton} onPress={bookmarkHandler}>
          <Ionicons name={bookmark ? "ios-bookmark" : "ios-bookmark-outline"} size={24} color="#f3f3f3" />
        </TouchableOpacity>
      </View>
    );
  };

  const headerSection = () => (
    <View>
      <ImageBackground source={{ uri: getAvatar(cast?.profile_path) }} style={styles.backdrop} resizeMode="cover">
        <View style={styles.headerBarContainer}>
          {headerBar()}
          <View style={styles.gradientContainer}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={["transparent", "#030303"]} style={styles.gradient}>
              <Text style={styles.title}>{cast?.name}</Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.movieDetails}>
        <Text style={styles.subHeaderText}>{cast?.biography}</Text>

        <Text style={[styles.subHeaderText, { marginTop: 10 }]}>Birthplace: {cast?.place_of_birth}</Text>

        <Text style={styles.sectionTitle}>The Cast</Text>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <FlatList data={credits} renderItem={({ item }) => <MoviesCard item={item} />} keyExtractor={(item: any) => item.id} ListHeaderComponent={headerSection} /> */}
      {/* {headerSection()} */}
      <View style={styles.container}>
        <FlatList data={credits} renderItem={({ item }) => <MoviesCard item={item} />} keyExtractor={(item: any) => item.id} numColumns={2} columnWrapperStyle={styles.row} contentContainerStyle={styles.listContainer} ListHeaderComponent={headerSection} />
      </View>
    </>
  );
};

export default CastDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030303",
  },
  backdrop: {
    width: "100%",
    height: height < 700 ? height * 0.6 : height * 0.7,
  },
  row: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  listContainer: { paddingBottom: 70 },
  avatarContainer: {
    width: 300,
    height: 300,
    borderRadius: 30,
    overflow: "hidden",
  },
  avatar: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 30,
    marginTop: 20,
    marginBottom: 20,
    color: "#f3f3f3",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 30,
    // marginTop: 20,
    // marginBottom: 20,
    color: "#f3f3f3",
    marginBottom: 10,
    marginTop: 20,
  },
  subHeaderText: {
    color: "#f3f3f3",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerBarContainer: { flex: 1 },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 70,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#181818",
  },
  gradientContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  movieDetails: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
