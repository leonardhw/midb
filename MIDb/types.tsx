import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}

export type RootTabParamList = {
  Home: undefined;
  MovieStackNavigator: NavigatorScreenParams<MovieStackParamList>;
  CastStackNavigator: NavigatorScreenParams<CastStackParamList>;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = BottomTabScreenProps<RootTabParamList, Screen>;

export type RootNavigationProps = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, "Home">, CompositeScreenProps<NativeStackScreenProps<MovieStackParamList>, NativeStackScreenProps<CastStackParamList>>>;

export type MovieStackParamList = {
  Movies: undefined;
  MovieDetail: {
    id: number | null | undefined;
  };
};
export type MovieStackScreenProps<Screen extends keyof MovieStackParamList> = NativeStackScreenProps<MovieStackParamList, Screen>;

export type CastStackParamList = {
  Casts: undefined;
  CastDetail: {
    id: number | null | undefined;
  };
};

export type CastStackScreenProps<Screen extends keyof CastStackParamList> = NativeStackScreenProps<CastStackParamList, Screen>;

//* State
export interface States {
  movies: {
    id?: number;
    title?: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    vote_average?: number;
    release_date?: string;
    genre_ids?: number[];
    popularity?: number;
    vote_count?: number;
  };
  movie: {
    id?: number;
    title?: string;
    overview?: string | null;
    vote_average?: number;
    vote_count?: number;
    poster_path?: number;
    backdrop_path?: string;
    release_date?: Date;
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
  };
  casts: {
    id?: number;
    name?: string;
    popularity?: number;
    profile_path?: string | null;
    cast_id?: number;
    character?: string;
    credit_id?: string;
    order?: number;
  };
  cast: {
    biography: string;
    birthday: Date;
    id: number;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
  };
}
