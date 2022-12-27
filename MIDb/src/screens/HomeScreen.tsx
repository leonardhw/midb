import { StyleSheet, ListRenderItemInfo } from "react-native";
import React, { useEffect, useState } from "react";
import type { RootTabScreenProps } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "../apis/axios";
import { FlatList, Image, Text, View } from "native-base";
import MoviesCard from "../components/MoviesCard";

export interface Movie {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  title: string;
}

const HomeScreen = ({ navigation, route }: RootTabScreenProps<"Home">) => {
  const datas = ["a", "b", "c"];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const { data } = await axios.get("/3/movie/now_playing?language=en-US", {
        params: {
          page: 1,
        },
      });
      setMovies(data.results);
      // console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const headerSection = () => (
    <>
      <View>
        <Text>HomeScreen</Text>
      </View>
    </>
  );

  return <FlatList data={movies} renderItem={({ item }) => <MoviesCard item={item} />} ListHeaderComponent={headerSection} numColumns={2} />;
};

export default HomeScreen;

const styles = StyleSheet.create({});
