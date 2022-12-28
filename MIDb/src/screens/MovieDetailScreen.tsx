import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MovieStackScreenProps, RootNavigationProps, RootTabScreenProps } from "../../types";
import axios from "../apis/axios";
import { FlatList, Image, ScrollView } from "native-base";
import { States } from "../../types";
import { useNavigation } from "@react-navigation/native";

const MovieDetailScreen = ({ route }: MovieStackScreenProps<"MovieDetail">) => {
  const { id: movieId } = route.params;
  const navigation: RootNavigationProps["navigation"] = useNavigation();

  const [movie, setMovie] = useState<States["movie"]>({});
  const [casts, setCasts] = useState<States["casts"][]>([]);

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

  const headerSection = () => (
    <View>
      <Text>{movieId}</Text>
      <Text>{movie.title}</Text>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} height={100} width={100} alt="alt" />
      <Text>{movie.overview}</Text>
    </View>
  );

  return (
    <FlatList
      data={casts}
      keyExtractor={(item: any) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate("CastDetail", { id: item.id })}>
          <View>
            <Image source={{ uri: item.profile_path ? `https://image.tmdb.org/t/p/w500/${item.profile_path}` : "https://placekitten.com/100/100" }} height={100} width={100} alt="alt" />
            <Text>{item.name}</Text>
          </View>
        </Pressable>
      )}
      ListHeaderComponent={headerSection}
    />
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({});
