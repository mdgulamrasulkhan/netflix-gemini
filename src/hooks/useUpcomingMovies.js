import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpcomingMovies } from "../utils/moviesSlice";

export const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?page=1",
          API_OPTIONS
        );
        const json = await response.json();

        dispatch(addUpcomingMovies(json.results));
      } catch (error) {
        console.error("Failed to fetch now playing movies:", error);
      }
    };

    getUpcomingMovies();
  }, [dispatch]);
};
