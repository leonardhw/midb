import { StyleSheet, Text, View, ListRenderItem, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { MovieStackScreenProps, States } from "../../types";
import { Button } from "native-base";
import MoviesCard from "../components/MoviesCard";
import axios from "../apis/axios";

const MoviesListScreen = ({ navigation, route }: MovieStackScreenProps<"Movies">) => {
  const [movies, setMovies] = useState<States["movies"][]>([]);

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
    <FlatList data={movies} renderItem={({ item }) => <MoviesCard item={item} />} keyExtractor={(item: any) => item.id} />
    // <Button onPress={() => navigation.navigate("Home")}>Test</Button>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({});
