import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}

export type RootTabParamList = {
  Home: undefined;
  MovieStackNavigator: undefined;
  CastStackNavigator: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = BottomTabScreenProps<RootTabParamList, Screen>;

export type MovieStackParamList = {
  Movies: undefined;
  MovieDetail: undefined;
};
export type MovieStackScreenProps<Screen extends keyof MovieStackParamList> = NativeStackScreenProps<MovieStackParamList, Screen>;

export type CastStackParamList = {
  Casts: undefined;
  CastDetail: undefined;
};

export type CastStackScreenProps<Screen extends keyof CastStackParamList> = NativeStackScreenProps<CastStackParamList, Screen>;
