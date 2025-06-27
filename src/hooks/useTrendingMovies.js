import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrendingMovies } from "../utils/moviesSlice";
export const useTrendingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1",
          API_OPTIONS
        );
        const json = await response.json();

        dispatch(addTrendingMovies(json.results));
      } catch (error) {
        console.error("Failed to fetch now playing movies:", error);
      }
    };

    getTrendingMovies();
  }, [dispatch]);
};
