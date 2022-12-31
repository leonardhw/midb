import { States } from "../../types";

export const getAvatar = (image: States["cast"]["profile_path"]) => {
  if (image == null) return "https://dummyimage.com/500x750/181818/878787&text=profile_img";
  return `https://image.tmdb.org/t/p/h632/${image}`;
};

export const getBackdrop = (image: States["movie"]["backdrop_path"]) => {
  if (image == null) return "https://dummyimage.com/1280x720/181818/aaa&text=backdrop_img";
  return `https://image.tmdb.org/t/p/w1280/${image}`;
};

export const getPoster = (poster: States["movie"]["poster_path"]) => {
  if (poster == null) return "https://dummyimage.com/500x750/181818/878787&text=poster_img";
  return `https://image.tmdb.org/t/p/w500/${poster}`;
};

export const getRating = (rating: States["movie"]["vote_average"]) => {
  if (rating == null) return 0;
  return Math.floor(rating * 10) / 10;
};

export const getDate = (date: any) => {
  if (!date) return "2022-11-1";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let [year, month, day] = date.split("-");

  return `${months[Number(month) - 1]} ${day}, ${year}`;
};
