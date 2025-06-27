import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
// import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGPTSearchView } from "../utils/GPTSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const ShowGPTSearch = useSelector((store) => store.GPT.ShowGPTSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  console.log("***************", SUPPORTED_LANGUAGES);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  const handleGPTSearchClick = () => {
    // Toggle GPT Search Button
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    //console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row justify-between ">
      <img className="w-44 mx-auto md:mx-0 " src={LOGO} alt="log" />
      {user && (
        <div className="flex p-2 justify-between">
          {ShowGPTSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 text-white bg-purple-800 rounded-lg"
            onClick={handleGPTSearchClick}
          >
            {ShowGPTSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className=" hidden
            md:block w-12 h-12 "
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white cursor-pointer "
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
