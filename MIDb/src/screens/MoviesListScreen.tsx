import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MovieStackScreenProps } from "../../types";
import { Button, FlatList } from "native-base";
import MoviesCard from "../components/MoviesCard";
import axios from "../apis/axios";

export interface Movie {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  title: string;
}

const MoviesListScreen = ({ navigation, route }: MovieStackScreenProps<"Movies">) => {
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
        <Text>Movie List Screen</Text>
      </View>
    </>
  );

  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => <MoviesCard item={item} navigation={navigation} />}
      // numColumns={2}
      keyExtractor={(item) => item?.id}
      ListHeaderComponent={headerSection}
    />
    // <Button onPress={() => navigation.navigate("Home")}>Test</Button>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({});
