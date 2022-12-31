import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, StatusBar, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { RootNavigationProps } from "../../types";
import axios from "../apis/axios";
import { FlatList, Image, Modal } from "native-base";
import { States } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import CastsCard from "../components/CastsCard";
import { COLORS } from "../constants";
import { getBackdrop, getDate, getPoster, getRating } from "../utils";

const { width, height } = Dimensions.get("screen");

const MovieDetailScreen = ({ route, navigation }: RootNavigationProps<"MovieDetail">) => {
  const { id: movieId } = route.params;

  const [movie, setMovie] = useState<States["movie"]>({});
  const [casts, setCasts] = useState<States["cast"][]>([]);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const starRatingOptions = [1, 2, 3, 4, 5];

  const bookmarkHandler = () => {
    setBookmark(!bookmark);
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchCasts();
  }, []);

  const fetchMovieDetail = async () => {
    try {
      const { data } = await axios.get(`/3/movie/${movieId}`);
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
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        {/* Bookmark */}
        <TouchableOpacity style={styles.backButton} onPress={bookmarkHandler}>
          <Ionicons name={bookmark ? "ios-bookmark" : "ios-bookmark-outline"} size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    );
  };

  const headerSection = () => (
    <>
      <ImageBackground source={{ uri: getBackdrop(movie.backdrop_path) }} style={styles.backdrop}>
        <View style={styles.headerBarContainer}>
          {headerBar()}
          {modals()}
          <View style={styles.gradientContainer}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={["transparent", COLORS.black]} style={styles.gradient}>
              <Image source={{ uri: getPoster(movie.poster_path) }} style={styles.poster} alt={`poster of ${movie.title}`} />
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
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View style={styles.categoryContainer}>
            <AntDesign name="star" size={10} color={COLORS.rating} />
            <Text style={[styles.subHeaderText, { marginLeft: 5, color: COLORS.rating }]}>{getRating(movie.vote_average)}</Text>
          </View>
        </TouchableOpacity>

        {movie.runtime && (
          <TouchableOpacity>
            <View style={styles.categoryContainer}>
              <Ionicons name="md-time" size={12} color={COLORS.primary} />
              <Text style={[styles.subHeaderText, { marginLeft: 5 }]}>{movie.runtime}m</Text>
            </View>
          </TouchableOpacity>
        )}

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
        {movie.overview && <Text style={styles.subHeaderText}>{movie.overview}</Text>}
        {movie.release_date && <Text style={[styles.subHeaderText, { marginTop: 20 }]}>Release: {getDate(movie.release_date)}</Text>}
      </View>
    );
  };

  const modals = () => {
    return (
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content style={styles.modal}>
          <Modal.Body>
            <View style={styles.starsContainer}>
              {starRatingOptions.map((option) => (
                <TouchableWithoutFeedback onPress={() => setRating(option)} key={option}>
                  <AntDesign name={rating >= option ? "star" : "staro"} size={32} color={COLORS.rating} />
                </TouchableWithoutFeedback>
              ))}
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
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
    backgroundColor: COLORS.black,
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
    backgroundColor: COLORS.dark,
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
    color: COLORS.white,
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
    backgroundColor: COLORS.dark,
    marginBottom: 10,
  },
  subHeaderText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  listContainer: { paddingBottom: 20, backgroundColor: COLORS.black },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 30,
    color: COLORS.white,
    marginBottom: 10,
    marginTop: 20,
  },
  movieDetails: {
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: COLORS.black,
    paddingVertical: 20,
    paddingHorizontal: 10,
    maxWidth: 400,
    borderRadius: 30,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    position: "absolute",
    bottom: 75,
    borderRadius: 30,
    height: 750 / 2,
    width: 500 / 2,
  },
});
