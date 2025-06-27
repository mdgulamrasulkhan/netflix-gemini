import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addPopularMovies } from "../utils/moviesSlice";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS
        );
        const json = await response.json();

        dispatch(addPopularMovies(json.results));
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    };

    if (!popularMovies) {
      getPopularMovies();
    }
  }, [dispatch, popularMovies]);
};
