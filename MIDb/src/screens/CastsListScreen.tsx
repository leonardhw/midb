import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps, States } from "../../types";
import axios from "../apis/axios";
import { FlatList, Image } from "native-base";
import CastsCard from "../components/CastsCard";
import { SafeAreaView } from "react-native-safe-area-context";

const CastsListScreen = ({ navigation, route }: RootTabScreenProps<"CastsList">) => {
  const [casts, setCasts] = useState<States["cast"][]>();

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
    <SafeAreaView>
      <View>
        <Text>CastsListScreen</Text>
        <FlatList data={casts} renderItem={({ item }) => <CastsCard item={item} />} keyExtractor={(item: any) => item.id} />
      </View>
    </SafeAreaView>
  );
};

export default CastsListScreen;

const styles = StyleSheet.create({});
