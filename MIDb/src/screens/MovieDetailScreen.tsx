import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MovieStackScreenProps } from "../../types";
import axios from "../apis/axios";
import { FlatList, Image, ScrollView } from "native-base";

const MovieDetailScreen = ({ navigation, route }: MovieStackScreenProps<"Movies">) => {
  const { id: movieId } = route.params;

  const [movie, setMovie] = useState({});
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    fetchMovieDetail();
    fetchCasts();
  }, []);

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
      // console.log(data.cast);
      setCasts(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Text>{movieId}</Text>
        <Text>{movie.title}</Text>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} height={100} width={100} alt="alt" />
        <Text>{movie.overview}</Text>
      </View>
      <FlatList
        data={casts}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({});
