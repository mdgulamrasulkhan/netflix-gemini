import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer"; // ✅ named import
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";
import GPTSearchBar from "./GPTSearchBar";

const Browse = () => {
  const ShowGPTSearch = useSelector((store) => store.GPT.ShowGPTSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {ShowGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}

      {/* 
        Structure:
        - MainContainer (VideoBackground + VideoTitle)
        - SecondaryContainer (MovieList + MovieCard * n)
      */}
    </div>
  );
};

export default Browse;
