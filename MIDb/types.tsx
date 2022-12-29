import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  BottomTabNavigator: NavigatorScreenParams<RootTabParamList>;
  MovieDetail: {
    id: number | null | undefined;
  };
  CastDetail: {
    id: number | null | undefined;
  };
};

export type RootNavigationProps<Screen extends keyof RootStackParamList> = CompositeScreenProps<NativeStackScreenProps<RootStackParamList, Screen>, BottomTabScreenProps<RootTabParamList>>;

export type RootTabParamList = {
  Home: undefined;
  MoviesList: undefined;
  CastsList: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = BottomTabScreenProps<RootTabParamList, Screen>;

//* State
export interface States {
  movie: {
    id?: number;
    title?: string;
    overview?: string | null;
    vote_average?: number;
    vote_count?: number;
    poster_path?: number;
    backdrop_path?: string;
    release_date?: string;
    genres?: {
      id: number;
      name: string;
    }[];
    budget?: number;
    homepage?: string;
    popularity?: number;
    production_companies?: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
    revenue?: number;
    status?: string;
    tagline?: string | null;
    genre_ids?: number[];
  };
  cast: {
    biography?: string;
    birthday?: Date;
    id?: number;
    name?: string;
    place_of_birth?: string;
    popularity?: number;
    profile_path?: string | null;
    character?: string;
  };
}
