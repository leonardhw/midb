import { StyleSheet, Text, View, ListRenderItem, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps, States } from "../../types";
import { Button } from "native-base";
import MoviesCard from "../components/MoviesCard";
import axios from "../apis/axios";
import { SafeAreaView } from "react-native-safe-area-context";

const MoviesListScreen = ({ navigation, route }: RootTabScreenProps<"MoviesList">) => {
  const [movies, setMovies] = useState<States["movie"][]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
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
    <SafeAreaView>
      <FlatList data={movies} renderItem={({ item }) => <MoviesCard item={item} />} keyExtractor={(item: any) => item.id} />
    </SafeAreaView>
    // <Button onPress={() => navigation.navigate("Home")}>Test</Button>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({});
