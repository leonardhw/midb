import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { RootNavigationProps, RootTabScreenProps } from "../../types";
import axios from "../apis/axios";
import { Center, FlatList, Image, ScrollView } from "native-base";
import { States } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import CastsCard from "../components/CastsCard";

const { width, height } = Dimensions.get("screen");

const MovieDetailScreen = ({ route, navigation }: RootNavigationProps<"MovieDetail">) => {
  const { id: movieId } = route.params;

  const [movie, setMovie] = useState<States["movie"]>({});
  const [casts, setCasts] = useState<States["cast"][]>([]);
  const [bookmark, setBookmark] = useState<boolean>(false);

  const bookmarkHandler = () => {
    setBookmark(!bookmark);
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchCasts();
  }, []);

  const getBackdrop = (image: States["movie"]["backdrop_path"]) => {
    if (image == null) return "https://dummyimage.com/1280x720/181818/aaa&text=backdrop_img";
    return `https://image.tmdb.org/t/p/w1280/${image}`;
  };

  const getPoster = (poster: States["movie"]["poster_path"]) => {
    if (poster == null) return "https://dummyimage.com/500x750/181818/878787&text=poster_img";
    return `https://image.tmdb.org/t/p/w500/${poster}`;
  };

  const getRating = (rating: States["movie"]["vote_average"]) => {
    if (rating == null) return 0;
    return Math.floor(rating * 10) / 10;
  };

  const getDate = (date: any) => {
    if (!date) return "2022-11-1";
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [year, month, day] = date.split("-");

    return `${months[Number(month) - 1]} ${day}, ${year}`;
  };

  const fetchMovieDetail = async () => {
    try {
      const { data } = await axios.get(`/3/movie/${movieId}`);
      // console.log(data);

      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCasts = async () => {
    try {
      const { data } = await axios.get(`/3/movie/${movieId}/credits`);
      setCasts(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <ImageBackground source={{ uri: getBackdrop(movie.backdrop_path) }} style={styles.backdrop}>
        <View style={styles.headerBarContainer}>
          {headerBar()}
          <View style={styles.gradientContainer}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={["transparent", "#030303"]} style={styles.gradient}>
              <Image
                source={{ uri: getPoster(movie.poster_path) }}
                height={750 / 2}
                width={500 / 2}
                style={{
                  position: "absolute",
                  bottom: 75,
                  borderRadius: 30,
                }}
                alt="alt"
              />
              <Text style={styles.title}>{movie.title}</Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.movieDetails}>
        {subHeaderSection()}

        {movieDetails()}

        <Text style={styles.sectionTitle}>The Cast</Text>
      </View>
    </>
  );

  const subHeaderSection = () => {
    return (
      <View style={styles.subHeaderContainer}>
        <TouchableOpacity>
          <View style={styles.categoryContainer}>
            <AntDesign name="star" size={10} color="#f5b754" />
            <Text style={[styles.subHeaderText, { marginLeft: 5, color: "#f5b754" }]}>{getRating(movie.vote_average)}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.categoryContainer}>
            <Ionicons name="md-time" size={12} color="#39A2AE" />
            <Text style={[styles.subHeaderText, { marginLeft: 5 }]}>{movie.runtime}m</Text>
          </View>
        </TouchableOpacity>

        {movie.genres?.map((genre) => {
          return (
            <TouchableOpacity key={genre.id}>
              <View style={styles.categoryContainer}>
                <Text style={styles.subHeaderText}>{genre.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const movieDetails = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={styles.subHeaderText}>{movie.overview}</Text>
        <Text style={[styles.subHeaderText, { marginTop: 20 }]}>Release: {getDate(movie.release_date)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <FlatList data={casts} renderItem={({ item }) => <CastsCard item={item} page="credit" />} keyExtractor={(item: any) => item.id} contentContainerStyle={styles.listContainer} ListHeaderComponent={headerSection} />
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030303",
  },
  backdrop: {
    width: "100%",
    height: height < 700 ? height * 0.6 : height * 0.7,
  },
  header: {
    flex: 1,
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 30,
    // marginTop: 20,
    // marginBottom: 20,
    color: "#f3f3f3",
    textAlign: "center",
  },
  subHeaderContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7.5,
    backgroundColor: "#181818",
    marginBottom: 10,
  },
  subHeaderText: {
    color: "#f3f3f3",
    fontSize: 14,
    fontWeight: "bold",
  },
  listContainer: { paddingBottom: 20 },
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
  movieDetails: {
    paddingHorizontal: 20,
  },
});
