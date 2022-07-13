import useLocalStorage from "./useLocalStorage";
import React from "react";
import { IGenre, IGenreIds, IGenreNames } from "../utils/interfaces";


function useGenres(category: string): {genres: IGenreNames, genreIds: IGenreIds} {
  const [genres, setGenres] = useLocalStorage(`${category}_genres`, {} as IGenreNames);
  const [genreIds, setGenreIds] = React.useState({} as IGenreIds);

  // Gets all available genres
  React.useEffect(() => {
    if (window.localStorage !== undefined && window.localStorage.getItem(`${category}_genres`) !== null) return;
    if (category) {
      const url = `${window.location.origin}/api/tmdb/${category}/genres`;
      (async () => {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        setGenres(jsonResponse.genres.reduce((o: {id: IGenre['name']}, key: IGenre) => ({
          ...o,
          [key.id]: key.name
        }), {}));
      })();
    }
  }, [category, setGenres]);

  React.useEffect(() => {
    setGenreIds(Object.keys(genres).reduce((o: {[name: IGenre['name']]: IGenre['id']}, key: IGenre['id']) => ({
      ...o,
      [genres[key]]: key
    }), {}))
  }, [genres])


  return { genres, genreIds };
}

export default useGenres;
