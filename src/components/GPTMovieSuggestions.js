import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSUggestion = () => {
  const movies = useSelector((store) => store.GPT);

  if (!movies?.GPTMovies) return;

  const { movieList, movieName } = movies?.GPTMovies;

  return movieName && movieList?.length > 0 ? (
    <div className=" p-4 bg-black text-white m-2 bg-opacity-90 mt-12">
      <div>
        {movieName?.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieList[index]}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default GptMovieSUggestion;
