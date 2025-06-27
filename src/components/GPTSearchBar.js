import { useRef } from "react";
// import openai from '../utils/openai';
import { genAI } from "../utils/geminiAi";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addGPTMoviesResult } from "../utils/GPTSlice";
import { lang } from "../utils/languageConstant";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config.lang);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGPTSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of five movies, comma separated like the example results given ahead, Example Result: 3-idiots, jawan, bajrangi bhaijaan, taare zameen par, sholay.";

    // const gptResult = await openai.chat.completions.create({
    //     messages: [{ role: 'user', content: gptQuery }],
    //     model: 'gpt-3.5-turbo',
    //   });

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: gptQuery,
    });

    console.log(result);

    // const result = await model.generateContent(gptQuery);

    const response = result.text;

    // const text = response.text();

    const geminMovies = response.split(",");

    console.log(geminMovies);

    if (!response) {
      //TODO: Error Handling...
    }

    // const gptMovies = gptResult.choices?.[0].message?.content.split(",");

    const promiseResult = geminMovies.map((movie) => searchMovieTMDB(movie));

    const TMDBMovie = await Promise.all(promiseResult);

    console.log(TMDBMovie);

    dispatch(
      addGPTMoviesResult({ movieName: geminMovies, movieList: TMDBMovie })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langkey].GPTSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGPTSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
