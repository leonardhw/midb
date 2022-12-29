import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootNavigationProps, States } from "../../types";
import axios from "../apis/axios";
import { FlatList, Image, ScrollView } from "native-base";
import MoviesCard from "../components/MoviesCard";

type Props = {};

const CastDetailScreen = ({ navigation, route }: RootNavigationProps<"CastDetail">) => {
  const { id: castId } = route.params;

  const [cast, setCast] = useState<States["cast"]>();
  const [credits, setCredits] = useState<States["movie"][]>();

  const fetchCast = async () => {
    try {
      const { data } = await axios.get(`/3/person/${castId}`);
      setCast(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCredits = async () => {
    try {
      const { data } = await axios.get(`/3/person/${castId}/movie_credits`);
      setCredits(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCast();
    fetchCredits();
  }, []);

  const headerSection = () => (
    <View>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${cast?.profile_path}` }} height={100} width={100} alt="alt" />
      <Text>{cast?.id}</Text>
      <Text>{cast?.name}</Text>
      <Text>{cast?.place_of_birth}</Text>
      <Text>{cast?.biography}</Text>
    </View>
  );

  return <FlatList data={credits} renderItem={({ item }) => <MoviesCard item={item} />} keyExtractor={(item: any) => item.id} ListHeaderComponent={headerSection} />;
};

export default CastDetailScreen;

const styles = StyleSheet.create({});
