import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CastStackScreenProps, States } from "../../types";
import axios from "../apis/axios";
import { FlatList, Image } from "native-base";
import CastsCard from "../components/CastsCard";

const CastsListScreen = ({ navigation, route }: CastStackScreenProps<"Casts">) => {
  const [casts, setCasts] = useState<States["casts"][]>();

  const fetchCasts = async () => {
    const { data } = await axios.get("/3/person/popular", {
      params: {
        page: 1,
      },
    });
    // console.log(data);

    setCasts(data.results);
  };

  useEffect(() => {
    fetchCasts();
  }, []);

  return (
    <View>
      <Text>CastsListScreen</Text>
      <FlatList data={casts} renderItem={({ item }) => <CastsCard item={item} />} keyExtractor={(item: any) => item.id} />
    </View>
  );
};

export default CastsListScreen;

const styles = StyleSheet.create({});
