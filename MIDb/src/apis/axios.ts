import axios from "axios";

const API_KEY: string = "d3a49bbadb1971a413681e37572d34a6";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org",
  params: { api_key: API_KEY },
});

export default instance;
