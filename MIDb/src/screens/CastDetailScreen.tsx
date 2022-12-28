import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CastStackScreenProps, States } from "../../types";
import axios from "../apis/axios";
import { Image, ScrollView } from "native-base";

type Props = {};

const CastDetailScreen = ({ navigation, route }: CastStackScreenProps<"CastDetail">) => {
  // console.log(route);

  const { id: castId } = route.params;

  const [cast, setCast] = useState<States["cast"]>();

  const fetchCast = async () => {
    try {
      const { data } = await axios.get(`/3/person/${castId}`);
      // console.log(data);
      setCast(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCast();
  }, []);

  return (
    <ScrollView>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${cast?.profile_path}` }} height={100} width={100} alt="alt" />
      <Text>{cast?.id}</Text>
      <Text>{cast?.name}</Text>
      <Text>{cast?.place_of_birth}</Text>
      <Text>{cast?.biography}</Text>
    </ScrollView>
  );
};

export default CastDetailScreen;

const styles = StyleSheet.create({});
