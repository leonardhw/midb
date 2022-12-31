import { StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps, States } from "../../types";
import { Text, View, FlatList, HStack } from "native-base";
import MoviesCard from "../components/MoviesCard";
import axios from "../apis/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";

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
    } catch (error) {
      console.log(error);
    }
  };
  const headerSection = () => (
    <View style={styles.header}>
      <Text style={styles.title}>DISCOVER</Text>
      <HStack>
        <Text style={[styles.navLink, styles.navLink_active]}>Now Playing</Text>
        <Text style={styles.navLink}>Popular</Text>
        <Text style={styles.navLink}>Upcoming</Text>
      </HStack>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <FlatList data={movies} renderItem={({ item }) => <MoviesCard item={item} />} keyExtractor={(item: any) => item.id} ListHeaderComponent={headerSection} numColumns={2} columnWrapperStyle={styles.row} contentContainerStyle={styles.listContainer} />
      </View>
    </SafeAreaView>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
  row: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  listContainer: { paddingBottom: 70 },
  header: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.black,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 30,
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.white,
  },
  navLink: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginEnd: 15,
    color: "#87878790",
  },
  navLink_active: {
    color: COLORS.white,
  },
});
