import { StyleSheet, ListRenderItem, Dimensions, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps, States } from "../../types";
import { Button, Text, View, FlatList, HStack } from "native-base";
import MoviesCard from "../components/MoviesCard";
import axios from "../apis/axios";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

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
    <View style={styles.header}>
      <Text style={styles.title}>DISCOVER</Text>
      <HStack style={styles.navigation}>
        <Text style={[styles.navLink, styles.navLink_active]}>Now Playing</Text>
        <Text style={styles.navLink}>Popular</Text>
        <Text style={styles.navLink}>Upcoming</Text>
      </HStack>
    </View>
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#030303"></StatusBar>
      <View style={styles.container}>
        <FlatList data={movies} renderItem={({ item }) => <MoviesCard item={item} />} keyExtractor={(item: any) => item.id} ListHeaderComponent={headerSection} numColumns={2} columnWrapperStyle={styles.row} contentContainerStyle={styles.listContainer} />
      </View>
    </SafeAreaView>

    // <Button onPress={() => navigation.navigate("Home")}>Test</Button>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#030303",
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
    backgroundColor: "#030303",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 30,
    marginTop: 20,
    marginBottom: 20,
    color: "#f3f3f3",
  },
  navigation: {
    // marginRight: ,
  },
  navLink: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginEnd: 15,
    color: "#878787",
  },
  navLink_active: {
    color: "#f3f3f3",
  },
});
