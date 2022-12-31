import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps, States } from "../../types";
import axios from "../apis/axios";
import { FlatList } from "native-base";
import CastsCard from "../components/CastsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";

const CastsListScreen = ({ navigation, route }: RootTabScreenProps<"CastsList">) => {
  const [casts, setCasts] = useState<States["cast"][]>();

  const fetchCasts = async () => {
    const { data } = await axios.get("/3/person/popular", {
      params: {
        page: 1,
      },
    });
    setCasts(data.results);
  };

  useEffect(() => {
    fetchCasts();
  }, []);

  const headerSection = () => (
    <View style={styles.header}>
      <Text style={styles.title}>POPULAR STARS</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <FlatList data={casts} renderItem={({ item }) => <CastsCard item={item} page="casts" />} keyExtractor={(item: any) => item.id} ListHeaderComponent={headerSection} contentContainerStyle={styles.listContainer} />
      </View>
    </SafeAreaView>
  );
};

export default CastsListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },

  listContainer: { paddingBottom: 80 },
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
});
