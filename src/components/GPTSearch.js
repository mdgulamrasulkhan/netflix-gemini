import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GptSearchBar from "./GPTSearchBar";
import { BG_URL } from "../utils/constant";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10 ">
        <img
          className="h-screen object-cover w-screen"
          src={BG_URL}
          alt="bgImage"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GPTMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;

//overflow-x-hidden
//bg-gradient-to-b from-black
